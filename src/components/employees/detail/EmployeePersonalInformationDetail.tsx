import React from 'react';
import { Text } from '@/components/_shared/common';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface PersonalInformationDetailProps {
  data: {
    personal: {
      dateOfBirth: string | null;
      gender: number | null;
      maritalStatus: number | null;
      countryID: string | null;
      numberOfChildren: number | null;
      religion: number | null;
    },
    citizen:{
      countryID: string | null;
      firstLevelCode: string | null;
      secondLevelCode: string | null;
      thirdLevelCode: string | null;
      fourthLevelCode: string | null;
      address: string | null;
      zipCode: string | null;
      isCitizen: boolean;
      isResident: boolean;
    },
    identity: {
      type: number | null;
      number: number | null;
      expiredAt: string | null;
      esPermanent: boolean;
    },
    bank: {
      bankID: string | null;
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
            {data?.personal?.gender === 1 ? 'Male' : 'Female'}
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
            {data?.personal?.maritalStatus === 1 ? 'Single' : (
              data?.personal.maritalStatus === 2 ? 'Maried' : (
                data?.personal.maritalStatus === 3 ? 'Divorced' : (
                  data?.personal.maritalStatus === 4 ? 'Separated' : (
                    data?.personal.maritalStatus === 5 ? 'Widowed' : (
                      data?.personal.maritalStatus === 6 ? 'Domestic Partnership' : (
                        data?.personal.maritalStatus === 7 ? 'Civil Union' : 'Annuled'
                      )
                    )
                  )
                )
              )
            )}
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
            {data?.personal?.numberOfChildren === 1 ? '< 10' : (
              data?.personal?.numberOfChildren === 2 ? '< 25' : (
                data?.personal?.numberOfChildren === 3 ? '< 50' : '> 50'
              )
            )}
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
            {data.personal.countryID}
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
            {data?.personal?.religion === 1 ? 'Islamic' : (
              data?.personal?.religion === 2 ? 'Chirstian' : (
                data?.personal?.religion === 3 ? 'Buddhist' : (
                  data?.personal?.religion === 4 ? 'Hindu' : 'Catholic'
                )
              )
            )}
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
            {data.citizen.countryID}
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
            {data.citizen.firstLevelCode}
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
            {data.citizen.secondLevelCode}
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
            {data.citizen.thirdLevelCode}
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
            {data.citizen.fourthLevelCode}
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
            {data.citizen.firstLevelCode}
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
            {data.citizen.firstLevelCode}
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
            {data.citizen.secondLevelCode}
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
            {data.citizen.thirdLevelCode}
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
            {data.citizen.fourthLevelCode}
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
            {data.identity.type === 0 ? 'KTP' : (
              data.identity.type === 1 ? 'Nomor wajib pajak' : (
                data.identity.type === 2 ? 'Passport' : '-'
              )
            )}
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
            {data.identity.expiredAt === null ? '-' : dayjs(data.identity.expiredAt).format('YYYY/MM/DD')}
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
            {data.bank.bankID}
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