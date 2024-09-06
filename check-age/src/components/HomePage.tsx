import * as React from 'react';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();
  const { name, age } = location.state;

  return (
    <div>
      <Typography variant="h3">Welcome, {name}!</Typography>
      <p>Your age is {age}.</p>
    </div>
  );
};

export default HomePage;