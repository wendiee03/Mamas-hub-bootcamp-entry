import * as React from 'react';
import { TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginData {
  name: string;
  dob: string;
  password:string;
}

const LoginPage = () => {
  const [name, setName] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const age = calculateAge(dob);
      if (age < 18 || age > 50) {
        setError('Age must be between 18 and 50.');
        return;
      }

      const response = await axios.post('/api/login', { name, password });
      if (response.data.success) {
        navigate('/homepage', { state: { name, age } });
      } else {
        setError('Invalid credentials.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred.');
    }
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div>
      <Typography variant="h3">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date of Birth"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        {error && <Alert severity="error">{error}</Alert>}
      </form>
    </div>
  );
};

export default LoginPage;