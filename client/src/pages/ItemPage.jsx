import * as React from 'react';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Link } from '@mui/material';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function ViewProduct() {
    const [product, setProduct] = useState('');
    const [bid, setBid] = useState('');
    const [currentPrice, setCurrentPrice] = useState(product.price);
    const [seller, setSeller] = useState('');
    const token = localStorage.getItem("jwtToken");
    const userData = jwt_decode(token);
    const navigate = useNavigate();

    // Get the id of the product using website url
   const { id } = useParams();
    
    var getProduct = (id) => {
        const config = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };
        axios.get("http://localhost:5000/api/product/"+id, config)
            .then(res =>{
                setProduct({
                    productName: res.data.productName,
                    productDesc: res.data.productDesc,
                    price: res.data.price,
                    img: res.data.img,
                    mainCategory: res.data.mainCategory,
                    subCategory: res.data.subCategory,
                    status: res.data.status,
                    condition: res.data.condition,
                    location: res.data.location,
                    sellerID: res.data.sellerID,
                    postType: res.data.postType
                });
                setCurrentPrice(res.data.price);
                if (res.data.postType === "bid") {
                    getBid(id);

                }
            })
    };   

    const getUser = (id) =>{
        const config = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };
        axios.get("http://localhost:5000/api/profile/" + id, config)
            .then(res =>{
                setSeller(res.data.username);
            })
    }

    useEffect(() => {
        getProduct(id);
        getUser();
    }, []);

    var getBid = (productID) => {
        const config = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };
        axios.get("http://localhost:5000/api/bid/" + productID, config)
            .then(res =>{
                setBid({
                    startingPrice: res.data.startingPrice,
                    currentPrice: res.data.currentPrice,
                    productID: res.data.productID,
                    sellerID: res.data.sellerID,
                    buyerID: res.data.buyerID,
                    status: res.data.status
                });
            })
    };

    
    const createConversation = async (e) => {
        //e.preventDefault();
        const conversation = {
            senderId: userData.id,
            productId: id,
            sellerId: product.sellerID,
            productName: product.productName,
            productUserId: id+userData.id
        };

        try {
            const res = await axios.post("http://localhost:5000/api/conversations/", conversation);
            navigate('/chat')
        } catch (err) {
            navigate('/chat')
            console.log(err);
        }
    };
    
    function BidSystem(props) {
        const [bidValue, setBidValue] = useState('')    // user-entered new bid price

        const updateBid = (productID) => {
            axios.put("http://localhost:5000/api/bid/update/"+productID, { 
                headers: { 'Content-type': 'application/x-www-form-urlencoded', }, 
                startingPrice : Number(bid.startingPrice), 
                currentPrice: Number(bidValue),
                productID: id,
                sellerID: bid.sellerID,
                buyerID: "To be defined",
                status: bid.status
            })
                .then(res => {
                    console.log(res);
                    
                })
                .catch(err => console.log(err.response.data));
        }
        
        return (
            <Box sx={{marginTop: '60px', textAlign: 'right' }}>
                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p style={{marginRight: '7px', fontSize: '20px'}}>$ </p>
                    <TextField value={bidValue}
                        id="bid_amount" label="Enter Bid Amount" variant="outlined"
                        onChange={(e) => setBidValue(e.target.value)}  />
                </Box>
                <p style={{marginTop: '-10px', fontSize: '15px'}}>
                    Enter <b>${Number(bid.currentPrice)+1}</b> or greater</p>
                <Button variant="contained" 
                    onClick={() => {
                        if (Number(bidValue) <= Number(bid.currentPrice)) {
                            alert('Amount should be greater than $' + bid.currentPrice);
                        } else {
                            setCurrentPrice(bidValue);
                            updateBid(id);
                            alert('Bid is place with value of $' + bidValue);
                            window.location.reload(false);
                        }
                    }}
                    sx={{marginTop: 1, marginBottom: 8}}>Place Bid</Button>
            </Box>
        );
    }
    
    function ItemAction(props) {
        const postType = props.postType;
        if (postType === "bid") { // Place Bid action
            return <BidSystem currentPrice={props.price}/>
        } 
        // Add to cart action
        return <Button 
                    onClick={() => {
                        alert('Item added to cart');
                    }}
                    variant="contained"
                    sx={{marginTop: '60px', marginLeft: '325px'}}>Add to cart</Button>
    }


    function Product(props) {
        return (
            <Box sx={{display: 'flex', alignItems: 'center', marginLeft: '40px'}}>
                <Box className="description">

                    {props.postType === "bid" &&
                    <Typography variant="h4" sx={{marginTop: '-170px'}}>
                        {props.name}
                    </Typography>
                    }
                    {props.postType !== "bid" &&
                    <Typography variant="h4" sx={{marginTop: '15px'}}>
                        {props.name}
                    </Typography>
                    }

                    <Typography variant="body2" sx={{marginTop: 2}}>
                        <b>{props.mainCategory}/{props.subCategory}</b>
                    </Typography>
                    <Typography variant="body2" sx={{marginBottom: 3}}>
                        Posted by <Link href={'/profile/'+seller}>{getUser(props.sellerID)}{seller}</Link>
                    </Typography>
    
                    {props.postType === "bid" &&
                        <b>Current price:</b>
                    }
                    {props.postType !== "bid" &&
                        <b>Price:</b>
                    }

                    {props.postType === "bid" &&
                        <Typography variant="h5">
                            ${bid.currentPrice}
                        </Typography>
                    }
                    {props.postType !== "bid" &&
                        <Typography variant="h5">
                            ${props.price}
                        </Typography>
                    }
    
                    <Typography variant="body1" sx={{marginTop: 3, width: 500, marginRight: '100px'}}>
                        <b>Description:</b>
                        <br></br>
                        {props.description}
                    </Typography>
                    <Typography variant="body1" sx={{marginTop: 1.5}}>
                        <b>Condition:</b>
                        <br></br>
                        {props.condition}
                    </Typography>
                    <Typography variant="body1" sx={{marginTop: 1.5}}>
                        <b>Location:</b>
                        <br></br>
                        {props.location}
                    </Typography>


                </Box>
    
                <Box className="image" sx={{marginLeft: '50px'}}>
                    <img alt="product_img" src={"http://localhost:5000/uploads/"+ props.img} style={{marginTop: '50px', maxWidth: '450px', maxHeight: '450px'}}/>
                    
                    <ItemAction postType={props.postType} price={props.price}/>
                    {(() => {
                    if(userData.id !== product.sellerID) {
                        return(
                            <Button 
                                onClick={createConversation}
                                variant="contained"
                                sx={{marginTop: '20px', marginLeft: '310px'}}>Send Message
                            </Button>
                        )
                    }
                    })()}
                    
                </Box>
            
            </Box>
        );
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}> 
                <CssBaseline />
                <Header />
                <Sidebar />
                <Container component="product" sx={{ flexGrow: 1 }}  >
                    <Toolbar />
                    <Product name={product.productName}
                        img={product.img}
                        mainCategory={product.mainCategory}
                        subCategory={product.subCategory}
                        price={product.price}
                        location={product.location}
                        description={product.productDesc}
                        postType={product.postType}
                        condition={product.condition}
                        sellerID={product.sellerID}/>
                    
                </Container>
            </Box>
        </ThemeProvider>
      );
    
  }