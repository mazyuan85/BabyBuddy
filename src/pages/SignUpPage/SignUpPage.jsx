import { Container, Box, Typography } from '@mui/material';
import SignUpForm from "./SignUpForm";
import { useEffect, useRef } from 'react';

export default function SignUpPage({setUser}) {

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
          <img src="/images/favicon.png" alt="BabyBuddy Logo" width="80" />
          <Typography component="h1" variant="h5" align="center" sx={{marginTop:"10px"}}>
            Sign Up Here
          </Typography>
          <SignUpForm setUser={setUser} />
        </Box>
      </Container>
    );
}