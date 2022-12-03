import React from 'react';
import Button from '@mui/material/Button';

function App() {
  const handleClick = () => {
    console.log('hhhhh');
  };
  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        button
      </Button>
    </div>
  );
}

export default App;
