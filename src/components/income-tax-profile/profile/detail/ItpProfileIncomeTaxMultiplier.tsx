import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';

export default function ItpProfileIncomeTaxMultiplier(){
  const {t} = useTranslation();

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

  return(
    <>
      {(dummyObeject.map((data, i_data)=>{
        return(
          <>
            <Paper key={i_data} component='div' elevation={1} sx={{padding: '16px'}}>
              <Typography sx={{color: '#223567', fontWeight: 700, fontSize: '14px'}}>Component {i_data}</Typography>
              <Typography sx={{color: '#9CA3AF', fontWeight: 400, fontSize: '14px', marginTop: '16px'}}>
                {t('income_tax_profile.profile.detail.income_tax_multiplier.deductible_factor')}
              </Typography>
              <Typography sx={{color: '#4B5563', fontWeight: 400, fontSize: '14px', marginTop: '15px'}}>{data.DeductableFactor}</Typography>
              {(data.DeductableItem.map((item, i_item) => {
                return(
                  <>
                    <Grid key={i_item} container style={{marginTop: '19px'}}>
                      <Grid item xs={1} style={{display: 'flex', alignItems: 'center'}}>
                        <Typography sx={{color: '#4B5563)'}}>{item.action}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Box component='div'>
                          <Typography sx={{marginBottom: '6px', color: '#9CA3AF', fontSize: '14px', fontWeight: 400}}>
                            {t('income_tax_profile.profile.detail.income_tax_multiplier.factor_unit_condition')} {i_item + 1}
                          </Typography>
                          <Typography>{item.FactorUnitCondition}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={3}>
                        <Box component='div'>
                          <Typography sx={{marginBottom: '6px', color: '#9CA3AF', fontSize: '14px', fontWeight: 400}}>
                            {t('income_tax_profile.profile.detail.income_tax_multiplier.rate')}
                          </Typography>
                          <Typography>{item.Rate} %</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box component='div'>
                          <Typography sx={{marginBottom: '6px', color: '#9CA3AF', fontSize: '14px', fontWeight: 400}}>
                            {t('income_tax_profile.profile.detail.income_tax_multiplier.additional_fixed_amount')}
                          </Typography>
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