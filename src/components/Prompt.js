import Box from '@mui/material/Box';
import {
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Response from './Response';
import { useMediaQuery } from 'react-responsive';

export default function Prompt() {
  const SAMPLE_INPUT_TEXTS = [
    'Write me a haiku about oranges',
    'Write a poem about a dog wearing skis',
    'Write me a python program to print hello world',
    'Write me a go concurrency program',
    'Can AI take over the world',
    'How does GPT-3 work',
    'What is test based development',
    'Write me an ocaml hello world program',
    'Write me a poem about giraffes',
  ];

  const AVAILABLE_ENGINES = [
    'text-curie-001',
    'text-ada-001',
    'text-babbage-001',
    'text-davinci-002',
  ];

  const [showEmptyError, setShowEmptyError] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [engineDropdown, setEngineDropdown] = useState(AVAILABLE_ENGINES[0]);
  const [searchHistory, setSearchHistory] = useState(() => {
    const savedHistory = localStorage.getItem('gpt3searchhistory');
    const initialHistory = JSON.parse(savedHistory);
    return initialHistory || [];
  });

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  useEffect(() => {
    localStorage.setItem('gpt3searchhistory', JSON.stringify(searchHistory));
  }, [searchHistory, searchText]);

  const clearResults = () => {
    setSearchHistory([]);
  };

  const fillSuggestedText = () => {
    setSearchText(
      SAMPLE_INPUT_TEXTS[Math.floor(Math.random() * SAMPLE_INPUT_TEXTS.length)]
    );
  };

  const switchEngine = (event) => {
    setEngineDropdown(event.target.value);
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
    fetch(`https://api.openai.com/v1/engines/${engineDropdown}/completions`, {
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
        <Box style={{ width: isMobile ? '100%' : '500px', padding: '10px' }}>
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
          <div style={{ marginTop: '15px' }}>
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

            <div
              style={{
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'end',
              }}
            >
              <FormControl size='small'>
                <InputLabel id='select-small'>Engine</InputLabel>
                <Select
                  value={engineDropdown}
                  label='Engine'
                  onChange={switchEngine}
                >
                  <MenuItem value={'text-curie-001'}>Curie (Default)</MenuItem>
                  <MenuItem value={'text-ada-001'}>Ada (Fastest)</MenuItem>
                  <MenuItem value={'text-babbage-001'}>Babbage</MenuItem>
                  <MenuItem value={'text-davinci-002'}>
                    DaVinci (Strongest)
                  </MenuItem>
                </Select>
              </FormControl>

              <div
                style={{
                  textAlign: 'right',
                  marginTop: '20px',
                  marginLeft: 'auto',
                }}
              >
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
