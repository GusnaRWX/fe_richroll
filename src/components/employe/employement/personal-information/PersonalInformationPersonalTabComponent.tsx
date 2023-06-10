import { Text } from '@/components/_shared/common';
import { Grid, Typography } from '@mui/material';
import React from 'react';

const PersonalInformationPersonalTabComponent = () => {
  return (
    <>
      <Grid
        container
        width={700}
        justifyContent='space-between'
        wrap='wrap'
        marginBottom='32px'
      >
        <Grid
          sm={12}
          item
        >
          <Text
            variant='text-lg'
            title='Personal Informaton'
            fontWeight={700}
            color='primary.500'
          />
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Date of Birth'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            07/11/2022

          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Gender'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            Female

          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Martial Status'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>

            Single
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Number of Dependants'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>

            2
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Nationality'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>

            Indonesia
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Religion'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            Islamic

          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        width={700}
        justifyContent='space-between'
        wrap='wrap'
        marginBottom='32px'
      >
        <Grid
          item
          sm={12}
        >
          <Text
            title='Citizen Address'
            fontWeight={700}
            color='primary.500'
          />
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Country'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            Indoensia

          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Province'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            Kabupaten gaurt

          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='City'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            Garut

          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Sub-District'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            Paledang
            {/* {data?.citizen?.thirdLevel?.name} */}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Citizen ID Street Name, Building Name'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            Jln.Garut
            {/* {data?.citizen?.address} */}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Zip Code'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            123822
            {/* {data?.citizen?.zipCode} */}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        width={700}
        justifyContent='space-between'
        wrap='wrap'
        marginBottom='32px'
      >
        <Grid
          item
          sm={12}
        >
          <Text
            title='Residential Address'
            fontWeight={700}
            color='primary.500'
          />
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Country'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {/* {data?.citizen?.firstLevel?.name} */}
            Garut
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Province'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            Garut
            {/* {data?.citizen?.firstLevel?.name} */}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='City'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            Ciawstra
            {/* {data?.citizen?.secondLevel?.name} */}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Sub-District'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            Garut
            {/* {data?.citizen?.thirdLevel?.name} */}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Citizen ID Street Name, Building Name'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            Jl.Paledang

          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Zip Code'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            99212

          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        width={700}
        justifyContent='space-between'
        wrap='wrap'
        marginBottom='32px'
      >
        <Grid
          item
          sm={12}
        >
          <Text
            title='Personal ID'
            fontWeight={700}
            color='primary.500'
            variant='text-lg'
          />
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='ID Type'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            KTP
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='ID Number'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            12312312321
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='ID Expiration Date'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            09/11/2022

          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        width={700}
        justifyContent='space-between'
        wrap='wrap'
        marginBottom='32px'
      >
        <Grid
          item
          sm={12}
        >
          <Text
            title='Bank Information'
            fontWeight={700}
            color='primary.500'
            variant='text-lg'
          />
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Bank'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>

            BCA
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title={`Bank Account Holder's Name`}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>

            BCA Garut
          </Typography>
        </Grid>
        <Grid
          container
          minWidth='1050px !important'
          wrap='wrap'
        >
          <Grid
            item
            mb={2}
            mt={2}
            sm={4}
          >
            <Text
              title='Bank Account No'
              color='grey.400'
              fontWeight={500}
              mb={0.5}
            />
            <Typography fontWeight={400} color='grey.600'>
              123123123

            </Typography>
          </Grid>
          <Grid
            item
            mb={2}
            mt={2}
            sm={4}
          >
            <Text
              title='Bank Code'
              color='grey.400'
              fontWeight={500}
              mb={0.5}
            />
            <Typography fontWeight={400} color='grey.600'>
              12312312

            </Typography>
          </Grid>
          <Grid
            item
            mb={2}
            mt={2}
            sm={4}
          >
            <Text
              title='Branch Code'
              color='grey.400'
              fontWeight={500}
              mb={0.5}
            />
            <Typography fontWeight={400} color='grey.600'>
              KCP Garut

            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Branch Name'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>

            KCP GARUT
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title='Swift Code'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            1231312
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default PersonalInformationPersonalTabComponent;