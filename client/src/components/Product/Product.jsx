import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import MessageIcon from '@mui/icons-material/Message';
import GavelIcon from '@mui/icons-material/Gavel';
import { Link } from 'react-router-dom';
import usesStyles from './styles';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Product = ({ product }) => {

    const navigate = useNavigate();
    const classes = usesStyles();
    const token = localStorage.getItem("jwtToken");
    const userData = jwt_decode(token);
  

    const priceFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const createConversation = async (e) => {
        //e.preventDefault();
        const conversation = {
            senderId: userData.id,
            productId: product._id,
            sellerId: product.sellerID,
            productName: product.productName,
            productUserId: product._id+userData.id
        };

        try {
            const res = await axios.post("http://localhost:5000/api/conversations/", conversation);
            navigate('/chat')
        } catch (err) {
            navigate('/chat')
            console.log(err);
        }
    };

    const productName_limited = (productName) => {
        if (productName.length > 20) {
            productName = productName.substring(0,19) + "...";
        }
        return productName;
    } 

    return (

        <Card className={classes.root} >
            <Link to={"/product/" + product._id} style={{ textDecoration: 'none' }}>
                <CardMedia className={classes.media} alt="product image" image={"http://localhost:5000/uploads/" + product.img} title={product.productName} />
                <CardContent>
                    <div className={classes.cardContent}>

                        <Typography varient="h5" gutterBottom>
                            {productName_limited(product.productName)}
                        </Typography>
                        <Typography varient="h5">
                            {priceFormat.format(product.price)}
                        </Typography>

                    </div>

                    <Typography noWrap variant="body2" color="textSecondary" fontSize='12px'>
                        {product.productDesc} 
                    </Typography>

                </CardContent>
            </Link>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Card">
                    { product.postType ==='bid' ? <GavelIcon /> : <AddShoppingCart /> }
                </IconButton>
                {(() => {
                if(userData.id !== product.sellerID) {
                    return(
                <IconButton aria-label="Add to Card" onClick={createConversation}>
                    <MessageIcon />
                </IconButton>
                    )
                }
            })()}
            </CardActions>

        </Card>

    )
}

export default Product