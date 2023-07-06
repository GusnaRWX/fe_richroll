import { Text } from '@/components/_shared/common';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useAppSelectors } from '@/hooks/index';
import dayjs from 'dayjs';
import { getGender, getMaritalStatus, getReligion, ifThenElse } from '@/utils/helper';

const PersonalInformationPersonalTabComponent = () => {
  const { detailPersonalInfo } = useAppSelectors((state) => state.employment);
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
            {dayjs(detailPersonalInfo?.personal?.dateOfBirth).format('DD/MM/YYYY')}
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
            {getGender(detailPersonalInfo?.personal?.gender)}
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
            {getMaritalStatus(detailPersonalInfo?.personal?.maritalStatus)}
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
            {detailPersonalInfo?.personal?.numberOfChildren}
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
            {detailPersonalInfo?.personal?.country?.name}
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
            {getReligion(detailPersonalInfo?.personal?.religion)}
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
            {detailPersonalInfo?.citizen?.country?.name}
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
            {detailPersonalInfo?.citizen?.firstLevel?.name}
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
            {detailPersonalInfo?.citizen?.secondLevel?.name}
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
            {detailPersonalInfo?.citizen?.thirdLevel?.name}
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
            {detailPersonalInfo?.citizen?.address}
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
            {detailPersonalInfo?.citizen?.zipCode}
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
            {detailPersonalInfo?.residential?.country?.name}
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
            {detailPersonalInfo?.residential?.firstLevel?.name}
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
            {detailPersonalInfo?.residential?.secondLevel?.name}
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
            {detailPersonalInfo?.residential?.thirdLevel?.name}
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
            {detailPersonalInfo?.residential?.address}
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
            {detailPersonalInfo?.residential?.zipCode}
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
            {ifThenElse(detailPersonalInfo?.identity?.type === 0, 'KTP', (
              ifThenElse(detailPersonalInfo?.identity?.type === 1, 'Nomor wajib pajak', (
                ifThenElse(detailPersonalInfo?.identity?.type === 2, 'Passport', '-')
              ))
            ))}
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
            {detailPersonalInfo?.identity?.number}
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
            {dayjs(detailPersonalInfo?.identity?.expiredAt).format('DD/MM/YYYY')}
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
            {ifThenElse(detailPersonalInfo?.bank?.bank?.name === null, '-', detailPersonalInfo?.bank?.bank?.name)}
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
            {ifThenElse(detailPersonalInfo?.bank?.holder === null, '-', detailPersonalInfo?.bank?.holder)}
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
              {ifThenElse(detailPersonalInfo?.bank?.accountNumber === null, '-', detailPersonalInfo?.bank?.accountNumber)}
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
              {ifThenElse(detailPersonalInfo?.bank?.bankCode === null, '-', detailPersonalInfo?.bank?.bankCode)}
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
              {ifThenElse(detailPersonalInfo?.bank?.branchCode === null, '-', detailPersonalInfo?.bank?.branchCode)}
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
            {ifThenElse(detailPersonalInfo?.bank?.branchName === null, '-', detailPersonalInfo?.bank?.branchName)}
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
            {ifThenElse(detailPersonalInfo?.bank?.swiftCode === null, '-', detailPersonalInfo?.bank?.swiftCode)}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default PersonalInformationPersonalTabComponent;