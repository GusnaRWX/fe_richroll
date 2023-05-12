import React, { useEffect, useState } from 'react';
import { Text } from '@/components/_shared/common';
import { RadioGroup, Input, Button, Textarea } from '@/components/_shared/form';
import { Box, Checkbox, FormControl, FormControlLabel, Grid, MenuItem, Select, TextField, TextFieldProps } from '@mui/material';
import { useForm, useAppDispatch, useAppSelectors } from '@/hooks/index';
import { styled } from '@mui/material/styles';
import { maritialStatus, religions, IDTypes } from '@/utils/options';
import {
  administrativeFirstLevelRequested,
  administrativeSecondLevelRequested,
  administrativeThirdLevelRequsted,
  countriesRequested,
  getBanksRequested
} from '@/store/reducers/slice/options/optionSlice';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { postPersonalInformationRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';


const AsteriskComponent = styled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

interface PersonalInformationProps {
  refProp: React.Ref<HTMLFormElement>
  nextPage: (_val: number) => void;
}


const EmployeePersonalInformationForm = ({ refProp, nextPage }: PersonalInformationProps) => {
  const dispatch = useAppDispatch();

  const {
    countries,
    administrativeFirst,
    administrativeSecond,
    administrativeThird,
    banks
  } = useAppSelectors(state => state.option);

  const {
    employeeID
  } = useAppSelectors(state => state.employee);

  const [initialValues] = useState({

    // Group Personal Information
    dateofBirthPersonalInformation: dayjs(Date.now()),
    genderPersonalInformation: '',
    maritialStatusPersonalInformation: '',
    numberOfDependantsPersonalInformation: '',
    nationalityPersonalInformation: '',
    religionPersonalInformation: '',

    // Group Citizen Address
    countryCitizenAddress: '',
    provinceCitizenAddress: '',
    cityCitizenAddress: '',
    subDistrictCitizenAddress: '',
    addressCitizenAddress: '',
    zipCodeCitizenAddress: '',
    useResidentialCitizenAddress: false,

    // Group Residential Address
    countryResidentialAddress: '',
    provinceResidentialAddress: '',
    cityResidentialAddress: '',
    subDistrictResidentialAddress: '',
    addressResidentialAddress: '',
    zipCodeResidentialAddress: '',


    // Group Bank Information
    bankBankInformation: '',
    bankAccountHolderNameBankInformation: '',
    bankAccoutNoBankInformation: '',
    bankCodeBankInformation: '',
    branchCodeBankInformation: '',
    branchNameBankInformation: '',
    swiftCodeBankInformation: '',

    // Group Personal ID
    idTypePersonalID: '',
    idNumberPersonalID: '',
    idExpirationDatePersonalID: dayjs(Date.now()),
    isPermanentPersonalID: false
  });

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors };

    // Group Personal Information

    if ('genderPersonalInformation' in fieldOfValues)
      temp.genderPersonalInformation = fieldOfValues.genderPersonalInformation ? '' : 'This is required';

    if ('maritialStatusPersonalInformation' in fieldOfValues)
      temp.maritialStatusPersonalInformation = fieldOfValues.maritialStatusPersonalInformation ? '' : 'This field is required';

    if ('numberOfDependantsPersonalInformation' in fieldOfValues)
      temp.numberOfDependantsPersonalInformation = fieldOfValues.numberOfDependantsPersonalInformation ? '' : 'This field is required';

    if ('nationalityPersonalInformation' in fieldOfValues)
      temp.nationalityPersonalInformation = fieldOfValues.nationalityPersonalInformation ? '' : 'This field is required';

    if ('religionPersonalInformation' in fieldOfValues)
      temp.religionPersonalInformation = fieldOfValues.religionPersonalInformation;

    // Group Citizen Address

    if ('countryCitizenAddress' in fieldOfValues)
      temp.countryCitizenAddress = fieldOfValues.countryCitizenAddress
        ? dispatch({
          type: administrativeFirstLevelRequested.toString(),
          payload: {
            countryId: fieldOfValues.countryCitizenAddress
          }
        })
        : 'This field is required';

    if ('provinceCitizenAddress' in fieldOfValues)
      temp.provinceCitizenAddress = fieldOfValues.provinceCitizenAddress
        ? dispatch({
          type: administrativeSecondLevelRequested.toString(),
          payload: {
            countryId: values.countryCitizenAddress,
            firstLevelCode: fieldOfValues.provinceCitizenAddress
          }
        })
        : 'This field is required';

    if ('cityCitizenAddress' in fieldOfValues)
      temp.cityCitizenAddress = fieldOfValues.cityCitizenAddress
        ? dispatch({
          type: administrativeThirdLevelRequsted.toString(),
          payload: {
            countryId: values.countryCitizenAddress,
            firstLevelCode: values.provinceCitizenAddress,
            secondLevelCode: fieldOfValues.cityCitizenAddress
          }
        })
        : 'This field is required';

    if ('subDistrictCitizenAddress' in fieldOfValues)
      temp.subDistrictCitizenAddress = fieldOfValues.subDistrictCitizenAddress ? '' : 'This field is required';

    if ('addressCitizenAddress' in fieldOfValues)
      temp.addressCitizenAddress = fieldOfValues.addressCitizenAddress ? '' : 'This field is required';

    if ('zipCodeCitizenAddress' in fieldOfValues)
      temp.zipCodeCitizenAddress = fieldOfValues.zipCodeCitizenAddress ? '' : 'This field is required';

    if ('useResidentialCitizenAddress' in fieldOfValues)
      temp.useResidentialCitizenAddress = !fieldOfValues.useResidentialCitizenAddress;

    // Group Resdential Address
    // if (!values.useResidentialCitizenAddress) {
    if ('countryResidentialAddress' in fieldOfValues)
      temp.countryResidentialAddress = fieldOfValues.countryResidentialAddress
        ? dispatch({
          type: administrativeFirstLevelRequested.toString(),
          payload: {
            countryId: fieldOfValues.countryResidentialAddress
          }
        })
        : 'This field is required';

    if ('provinceResidentialAddress' in fieldOfValues)
      temp.provinceResidentialAddress = fieldOfValues.provinceResidentialAddress
        ? dispatch({
          type: administrativeSecondLevelRequested.toString(),
          payload: {
            country: values.countryResidentialAddress,
            firstLevelCode: fieldOfValues.provinceResidentialAddress
          }
        })
        : 'This field is required';

    if ('cityResidentialAddress' in fieldOfValues)
      temp.cityResidentialAddress = fieldOfValues.cityResidentialAddress
        ? dispatch({
          type: administrativeThirdLevelRequsted.toString(),
          payload: {
            countryId: values.countryResidentialAddress,
            firstLevelCode: values.provinceResidentialAddress,
            secondLevelCode: fieldOfValues.cityResidentialAddress
          }
        })
        : 'This field is required';

    if ('subDistrictResidentialAddress' in fieldOfValues)
      temp.subDistrictResidentialAddress = fieldOfValues.subDistrictResidentialAddress ? '' : 'This field is required';

    if ('addressResidentialAddress' in fieldOfValues)
      temp.addressResidentialAddress = fieldOfValues.addressResidentialAddress ? '' : 'This field is required';

    if ('zipCodeResidentialAddress' in fieldOfValues)
      temp.zipCodeResidentialAddress = fieldOfValues.zipCodeResidentialAddress ? '' : 'This field is required';
    // }

    // Group Bank Information
    if ('bankBankInformation' in fieldOfValues)
      temp.bankBankInformation = fieldOfValues.bankBankInformation;

    if ('bankAccountHolderNameBankInformation' in fieldOfValues)
      temp.bankAccountHolderNameBankInformation = fieldOfValues.bankAccountHolderNameBankInformation;

    if ('bankAccoutNoBankInformation' in fieldOfValues)
      temp.bankAccoutNoBankInformation = fieldOfValues.bankAccoutNoBankInformation;

    if ('bankCodeBankInformation' in fieldOfValues)
      temp.bankCodeBankInformation = fieldOfValues.bankCodeBankInformation;

    if ('branchCodeBankInformation' in fieldOfValues)
      temp.branchCodeBankInformation = fieldOfValues.branchCodeBankInformation;

    if ('branchNameBankInformation' in fieldOfValues)
      temp.branchNameBankInformation = fieldOfValues.branchNameBankInformation;

    if ('swiftCodeBankInformation' in fieldOfValues)
      temp.swiftCodeBankInformation = fieldOfValues.swiftCodeBankInformation;


    // Group Personal ID
    if ('idTypePersonalID' in fieldOfValues)
      temp.idTypePersonalID = fieldOfValues.idTypePersonalID ? '' : 'This field is required';

    if ('idNumberPersonalID' in fieldOfValues)
      temp.idNumberPersonalID = fieldOfValues.idNumberPersonalID ? '' : 'This field is required';

    if ('idExpirationDatePersonalID' in fieldOfValues)
      temp.idExpirationDatePersonalID = fieldOfValues.idExpirationDatePersonalID ? '' : 'This field is required';

    if ('isPermanentPersonalID' in fieldOfValues)
      temp.isPermanentPersonalID = !fieldOfValues.isPermanentPersonalID;

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

  const employeeItems = [
    { label: '< 10', value: 1 },
    { label: '< 25', value: 2 },
    { label: '< 50', value: 3 },
    { label: '> 50', value: 4 }
  ];

  useEffect(() => {
    dispatch({
      type: countriesRequested.toString()
    });
    dispatch({
      type: getBanksRequested.toString()
    });
  }, []);

  const convertDate = (name, event) => {
    const obj = {
      target: {
        name, value: event.$d
      }
    };
    return obj;
  };

  const convertCheckbox = (name, event) => {
    const obj = {
      target: {
        name, value: event?.target?.checked
      }
    };
    return obj;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      employeeID: employeeID,
      citizen: {
        countryID: values.countryCitizenAddress,
        firstLevelCode: values.provinceCitizenAddress,
        secondLevelCode: values.cityCitizenAddress,
        thirdLevelCode: values.subDistrictCitizenAddress,
        address: values.addressCitizenAddress,
        zipCode: values.zipCodeCitizenAddress,
        isCitizen: true,
        isResident: values.useResidentialCitizenAddress,
      },
      personal: {
        dateOfBirth: dayjs(values.dateofBirthPersonalInformation).format('YYYY-MM-DD'),
        gender: values.genderPersonalInformation === 'male' ? 1 : 2,
        maritalStatus: +values.maritialStatusPersonalInformation,
        numberOfChildren: +values.numberOfDependantsPersonalInformation,
        countryID: values.nationalityPersonalInformation,
        religion: +values.religionPersonalInformation
      },
      identity: {
        type: +values.idTypePersonalID,
        number: +values.idNumberPersonalID,
        // expireAt: !values.isPermanentPersonalID && dayjs(values.idExpirationDatePersonalID).format('YYYY-MM-DD'),
        isPermanent: values.isPermanentPersonalID
      },
      bank: {
        bankID: values.bankBankInformation,
        holder: values.bankAccountHolderNameBankInformation,
        accountNumber: values.bankAccoutNoBankInformation,
        bankCode: values.bankCodeBankInformation,
        branchCode: values.branchCodeBankInformation,
        branchName: values.branchNameBankInformation,
        swiftCode: values.swiftCodeBankInformation
      },
      residential: {
        countryID: values.countryResidentialAddress,
        firstLevelCode: values.provinceResidentialAddress,
        secondLevelCode: values.cityResidentialAddress,
        thirdLevelCode: values.subDistrictResidentialAddress,
        address: values.addressResidentialAddress,
        zipCode: values.zipCodeResidentialAddress,
        isCitizen: false,
        isResident: true
      }
    };
    dispatch({
      type: postPersonalInformationRequested.toString(),
      payload: payload
    });
  };

  return (
    <form onSubmit={handleSubmit} ref={refProp}>
      <Box
        component='div'
        id='personal-information-field'
        mb='16px'
      >
        <Text
          variant='text-lg'
          title='Personal Informaton'
          fontWeight={700}
          color='primary.500'

        />
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format='DD/MM/YYYY'
                value={values.dateofBirthPersonalInformation}
                onChange={(e) => handleInputChange(convertDate('dateofBirthPersonalInformation', e))}
                slots={{
                  textField: (textFieldProps: TextFieldProps) => (
                    <TextField {...textFieldProps} />
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-input': {
                    padding: '10px 14px',
                    border: 'none !important'
                  },
                  width: '100%'
                }} />
            </LocalizationProvider>
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
            <FormControl fullWidth>
              <Text
                title='Marital Status'
              >
                <AsteriskComponent>*</AsteriskComponent>
              </Text>
              <Select
                variant='outlined'
                size='small'
                name='maritialStatusPersonalInformation'
                onChange={handleInputChange}
                value={values.maritialStatusPersonalInformation}
              >
                {maritialStatus.map(item => (
                  <MenuItem key={item.label} value={item.value} >{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <FormControl fullWidth>
              <Text
                title='Number of Dependants'
              >
                <AsteriskComponent>*</AsteriskComponent>
              </Text>
              <Select
                variant='outlined'
                size='small'
                name='numberOfDependantsPersonalInformation'
                onChange={handleInputChange}
                value={values.numberOfDependantsPersonalInformation}
              >
                {
                  employeeItems.map(item => (
                    <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
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
            <FormControl fullWidth>
              <Text
                title='Nationality'
              >
                <AsteriskComponent>*</AsteriskComponent>
              </Text>
              <Select
                variant='outlined'
                size='small'
                name='nationalityPersonalInformation'
                value={values.nationalityPersonalInformation}
                onChange={handleInputChange}
              >
                {countries?.map(item => (
                  <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <FormControl fullWidth>
              <Text
                title='Religion'
              >
                <AsteriskComponent>*</AsteriskComponent>
              </Text>
              <Select
                variant='outlined'
                size='small'
                name='religionPersonalInformation'
                value={values.religionPersonalInformation}
                onChange={handleInputChange}
              >
                {religions.map(item => (
                  <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
        >
          <Grid
            item
            sm={5.8}
          >
            <FormControl fullWidth>
              <Text
                title='Country'
              >
                <AsteriskComponent>*</AsteriskComponent>
              </Text>
              <Select
                variant='outlined'
                size='small'
                name='countryCitizenAddress'
                value={values.countryCitizenAddress}
                onChange={handleInputChange}
              >
                {countries?.map(item => (
                  <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <FormControl fullWidth>
              <Text
                title='Province'
              >
                <AsteriskComponent>*</AsteriskComponent>
              </Text>
              <Select
                variant='outlined'
                size='small'
                name='provinceCitizenAddress'
                value={values.provinceCitizenAddress}
                onChange={handleInputChange}
              >
                {administrativeFirst.map(item => (
                  <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <FormControl fullWidth>
              <Text
                title='City'
              >
                <AsteriskComponent>*</AsteriskComponent>
              </Text>
              <Select
                variant='outlined'
                size='small'
                name='cityCitizenAddress'
                value={values.cityCitizenAddress}
                onChange={handleInputChange}
              >
                {administrativeSecond?.map(item => (
                  <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <FormControl fullWidth>
              <Text
                title='Sub-District'
              >
                <AsteriskComponent>*</AsteriskComponent>
              </Text>
              <Select
                variant='outlined'
                size='small'
                name='subDistrictCitizenAddress'
                value={values.subDistrictCitizenAddress}
                onChange={handleInputChange}
              >
                {administrativeThird?.map(item => (
                  <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <FormControlLabel
              label='Use as residential address'
              control={
                <Checkbox
                  color='primary'
                  name='useResidentialCitizenAddress'
                  value={values.useResidentialCitizenAddress}
                  onChange={(e) => handleInputChange(convertCheckbox('useResidentialCitizenAddress', e))}
                />
              }
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
        >
          <Grid
            item
            sm={5.8}
          >
            <FormControl fullWidth>
              <Text
                title='Country'
              >
                <AsteriskComponent>*</AsteriskComponent>
              </Text>
              <Select
                variant='outlined'
                size='small'
                name='countryResidentialAddress'
                value={values.countryResidentialAddress}
                onChange={handleInputChange}
              >
                {countries?.map(item => (
                  <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <FormControl fullWidth>
              <Text
                title='Province'
              >
                <AsteriskComponent>*</AsteriskComponent>
              </Text>
              <Select
                variant='outlined'
                size='small'
                name='provinceResidentialAddress'
                value={values.provinceResidentialAddress}
                onChange={handleInputChange}
              >
                {administrativeFirst.map(item => (
                  <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <FormControl fullWidth>
              <Text
                title='City'
              >
                <AsteriskComponent>*</AsteriskComponent>
              </Text>
              <Select
                variant='outlined'
                size='small'
                name='cityResidentialAddress'
                value={values.cityResidentialAddress}
                onChange={handleInputChange}
              >
                {administrativeSecond?.map(item => (
                  <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <FormControl fullWidth>
              <Text
                title='Sub-District'
              >
                <AsteriskComponent>*</AsteriskComponent>
              </Text>
              <Select
                variant='outlined'
                size='small'
                name='subDistrictResidentialAddress'
                value={values.subDistrictResidentialAddress}
                onChange={handleInputChange}
              >
                {administrativeThird?.map(item => (
                  <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
              error={errors.addressResidentialAddress}
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
              error={errors.zipCodeResidentialAddress}
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
        >
          <Grid
            item
            sm={5.8}
          >
            <FormControl fullWidth>
              <Text
                title='ID Type'
              >
                <AsteriskComponent>*</AsteriskComponent>
              </Text>
              <Select
                variant='outlined'
                size='small'
                name='idTypePersonalID'
                value={values.idTypePersonalID}
                onChange={handleInputChange}
              >
                {IDTypes.map(item => (
                  <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format='DD/MM/YYYY'
                value={values.idExpirationDatePersonalID}
                onChange={(e) => handleInputChange(convertDate('idExpirationDatePersonalID', e))}
                slots={{
                  textField: (textFieldProps: TextFieldProps) => (
                    <TextField {...textFieldProps} />
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-input': {
                    padding: '10px 14px',
                    border: 'none !important'
                  },
                  width: '100%'
                }} />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          // justifyContent='c'
          alignItems='center'
          mb='16px'
        >
          <Grid item sm={5.8}>
            <FormControlLabel
              label='Permanent'
              control={<Checkbox
                color='primary'
                name='PersonalIDPersonalID'
                value={values.isPermanentPersonalID}
                onChange={(e) => handleInputChange(convertCheckbox('isPermanentPersonalID', e))}
              />}
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
        >
          <Grid
            item
            sm={5.8}
          >
            <FormControl fullWidth>
              <Text
                title='Bank'
              />
              <Select
                variant='outlined'
                size='small'
                name='bankBankInformation'
                value={values.bankBankInformation}
                onChange={handleInputChange}
              >
                {banks?.map(item => (
                  <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
          <Button onClick={() => nextPage(0)} label='Back' variant='outlined' />
        </Grid>
        <Grid item>
          <Button onClick={() => nextPage(2)} label='Next' />
        </Grid>
      </Grid>
    </form>
  );
};

export default EmployeePersonalInformationForm;