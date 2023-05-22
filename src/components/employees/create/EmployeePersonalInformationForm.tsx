import React, { useEffect, useState, memo } from 'react';
import { Alert, Text } from '@/components/_shared/common';
import { RadioGroup, Input, Button, Textarea, DatePicker, CheckBox, Select } from '@/components/_shared/form';
import { Box, Grid, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { maritialStatus, religions, IDTypes, employeeItems } from '@/utils/options';
import {
  administrativeFirstLevelRequested,
  administrativeSecondLevelRequested,
  administrativeThirdLevelRequsted,
  countriesRequested,
  getBanksRequested
} from '@/store/reducers/slice/options/optionSlice';
import dayjs from 'dayjs';
import CancelIcon from '@mui/icons-material/Cancel';
import { Employees } from '@/types/employees';
import { validationSchemePersonalInformation } from './validate';
import { useFormik } from 'formik';

interface PersonalInformationProps {
  refProp: React.Ref<HTMLFormElement>
  nextPage: (_val: number) => void;
  setValues: React.Dispatch<React.SetStateAction<Employees.PersonalValues>>;
  personalValues: Employees.PersonalValues,
  setIsPersonalInformationValid: React.Dispatch<React.SetStateAction<boolean>>
}


const EmployeePersonalInformationForm = ({ refProp, nextPage, setValues, personalValues, setIsPersonalInformationValid }: PersonalInformationProps) => {
  const dispatch = useAppDispatch();

  const {
    countries,
    administrativeFirst,
    administrativeSecond,
    administrativeThird,
    banks
  } = useAppSelectors(state => state.option);


  const [useResidentialAddress, setUseResidentialAddress] = useState(personalValues?.useResidentialAddress);
  const [isPermanentPersonalID, setIsPermanentPersonalID] = useState(personalValues?.isPermanentPersonalID);

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
      nextPage(2);
      setIsPersonalInformationValid(true);
      setValues({ ...formik.values, useResidentialAddress, isPermanentPersonalID });
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

  console.log(formik.errors);

  return (
    <form onSubmit={formik.handleSubmit} ref={refProp}>
      {Object.keys(formik.errors).length > 0 && (
        <Alert
          severity={'error'}
          content='Please fill in all the mandatory fields'
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
          title='Personal Information'
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
              customLabel='Date of Birth'
              value={formik.values.dateofBirthPersonalInformation as unknown as Date}
              onChange={(date: unknown) => formik.setFieldValue('dateofBirthPersonalInformation', date)}
              withAsterisk
              error={formik.touched.dateofBirthPersonalInformation && formik.errors.dateofBirthPersonalInformation ? String(formik.errors.dateofBirthPersonalInformation) : ''}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <RadioGroup
              withAsterisk
              label='Gender'
              name='genderPersonalInformation'
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' }
              ]}
              value={formik.values.genderPersonalInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.genderPersonalInformation && Boolean(formik.errors.genderPersonalInformation) ? formik.errors.genderPersonalInformation : ''}
              row
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
            <Select
              variant='outlined'
              size='small'
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={maritialStatus}
              name='maritialStatusPersonalInformation'
              value={formik.values.maritialStatusPersonalInformation}
              customLabel='Maritial Status'
              withAsterisk
              error={formik.touched.maritialStatusPersonalInformation && Boolean(formik.errors.maritialStatusPersonalInformation)}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Select
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
              error={formik.touched.numberOfDependantsPersonalInformation && Boolean(formik.errors.numberOfDependantsPersonalInformation)}
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
            <Select
              fullWidth
              customLabel='Nationality'
              withAsterisk
              variant='outlined'
              size='small'
              name='nationalityPersonalInformation'
              value={formik.values.nationalityPersonalInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={countries}
              error={formik.touched.nationalityPersonalInformation && Boolean(formik.errors.nationalityPersonalInformation)}

            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel='Religion'
              variant='outlined'
              size='small'
              name='religionPersonalInformation'
              value={formik.values.religionPersonalInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={religions}
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
          title='Citizen Address'
          color='primary.500'
          fontWeight={700}
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
              customLabel='Country'
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
              error={formik.touched.countryCitizenAddress && Boolean(formik.errors.countryCitizenAddress)}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel='Province'
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
              error={formik.touched.provinceCitizenAddress && Boolean(formik.errors.provinceCitizenAddress)}
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
            <Select
              fullWidth
              customLabel='City'
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
              error={formik.touched.cityCitizenAddress && Boolean(formik.errors.cityCitizenAddress)}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel='Sub-District'
              withAsterisk
              variant='outlined'
              size='small'
              name='subDistrictCitizenAddress'
              value={formik.values.subDistrictCitizenAddress}
              onChange={(e: unknown) => formik.handleChange(e)}
              onBlur={formik.handleBlur}
              options={administrativeThird}
              error={formik.touched.subDistrictCitizenAddress && Boolean(formik.errors.subDistrictCitizenAddress)}
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
            <Textarea
              name='addressCitizenAddress'
              maxRows={5}
              minRows={3}
              value={formik.values.addressCitizenAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.addressCitizenAddress && Boolean(formik.errors.addressCitizenAddress) ? formik.errors.addressCitizenAddress : ''}
              withAsterisk
              customLabel='Citizen ID Street Name, Building Name'
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Input
              withAsterisk
              customLabel='ZIP Code'
              size='small'
              name='zipCodeCitizenAddress'
              value={formik.values.zipCodeCitizenAddress}
              onChange={formik.handleChange}
              error={formik.touched.zipCodeCitizenAddress && Boolean(formik.errors.zipCodeCitizenAddress)}
              helperText={formik.touched.zipCodeCitizenAddress && formik.errors.zipCodeCitizenAddress}
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
              customLabel='Use as residential address'
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
          title='Residential Address'
          color='primary.500'
          fontWeight={700}
          mb='16px'
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
              customLabel='Country'
              withAsterisk
              variant='outlined'
              size='small'
              name='countryResidentialAddress'
              value={formik.values.countryResidentialAddress}
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
              error={formik.touched.countryResidentialAddress && Boolean(formik.errors.countryResidentialAddress)}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel='Province'
              withAsterisk
              variant='outlined'
              size='small'
              name='provinceResidentialAddress'
              value={formik.values.provinceResidentialAddress}
              onChange={(e: unknown) => {
                formik.handleChange(e);
                dispatch({
                  type: administrativeSecondLevelRequested.toString(),
                  payload: {
                    countryId: formik.values.countryResidentialAddress,
                    firstLevelCode: (e as SelectChangeEvent).target.value
                  }
                });
              }}
              onBlur={formik.handleBlur}
              options={administrativeFirst}
              error={formik.touched.provinceResidentialAddress && Boolean(formik.errors.provinceResidentialAddress)}
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
            <Select
              fullWidth
              customLabel='City'
              withAsterisk
              variant='outlined'
              size='small'
              name='cityResidentialAddress'
              value={formik.values.cityResidentialAddress}
              onChange={(e: unknown) => {
                formik.handleChange(e);
                dispatch({
                  type: administrativeThirdLevelRequsted.toString(),
                  payload: {
                    countryId: formik.values.countryResidentialAddress,
                    firstLevelCode: formik.values.provinceResidentialAddress,
                    secondLevelCode: (e as SelectChangeEvent).target.value
                  }
                });
              }}
              onBlur={formik.handleBlur}
              options={administrativeSecond}
              error={formik.touched.cityResidentialAddress && Boolean(formik.errors.cityResidentialAddress)}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel='Sub-District'
              withAsterisk
              variant='outlined'
              size='small'
              name='subDistrictResidentialAddress'
              value={formik.values.subDistrictResidentialAddress}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              options={administrativeThird}
              error={formik.touched.subDistrictResidentialAddress && Boolean(formik.errors.subDistrictResidentialAddress)}
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
            <Textarea
              name='addressResidentialAddress'
              maxRows={5}
              minRows={3}
              value={formik.values.addressResidentialAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.addressResidentialAddress && Boolean(formik.errors.addressResidentialAddress) ? formik.errors.addressResidentialAddress : ''}
              withAsterisk
              customLabel='Citizen ID Street Name, Building Name'
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Input
              withAsterisk
              customLabel='ZIP Code'
              size='small'
              name='zipCodeResidentialAddress'
              value={formik.values.zipCodeResidentialAddress}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.zipCodeResidentialAddress && Boolean(formik.errors.zipCodeResidentialAddress)}
              helperText={formik.touched.zipCodeResidentialAddress && formik.errors.zipCodeResidentialAddress}
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
          title='Personal ID'
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
              customLabel='ID Type'
              withAsterisk
              variant='outlined'
              size='small'
              name='idTypePersonalID'
              value={formik.values.idTypePersonalID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={IDTypes}
              error={formik.touched.idTypePersonalID && Boolean(formik.errors.idTypePersonalID)}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Input
              withAsterisk
              customLabel='ID Number'
              size='small'
              name='idNumberPersonalID'
              value={formik.values.idNumberPersonalID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.idNumberPersonalID && Boolean(formik.errors.idNumberPersonalID)}
              helperText={formik.touched.idNumberPersonalID && formik.errors.idNumberPersonalID}
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
              customLabel='ID Expiration Date'
              value={formik.values.idExpirationDatePersonalID as unknown as Date}
              onChange={(date: unknown) => formik.setFieldValue('idExpirationDatePersonalID', date)}
              withAsterisk
              error={formik.touched.idExpirationDatePersonalID && formik.errors.idExpirationDatePersonalID ? String(formik.errors.idExpirationDatePersonalID) : ''}
            />
          </Grid>
        </Grid>
        <Grid
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
        </Grid>
      </Box>
      <Box
        component='div'
        id='Bank Information'
      >
        <Text
          variant='text-lg'
          title='Bank Information'
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
              customLabel='Bank'
              variant='outlined'
              size='small'
              name='bankBankInformation'
              value={formik.values.bankBankInformation}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              options={banks}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Input
              customLabel={`Bank Account Holder's Name`}
              size='small'
              name='bankAccountHolderNameBankInformation'
              value={formik.values.bankAccountHolderNameBankInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              customLabel='Bank Account No'
              size='small'
              name='bankAccoutNoBankInformation'
              value={formik.values.bankAccoutNoBankInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Grid container justifyContent='space-between'>
              <Grid item sm={5.8}>
                <Input
                  customLabel='Bank Code'
                  size='small'
                  name='bankCodeBankInformation'
                  value={formik.values.bankCodeBankInformation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Grid>
              <Grid item sm={5.8}>
                <Input
                  customLabel='Branch Code'
                  size='small'
                  name='branchCodeBankInformation'
                  value={formik.values.branchCodeBankInformation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
              customLabel='Branch Name'
              size='small'
              name='branchNameBankInformation'
              value={formik.values.branchNameBankInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Input
              customLabel='Swift Code'
              size='small'
              name='swiftCodeBankInformation'
              value={formik.values.swiftCodeBankInformation}
              onChange={formik.handleChange}
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
            nextPage(0);
            setValues({ ...formik.values, useResidentialAddress, isPermanentPersonalID });
          }} label='Back' variant='outlined' />
        </Grid>
        <Grid item>
          <Button type='submit' label='Next' />
        </Grid>
      </Grid>
    </form>
  );
};

export default memo(EmployeePersonalInformationForm);