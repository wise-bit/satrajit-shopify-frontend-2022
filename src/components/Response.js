import Box from '@mui/material/Box';

export default function Response({ items }) {
  return (
    <>
      {items.map((item, index) => {
        return (
          <div key={index}>
            <Box
              style={{
                backgroundColor: '#d5e8dc',
                paddingTop: '15px',
                paddingBottom: '15px',
                paddingLeft: '10px',
                paddingRight: '10px',
                border: 'solid 2px #4c7a5d',
                borderRadius: '4px',
                marginBottom: '15px',
              }}
            >
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                  Prompt:
                </div>
                <div>{item.prompt}</div>
              </div>
              <div style={{ marginTop: '10px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                  Response:
                </div>
                <div style={{ whiteSpace: 'pre-wrap' }}>{item.response}</div>
              </div>
            </Box>
          </div>
        );
      })}
    </>
  );
}
