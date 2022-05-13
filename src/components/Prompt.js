import Box from '@mui/material/Box';
import { Link, TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Response from './Response';

export default function Prompt() {
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState(() => {
    const savedHistory = localStorage.getItem('gpt3searchhistory');
    const initialHistory = JSON.parse(savedHistory);
    return initialHistory || [];
  });

  useEffect(() => {
    localStorage.setItem('gpt3searchhistory', JSON.stringify(searchHistory));
  }, [searchHistory, searchText]);

  const clearResults = () => {
    setSearchHistory([]);
  };

  const sampleInputTexts = [
    'Write me a haiku about oranges',
    'Write a poem about a dog wearing skis',
    'Write me a python program to print hello world',
    'Write me a go concurrency program',
    'Can AI take over the world',
    'How does GPT-3 work',
  ];

  const fillSuggestedText = () => {
    setSearchText(
      sampleInputTexts[Math.floor(Math.random() * sampleInputTexts.length)]
    );
  };

  const search = () => {
    if (searchText.length === 0) {
      setShowEmptyError(true);
      return;
    }

    const data = {
      prompt: searchText,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    let resp;
    fetch('https://api.openai.com/v1/engines/text-curie-001/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAPI_SECRET}`,
      },
      body: JSON.stringify(data),
    }).then((response) =>
      response.json().then((obj) => {
        if (obj && obj.choices && obj.choices.length && obj.choices[0].text) {
          resp = obj.choices[0].text.trim();
          searchHistory.unshift({ prompt: searchText, response: resp });
          setSearchText('');
        } else {
          setShowEmptyError(true);
        }
      })
    );
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <Box>
          <div style={{ fontSize: '36px', marginTop: '80px' }}>
            Lullaby with AI (and more)
          </div>
          <div style={{ fontSize: '18px', marginTop: '5px' }}>
            Text generation using OpenAI's GPT-3
          </div>
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            Created by{' '}
            <Link
              href='https://www.satrajit.ca'
              target='_blank'
              underline='none'
            >
              <span
                style={{
                  backgroundColor: 'black',
                  padding: '6px',
                  borderRadius: '6px',
                  color: 'white',
                }}
              >
                @satrajit
              </span>
            </Link>
          </div>
          <div style={{ fontStyle: 'italic', marginTop: '25px' }}>
            Please wait 2 seconds for GPT-3 to process after pressing search
          </div>
          <div style={{ marginTop: '15px', width: '500px' }}>
            <TextField
              id='outlined-multiline-static'
              label='Input prompt for AI'
              multiline
              rows={5}
              fullWidth
              placeholder='Write me a lullaby with AI'
              onChange={(e) => {
                setSearchText(e.target.value);
                setShowEmptyError(false);
              }}
              value={searchText}
            />
            {showEmptyError && (
              <div style={{ color: 'red', marginTop: '8px' }}>
                Invalid input, please try again!
              </div>
            )}

            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <Button
                disableElevation
                variant='outlined'
                onClick={() => {
                  fillSuggestedText();
                }}
                style={{ marginRight: '10px' }}
              >
                Suggest Text
              </Button>

              <Button
                disableElevation
                variant='contained'
                onClick={() => {
                  search();
                }}
              >
                Search
              </Button>
            </div>
            <div
              style={{
                marginTop: '50px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'end',
              }}
            >
              <div style={{ fontSize: '28px' }}>Responses</div>
              <div style={{ marginLeft: 'auto' }}>
                <Button
                  onClick={() => {
                    clearResults();
                  }}
                >
                  Clear results
                </Button>
              </div>
            </div>
            <Response items={searchHistory} key={searchHistory} />
            {searchHistory.length === 0 && (
              <div style={{ color: '#4c7a5d' }}>
                No search history, try searching something!
              </div>
            )}
          </div>
        </Box>
      </div>
    </>
  );
}
