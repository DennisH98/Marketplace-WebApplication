import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

const theme = createTheme();

const img = {
  display: 'block',
  height: '100%',
  width: '100%'

  
};

export default function Cart() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Typography variant="h5" pb={1} >
            My Cart
          </Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Remove</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Box sx={{ display:"flex"}}> 
                      <Box sx={{ width:"10em", height:"5em" }}>
                      <img alt="product image" src="http://localhost:5000/uploads/test-tshirt.jpg" style={img} />
                      </Box>
                      <Box sx={{ display:"flex", flexDirection: 'column', }}>
                        <Typography variant="h6">
                          A tshirt
                        </Typography>
                        <Typography variant="body2">
                          This is an example tshirt
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">1</TableCell>
                  <TableCell align="right"><DeleteIcon /></TableCell>
                  <TableCell align="right">$100</TableCell>
                </TableRow>
          
              </TableBody>
            </Table>
         </TableContainer>
          
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant='contained' sx={{margin:1}}>
              Empty Cart
          </Button>
          <Button variant='contained'sx={{margin:1}}>
              Checkout
          </Button>
        </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}