import React from 'react';
import { Text } from '@/components/_shared/common';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { ifThenElse } from '@/utils/helper';

interface PersonalInformationDetailProps {
  data: {
    personal: {
      dateOfBirth: string | null;
      gender: number | null;
      maritalStatus: number | null;
      country: {
        id: string | number;
        name: string;
      };
      numberOfChildren: number | null;
      religion: number | null;
    },
    citizen:{
      country: {
        code: string | number;
        name: string;
      };
      firstLevel: {
        code: string | number;
        name: string;
      };
      secondLevel: {
        code: string | number;
        name: string;
      };
      thirdLevel: {
        code: string | number;
        name: string;
      };
      fourthLevel: {
        code: string | number | null;
        name: string | null;
      };
      address: string | null;
      zipCode: string | null;
      isCitizen: boolean;
      isResident: boolean;
    },
    identity: {
      type: number | null;
      number: number | null;
      expiredAt: string | null;
      isPermanent: boolean;
    },
    bank: {
      bank: {
        id: string | number;
        name: string;
      };
      holder: string | null;
      accountNumber: string | null;
      bankCode: string | null;
      branchCode: string | null;
      branchName: string | null;
      swiftCode: string | null;
    }
  }
}

const EmployeePersonalInformationDetail = ({data}: PersonalInformationDetailProps) => {
  console.log(data);
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
            {dayjs(data?.personal?.dateOfBirth).format('YYYY/MM/DD')}
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
            {data?.personal?.gender}
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
            {data?.personal?.maritalStatus}
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
            {data?.personal?.numberOfChildren}
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
            {data.personal.country.name}
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
            {data?.personal?.religion}
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
            {data.citizen.country.name}
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
            {data.citizen.firstLevel.name}
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
            {data.citizen.secondLevel.name}
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
            {data.citizen.thirdLevel.name}
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
            {data.citizen.address}
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
            {data.citizen.zipCode}
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
            {data.citizen.firstLevel.name}
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
            {data.citizen.firstLevel.name}
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
            {data.citizen.secondLevel.name}
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
            {data.citizen.thirdLevel.name}
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
            {data.citizen.address}
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
            {data.citizen.zipCode}
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
            {ifThenElse(data.identity.type === 0, 'KTP', (
              ifThenElse(data.identity.type === 1, 'Nomor wajib pajak', (
                ifThenElse(data.identity.type === 2, 'Passport', '-')
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
            {data.identity.number}
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
            {ifThenElse(data.identity.expiredAt === null, '-', dayjs(data.identity.expiredAt).format('YYYY/MM/DD'))}
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
            {data.bank.bank.name}
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
            {data.bank.holder}
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
              {data.bank.accountNumber}
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
              {data.bank.bankCode}
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
              {data.bank.branchCode}
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
            {data.bank.branchName}
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
            {data.bank.swiftCode}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default EmployeePersonalInformationDetail;