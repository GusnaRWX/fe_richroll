import React, { useEffect, useState, memo } from 'react';
import { Alert, Text } from '@/components/_shared/common';
import { RadioGroup, Input, Button, Textarea, DatePicker, CheckBox, Select } from '@/components/_shared/form';
import { Box, Grid, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { maritialStatus, religions, IDTypes } from '@/utils/options';
import {
  administrativeFirstLevelRequested,
  administrativeSecondLevelRequested,
  administrativeThirdLevelRequsted,
  countriesRequested,
  getSecondAdministrativeFirstLevelRequested,
  getSecondAdministrativeSecondLevelRequested,
  getSecondAdministrativeThirdLevelRequested,
  getBanksRequested
} from '@/store/reducers/slice/options/optionSlice';
import dayjs from 'dayjs';
import CancelIcon from '@mui/icons-material/Cancel';
import { Employees } from '@/types/employees';
import { validationSchemePersonalInformation } from './validate';
import { useFormik } from 'formik';
import { ifThenElse, compareCheck } from '@/utils/helper';
import { useTranslation } from 'react-i18next';

interface PersonalInformationProps {
  refProp: React.Ref<HTMLFormElement>
  nextPage: (_val: number, _data: Employees.PersonalValues) => void;
  prevPage: () => void;
  setValues: React.Dispatch<React.SetStateAction<Employees.PersonalValues>>;
  personalValues: Employees.PersonalValues,
}


const EmployeePersonalInformationForm = ({ refProp, nextPage, prevPage, setValues, personalValues }: PersonalInformationProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const t_personalInformationSection = 'company_management.employees.form_&_detail.personal_information.personal_information_section';
  const t_citizenAddressSection = 'company_management.employees.form_&_detail.personal_information.citizen_address_section';
  const t_residentialAddressSection = 'company_management.employees.form_&_detail.personal_information.residential_addres_section';
  const t_personalIdSection = 'company_management.employees.form_&_detail.personal_information.personal_id_section';
  const t_bankInformationSection = 'company_management.employees.form_&_detail.personal_information.bank_information_section';

  const {
    countries,
    administrativeFirst,
    administrativeSecond,
    administrativeThird,
    secondAdministrativeFirst,
    secondAdministrativeSecond,
    secondAdministrativeThird,
    banks
  } = useAppSelectors(state => state.option);

  const { responser } = useAppSelectors(state => state);

  const [useResidentialAddress, setUseResidentialAddress] = useState(personalValues?.useResidentialAddress);

  const formik = useFormik({
    initialValues: {
      dateofBirthPersonalInformation: dayjs(personalValues?.dateofBirthPersonalInformation),
      genderPersonalInformation: personalValues?.genderPersonalInformation,
      maritialStatusPersonalInformation: personalValues?.maritialStatusPersonalInformation,
      numberOfDependantsPersonalInformation: personalValues?.numberOfDependantsPersonalInformation,
      nationalityPersonalInformation: personalValues?.nationalityPersonalInformation,
      religionPersonalInformation: personalValues?.religionPersonalInformation,

      // Group Citizen Address
      countryCitizenAddress: personalValues?.countryCitizenAddress,
      provinceCitizenAddress: personalValues?.provinceCitizenAddress,
      cityCitizenAddress: personalValues?.cityCitizenAddress,
      subDistrictCitizenAddress: personalValues?.subDistrictCitizenAddress,
      addressCitizenAddress: personalValues?.addressCitizenAddress,
      zipCodeCitizenAddress: personalValues?.zipCodeCitizenAddress,

      // Group Residential Address
      countryResidentialAddress: personalValues?.countryResidentialAddress,
      provinceResidentialAddress: personalValues?.provinceResidentialAddress,
      cityResidentialAddress: personalValues?.cityResidentialAddress,
      subDistrictResidentialAddress: personalValues?.subDistrictResidentialAddress,
      addressResidentialAddress: personalValues?.addressResidentialAddress,
      zipCodeResidentialAddress: personalValues?.zipCodeResidentialAddress,


      // Group Bank Information
      bankBankInformation: personalValues?.bankBankInformation,
      bankAccountHolderNameBankInformation: personalValues?.bankAccountHolderNameBankInformation,
      bankAccoutNoBankInformation: personalValues?.bankAccoutNoBankInformation,
      bankCodeBankInformation: personalValues?.bankCodeBankInformation,
      branchCodeBankInformation: personalValues?.branchCodeBankInformation,
      branchNameBankInformation: personalValues?.branchNameBankInformation,
      swiftCodeBankInformation: personalValues?.swiftCodeBankInformation,

      // Group Personal ID
      idTypePersonalID: personalValues?.idTypePersonalID,
      idNumberPersonalID: personalValues?.idNumberPersonalID,
      idExpirationDatePersonalID: dayjs(personalValues?.idExpirationDatePersonalID)
    },
    validationSchema: validationSchemePersonalInformation,
    onSubmit: (values) => {
      console.log(values);
      nextPage(2, { ...formik.values, useResidentialAddress });
      setValues({ ...formik.values, useResidentialAddress });
    }
  });

  useEffect(() => {
    dispatch({
      type: countriesRequested.toString()
    });
    dispatch({
      type: getBanksRequested.toString()
    });
  }, []);

  useEffect(() => {
    if (useResidentialAddress) {
      formik.setFieldValue('countryResidentialAddress', formik.values.countryCitizenAddress);
      dispatch({
        type: getSecondAdministrativeFirstLevelRequested.toString(),
        payload: {
          countryId: formik.values.countryCitizenAddress
        }
      });
      formik.setFieldValue('provinceResidentialAddress', formik.values.provinceCitizenAddress);
      setTimeout(() => {
        dispatch({
          type: getSecondAdministrativeSecondLevelRequested.toString(),
          payload: {
            countryId: formik.values.countryCitizenAddress,
            firstLevelCode: formik.values.provinceCitizenAddress
          }
        });
      }, 3000);

      formik.setFieldValue('cityResidentialAddress', formik.values.cityCitizenAddress);
      setTimeout(() => {
        dispatch({
          type: getSecondAdministrativeThirdLevelRequested.toString(),
          payload: {
            countryId: formik.values.countryCitizenAddress,
            firstLevelCode: formik.values.provinceCitizenAddress,
            secondLevelCode: formik.values.cityCitizenAddress
          }
        });
      }, 3500);

      formik.setFieldValue('subDistrictResidentialAddress', formik.values.subDistrictCitizenAddress);
      formik.setFieldValue('addressResidentialAddress', formik.values.addressCitizenAddress);
      formik.setFieldValue('zipCodeResidentialAddress', formik.values.zipCodeCitizenAddress);
    }
  }, [useResidentialAddress]);


  const checkCountry = (value: unknown) => {
    if ((value as string).length === 0) {
      return <Text title={t(`${t_citizenAddressSection}.contry_placeholder`)} color='grey.400' />;
    }
    const selectedCountries = (countries as Array<{ label: string, value: string }>).find(country => country.value === value);
    if (selectedCountries) {
      return `${selectedCountries.label}`;
    }
    return null;
  };

  return (
    <form onSubmit={formik.handleSubmit} ref={refProp}>
      {Object.keys(formik.errors).length > 0 && (
        <Alert
          severity={'error'}
          content='Please fill in all the mandatory fields'
          icon={<CancelIcon />}
        />
      )}
      {![200, 201, 0].includes(responser?.code) && (
        <Alert
          severity='error'
          content={responser?.message}
          icon={<CancelIcon />}
        />
      )}
      <Box
        component='div'
        id='personal-information-field'
        mb='16px'
      >
        <Text
          variant='text-lg'
          title={t(`${t_personalInformationSection}.title`)}
          fontWeight={700}
          color='primary.500'
        />
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='center'
          mb='16px'
          mt='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <DatePicker
              customLabel={t(`${t_personalInformationSection}.date_of_birth`)}
              value={formik.values.dateofBirthPersonalInformation as unknown as Date}
              onChange={(date: unknown) => formik.setFieldValue('dateofBirthPersonalInformation', date)}
              withAsterisk
              error={ifThenElse(compareCheck(formik.touched.dateofBirthPersonalInformation, Boolean(formik.errors.dateofBirthPersonalInformation)), String(formik.errors.dateofBirthPersonalInformation), '')}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <RadioGroup
              withAsterisk
              label={t(`${t_personalInformationSection}.gender`)}
              name='genderPersonalInformation'
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' }
              ]}
              value={formik.values.genderPersonalInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={ifThenElse(compareCheck(formik.touched.genderPersonalInformation, Boolean(formik.errors.genderPersonalInformation)), formik.errors.genderPersonalInformation, '')}
              row
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='baseline'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Select
              variant='outlined'
              size='small'
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={maritialStatus}
              name='maritialStatusPersonalInformation'
              value={formik.values.maritialStatusPersonalInformation}
              customLabel={t(`${t_personalInformationSection}.marital_status`)}
              withAsterisk
              displayEmpty
              renderValue={(value: unknown) => {
                if (value as number === 0) {
                  return <Text title={t(`${t_personalInformationSection}.marital_status_placeholder`)} color='grey.400' />;
                }
                const selectedMaritial = maritialStatus.find(marital => marital.value === value);
                if (selectedMaritial) {
                  return `${selectedMaritial.label}`;
                }
                return null;
              }}
              error={compareCheck(formik.touched.maritialStatusPersonalInformation, Boolean(formik.errors.maritialStatusPersonalInformation))}
              helperText={ifThenElse(compareCheck(formik.touched.maritialStatusPersonalInformation, Boolean(formik.errors.maritialStatusPersonalInformation)), formik.errors.maritialStatusPersonalInformation, '')}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            {/* <Select
              customLabel='Number of Dependants'
              withAsterisk
              size='small'
              variant='outlined'
              options={employeeItems}
              fullWidth
              name='numberOfDependantsPersonalInformation'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.numberOfDependantsPersonalInformation}
              error={compareCheck(formik.touched.numberOfDependantsPersonalInformation && Boolean(formik.errors.numberOfDependantsPersonalInformation))}
              helperText={ifThenElse(compareCheck(formik.touched.numberOfDependantsPersonalInformation, Boolean(formik.errors.numberOfDependantsPersonalInformation)), formik.errors.numberOfDependantsPersonalInformation, '')}
            /> */}
            <Input
              name='numberOfDependantsPersonalInformation'
              placeholder={t(`${t_personalInformationSection}.number_of_children_placeholder`)}
              withAsterisk
              size='small'
              type='number'
              customLabel={t(`${t_personalInformationSection}.number_of_children`)}
              value={formik.values.numberOfDependantsPersonalInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={compareCheck(formik.touched.numberOfDependantsPersonalInformation, Boolean(formik.errors.numberOfDependantsPersonalInformation))}
              helperText={ifThenElse(formik.touched.numberOfDependantsPersonalInformation, formik.errors.numberOfDependantsPersonalInformation, '')}
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='baseline'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel={t(`${t_personalInformationSection}.nationality`)}
              withAsterisk
              variant='outlined'
              size='small'
              name='nationalityPersonalInformation'
              value={formik.values.nationalityPersonalInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={countries}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string).length === 0) {
                  return <Text title={t(`${t_personalInformationSection}.nationality_placeholder`)} color='grey.400' />;
                }
                const selectedCountries = (countries as Array<{ label: string, value: string }>).find(country => country.value === value);
                if (selectedCountries) {
                  return `${selectedCountries.label}`;
                }
                return null;
              }}
              error={compareCheck(formik.touched.nationalityPersonalInformation && Boolean(formik.errors.nationalityPersonalInformation))}
              helperText={ifThenElse(compareCheck(formik.touched.nationalityPersonalInformation, Boolean(formik.errors.nationalityPersonalInformation)), formik.errors.nationalityPersonalInformation, '')}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel={t(`${t_personalInformationSection}.religion`)}
              variant='outlined'
              size='small'
              name='religionPersonalInformation'
              value={formik.values.religionPersonalInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={religions}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as number) === 0) {
                  return <Text title={t(`${t_personalInformationSection}.religion_placeholder`)} color='grey.400' />;
                }
                const selectedReligions = religions.find(religion => religion.value === value);
                if (selectedReligions) {
                  return `${selectedReligions.label}`;
                }
                return null;
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        component='div'
        id='citizen-address'
        mb='16px'
      >
        <Text
          variant='text-base'
          title={t(`${t_citizenAddressSection}.title`)}
          color='primary.500'
          fontWeight={700}
        />
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='baseline'
          mb='16px'
          mt='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel={t(`${t_citizenAddressSection}.contry`)}
              withAsterisk
              variant='outlined'
              size='small'
              name='countryCitizenAddress'
              value={formik.values.countryCitizenAddress}
              onBlur={formik.handleBlur}
              onChange={(e: unknown) => {
                formik.handleChange(e);
                dispatch({
                  type: administrativeFirstLevelRequested.toString(),
                  payload: {
                    countryId: (e as SelectChangeEvent).target.value
                  }
                });
              }}
              options={countries}
              error={compareCheck(formik.touched.countryCitizenAddress, Boolean(formik.errors.countryCitizenAddress))}
              helperText={ifThenElse(compareCheck(formik.touched.countryCitizenAddress, Boolean(formik.errors.countryCitizenAddress)), formik.errors.countryCitizenAddress, '')}
              displayEmpty
              renderValue={(value: unknown) => {
                return checkCountry(value);
              }}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel={t(`${t_citizenAddressSection}.province`)}
              withAsterisk
              variant='outlined'
              size='small'
              name='provinceCitizenAddress'
              value={formik.values.provinceCitizenAddress}
              onChange={(e: unknown) => {
                formik.handleChange(e);
                dispatch({
                  type: administrativeSecondLevelRequested.toString(),
                  payload: {
                    countryId: formik.values.countryCitizenAddress,
                    firstLevelCode: (e as SelectChangeEvent).target.value
                  }
                });
              }}
              onBlur={formik.handleBlur}
              options={administrativeFirst}
              error={compareCheck(formik.touched.provinceCitizenAddress && Boolean(formik.errors.provinceCitizenAddress))}
              helperText={ifThenElse(compareCheck(formik.touched.provinceCitizenAddress, Boolean(formik.errors.provinceCitizenAddress)), formik.errors.provinceCitizenAddress, '')}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string).length === 0) {
                  return <Text title={t(`${t_citizenAddressSection}.province_placeholder`)} color='grey.400' />;
                }
                const selectedCountries = (administrativeFirst as Array<{ label: string, value: string }>).find(country => country.value === value);
                if (selectedCountries) {
                  return `${selectedCountries.label}`;
                }
                return null;
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='baseline'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel={t(`${t_citizenAddressSection}.city`)}
              withAsterisk
              variant='outlined'
              size='small'
              name='cityCitizenAddress'
              value={formik.values.cityCitizenAddress}
              onBlur={formik.handleBlur}
              onChange={(e: unknown) => {
                formik.handleChange(e);
                dispatch({
                  type: administrativeThirdLevelRequsted.toString(),
                  payload: {
                    countryId: formik.values.countryCitizenAddress,
                    firstLevelCode: formik.values.provinceCitizenAddress,
                    secondLevelCode: (e as SelectChangeEvent).target.value
                  }
                });
              }}
              options={administrativeSecond}
              error={compareCheck(formik.touched.cityCitizenAddress, Boolean(formik.errors.cityCitizenAddress))}
              helperText={ifThenElse(compareCheck(formik.touched.cityCitizenAddress, Boolean(formik.errors.cityCitizenAddress)), formik.errors.cityCitizenAddress, '')}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string).length === 0) {
                  return <Text title={t(`${t_citizenAddressSection}.city_placeholder`)} color='grey.400' />;
                }
                const selectedCountries = (administrativeSecond as Array<{ label: string, value: string }>).find(country => country.value === value);
                if (selectedCountries) {
                  return `${selectedCountries.label}`;
                }
                return null;
              }}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel={t(`${t_citizenAddressSection}.sub_district`)}
              withAsterisk
              variant='outlined'
              size='small'
              name='subDistrictCitizenAddress'
              value={formik.values.subDistrictCitizenAddress}
              onChange={(e: unknown) => formik.handleChange(e)}
              onBlur={formik.handleBlur}
              options={administrativeThird}
              error={compareCheck(formik.touched.subDistrictCitizenAddress, Boolean(formik.errors.subDistrictCitizenAddress))}
              helperText={ifThenElse(compareCheck(formik.touched.subDistrictCitizenAddress, Boolean(formik.errors.subDistrictCitizenAddress)), formik.errors.subDistrictCitizenAddress, '')}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string).length === 0) {
                  return <Text title={t(`${t_citizenAddressSection}.sub_district_placeholder`)} color='grey.400' />;
                }
                const selectedCountries = (administrativeThird as Array<{ label: string, value: string }>).find(country => country.value === value);
                if (selectedCountries) {
                  return `${selectedCountries.label}`;
                }
                return null;
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='baseline'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Textarea
              name='addressCitizenAddress'
              maxRows={5}
              minRows={3}
              value={formik.values.addressCitizenAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={ifThenElse(compareCheck(formik.touched.addressCitizenAddress, Boolean(formik.errors.addressCitizenAddress)), formik.errors.addressCitizenAddress, '')}
              withAsterisk
              customLabel={t(`${t_citizenAddressSection}.citizen_street_and_building_name`)}
              placeholder={t(`${t_citizenAddressSection}.citizen_street_and_building_name_placeholder`)}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Input
              withAsterisk
              customLabel={t(`${t_citizenAddressSection}.zip_code`)}
              size='small'
              name='zipCodeCitizenAddress'
              value={formik.values.zipCodeCitizenAddress}
              onChange={formik.handleChange}
              error={compareCheck(formik.touched.zipCodeCitizenAddress, Boolean(formik.errors.zipCodeCitizenAddress))}
              helperText={ifThenElse(formik.touched.zipCodeCitizenAddress, formik.errors.zipCodeCitizenAddress, '')}
              placeholder={t(`${t_citizenAddressSection}.zip_code_placeholder`)}
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='center'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <CheckBox
              customLabel={t(`${t_citizenAddressSection}.use_as_residential_address`)}
              name='useResidentialCitizenAddress'
              checked={useResidentialAddress}
              onChange={() => setUseResidentialAddress((prev: boolean) => !prev)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        component='div'
        id='residential-address'
        mb='16px'
      >
        <Text
          variant='text-base'
          title={t(`${t_residentialAddressSection}.title`)}
          color='primary.500'
          fontWeight={700}
          mb='16px'
        />
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='baseline'
          mb='16px'
          mt='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel={t(`${t_residentialAddressSection}.contry`)}
              withAsterisk
              variant='outlined'
              size='small'
              name='countryResidentialAddress'
              value={formik.values.countryResidentialAddress}
              onBlur={formik.handleBlur}
              onChange={(e: unknown) => {
                formik.handleChange(e);
                dispatch({
                  type: getSecondAdministrativeFirstLevelRequested.toString(),
                  payload: {
                    countryId: (e as SelectChangeEvent).target.value
                  }
                });
              }}
              options={countries}
              error={compareCheck(formik.touched.countryResidentialAddress, Boolean(formik.errors.countryResidentialAddress))}
              helperText={ifThenElse(compareCheck(formik.touched.countryResidentialAddress, Boolean(formik.errors.countryResidentialAddress)), formik.errors.countryResidentialAddress, '')}
              displayEmpty
              renderValue={(value: unknown) => {
                return checkCountry(value);
              }}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel={t(`${t_residentialAddressSection}.province`)}
              withAsterisk
              variant='outlined'
              size='small'
              name='provinceResidentialAddress'
              value={formik.values.provinceResidentialAddress}
              onChange={(e: unknown) => {
                formik.handleChange(e);
                dispatch({
                  type: getSecondAdministrativeSecondLevelRequested.toString(),
                  payload: {
                    countryId: formik.values.countryResidentialAddress,
                    firstLevelCode: (e as SelectChangeEvent).target.value
                  }
                });
              }}
              onBlur={formik.handleBlur}
              options={secondAdministrativeFirst}
              error={compareCheck(formik.touched.provinceResidentialAddress, Boolean(formik.errors.provinceResidentialAddress))}
              helperText={ifThenElse(compareCheck(formik.touched.provinceResidentialAddress, Boolean(formik.errors.provinceResidentialAddress)), formik.errors.provinceResidentialAddress, '')}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string).length === 0) {
                  return <Text title={t(`${t_residentialAddressSection}.province_placeholder`)} color='grey.400' />;
                }
                const selectedCountries = (secondAdministrativeFirst as Array<{ label: string, value: string }>).find(country => country.value === value);
                if (selectedCountries) {
                  return `${selectedCountries.label}`;
                }
                return null;
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='baseline'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel={t(`${t_residentialAddressSection}.city`)}
              withAsterisk
              variant='outlined'
              size='small'
              name='cityResidentialAddress'
              value={formik.values.cityResidentialAddress}
              onChange={(e: unknown) => {
                formik.handleChange(e);
                dispatch({
                  type: getSecondAdministrativeThirdLevelRequested.toString(),
                  payload: {
                    countryId: formik.values.countryResidentialAddress,
                    firstLevelCode: formik.values.provinceResidentialAddress,
                    secondLevelCode: (e as SelectChangeEvent).target.value
                  }
                });
              }}
              onBlur={formik.handleBlur}
              options={secondAdministrativeSecond}
              error={compareCheck(formik.touched.cityResidentialAddress, Boolean(formik.errors.cityResidentialAddress))}
              helperText={ifThenElse(compareCheck(formik.touched.cityResidentialAddress, Boolean(formik.errors.cityResidentialAddress)), formik.errors.cityResidentialAddress, '')}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string).length === 0) {
                  return <Text title={t(`${t_residentialAddressSection}.city_placeholder`)} color='grey.400' />;
                }
                const selectedCountries = (secondAdministrativeSecond as Array<{ label: string, value: string }>).find(country => country.value === value);
                if (selectedCountries) {
                  return `${selectedCountries.label}`;
                }
                return null;
              }}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel={t(`${t_residentialAddressSection}.sub_district`)}
              withAsterisk
              variant='outlined'
              size='small'
              name='subDistrictResidentialAddress'
              value={formik.values.subDistrictResidentialAddress}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              options={secondAdministrativeThird}
              error={compareCheck(formik.touched.subDistrictResidentialAddress, Boolean(formik.errors.subDistrictResidentialAddress))}
              helperText={ifThenElse(compareCheck(formik.touched.subDistrictResidentialAddress, Boolean(formik.errors.subDistrictResidentialAddress)), formik.errors.subDistrictResidentialAddress, '')}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string).length === 0) {
                  return <Text title={t(`${t_residentialAddressSection}.sub_district_placeholder`)} color='grey.400' />;
                }
                const selectedCountries = (secondAdministrativeThird as Array<{ label: string, value: string }>).find(country => country.value === value);
                if (selectedCountries) {
                  return `${selectedCountries.label}`;
                }
                return null;
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='baseline'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Textarea
              name='addressResidentialAddress'
              maxRows={5}
              minRows={3}
              value={formik.values.addressResidentialAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={ifThenElse(compareCheck(formik.touched.addressResidentialAddress, Boolean(formik.errors.addressResidentialAddress)), formik.errors.addressResidentialAddress, '')}
              withAsterisk
              customLabel={t(`${t_residentialAddressSection}.residential_street_and_building_name`)}
              placeholder={t(`${t_residentialAddressSection}.residential_street_and_building_name_placeholder`)}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Input
              withAsterisk
              customLabel={t(`${t_residentialAddressSection}.zip_code`)}
              size='small'
              name='zipCodeResidentialAddress'
              value={formik.values.zipCodeResidentialAddress}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={compareCheck(formik.touched.zipCodeResidentialAddress, Boolean(formik.errors.zipCodeResidentialAddress))}
              helperText={ifThenElse(formik.touched.zipCodeResidentialAddress, formik.errors.zipCodeResidentialAddress, '')}
              placeholder={t(`${t_residentialAddressSection}.zip_code_placeholder`)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        component='div'
        id='personal-id'
        mb='16px'
      >
        <Text
          variant='text-lg'
          title={t(`${t_personalIdSection}.title`)}
          fontWeight={700}
          color='primary.500'
        />
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='center'
          mb='16px'
          mt='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel={t(`${t_personalIdSection}.id_type`)}
              withAsterisk
              variant='outlined'
              size='small'
              name='idTypePersonalID'
              value={formik.values.idTypePersonalID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={IDTypes}
              error={compareCheck(formik.touched.idTypePersonalID, Boolean(formik.errors.idTypePersonalID))}
              helperText={ifThenElse(compareCheck(formik.touched.idTypePersonalID, Boolean(formik.errors.idTypePersonalID)), formik.errors.idTypePersonalID, '')}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string).length === 0) {
                  return <Text title={t(`${t_personalIdSection}.id_type_placeholder`)} color='grey.400' />;
                }
                const selectedType = IDTypes.find(IDType => IDType.value === value);
                if (selectedType) {
                  return `${selectedType.label}`;
                }
                return null;
              }}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Input
              withAsterisk
              customLabel={t(`${t_personalIdSection}.id_number`)}
              size='small'
              name='idNumberPersonalID'
              value={formik.values.idNumberPersonalID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={compareCheck(formik.touched.idNumberPersonalID, Boolean(formik.errors.idNumberPersonalID))}
              helperText={ifThenElse(formik.touched.idNumberPersonalID, formik.errors.idNumberPersonalID, '')}
              placeholder={t(`${t_personalIdSection}.id_number_placeholder`)}
              type='number'
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='center'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <DatePicker
              customLabel={t(`${t_personalIdSection}.id_expiration_date`)}
              value={formik.values.idExpirationDatePersonalID as unknown as Date}
              onChange={(date: unknown) => formik.setFieldValue('idExpirationDatePersonalID', date)}
              withAsterisk
              error={ifThenElse(compareCheck(formik.touched.idExpirationDatePersonalID, Boolean(formik.errors.idExpirationDatePersonalID)), String(formik.errors.idExpirationDatePersonalID), '')}
            />
          </Grid>
        </Grid>
        {/* <Grid
          container
          wrap='wrap'
          alignItems='center'
          mb='16px'
        >
          <Grid item sm={5.8}>
            <CheckBox
              customLabel='Permanent'
              color='primary'
              name='PersonalIDPersonalID'
              checked={isPermanentPersonalID}
              onChange={() => setIsPermanentPersonalID((prev: boolean) => !prev)}
            />
          </Grid>
        </Grid> */}
      </Box>
      <Box
        component='div'
        id='Bank Information'
      >
        <Text
          variant='text-lg'
          title={t(`${t_bankInformationSection}.title`)}
          fontWeight={700}
          color='primary.500'
        />
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='center'
          mb='16px'
          mt='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel={t(`${t_bankInformationSection}.bank`)}
              variant='outlined'
              size='small'
              name='bankBankInformation'
              value={formik.values.bankBankInformation}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              options={banks}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string).length === 0) {
                  return <Text title={t(`${t_bankInformationSection}.bank_placeholder`)} color='grey.400' />;
                }
                const selectedBanks = (banks as Array<{ label: string, value: string }>).find(bank => bank.value === value);
                if (selectedBanks) {
                  return `${selectedBanks.label}`;
                }
                return null;
              }}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Input
              customLabel={t(`${t_bankInformationSection}.bank_account_holder_name`)}
              size='small'
              name='bankAccountHolderNameBankInformation'
              value={formik.values.bankAccountHolderNameBankInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t(`${t_bankInformationSection}.bank_account_holder_name_placeholder`)}
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='center'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Input
              customLabel={t(`${t_bankInformationSection}.bank_account_no`)}
              size='small'
              name='bankAccoutNoBankInformation'
              value={formik.values.bankAccoutNoBankInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t(`${t_bankInformationSection}.bank_account_no_placeholder`)}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Grid container justifyContent='space-between'>
              <Grid item sm={5.8}>
                <Input
                  customLabel={t(`${t_bankInformationSection}.bank_code`)}
                  size='small'
                  name='bankCodeBankInformation'
                  value={formik.values.bankCodeBankInformation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={t(`${t_bankInformationSection}.bank_code_placeholder`)}
                />
              </Grid>
              <Grid item sm={5.8}>
                <Input
                  customLabel={t(`${t_bankInformationSection}.branch_code`)}
                  size='small'
                  name='branchCodeBankInformation'
                  value={formik.values.branchCodeBankInformation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={t(`${t_bankInformationSection}.branch_code_placeholder`)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='center'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Input
              customLabel={t(`${t_bankInformationSection}.branch_name`)}
              size='small'
              name='branchNameBankInformation'
              value={formik.values.branchNameBankInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t(`${t_bankInformationSection}.branch_name_placeholder`)}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Input
              customLabel={t(`${t_bankInformationSection}.swift_code`)}
              size='small'
              name='swiftCodeBankInformation'
              value={formik.values.swiftCodeBankInformation}
              onChange={formik.handleChange}
              placeholder={t(`${t_bankInformationSection}.swift_code_placeholder`)}
            />
          </Grid>
        </Grid>
      </Box>
      <Grid
        container
        justifyContent='flex-end'
        alignItems='end'
        gap={2}
      >
        <Grid item>
          <Button onClick={() => {
            prevPage();
            setValues({ ...formik.values, useResidentialAddress });
          }} label={t('button.back')} variant='outlined' />
        </Grid>
        <Grid item>
          <Button type='submit' label={t('button.next')} />
        </Grid>
      </Grid>
    </form>
  );
};

export default memo(EmployeePersonalInformationForm);