import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useDropzone} from 'react-dropzone';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import axios from "axios";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import {MainCategoryList,SubApparelList, SubElectronicsList, SubHousewareList} from '../utils/CategoryData';
import jwt_decode from "jwt-decode";

const theme = createTheme();

const img = {
  display: 'block',
  height: '100%',
  marginLeft: "auto",
  marginRight: "auto",
  
  
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CreateProduct() {
  
  const [files, setFiles] = useState([]);
  const [subCategories, setSubCategories] = useState(SubApparelList);
  const [open, setOpen] = useState(false);
  const [validateFile, setValidateFile] = useState(false);
  const navigate = useNavigate(); //navigate to new page after submit

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const token = localStorage.getItem("jwtToken");
  const userData = jwt_decode(token);

  const createBid = (data, productID) => {
    axios.post("http://localhost:5000/api/bid/create", { 
       headers: { 'Content-type': 'application/x-www-form-urlencoded', }, 
       startingPrice : Number(data.get("price")), 
       currentPrice: Number(data.get("price")),
       productID: productID.replace(/ /g, ''),
       sellerID: userData.id,
       buyerID: "None",   // initially there is no buyerID
       status: "available"
   })
       .then(res => {
           console.log(res);
           
       })
       .catch(err => console.log(err));
  }

  const handleSubmit = (event) => {
    //axios is a good middleware
    event.preventDefault();
    //get data
    if(files.length === 0){
      setValidateFile(true);
      return;
    }

    setValidateFile(false);

    const data = new FormData(event.currentTarget);
    const postData = new FormData();
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    postData.append("productName", data.get("title"));
    postData.append("productDesc", data.get("description"));
    postData.append("price", data.get("price"));
    postData.append("img", data.get("img"));
    postData.append("mainCategory", data.get("categories-select"));
    postData.append("subCategory", data.get("sub-categories-select"));
    postData.append("status", "available");//? status like sold or available
    postData.append("condition", data.get("condition-select"));
    postData.append("location", data.get("location"));
    postData.append("sellerID", userData.id);
    postData.append("postType", data.get("postType-select"));

    axios
      .post("http://localhost:5000/api/product/create",postData, config)
      .then(res => {
        if (data.get("postType-select") === "bid") {
          var productID = res.data.split(':')[1];
          createBid(data, productID);
        }
        setOpen(true);
        setTimeout(function(){
          navigate('/your-products');
        }, 1000);
        
      })
      .catch(err => console.log(err));


  };

  const handleSelectChange = (event) => {
    const selectedCategory = event.target.value;
    switch(selectedCategory){
      case "apparel":
        setSubCategories(SubApparelList);
      break;

      case "electronics":
        setSubCategories(SubElectronicsList);
      break;

      case "houseware":
        setSubCategories(SubHousewareList);
      break;

      default:
        setSubCategories(SubApparelList);
      
      
    }

  }

  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <ThemeProvider theme={theme}>
      
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />
      <Sidebar />

      <Container component="main" sx={{ flexGrow: 1, p: 4 }} >
      <Toolbar />
        <Typography variant="h5" pb={3}>
            Create New Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit} enctype="multipart/form-data" novalidate >

          <Grid container spacing={2}>

            <Grid item xs={6}>
              <InputLabel>Add or Drop Image of Product</InputLabel>
              <Box {...getRootProps({className: 'dropzone'})}  sx={{
              border: "dashed 0.1em",
              height: "10em",
              textAlign: "center",
              cursor: "pointer"
              }}>
               <input {...getInputProps()} name ="img" />
               <Box pt={8}><AddPhotoAlternateIcon /></Box>
              </Box>
            </Grid>

            <Grid item xs={6}>
            <InputLabel>Image Preview</InputLabel>
              <Box sx={{
              border: "solid 0.1em",
              height: "10em",
              }}>
               {/* <Typography  variant="body1" pt={8} >Image Preview</Typography> */}

                 {files.map((file) => (
                  <img
                  src={file.preview}
                  style={img}
                  alt={file.preview}
                    />
                  ))}
                
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="off"
                autoFocus
                inputProps={{ maxLength: 120 }}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>Price</InputLabel>
              <TextField
                required
                fullWidth
                type="number"
                id="price"
                name="price"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="postType-select">Post Type</InputLabel>
              <Select
                id="postType-select"
                name="postType-select"
                fullWidth
                required
                defaultValue = "sale"
              >
                <MenuItem value="sale">Sale</MenuItem>
                <MenuItem value="bid">Bid</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={6}>
              
            <InputLabel id="categories-select">Categories</InputLabel>
              <Select 
                id="categories-select"
                name="categories-select"
                required
                fullWidth
                onChange={handleSelectChange}
                defaultValue ={MainCategoryList[0].value}
              >   
                          
                {MainCategoryList.map((items, index) => (
                    <MenuItem key={index} value={items.value}>{items.categoryName}</MenuItem>
                ))}
                
              </Select>
            </Grid>

            <Grid item xs={6}>
              
            <InputLabel id="sub-categories-select">Sub Categories</InputLabel>
              <Select 
                id="sub-categories-select"
                name="sub-categories-select"
                fullWidth
                required
              >   

                {subCategories.map((items, index) => (
                    <MenuItem key={index} value={items.value}>{items.categoryName}</MenuItem>
                ))}
             
              </Select>
            </Grid>
            
            <Grid item xs={6}>
              <InputLabel id="condition-select">Condition</InputLabel>
              <Select 
                id="condition-select"
                name="condition-select"
                fullWidth
                required
              >  
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="used-new">Used - Like New</MenuItem>
                <MenuItem value="used-good">Used - Good</MenuItem>
                <MenuItem value="used-fair">Used - Fair</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={6}>
            <InputLabel>Location</InputLabel>
              <TextField
                required
                fullWidth
                id="location"
                name="location"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required  
                fullWidth
                id="description"
                label="Description"
                multiline
                rows={4}
                name="description"
                autoComplete="off"
            
              />
            </Grid>
      
          </Grid>
          <Stack direction="row" spacing={3} pt={2}>
            <Button
              type="submit"
              variant="contained"
            >
              Create
            </Button>

            {validateFile ? <Alert severity="error" sx={{ width: '50%' }}> Product must have an image!</Alert> : " " }
          </Stack>
        </Box> 
        
        <Snackbar
        open={open}     
        anchorOrigin={{horizontal:"bottom",vertical:"center"}}
        >
          <Alert severity="success" sx={{ width: '25%' }}>
            Product Created
          </Alert>

        </Snackbar>





      </Container>
    </Box>
    </ThemeProvider>
  );
}