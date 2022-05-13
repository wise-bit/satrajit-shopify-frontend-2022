import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useState } from 'react';

export default function Prompt() {
  const [input, setInput] = useState('');

  const search = () => {
    console.log(input);
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
          <div style={{ fontSize: '36px', marginTop: '80px' }}>Fun with AI</div>
          <div style={{ fontSize: '18px', marginTop: '10px' }}>
            Using GPT-3 by OpenAI
          </div>
          <div
            style={{ color: '#777777', textAlign: 'right', marginTop: '20px' }}
          >
            @satrajit/@wisebit
          </div>
          <div style={{ marginTop: '20px', width: '500px' }}>
            <TextField
              id='outlined-multiline-static'
              label='Input prompt for AI'
              multiline
              rows={5}
              fullWidth
              placeholder='Start typing...'
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </div>
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <Button
              variant='outlined'
              onClick={() => {
                search();
              }}
            >
              Search
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
}
