import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ItemSale(props) {

  return (
    
    <Paper sx={{ p: 2,maxWidth: 500, opacity: 0.8}}>
        <Grid container spacing={2}>
            <Grid item>
            <Box sx={{ width: 100, height: 100 }}>
                <Img alt="itemPic" src={props.itemImg} />
            </Box>
            </Grid>
            
            <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography variant="subtitle1" component="div">
                            <b>{props.itemName}</b>
                        </Typography>

                        <Typography variant="body2" gutterBottom>
                            <b>Description:</b> {props.itemDesc}
                        </Typography>

                        <Typography variant="subtitle1" component="div">
                            { props.itemType === "bid" ? <b>Bid: {props.itemPrice}</b>: <b>Price: {props.itemPrice}</b>} 
                        </Typography>
                    </Grid>
                    <Divider />
                    <Typography variant="subtitle2" component="div" sx={{ pl:2, pr:2, pt:2 }}>
                        <b>Post Type:</b> {props.itemType}
                     </Typography>
                    <Typography variant="subtitle2" component="div" sx={{ pl:2, pr:2,  }}>
                        <b>Sold For:</b> {props.itemSoldFor}
                    </Typography>
                </Grid>
                
                
            </Grid>
        </Grid>
    </Paper>
  );
}
