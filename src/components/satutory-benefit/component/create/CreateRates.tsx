import React, { useState } from 'react';
import { Input } from '@/components/_shared/form';
import { Text, Card } from '@/components/_shared/common';
import { Theme, useTheme, styled } from '@mui/material/styles';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {
  MenuItem,
  Icon,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
} from '@mui/material';
import { useRouter } from 'next/router';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const rates = ['6,0', '7,0', '8,0', '9,0', '10,0'];

export default function CreateRates() {
  const [rateValue, setRateValue] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof rateValue>) => {
    const {
      target: { value },
    } = event;
    setRateValue(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <>
      <Text
        title='Contributor'
        mb='8px'
        color='grey.700'
        fontWeight='400'
        sx={{ display: 'block' }}
      />
      <FormGroup sx={{ display: 'inline', bgcolor: 'red' }}>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label='Employee'
        />
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label='Employer'
          sx={{ ml: '50px' }}
        />
      </FormGroup>
      <Text
        title='Rates'
        mt='40px'
        mb='30px'
        color='#223567'
        fontWeight='700'
        sx={{ display: 'block' }}
      />
      <Card sx={{ paddingY: '20px' }}>
        <Grid
          container
          sx={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Grid item sx={{ display: 'flex', alignItems: 'end' }}>
            <RemoveIcon
              sx={{
                color: '#B91C1C',
                bgcolor: '#FEE2E2',
                borderRadius: '5px',
                width: '32px',
                height: '32px',
                padding: '8px',
                mr: '15px',
                mb: '5px',
              }}
            />
            <Grid item>
              <Text title='Start' />
              <Input
                placeholder='Rp 1.000.000'
                size='small'
                sx={{
                  width: '250px',
                  color: 'black',
                  mt: '5px',
                }}
              />
            </Grid>
          </Grid>
          <Grid item sx={{ display: 'flex', alignItems: 'end' }}>
            <RemoveIcon
              sx={{
                mb: '10px',
              }}
            />
          </Grid>
          <Grid item sx={{ display: 'flex', alignItems: 'end' }}>
            <Grid item>
              <Text title='End' />
              <Input
                placeholder='Rp 1.000.000'
                size='small'
                sx={{ width: '250px', color: 'black', mt: '5px' }}
              />
            </Grid>
            <AddIcon
              sx={{
                color: 'white',
                bgcolor: '#8DD0B8',
                borderRadius: '5px',
                width: '32px',
                height: '32px',
                padding: '8px',
                ml: '15px',
                mb: '5px',
              }}
            />
          </Grid>
          <Grid item sx={{ display: 'flex', alignItems: 'end' }}>
            <Grid item>
              <Text title='Rate' />
              <FormControl sx={{ mt: '5px' }}>
                <Select
                  displayEmpty
                  value={rateValue}
                  onChange={handleChange}
                  size='small'
                  inputProps={{ 'aria-label': 'Without label' }}
                  endAdornment={
                    <InputAdornment position='end' sx={{ mr: '20px' }}>
                      %
                    </InputAdornment>
                  }
                >
                  <MenuItem value=''>5,0</MenuItem>
                  {rates.map((rate) => (
                    <MenuItem key={rate} value={rate}>
                      {rate}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item sx={{ display: 'flex', alignItems: 'end' }}>
            <Grid item>
              <Text title='Additional Fixed Amount' />
              <FormControl variant='outlined' sx={{ mt: '5px' }}>
                <OutlinedInput
                  placeholder='Rp 0'
                  id='outlined-adornment-weight'
                  endAdornment={
                    <InputAdornment position='end'>IDR</InputAdornment>
                  }
                  size='small'
                  aria-describedby='outlined-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: 'flex-end', mt: '10px' }}
        >
          <Grid item sx={{ display: 'flex', alignItems: 'end' }}>
            <Grid item>
              <Text title='Amount Cap' />
              <FormControl variant='outlined' sx={{ mt: '5px' }}>
                <OutlinedInput
                  placeholder='Rp 0'
                  id='outlined-adornment-weight'
                  endAdornment={
                    <InputAdornment position='end'>IDR</InputAdornment>
                  }
                  size='small'
                  aria-describedby='outlined-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'flex-end', mt: '30px', gap: '15px' }}
      >
        <Button
          sx={{ boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.5)', color: '#374151' }}
        >
          Back
        </Button>
        <Button
          sx={{ boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.5)' }}
          variant='contained'
        >
          Save
        </Button>
      </Grid>
    </>
  );
}
