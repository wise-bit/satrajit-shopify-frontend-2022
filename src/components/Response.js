import Box from '@mui/material/Box';

export default function Response({ items }) {
  return (
    <>
      {items.map((item, index) => {
        return (
          <div key={index}>
            <Box
              style={{
                backgroundColor: '#dfede4',
                paddingTop: '15px',
                paddingBottom: '15px',
                paddingLeft: '10px',
                paddingRight: '10px',
                border: 'solid 2px #5d9973',
                borderRadius: '4px',
                marginBottom: '10px',
              }}
            >
              <div>
                <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  Prompt:
                </div>
                <div>{item.prompt}</div>
              </div>
              <div style={{ marginTop: '20px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
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
