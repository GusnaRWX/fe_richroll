import React from 'react';
import { Typography, Box, Grid, FormControl, Select, MenuItem } from '@mui/material';
import { Input } from '@/components/_shared/form';
import {styled as MuiStyled} from '@mui/material/styles';

const AsteriskComponent = MuiStyled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

function EmergencyContactEdit() {
  return (
    <>
      <Box sx={{ marginBottom: '3rem' }}>
        <Typography component='h3' fontSize={18} color='primary'>Emergency Contact</Typography>
      </Box>
      <form>
        <Box sx={{ marginBottom: '3rem', width:'100%' }}>
          <Typography component='h3' fontSize={18} color='primary'>Primary</Typography>
          <Grid container spacing={2} sx={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Input
                name='fullnamePrimary'
                customLabel='Full Name'
                withAsterisk={true}
                size='small'
                placeholder='Input Full Name'
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <FormControl fullWidth>
                <Typography>Relationship</Typography>
                <Select
                  fullWidth
                  variant='outlined'
                  size='small'
                  name='relationPrimay'
                >
                  <MenuItem value='Marketing'>Family</MenuItem>
                  <MenuItem value='Management'>Friend</MenuItem>
                  <MenuItem value='Finance'>Parent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem' }}>
              <Typography>Contact Number<AsteriskComponent>*</AsteriskComponent></Typography>
              <Grid container spacing={2}>
                <Grid item xs={1} sm={3} md={2} lg={2} xl={2} spacing={2}>
                  <Select
                    variant='outlined'
                    size='small'
                    fullWidth
                    name='phoneNumberPrefixPrimary'
                    MenuProps={{ disableAutoFocus: true }}
                    sx={{
                      backgroundColor: '#D9EFE7',
                      border: '1px solid #D9EFE7',
                      borderRadius: '9999px',
                      marginRight: '12px'
                    }}
                  >
                    <MenuItem value='+62'>+62</MenuItem>
                    <MenuItem value='+44'>+44</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9} xl={10} alignSelf='flex-end'>
                  <Input
                    name='phoneNumberPrimary'
                    placeholder='Input Correct Number'
                    withAsterisk={true}
                    size='small'
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{  marginBottom: '3rem', width:'100%' }}>
          <Typography component='h3' fontSize={18} color='primary'>Secondary</Typography>
          <Grid  container spacing={2} sx={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Input
                name='fullnameSecondary'
                customLabel='Full Name'
                withAsterisk={true}
                size='small'
                placeholder='Input Full Name'
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <FormControl fullWidth>
                <Typography>Relationship</Typography>
                <Select
                  fullWidth
                  variant='outlined'
                  size='small'
                  name='relationSecondary'
                >
                  <MenuItem value='Marketing'>Family</MenuItem>
                  <MenuItem value='Management'>Friend</MenuItem>
                  <MenuItem value='Finance'>Parent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem' }}>
              <Typography>Contact Number<AsteriskComponent>*</AsteriskComponent></Typography>
              <Grid container spacing={2} >
                <Grid item xs={1} sm={3} md={2} lg={2} xl={2} spacing={2}>
                  <Select
                    variant='outlined'
                    size='small'
                    fullWidth
                    name='phoneNumberPrefixSecondary'
                    MenuProps={{ disableAutoFocus: true }}
                    sx={{
                      backgroundColor: '#D9EFE7',
                      border: '1px solid #D9EFE7',
                      borderRadius: '9999px',
                      marginRight: '12px'
                    }}
                  >
                    <MenuItem value='+62'>+62</MenuItem>
                    <MenuItem value='+44'>+44</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9} xl={10} alignSelf='flex-end'>
                  <Input
                    name='phoneNumberSecondary'
                    placeholder='Input Correct Number'
                    withAsterisk={true}
                    size='small'
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

      </form>
    </>
  );
}

export default EmergencyContactEdit;