import React, { useState,useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Product from "../components/Product/Product";
import axios from "axios";

const theme = createTheme();

export default function Categories({maincategory, subcategories}) {

  const [filter, setfilter] = useState("");
  const [products, setProducts] = useState([]);

  const searchText = (event) => {
    setfilter(event.target.value);
  };

  const getAllMainCategoryProducts = () => {
    
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    
    const data = {mainCategory: maincategory.value}
    
    axios.get("http://localhost:5000/api/product/main-category",{params: data}, config)
      .then(res =>{
        setProducts(res.data);
        
      })
  };

  const filterSubCategory = (event) => {
    event.preventDefault();
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    
    const data = {subCategory: event.target.value}
    
    axios.get("http://localhost:5000/api/product/sub-category",{params: data}, config)
      .then(res =>{
        setProducts(res.data);
      })
  };

  const dataSearch = products.filter((item) => {
    return Object.keys(item).some((key) =>
      item["productDesc"]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase()) || 
      item["productName"]
        .toString()
        .toLowerCase()
        .includes(filter.toString().toLowerCase()) || 
      item["price"]
          .toString()
          .toLowerCase()
          .includes(filter.toString().toLowerCase())

    );
  });

  useEffect(() => {
    getAllMainCategoryProducts();
  }, [maincategory.value]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <Container component="main"  sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Typography variant="h5" pb={1} >
            {maincategory.categoryName}
          </Typography>

          <TextField
            margin="normal"
            fullWidth
            id="search"
            label="Search"
            name="serach"
            autoComplete="off"
            value={filter}
            onChange={searchText.bind(this)}
          />
          <Stack direction="row" spacing={3} pt={1} pb={2}>
          
            <Button size="large" variant="outlined" onClick={getAllMainCategoryProducts} value={maincategory.value}>All</Button>
            {subcategories.map((items) => (
              <Button size="large" variant="outlined" onClick={filterSubCategory} value={items.value}>{items.categoryName}</Button>
            ))}
            
          </Stack>

          <div>
            <Grid container justify="center" spacing={4}>
              {dataSearch.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <Product product={product} />
                </Grid>
              ))}
            </Grid>
          </div>

        </Container>
      </Box>
    </ThemeProvider>
  );
}