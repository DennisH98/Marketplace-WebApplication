import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Link } from '@mui/material';
import Grid from '@mui/material/Grid';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function ItemSale(props) {

    const productName_limited = (productName) => {
        if (productName.length > 20) {
            productName = productName.substring(0,19) + "...";
        }
        return productName;
    } 

    return (
        
        <Paper sx={{ p: 2 }} lg={4}>
            <Link href={props.itemLink} style={{ textDecoration: 'none' }}>

                <Box sx={{ width: 100, height: 100 }}>
                    <Img alt="itemPic" src={props.itemImg} />
                </Box>

                <Typography variant="subtitle1" component="div">
                    <b>{productName_limited(props.itemName)}</b>
                </Typography>

                <Typography noWrap variant="body2" gutterBottom>
                    <b>Description:</b> {props.itemDesc}
                </Typography>

                <Typography variant="subtitle1" component="div">
                    <b>Price:</b> {props.itemPrice}
                </Typography>

                <Divider />
                <Typography variant="subtitle2" component="div" sx={{ p:2 }}>
                        <b>Post Type:</b> {props.itemType}
                </Typography>

            </Link>

        </Paper>

    );
}
