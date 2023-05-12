import React, { HTMLAttributes } from 'react';
import { Grid, Typography, Chip  } from '@mui/material';
import { Image as ImageType } from '@/utils/assetsConstant';
import styled from '@emotion/styled';
import { Text } from '@/components/_shared/common';


interface ImagePriviewProps extends HTMLAttributes<HTMLDivElement> {
  image?: string;
}

const ImageReview = styled.div`
  background-image: url(${({image}: ImagePriviewProps) => image});
  background-repeat: no-repeat;
  width: 102px;
  height: 102px;
  background-size: contain;
  margin-top: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  `;

const AdditionalWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 gap: 1rem;
 margin-bottom: 2rem;
`;

function EmployeeInformationDetail() {
  return (
    <>
      <Typography component='h3' fontWeight='bold' fontSize={18} color='primary'>Employee Information</Typography>
      <form>
        <ImageReview image={ImageType.EXAMPLE_USER} />
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Full Name'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title='Budiawan'
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Nickname'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title='Budi'
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem' }}>
            <Text
              title='Contact Number'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title='+6281234568990'
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Personal Email Address'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title='sultanarifma@gmail.com'
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Start Date'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title='07/10/2020'
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='End Date'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title='07/10/2026'
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Department'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title='Management'
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Position'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title='Assistant Manager'
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
        </Grid>
        <AdditionalWrapper>
          <Text
            variant='text-lg'
            title='Employee Self Service'
            fontWeight={700}
            color='primary.500'
          />
          <Chip label='Disabled' sx={{ backgroundColor: '#E5E7EB', fontWeight: 'bold' }}/>
        </AdditionalWrapper>
        <AdditionalWrapper>
          <Text
            variant='text-lg'
            title='Employee Status'
            fontWeight={700}
            color='primary.500'
          />
          <Chip label='Active' sx={{ backgroundColor: '#DCFCE7', color: '#166534', fontWeight: 'bold' }}/>
        </AdditionalWrapper>
      </form>
    </>
  );
}

export default EmployeeInformationDetail;