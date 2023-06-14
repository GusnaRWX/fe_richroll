import React from 'react';
import { Grid } from '@mui/material';
import { Button } from '@/components/_shared/form';

export default function CreateBasicDetailComponent() {
    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={6} md={6} lg={6} xl={6}>p</Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}></Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}>p</Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}>p</Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}>p</Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}>p</Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}>p</Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}></Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}>p</Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}>p</Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}></Grid>
                <Grid item xs={6} md={6} lg={6} xl={6}>
                    <Button color='primary' label='Next' sx={{width:'63px'}}></Button>
                </Grid>
            </Grid>
        </>
    )
}
