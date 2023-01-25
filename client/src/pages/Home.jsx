import React, { useState,useEffect } from "react";
//import Products from '../components/Products';
import { TextField, Typography, Grid } from "@mui/material";
import Product from "../components/Product/Product";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import axios from "axios";

export default function Home() {
  
  // Filter data (used for search)
  const [filter, setfilter] = useState("");
  const [products, setProducts] = useState([]);

  const searchText = (event) => {
    setfilter(event.target.value);
  };

  let dataSearch = products.filter((item) => {
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

  const getAllProducts = () => {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    //config doesn't really matter
    axios.get("http://localhost:5000/api/product/all", config)
      .then(res =>{
        setProducts(res.data);
      })
        
      


  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
    <Header />
    <Sidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <Toolbar />
    {/* Page Header */}
      <Typography varient="h5" marginBottom="15px">
        Home Page
      </Typography>


    {/*Search Bar */}
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


    {/* Display Products*/}
      <div>
        <Grid container justify="center" spacing={4}>
          {dataSearch.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </div>

      </Box>
    </Box>
  );
}
