/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, memo } from 'react';
import { Alert, Text } from '@/components/_shared/common';
import { RadioGroup, Input, Button, Textarea, DatePicker, CheckBox, Select } from '@/components/_shared/form';
import { Box, Grid } from '@mui/material';
import { useForm, useAppDispatch, useAppSelectors } from '@/hooks/index';
import { maritialStatus, religions, IDTypes, employeeItems } from '@/utils/options';
import {
  administrativeFirstLevelRequested,
  administrativeSecondLevelRequested,
  administrativeThirdLevelRequsted,
  countriesRequested,
  getBanksRequested
} from '@/store/reducers/slice/options/optionSlice';
import dayjs from 'dayjs';
import { convertDateValue, convertValue } from '@/utils/helper';
import CancelIcon from '@mui/icons-material/Cancel';
import { Employees } from '@/types/employees';

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

  const [initialValues] = useState({

    // Group Personal Information
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
  });

  const [errorFields, setErrorFields] = useState(false);

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors };

    // Group Personal Information

    if ('dateofBirthPersonalInformation' in fieldOfValues)
      temp.dateofBirthPersonalInformation = fieldOfValues.dateofBirthPersonalInformation ? '' : 'This field is required';

    if ('genderPersonalInformation' in fieldOfValues)
      temp.genderPersonalInformation = fieldOfValues.genderPersonalInformation ? '' : 'This is required';

    if ('maritialStatusPersonalInformation' in fieldOfValues)
      temp.maritialStatusPersonalInformation = fieldOfValues.maritialStatusPersonalInformation ? '' : 'This field is required';

    if ('numberOfDependantsPersonalInformation' in fieldOfValues)
      temp.numberOfDependantsPersonalInformation = fieldOfValues.numberOfDependantsPersonalInformation ? '' : 'This field is required';

    if ('nationalityPersonalInformation' in fieldOfValues)
      temp.nationalityPersonalInformation = fieldOfValues.nationalityPersonalInformation ? '' : 'This field is required';

    if ('religionPersonalInformation' in fieldOfValues)
      temp.religionPersonalInformation = fieldOfValues.religionPersonalInformation ? '' : '';

    // Group Citizen Address

    if ('countryCitizenAddress' in fieldOfValues) {
      temp.countryCitizenAddress = dispatch({
        type: administrativeFirstLevelRequested.toString(),
        payload: {
          countryId: fieldOfValues.countryCitizenAddress
        }
      }) ? '' : 'This field is required';
    }


    if ('provinceCitizenAddress' in fieldOfValues) {
      temp.provinceCitizenAddress = dispatch({
        type: administrativeSecondLevelRequested.toString(),
        payload: {
          countryId: values.countryCitizenAddress,
          firstLevelCode: fieldOfValues.provinceCitizenAddress
        }
      }) ? '' : 'This field is required';
    }

    if ('cityCitizenAddress' in fieldOfValues) {
      temp.cityCitizenAddress = dispatch({
        type: administrativeThirdLevelRequsted.toString(),
        payload: {
          countryId: values.countryCitizenAddress,
          firstLevelCode: values.provinceCitizenAddress,
          secondLevelCode: fieldOfValues.cityCitizenAddress
        }
      }) ? '' : 'This field is required';
    }


    if ('subDistrictCitizenAddress' in fieldOfValues)
      temp.subDistrictCitizenAddress = fieldOfValues.subDistrictCitizenAddress ? '' : 'This field is required';

    if ('addressCitizenAddress' in fieldOfValues)
      temp.addressCitizenAddress = fieldOfValues.addressCitizenAddress ? '' : 'This field is required';

    if ('zipCodeCitizenAddress' in fieldOfValues)
      temp.zipCodeCitizenAddress = fieldOfValues.zipCodeCitizenAddress ? '' : 'This field is required';

    // Group Resdential Address
    if ('countryResidentialAddress' in fieldOfValues) {
      temp.countryResidentialAddress = dispatch({
        type: administrativeFirstLevelRequested.toString(),
        payload: {
          countryId: fieldOfValues.countryResidentialAddress
        }
      }) ? '' : 'This field is required';
    }

    if ('provinceResidentialAddress' in fieldOfValues) {
      temp.provinceResidentialAddress = dispatch({
        type: administrativeSecondLevelRequested.toString(),
        payload: {
          countryId: values.countryResidentialAddress,
          firstLevelCode: fieldOfValues.provinceResidentialAddress
        }
      }) ? '' : 'This field is required';
    }

    if ('cityResidentialAddress' in fieldOfValues) {
      temp.cityResidentialAddress = dispatch({
        type: administrativeThirdLevelRequsted.toString(),
        payload: {
          countryId: values.countryResidentialAddress,
          firstLevelCode: values.provinceResidentialAddress,
          secondLevelCode: fieldOfValues.cityResidentialAddress
        }
      }) ? '' : 'This field is required';
    }

    if ('subDistrictResidentialAddress' in fieldOfValues)
      temp.subDistrictResidentialAddress = fieldOfValues.subDistrictResidentialAddress
        ? ''
        : 'This field is required';

    if ('addressResidentialAddress' in fieldOfValues)
      temp.addressResidentialAddress = fieldOfValues.addressResidentialAddress
        ? ''
        : 'This field is required';

    if ('zipCodeResidentialAddress' in fieldOfValues)
      temp.zipCodeResidentialAddress = fieldOfValues.zipCodeResidentialAddress
        ? ''
        : 'This field is required';

    // Group Bank Information
    if ('bankBankInformation' in fieldOfValues)
      temp.bankBankInformation = fieldOfValues.bankBankInformation ? '' : '';

    if ('bankAccountHolderNameBankInformation' in fieldOfValues)
      temp.bankAccountHolderNameBankInformation = fieldOfValues.bankAccountHolderNameBankInformation ? '' : '';

    if ('bankAccoutNoBankInformation' in fieldOfValues)
      temp.bankAccoutNoBankInformation = fieldOfValues.bankAccoutNoBankInformation ? '' : '';

    if ('bankCodeBankInformation' in fieldOfValues)
      temp.bankCodeBankInformation = fieldOfValues.bankCodeBankInformation ? '' : '';

    if ('branchCodeBankInformation' in fieldOfValues)
      temp.branchCodeBankInformation = fieldOfValues.branchCodeBankInformation ? '' : '';

    if ('branchNameBankInformation' in fieldOfValues)
      temp.branchNameBankInformation = fieldOfValues.branchNameBankInformation ? '' : '';

    if ('swiftCodeBankInformation' in fieldOfValues)
      temp.swiftCodeBankInformation = fieldOfValues.swiftCodeBankInformation ? '' : '';


    // Group Personal ID
    if ('idTypePersonalID' in fieldOfValues)
      temp.idTypePersonalID = fieldOfValues.idTypePersonalID ? '' : 'This field is required';

    if ('idNumberPersonalID' in fieldOfValues)
      temp.idNumberPersonalID = fieldOfValues.idNumberPersonalID ? '' : 'This field is required';

    if ('idExpirationDatePersonalID' in fieldOfValues)
      temp.idExpirationDatePersonalID = fieldOfValues.idExpirationDatePersonalID ? '' : 'This field is required';

    setErrors({ ...temp });

    if (fieldOfValues === values) {
      return Object.values(temp).every((x) => x === '');
    }
  };
  const {
    values,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialValues, true, validate);


  useEffect(() => {
    dispatch({
      type: countriesRequested.toString()
    });
    dispatch({
      type: getBanksRequested.toString()
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setErrorFields(false);
      nextPage(2);
      setIsPersonalInformationValid(true);
      setValues({ ...values, useResidentialAddress, isPermanentPersonalID });
    } else {
      setErrorFields(true);
      setIsPersonalInformationValid(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={refProp}>
      {errorFields && (
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
              value={values.dateofBirthPersonalInformation}
              onChange={(e: unknown) => handleInputChange(convertDateValue('dateofBirthPersonalInformation', e))}
              withAsterisk
              error={errors.dateofBirthPersonalInformation}
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
              value={values.genderPersonalInformation}
              onChange={handleInputChange}
              error={errors.genderPersonalInformation}
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
              onChange={(e: unknown) => handleInputChange(convertValue('maritialStatusPersonalInformation', e))}
              options={maritialStatus}
              value={values.maritialStatusPersonalInformation}
              customLabel='Maritial Status'
              withAsterisk
              error={errors.maritialStatusPersonalInformation}
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
              onChange={(e: unknown) => handleInputChange(convertValue('numberOfDependantsPersonalInformation', e))}
              value={values.numberOfDependantsPersonalInformation}
              error={errors.numberOfDependantsPersonalInformation}
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
              value={values.nationalityPersonalInformation}
              onChange={(e: unknown) => handleInputChange(convertValue('nationalityPersonalInformation', e))}
              options={countries}
              error={errors.nationalityPersonalInformation}
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
              value={values.religionPersonalInformation}
              onChange={(e: unknown) => handleInputChange(convertValue('religionPersonalInformation', e))}
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
              value={values.countryCitizenAddress}
              onChange={(e: unknown) => handleInputChange(convertValue('countryCitizenAddress', e))}
              options={countries}
              error={errors.countryCitizenAddress}
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
              value={values.provinceCitizenAddress}
              onChange={(e: unknown) => handleInputChange(convertValue('provinceCitizenAddress', e))}
              options={administrativeFirst}
              error={errors.provinceCitizenAddress}
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
              value={values.cityCitizenAddress}
              onChange={(e: unknown) => handleInputChange(convertValue('cityCitizenAddress', e))}
              options={administrativeSecond}
              error={errors.cityCitizenAddress}
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
              value={values.subDistrictCitizenAddress}
              onChange={(e: unknown) => handleInputChange(convertValue('subDistrictCitizenAddress', e))}
              options={administrativeThird}
              error={errors.subDistrictCitizenAddress}
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
              value={values.addressCitizenAddress}
              onChange={handleInputChange}
              error={errors.addressCitizenAddress}
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
              value={values.zipCodeCitizenAddress}
              onChange={handleInputChange}
              error={errors.zipCodeCitizenAddress}
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
              value={values.countryResidentialAddress}
              onChange={(e: unknown) => handleInputChange(convertValue('countryResidentialAddress', e))}
              options={countries}
              error={useResidentialAddress ? '' : errors.countryResidentialAddress}
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
              value={values.provinceResidentialAddress}
              onChange={(e: unknown) => handleInputChange(convertValue('provinceResidentialAddress', e))}
              options={administrativeFirst}
              error={useResidentialAddress ? '' : errors.provinceResidentialAddress}
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
              value={values.cityResidentialAddress}
              onChange={(e: unknown) => handleInputChange(convertValue('cityResidentialAddress', e))}
              options={administrativeSecond}
              error={useResidentialAddress ? '' : errors.cityResidentialAddress}
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
              value={values.subDistrictResidentialAddress}
              onChange={(e: unknown) => handleInputChange(convertValue('subDistrictResidentialAddress', e))}
              options={administrativeThird}
              error={useResidentialAddress ? '' : errors.subDistrictResidentialAddress}
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
              value={values.addressResidentialAddress}
              onChange={handleInputChange}
              error={useResidentialAddress ? '' : errors.addressResidentialAddress}
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
              value={values.zipCodeResidentialAddress}
              onChange={handleInputChange}
              error={useResidentialAddress ? '' : errors.zipCodeResidentialAddress}
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
              value={values.idTypePersonalID}
              onChange={(e: unknown) => handleInputChange(convertValue('idTypePersonalID', e))}
              options={IDTypes}
              error={errors.idTypePersonalID}
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
              value={values.idNumberPersonalID}
              onChange={handleInputChange}
              error={errors.idNumberPersonalID}
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
              withAsterisk
              value={values.idExpirationDatePersonalID}
              onChange={(e: unknown) => handleInputChange(convertDateValue('idExpirationDatePersonalID', e))}
              error={values.PersonalIDPersonalID ? '' : errors.idExpirationDatePersonalID}
              disabled={values.PersonalIDPersonalID}
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
              checked={values.PersonalIDPersonalID}
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
              value={values.bankBankInformation}
              onChange={(e: unknown) => handleInputChange(convertValue('bankBankInformation', e))}
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
              value={values.bankAccountHolderNameBankInformation}
              onChange={handleInputChange}
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
              value={values.bankAccoutNoBankInformation}
              onChange={handleInputChange}
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
                  value={values.bankCodeBankInformation}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item sm={5.8}>
                <Input
                  customLabel='Branch Code'
                  size='small'
                  name='branchCodeBankInformation'
                  value={values.branchCodeBankInformation}
                  onChange={handleInputChange}
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
              value={values.branchNameBankInformation}
              onChange={handleInputChange}
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
              value={values.swiftCodeBankInformation}
              onChange={handleInputChange}
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
            setValues({ ...values, useResidentialAddress, isPermanentPersonalID });
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