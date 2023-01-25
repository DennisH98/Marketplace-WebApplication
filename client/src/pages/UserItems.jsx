import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ItemSale from '../components/ItemSale';
import ItemSold from '../components/ItemSold';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import jwt_decode from "jwt-decode";
import axios from "axios";

const theme = createTheme();

export default function UserItems() {
  //two arrays, one for available products and one for sold
  const [availableProducts, setAvailableProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);

  const priceFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const getAllUserProducts = () => {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const token = localStorage.getItem("jwtToken");
    const userData = jwt_decode(token);
    const data = { sellerID: userData.id };

    axios.get("http://localhost:5000/api/product/user-products", { params: data }, config)
      .then(res => {
        //setAllProducts(res.data);
        const availItems = [];
        const soldItems = [];
        res.data.forEach(element => {

          if (element.status === "available") {
            availItems.push(element);
          } else if (element.status === "sold") {
            soldItems.push(element);
          }
        });
        setAvailableProducts(availItems);
        setSoldProducts(soldItems);
      })

  };

  useEffect(() => {
    getAllUserProducts();

  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Typography variant="h5" pb={2} >
            Your Postings
          </Typography>
          <Grid container justify="center" spacing={2} pb={3}>
            {availableProducts.map((product, index) => (
              <Grid item key={index} xs={4}>
                <ItemSale
                  itemName={product.productName}
                  itemDesc={product.productDesc}
                  itemPrice={priceFormat.format(product.price)}
                  itemBid='4'
                  itemLink={'/product/' + product._id}
                  itemType={product.postType}
                  itemImg={"http://localhost:5000/uploads/" + product.img} />
              </Grid>
            ))}
          </Grid>

          <Divider />
          <Typography variant="h5" pt={2} pb={2}>
            Products Sold
          </Typography>
          <Grid container justify="center" spacing={2} pb={3}>

            {soldProducts.map((product, index) => (
              <Grid item key={index} xs={4}>
                <ItemSold
                  itemName={product.productName}
                  itemDesc={product.productDesc}
                  itemPrice={priceFormat.format(product.price)}
                  itemType={product.postType}
                  itemSoldFor={priceFormat.format(product.price)}
                  itemImg={"http://localhost:5000/uploads/" + product.img} />
              </Grid>
            ))}

          </Grid>

        </Container>
      </Box>
    </ThemeProvider>
  );
}
