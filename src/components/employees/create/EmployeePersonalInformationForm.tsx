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
import { postPersonalInformationRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { convertDateValue, convertValue, getCompanyData } from '@/utils/helper';
import { Employees } from '@/types/employees';
import CancelIcon from '@mui/icons-material/Cancel';
import { getStorage, setStorages } from '@/utils/storage';

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

  const persistInformation = getStorage('emp-personal-information') ? JSON.parse(getStorage('emp-personal-information') as string) : null;
  const [useResidentialAddress, setUseResidentialAddress] = useState(persistInformation?.useResidentialAddress !== undefined ? persistInformation?.useResidentialAddress : false);
  const [isPermanentPersonalID, setIsPermanentPersonalID] = useState(persistInformation?.isPermanentPersonalID !== undefined ? persistInformation?.isPermanentPersonalID : false);
  const companyData = getCompanyData();

  const [initialValues] = useState({

    // Group Personal Information
    dateofBirthPersonalInformation: persistInformation?.dateofBirthPersonalInformation !== undefined ? dayjs(persistInformation?.dateofBirthPersonalInformation) : null,
    genderPersonalInformation: persistInformation?.genderPersonalInformation !== undefined ? persistInformation?.genderPersonalInformation : '',
    maritialStatusPersonalInformation: persistInformation?.maritialStatusPersonalInformation !== undefined ? persistInformation?.maritialStatusPersonalInformation : '',
    numberOfDependantsPersonalInformation: persistInformation?.numberOfDependantsPersonalInformation !== undefined ? persistInformation?.numberOfDependantsPersonalInformation : '',
    nationalityPersonalInformation: persistInformation?.nationalityPersonalInformation !== undefined ? persistInformation?.nationalityPersonalInformation : '',
    religionPersonalInformation: persistInformation?.religionPersonalInformation !== undefined ? persistInformation?.religionPersonalInformation : '',

    // Group Citizen Address
    countryCitizenAddress: persistInformation?.countryCitizenAddress !== undefined ? persistInformation?.countryCitizenAddress : '',
    provinceCitizenAddress: persistInformation?.provinceCitizenAddress !== undefined ? persistInformation?.provinceCitizenAddress : '',
    cityCitizenAddress: persistInformation?.cityCitizenAddress !== undefined ? persistInformation?.cityCitizenAddress : '',
    subDistrictCitizenAddress: persistInformation?.subDistrictCitizenAddress !== undefined ? persistInformation?.subDistrictCitizenAddress : '',
    addressCitizenAddress: persistInformation?.addressCitizenAddress !== undefined ? persistInformation?.addressCitizenAddress : '',
    zipCodeCitizenAddress: persistInformation?.zipCodeCitizenAddress !== undefined ? persistInformation?.zipCodeCitizenAddress : '',

    // Group Residential Address
    countryResidentialAddress: persistInformation?.countryResidentialAddress !== undefined ? persistInformation?.countryResidentialAddress : '',
    provinceResidentialAddress: persistInformation?.provinceResidentialAddress !== undefined ? persistInformation?.provinceResidentialAddress : '',
    cityResidentialAddress: persistInformation?.cityResidentialAddress !== undefined ? persistInformation?.cityResidentialAddress : '',
    subDistrictResidentialAddress: persistInformation?.subDistrictResidentialAddress !== undefined ? persistInformation?.subDistrictResidentialAddress : '',
    addressResidentialAddress: persistInformation?.addressResidentialAddress !== undefined ? persistInformation?.addressResidentialAddress : '',
    zipCodeResidentialAddress: persistInformation?.zipCodeResidentialAddress !== undefined ? persistInformation?.zipCodeResidentialAddress : '',


    // Group Bank Information
    bankBankInformation: persistInformation?.bankBankInformation !== undefined ? persistInformation?.bankBankInformation : '',
    bankAccountHolderNameBankInformation: persistInformation?.bankAccountHolderNameBankInformation !== undefined ? persistInformation?.bankAccountHolderNameBankInformation : '',
    bankAccoutNoBankInformation: persistInformation?.bankAccoutNoBankInformation !== undefined ? persistInformation?.bankAccoutNoBankInformation : '',
    bankCodeBankInformation: persistInformation?.bankCodeBankInformation !== undefined ? persistInformation?.bankCodeBankInformation : '',
    branchCodeBankInformation: persistInformation?.branchCodeBankInformation !== undefined ? persistInformation?.branchCodeBankInformation : '',
    branchNameBankInformation: persistInformation?.branchNameBankInformation !== undefined ? persistInformation?.branchNameBankInformation : '',
    swiftCodeBankInformation: persistInformation?.swiftCodeBankInformation !== undefined ? persistInformation?.swiftCodeBankInformation : '',

    // Group Personal ID
    idTypePersonalID: persistInformation?.idTypePersonalID !== undefined ? persistInformation?.idTypePersonalID : '',
    idNumberPersonalID: persistInformation?.idNumberPersonalID !== undefined ? persistInformation?.idNumberPersonalID : '',
    idExpirationDatePersonalID: persistInformation?.idExpirationDatePersonalID !== undefined ? dayjs(persistInformation?.idExpirationDatePersonalID) : null,
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
      }) ? '' : useResidentialAddress ? '' : 'This field is required';
    }

    if ('provinceResidentialAddress' in fieldOfValues) {
      temp.provinceResidentialAddress = dispatch({
        type: administrativeSecondLevelRequested.toString(),
        payload: {
          countryId: values.countryResidentialAddress,
          firstLevelCode: fieldOfValues.provinceResidentialAddress
        }
      }) ? '' : useResidentialAddress ? '' : 'This field is required';
    }

    if ('cityResidentialAddress' in fieldOfValues) {
      temp.cityResidentialAddress = dispatch({
        type: administrativeThirdLevelRequsted.toString(),
        payload: {
          countryId: values.countryResidentialAddress,
          firstLevelCode: values.provinceResidentialAddress,
          secondLevelCode: fieldOfValues.cityResidentialAddress
        }
      }) ? '' : useResidentialAddress ? '' : 'This field is required';
    }

    if ('subDistrictResidentialAddress' in fieldOfValues)
      temp.subDistrictResidentialAddress = fieldOfValues.subDistrictResidentialAddress
        ? ''
        : useResidentialAddress ? '' : 'This field is required';

    if ('addressResidentialAddress' in fieldOfValues)
      temp.addressResidentialAddress = fieldOfValues.addressResidentialAddress
        ? ''
        : useResidentialAddress ? '' : 'This field is required';

    if ('zipCodeResidentialAddress' in fieldOfValues)
      temp.zipCodeResidentialAddress = fieldOfValues.zipCodeResidentialAddress
        ? ''
        : useResidentialAddress ? '' : 'This field is required';

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
    const payload: Employees.PersonalInformationPayload = {
      employeeID: employeeID,
      companyID: companyData?.id as string,
      citizen: {
        countryID: values.countryCitizenAddress,
        firstLevelCode: values.provinceCitizenAddress,
        secondLevelCode: values.cityCitizenAddress,
        thirdLevelCode: values.subDistrictCitizenAddress,
        address: values.addressCitizenAddress,
        zipCode: values.zipCodeCitizenAddress,
        isCitizen: true,
        isResident: useResidentialAddress ? true : false,
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
        ...(isPermanentPersonalID && { expireAt: dayjs(values.idExpirationDatePersonalID).format('YYYY-MM-DD') }),
        isPermanent: isPermanentPersonalID ? true : false
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
        isResident: useResidentialAddress ? true : false
      }
    };

    if (useResidentialAddress && isPermanentPersonalID) {
      // eslint-disable-next-line no-unused-vars
      const { residential, ...rest } = payload;
      if (validate()) {
        setErrorFields(false);
        dispatch({
          type: postPersonalInformationRequested.toString(),
          payload: rest
        });
      } else {
        setErrorFields(true);
      }

    } else if (useResidentialAddress) {
      // eslint-disable-next-line no-unused-vars
      const { residential, ...rest } = payload;
      if (validate()) {
        setErrorFields(false);
        dispatch({
          type: postPersonalInformationRequested.toString(),
          payload: rest
        });
      } else {
        setErrorFields(true);
      }
    } else if (isPermanentPersonalID) {
      const { identity, ...rest } = payload;
      delete identity?.expireAt;
      if (validate()) {
        setErrorFields(false);
        dispatch({
          type: postPersonalInformationRequested.toString(),
          payload: rest
        });
      } else {
        setErrorFields(true);
      }
    } else {
      if (validate()) {
        setErrorFields(false);
        dispatch({
          type: postPersonalInformationRequested.toString(),
          payload: payload
        });
      } else {
        setErrorFields(true);
      }
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
              onChange={() => setUseResidentialAddress(prev => !prev)}
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
              onChange={() => setIsPermanentPersonalID(prev => !prev)}
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
          <Button onClick={() => nextPage(0)} label='Back' variant='outlined' />
        </Grid>
        <Grid item>
          <Button onClick={() => {
            nextPage(2);
            setStorages([{ name: 'emp-personal-information', value: JSON.stringify({ ...values, useResidentialAddress, isPermanentPersonalID }) }]);
          }} label='Next' />
        </Grid>
      </Grid>
    </form>
  );
};

export default memo(EmployeePersonalInformationForm);