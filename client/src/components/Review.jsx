import * as React from 'react';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Paper } from '@mui/material';
import { Rating } from '@mui/material';

export default function Review(props) {
    return (
        <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
                <Grid lg={8} md={8}>
                    <Typography variant="h6">
                        {props.username}
                    </Typography>
                </Grid>
                <Grid lg={4}>
                    <Rating name="read-only" value={props.rating} readOnly />
                </Grid>
                <Grid lg={12}>
                    <Typography>
                        {props.review}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );

}