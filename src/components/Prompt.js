import Box from '@mui/material/Box';
import { TextField } from '@mui/material';

export default function Prompt() {
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
          <h1>Fun with AI</h1>
          <div style={{ width: '500px' }}>
            <TextField
              id='outlined-multiline-static'
              label='Input prompt for AI'
              multiline
              rows={5}
              fullWidth
              placeholder='Start typing...'
            />
          </div>
        </Box>
      </div>
    </>
  );
}
