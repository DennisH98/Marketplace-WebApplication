import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Toolbar from '@mui/material/Toolbar';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import Review from '../components/Review';
import { Typography } from '@mui/material';

const theme = createTheme();

export default function UserProfile() {
  const user = jwtDecode(localStorage.jwtToken);
  const [reviews, setReviews] = useState([]);
  let id = user.name;

  const getReviews = (id) => {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }

    axios.get('http://localhost:5000/api/review/:id', { params: id }, config)
      .then(res => {
        setReviews(res.data);
      })
      .catch(err => console.log(err.response));
  }

  useEffect(() => {
    getReviews({ id });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />

          <Typography variant="h2">Welcome {user.name}</Typography>

          <Typography variant="h4">Your Reviews</Typography>
          <Grid container justify="center" spacing={2} pb={3}>
            {reviews.map((review) => (
              <Grid item lg={6} md={6}>
                <Review username={review.reviewerID} review={review.review} rating={review.rating} />
              </Grid>
            ))}
          </Grid>

        </Container>
      </Box>
    </ThemeProvider>
  );
}