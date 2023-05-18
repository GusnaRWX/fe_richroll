import React, { HTMLAttributes } from 'react';
import { Grid, Typography, Chip  } from '@mui/material';
import { Image as ImageType } from '@/utils/assetsConstant';
import styled from '@emotion/styled';
import { Text } from '@/components/_shared/common';
import dayjs from 'dayjs';



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

interface EmployeeInformationDetailProps {
  data: {
    fullName: string | undefined;
    department: string | undefined;
    email: string | undefined;
    endDate: string | null;
    picture: string | null;
    isPermanent: boolean;
    isSelfService: boolean;
    nickname: string | null;
    phoneNumber: string | null;
    position: string | null;
    startDate: string | null;
  }
}

function EmployeeInformationDetail({data}: EmployeeInformationDetailProps) {
  return (
    <>
      <Typography component='h3' fontWeight='bold' fontSize={18} color='primary' mb='1rem'>Employee Information</Typography>
      <form>
        <Text
          title='Employee Photo'
          fontWeight={500}
          color='grey.400'
        />
        <ImageReview image={data?.picture !== null ? data?.picture : ImageType.AVATAR_PLACEHOLDER} />
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Full Name'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title={data?.fullName}
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
            <Typography fontWeight={400} color='grey.600'>
              {data?.nickname}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem' }}>
            <Text
              title='Contact Number'
              fontWeight={500}
              color='grey.400'
            />
            <Typography fontWeight={400} color='grey.600'>
              {data?.phoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Personal Email Address'
              fontWeight={500}
              color='grey.400'
            />
            <Typography fontWeight={400} color='grey.600'>
              {data?.email}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Start Date'
              fontWeight={500}
              color='grey.400'
            />
            <Typography fontWeight={400} color='grey.600'>
              {dayjs(data?.startDate).format('YYYY/MM/DD')}
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='End Date'
              fontWeight={500}
              color='grey.400'
            />
            <Typography fontWeight={400} color='grey.600'>
              {data?.endDate === null ? '-' : dayjs(data?.endDate).format('YYYY/MM/DD')}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '2rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Department'
              fontWeight={500}
              color='grey.400'
            />
            <Typography fontWeight={400} color='grey.600'>
              {data?.department}
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Position'
              fontWeight={500}
              color='grey.400'
            />
            <Typography fontWeight={400} color='grey.600'>
              {data?.position}
            </Typography>
          </Grid>
        </Grid>
        <AdditionalWrapper>
          <Text
            variant='text-lg'
            title='Employee Self Service'
            fontWeight={700}
            color='primary.500'
          />
          {
            data?.isSelfService === false ? (
              <Chip label='Disabled' sx={{ backgroundColor: '#E5E7EB', fontWeight: 'bold' }}/>
            ):(
              <Chip label='Enabled' sx={{ backgroundColor: '#DCFCE7', color: '#166534', fontWeight: 'bold' }}/>
            )
          }
        </AdditionalWrapper>
        <AdditionalWrapper>
          <Text
            variant='text-lg'
            title='Employee Status'
            fontWeight={700}
            color='primary.500'
          />
          {
            data?.isPermanent === false ? (
              <Chip label='Non Active' sx={{ backgroundColor: '#FEE2E2', color: '#166534', fontWeight: 'bold' }}/>
            ):(
              <Chip label='Active' sx={{ backgroundColor: '#DCFCE7', color: '#166534', fontWeight: 'bold' }}/>
            )
          }
        </AdditionalWrapper>
      </form>
    </>
  );
}

export default EmployeeInformationDetail;