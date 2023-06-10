import { Text } from '@/components/_shared/common';
import { Box, Grid, Chip } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import { Image as AssetsImage } from '@/utils/assetsConstant';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const PersonalInformationTabComponent = () => {
  return (
    <>
      <Box
        id='employe-information'
      >
        <Text
          title='Employee Information'
          color='primary.500'
          fontWeight={700}
          fontSize='18px'
        />
        <Box mt='16px'>
          <Text
            title='Employee Photo'
            fontWeight={400}
            color='primary.700'
            fontSize='14px'
            mb='4px'
          />
          <Image
            src={AssetsImage.EXAMPLE_EMPLOYE}
            alt='current-user'
            width={102}
            height={153}
          />
        </Box>
        <Grid container rowGap={3}>
          <Grid item md={6}>
            <Text title='Full Name' fontWeight={400} color='grey.400' fontSize='14px' />
            <Text title='Ratna Sari' fontWeight={400} color='grey.600' fontSize='14px' />
          </Grid>
          <Grid item md={6}>
            <Text title='Nickname' fontWeight={400} color='grey.400' fontSize='14px' />
            <Text title='Ratna' fontWeight={400} color='grey.600' fontSize='14px' />
          </Grid>
          <Grid item md={6}>
            <Text title='Contact Number' fontWeight={400} color='grey.400' fontSize='14px' />
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: '18px'
            }}>
              <Chip
                size='medium'
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }
                  } >
                    <Text title='+62' />
                    <KeyboardArrowDownIcon fontSize='small' />
                  </Box>
                }
              />
              <Text title='8123456890' />
            </Box>
          </Grid >
          <Grid item md={6}>
            <Text title='Personal Email Address' fontWeight={400} color='grey.400' fontSize='14px' />
            <Text title='ratna@gmail.com' fontWeight={400} color='grey.600' fontSize='14px' />
          </Grid>
          <Grid item md={6}>
            <Text title='Start Date' fontWeight={400} color='grey.400' fontSize='14px' />
            <Text title='07/10/2020' fontWeight={400} color='grey.600' fontSize='14px' />
          </Grid>
          <Grid item md={6}>
            <Text title='End Date' fontWeight={400} color='grey.400' fontSize='14px' />
            <Text title='07/10/2020' fontWeight={400} color='grey.600' fontSize='14px' />
          </Grid>
          <Grid item md={6}>
            <Text title='Department' fontWeight={400} color='grey.400' fontSize='14px' />
            <Text title='Manajer' fontWeight={400} color='grey.600' fontSize='14px' />
          </Grid>
          <Grid item md={6}>
            <Text title='Position' fontWeight={400} color='grey.400' fontSize='14px' />
            <Text title='Asisten Manager' fontWeight={400} color='grey.600' fontSize='14px' />
          </Grid>
        </Grid >
      </Box>
      <Box
        id='compensation-benefits'
        mt='24px'
      >
        <Text
          title='Compensation and Benefit'
          color='primary.500'
          fontWeight={700}
          fontSize='16px'
          mb='16px'
        />
        <Grid container>
          <Grid item md={6}>
            <Text
              title='Base'
              color='primary.500'
              fontWeight={700}
              fontSize='16px'
            />
            <Grid container alignItems='center' mt='16px'>
              <Grid item md={4}>
                <Text
                  title='Salary'
                  fontSize='14px'
                  fontWeight={700}
                  color='primary.700'
                />
              </Grid>
              <Grid item md={4}>
                <Text
                  title='Amount'
                  mb='14px'
                  fontSize='14px'
                  fontWeight={400}
                  color='grey.400'
                />
                <Text
                  title='Rp. 500.000 IDR'
                  fontSize='14px'
                  fontWeight={400}
                  color='grey.700'
                />
              </Grid>
              <Grid item md={4}>
                <Text
                  title='Per Month'
                  fontSize='14px'
                  fontWeight={400}
                  color='grey.700'
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6}>
            <Text
              title='Supplementary'
              color='primary.500'
              fontWeight={700}
              fontSize='16px'
            />
            <Grid container alignItems='center' mt='16px'>
              <Grid item md={4}>
                <Text
                  title='Transportation Allowance'
                  fontSize='14px'
                  fontWeight={700}
                  color='primary.700'
                />
              </Grid>
              <Grid item md={4}>
                <Text
                  title='Amount'
                  mb='14px'
                  fontSize='14px'
                  fontWeight={400}
                  color='grey.400'
                />
                <Text
                  title='Rp. 500.000 IDR'
                  fontSize='14px'
                  fontWeight={400}
                  color='grey.700'
                />
              </Grid>
              <Grid item md={4}>
                <Text
                  title='Per Month'
                  fontSize='14px'
                  fontWeight={400}
                  color='grey.700'
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PersonalInformationTabComponent;