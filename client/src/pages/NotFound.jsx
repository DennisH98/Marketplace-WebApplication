import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import {Link as RouterLink} from 'react-router-dom';

const NotFound = () => {
  return (
    
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
            <MoodBadIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sorry, this page does not exist!
          </Typography>
          <Link component={RouterLink} to="/home" variant="body2">
                  Take me back to Home
                </Link>
         
        </Box>

      </Container>
    
  );
};

export default NotFound;
