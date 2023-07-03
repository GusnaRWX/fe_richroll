import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function ItpProfileIncomeTaxMultiplier(){
  const dummyObeject = [{
    DeductableFactor: 'NPWP',
    DeductableItem: [
      {
        action: '=',
        FactorUnitCondition: 'Owner',
        Rate: '100',
        AdditionalFixed: 0,
      },
      {
        action: '>',
        FactorUnitCondition: 'Owner',
        Rate: '100',
        AdditionalFixed: 0,
      },
    ],
  }];
  console.log(dummyObeject);
  return(
    <>
      {(dummyObeject.map((data, i_data)=>{
        return(
          <>
            <Paper key={i_data} component='div' elevation={1} sx={{padding: '16px'}}>
              <Typography sx={{color: '#223567', fontWeight: 700, fontSize: '14px'}}>Component {i_data}</Typography>
              <Typography sx={{color: '#9CA3AF', fontWeight: 400, fontSize: '14px', marginTop: '16px'}}>Deductible Factor</Typography>
              <Typography sx={{color: '#4B5563', fontWeight: 400, fontSize: '14px', marginTop: '15px'}}>{data.DeductableFactor}</Typography>
              {(data.DeductableItem.map((item, i_item)=>{
                return(
                  <>
                    <Grid key={i_item} container style={{marginTop: '19px'}}>
                      <Grid item xs={1} style={{display: 'flex', alignItems: 'center'}}>
                        <Typography sx={{color: '#4B5563)'}}>{item.action}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Box component='div'>
                          <Typography sx={{marginBottom: '6px', color: '#9CA3AF', fontSize: '14px', fontWeight: 400}}>Factor Unit Condition 1</Typography>
                          <Typography>{item.FactorUnitCondition}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={3}>
                        <Box component='div'>
                          <Typography sx={{marginBottom: '6px', color: '#9CA3AF', fontSize: '14px', fontWeight: 400}}>Rate</Typography>
                          <Typography>{item.Rate} %</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box component='div'>
                          <Typography sx={{marginBottom: '6px', color: '#9CA3AF', fontSize: '14px', fontWeight: 400}}>Additional Fixed Amount</Typography>
                          <Typography>Rp.{item.AdditionalFixed}</Typography>
                        </Box>
                      </Grid>
                    </Grid>

                  </>
                );
              }))}

            </Paper>
          </>
        );
      }))}
    </>
  );
}