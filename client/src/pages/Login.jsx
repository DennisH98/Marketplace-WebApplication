import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import {Link as RouterLink} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import Alert from '@mui/material/Alert';

const theme = createTheme();

export default function Login() {

  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const config = {
      headers: {
        Accept: 'application/json'
      },
    };

    const myData = {
      username: data.get("username"),
      password: data.get("password")
    };
    
    axios 
      .post("http://localhost:5000/api/auth/login",myData, config)
      .then(res => {
        //console.log(res);
        
          localStorage.setItem("jwtToken",res.data.token);
          localStorage.setItem("isAuthenticated",true);
          navigate('/home'); //Success! redirect to home
        
      })
      .catch(err => {
        if (err.response){
          setErrorMsg(err.response.data.msg);
          setIsError(true);
        }
      });
    };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="off"
              autoFocus
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            {isError ? <Grid item xs={12}><Alert severity="error">{errorMsg}</Alert> </Grid> : ""}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}
