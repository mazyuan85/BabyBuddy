import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../utilities/users-service";
import { Box, TextField, Button, Grid, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function SignUpForm({setUser}) {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        confirm: ""
    })
    const disable = state.password !== state.confirm;
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const user = await signUp(state);
        const {password, createdAt, updatedAt, ...userWithoutPassword} = user;
        setUser(userWithoutPassword);
        navigate("/main/mybabies");
      } catch (error) {
        if (error.message.includes("email")) {
          setError("This email already has an account");
        } else {
          setError(error.message);
        }
      }
    };
  
    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]:event.target.value
        })
    };
  
    return (
        <Container maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              minHeight: '100vh',
            }}
          >
            <form autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                name="name"
                value={state.name}
                onChange={handleChange}
                required
                inputProps={{ maxLength: 100 }}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                type="email"
                name="email"
                value={state.email}
                onChange={handleChange}
                required
              />
              <TextField
                label="Password"
                fullWidth
                margin="normal"
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
                required
                inputProps= {{ minLength: 3, maxLength: 30 }}
              />
              <TextField
                label="Re-type Password"
                fullWidth
                margin="normal"
                type="password"
                name="confirm"
                value={state.confirm}
                onChange={handleChange}
                required
                inputProps= {{ minLength: 3, maxLength: 30 }}
              />
              <Button
                type="submit"
                disabled={disable}
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
              >
                Sign Up
              </Button>
            <Typography
              variant="body2"
              color="error"
              align="center"
              sx={{ marginTop: 3 }}
            >
              {error}
            </Typography>
            </form>
            <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
              <Grid item>
                <Typography variant="body2" align="center">
                  Already have an account?
                </Typography>
              </Grid>
            </Grid>
            <Button
              component={Link}
              to="/users/login"
              color="primary"
              variant="outlined"
              sx={{ marginTop: 2 }}
            >
              Log In
            </Button>
          </Box>
        </Container>
    );
}