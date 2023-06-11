import { Text } from '@/components/_shared/common';
import { Box, Grid, Chip } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import { Image as AssetsImage } from '@/utils/assetsConstant';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAppSelectors } from '@/hooks/index';
import { ifThenElse } from '@/utils/helper';
import dayjs from 'dayjs';

const PersonalInformationTabComponent = () => {
  const { detailInformation, detailCnb } = useAppSelectors((state) => state.employment);
  const phoneNumberPrefix = ifThenElse(typeof detailInformation.phoneNumber !== 'undefined', detailInformation?.phoneNumber?.split('')?.slice(0, 3).join(''), '');
  const phoneNumber = ifThenElse(typeof detailInformation.phoneNumber !== 'undefined', detailInformation?.phoneNumber?.slice(3), '');
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
            src={detailInformation?.picture !== null ? detailInformation?.picture : AssetsImage.EXAMPLE_EMPLOYE}
            alt='current-user'
            width={102}
            height={153}
          />
        </Box>
        <Grid container rowGap={3}>
          <Grid item md={6}>
            <Text title='Full Name' fontWeight={400} color='grey.400' fontSize='14px' />
            <Text title={detailInformation?.fullName} fontWeight={400} color='grey.600' fontSize='14px' />
          </Grid>
          <Grid item md={6}>
            <Text title='Nickname' fontWeight={400} color='grey.400' fontSize='14px' />
            <Text title={detailInformation?.nickname} fontWeight={400} color='grey.600' fontSize='14px' />
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
                    <Text title={phoneNumberPrefix} />
                    <KeyboardArrowDownIcon fontSize='small' />
                  </Box>
                }
              />
              <Text title={phoneNumber} />
            </Box>
          </Grid >
          <Grid item md={6}>
            <Text title='Personal Email Address' fontWeight={400} color='grey.400' fontSize='14px' />
            <Text title={detailInformation?.email} fontWeight={400} color='grey.600' fontSize='14px' />
          </Grid>
          <Grid item md={6}>
            <Text title='Start Date' fontWeight={400} color='grey.400' fontSize='14px' />
            <Text title={dayjs(detailInformation?.startDate).format('DD/MM/YYYY')} fontWeight={400} color='grey.600' fontSize='14px' />
          </Grid>
          <Grid item md={6}>
            <Text title='End Date' fontWeight={400} color='grey.400' fontSize='14px' />
            <Text title={detailInformation?.endDate === null ? '-' : dayjs(detailInformation?.endDate).format('YYYY/MM/DD')} fontWeight={400} color='grey.600' fontSize='14px' />
          </Grid>
          <Grid item md={6}>
            <Text title='Department' fontWeight={400} color='grey.400' fontSize='14px' />
            <Text title={detailInformation?.department} fontWeight={400} color='grey.600' fontSize='14px' />
          </Grid>
          <Grid item md={6}>
            <Text title='Position' fontWeight={400} color='grey.400' fontSize='14px' />
            <Text title={detailInformation?.position} fontWeight={400} color='grey.600' fontSize='14px' />
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
        {
          ifThenElse(detailCnb === null, (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center' }}
              >
                <h3>Data Not Found</h3>
              </Box>
            </>
          ), (
            <>
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
                        title={detailCnb?.base?.component?.name}
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
                        title={detailCnb?.base?.amount}
                        fontSize='14px'
                        fontWeight={400}
                        color='grey.700'
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Text
                        title={'Per' + ' ' + detailCnb?.base?.term?.name }
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
                  {
                    detailCnb?.supplementaries?.map((item, index) => (
                      <Grid key={index} container alignItems='center' mt='16px'>
                        <Grid item md={4}>
                          <Text
                            title={item?.component?.name}
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
                            title={item?.amount}
                            fontSize='14px'
                            fontWeight={400}
                            color='grey.700'
                          />
                        </Grid>
                        <Grid item md={4}>
                          <Text
                            title={'Per' + ' ' + item?.term?.name }
                            fontSize='14px'
                            fontWeight={400}
                            color='grey.700'
                          />
                        </Grid>
                      </Grid>
                    ))
                  }
                </Grid>
              </Grid>
            </>
          ))
        }
      </Box>
    </>
  );
};

export default PersonalInformationTabComponent;