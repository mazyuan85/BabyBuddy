import LoginForm from "./LoginForm";
import { Container, Box, Typography, Button, TextField, Grid } from '@mui/material';
import { Link } from 'react-router-dom';


export default function LoginPage({ setUser }) {
    return (
      <Container maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "flex-start",
            minHeight: '100vh',
            paddingTop: theme => theme.spacing(4),
          }}
        >
          <img src="/images/favicon.png" alt="Logo" width="80" />
          <Typography component="h1" variant="h5" align="center" sx={{marginTop: "10px"}}>
            Welcome!
          </Typography>
          <LoginForm setUser={setUser} />
          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="body2" align="center">
                Don't have an account?
              </Typography>
            </Grid>
          </Grid>
          <Button
            component={Link}
            to="/users/signup"
            color="primary"
            variant="outlined"
            sx={{ marginTop: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Container>
    );
  }
  