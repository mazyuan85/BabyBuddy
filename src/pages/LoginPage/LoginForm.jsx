import { useState } from 'react';
import { getUser, login } from "../../utilities/users-service"
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from '@mui/material';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await login(credentials);
      const {password, createdAt, updatedAt, ...userWithoutPassword} = user;
      setUser(userWithoutPassword);
      navigate("/main");
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: 2,
      }}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        label="Email"
        type="text"
        name="email"
        value={credentials.email}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Log In
      </Button>
      <Typography
        variant="body2"
        color="error"
        align="center"
        sx={{ marginTop: 5 }}
      >
        {error}
      </Typography>
    </Box>
  );
  
}