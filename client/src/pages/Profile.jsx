import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Toolbar from '@mui/material/Toolbar';
import Review from '../components/Review';
import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router';
import axios from 'axios'
import { TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ItemSale from '../components/ItemSale';
import ItemSold from '../components/ItemSold';
import { Rating } from '@mui/material';
import { Divider } from '@mui/material';
import { Link } from '@mui/material';

const theme = createTheme();

/*
var reviews = [
  { username: "Alex", review: "Terrible Seller", rating: 1 },
  { username: "John", review: "Didnt respond to messages on time and I wasn't even sure if they were going to show up to the meeting place. Luckily they did", rating: 2 },
  { username: "Ryan", review: "", rating: 1 }
]
*/

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

export default function Profile() {
  let { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState({});
  const [availableProducts, setAvailableProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [rating, setRating] = useState(0);

  const priceFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const getProfile = (id) => {
    const config = {
      headers: {
        Accept: 'application/json'
      },
    };
    axios.get('http://localhost:5000/api/profile/find/:id', { params: id }, config)
      .then(res => {
        setProfile(res.data);
      })
      .catch(err => console.log(err.response));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const postData = {
      "reviewerID": data.get('name'),
      "revieweeID": data.get('reviewee'),
      "rating": data.get('rating'),
      "review": data.get('review')
    }
    const config = {
      headers: {
        Accept: 'application/json'
      },
    };

    axios
      .post("http://localhost:5000/api/review/create", postData, config)
      .then(res => {
        getReviews({ id });
        setOpen(true);
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      })
      .catch(err => console.log(err.response));

  }

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

  const getAllUserProducts = () => {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    axios.get("http://localhost:5000/api/product/other-products", { params: id }, config)
      .then(res => {
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
    getProfile({ id });
    getReviews({ id });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Sidebar />
        {profile.length === 0 ? <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, p: 6 }}><h1>Profile doesn't exist</h1></Container> :
          <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Box>
              <Grid item lg={12}>
                <h1>Welcome to {id}'s profile!</h1>
              </Grid>
              <Typography variant="h5">Available Sales</Typography>
              <Grid container justify="center" spacing={2} pb={3}>
                {availableProducts.map((product, index) => (
                  <Grid item key={index} xs={4}>
                    <ItemSale
                      itemName={product.productName}
                      itemDesc={product.productDesc}
                      itemPrice={priceFormat.format(product.price)}
                      itemBid='4'
                      itemLink={'/product/' + product._id}
                      itemImg={"http://localhost:5000/uploads/" + product.img} />
                  </Grid>
                ))}
              </Grid>
              <Divider />
              <Typography variant="h5">Previous Sales</Typography>
              <Grid container justify="center" spacing={2} pb={3}>
                {soldProducts.map((product, index) => (
                  <Grid item key={index} xs={4}>
                    <ItemSold
                      itemName={product.productName}
                      itemDesc={product.productDesc}
                      itemPrice={priceFormat.format(product.price)}
                      itemBid='4'
                      itemImg={"http://localhost:5000/uploads/" + product.img} />
                  </Grid>
                ))}
              </Grid>
              <Divider />
              <Typography variant='h5'>Write a review for {id}</Typography>
              <Box component="form" onSubmit={handleSubmit} enctype="multipart/form-data" novalidate >

                <Grid container spacing={2}>

                  <Grid item key="name_field" xs={6}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="off"
                      autoFocus
                    />
                  </Grid>
                  <Grid item key="rating_field" xs={6}>
                    <Rating
                      name="rating"
                      label="Rating"
                      id="rating"
                      value={rating}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                    />
                  </Grid>

                  <Grid item key="review_field" xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="review"
                      label="Review"
                      multiline
                      rows={4}
                      name="review"
                      autoComplete="off"
                      autoFocus
                    />
                  </Grid>
                  <Grid>
                    <TextField field="hiddenFieldName" style={{ display: 'none' }}
                      id='reviewee'
                      label='Reviewee'
                      name='reviewee'
                      value={id}
                    >

                    </TextField>
                  </Grid>

                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit Review
                </Button>
              </Box>

              {/*Loads Reviews */}
              <Typography variant="h5">Reviews</Typography>
              <Grid container justify="center" spacing={2} pb={3}>
                {reviews.map((review) => (
                  <Grid item lg={6} md={6}>
                    <Review username={review.reviewerID} review={review.review} rating={review.rating} />
                  </Grid>
                ))}
              </Grid>

            </Box>
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
              }}
            >
            </Box>


            <Snackbar
              open={open}
              anchorOrigin={{ horizontal: "bottom", vertical: "center" }}
            >
              <Alert severity="success" sx={{ width: '25%' }}>
                Review Posted
              </Alert>
            </Snackbar>
          </Container>
        }
      </Box>

    </ThemeProvider>
  );
}