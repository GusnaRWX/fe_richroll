import React from 'react';
import { Text } from '@/components/_shared/common';
import { Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { getGender, getMaritalStatus, getReligion, ifThenElse } from '@/utils/helper';
import { useTranslation } from 'react-i18next';

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
    citizen: {
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
    residential: {
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

const EmployeePersonalInformationDetail = ({ data }: PersonalInformationDetailProps) => {
  const {t} = useTranslation();
  const t_personalInformationSection = 'company_management.employees.form_&_detail.personal_information.personal_information_section';
  const t_citizenAddressSection = 'company_management.employees.form_&_detail.personal_information.citizen_address_section';
  const t_residentialAddressSection = 'company_management.employees.form_&_detail.personal_information.residential_addres_section';
  const t_personalIdSection = 'company_management.employees.form_&_detail.personal_information.personal_id_section';
  const t_bankInformationSection = 'company_management.employees.form_&_detail.personal_information.bank_information_section';
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
            title={t(`${t_personalInformationSection}.title`)}
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
            title={t(`${t_personalInformationSection}.date_of_birth`)}
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
            title={t(`${t_personalInformationSection}.gender`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {getGender(data?.personal?.gender)}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title={t(`${t_personalInformationSection}.marital_status`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {getMaritalStatus(data?.personal?.maritalStatus)}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title={t(`${t_personalInformationSection}.number_of_dependants`)}
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
            title={t(`${t_personalInformationSection}.nationality`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {data?.personal?.country.name}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title={t(`${t_personalInformationSection}.religion`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {getReligion(data?.personal?.religion)}
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
            title={t(`${t_citizenAddressSection}.title`)}
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
            title={t(`${t_citizenAddressSection}.contry`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {data?.citizen?.country.name}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title={t(`${t_citizenAddressSection}.province`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {data?.citizen?.firstLevel?.name}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title={t(`${t_citizenAddressSection}.city`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {data?.citizen?.secondLevel?.name}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title={t(`${t_citizenAddressSection}.sub_district`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {data?.citizen?.thirdLevel?.name}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title={t(`${t_citizenAddressSection}.street_and_buildig_name`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {data?.citizen?.address}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title={t(`${t_citizenAddressSection}.zip_code`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {data?.citizen?.zipCode}
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
            title={t(`${t_residentialAddressSection}.title`)}
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
            title={t(`${t_residentialAddressSection}.contry`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {data?.residential?.country?.name}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title={t(`${t_residentialAddressSection}.province`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {data?.residential?.firstLevel?.name}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title={t(`${t_residentialAddressSection}.city`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {data?.residential?.secondLevel?.name}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title={t(`${t_residentialAddressSection}.sub_district`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {data?.residential?.thirdLevel?.name}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title={t(`${t_residentialAddressSection}.street_and_buildig_name`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {data?.residential?.address}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title={t(`${t_residentialAddressSection}.zip_code`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {data?.residential?.zipCode}
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
            title={t(`${t_personalIdSection}.title`)}
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
            title={t(`${t_personalIdSection}.id_type`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {ifThenElse(data?.identity?.type === 0, 'KTP', (
              ifThenElse(data?.identity?.type === 1, 'Nomor wajib pajak', (
                ifThenElse(data?.identity?.type === 2, 'Passport', '-')
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
            title={t(`${t_personalIdSection}.id_number`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {data?.identity?.number}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title={t(`${t_personalIdSection}.id_expiration_date`)}
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
            title={t(`${t_bankInformationSection}.title`)}
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
            title={t(`${t_bankInformationSection}.bank`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {data?.bank?.bank?.name}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title={t(`${t_bankInformationSection}.bank_account_holder_name`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {data?.bank?.holder}
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
              title={t(`${t_bankInformationSection}.bank_account_no`)}
              color='grey.400'
              fontWeight={500}
              mb={0.5}
            />
            <Typography fontWeight={400} color='grey.600'>
              {data?.bank?.accountNumber}
            </Typography>
          </Grid>
          <Grid
            item
            mb={2}
            mt={2}
            sm={4}
          >
            <Text
              title={t(`${t_bankInformationSection}.bank_code`)}
              color='grey.400'
              fontWeight={500}
              mb={0.5}
            />
            <Typography fontWeight={400} color='grey.600'>
              {data?.bank?.bankCode}
            </Typography>
          </Grid>
          <Grid
            item
            mb={2}
            mt={2}
            sm={4}
          >
            <Text
              title={t(`${t_bankInformationSection}.branch_code`)}
              color='grey.400'
              fontWeight={500}
              mb={0.5}
            />
            <Typography fontWeight={400} color='grey.600'>
              {data?.bank?.branchCode}
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
            title={t(`${t_bankInformationSection}.branch_name`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {data?.bank?.branchName}
          </Typography>
        </Grid>
        <Grid
          item
          mb={2}
          mt={2}
          sm={6}
        >
          <Text
            title={t(`${t_bankInformationSection}.swift_code`)}
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {data?.bank?.swiftCode}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default EmployeePersonalInformationDetail;