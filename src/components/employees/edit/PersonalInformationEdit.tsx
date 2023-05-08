import React, { useState } from 'react';
import { Text } from '@/components/_shared/common';
import { Form, DatePicker, RadioGroup, Input } from '@/components/_shared/form';
import { Box, Checkbox, FormControl, FormControlLabel, Grid, MenuItem, Select } from '@mui/material';
import { useForm } from '@/hooks/index';
import { styled } from '@mui/material/styles';

const AsteriskComponent = styled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));


const PersonalInformationEdit = () => {
  const [initialValues] = useState({
    genderPersonalInformation: '',
    maritialStatusPersonalInformation: '',
    numberOfDependantsPersonalInformation: '',
    nationalityPersonalInformation: '',
    religionPersonalInformation: ''
  });

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors };

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

  return (
    <Form>
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
            <DatePicker
              customLabel='Date of Birth'
              withAsterisk
              name='date'
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
                <MenuItem value='single'>Single</MenuItem>
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
              >
                <MenuItem value='single'>Indonesian</MenuItem>
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
              >
                <MenuItem value='single'>Islamic</MenuItem>
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
              >
                <MenuItem value='single'>Single</MenuItem>
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
              >
                <MenuItem value='single'>Single</MenuItem>
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
              >
                <MenuItem value='single'>Single</MenuItem>
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
              >
                <MenuItem value='single'>Single</MenuItem>
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
            <Input
              withAsterisk
              customLabel='Citizen ID  Street Name, Building Name'
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
                <Checkbox color='primary' />
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
              >
                <MenuItem value='single'>Single</MenuItem>
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
              >
                <MenuItem value='single'>Single</MenuItem>
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
              >
                <MenuItem value='single'>Single</MenuItem>
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
              >
                <MenuItem value='single'>Single</MenuItem>
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
            <Input
              withAsterisk
              customLabel='Citizen ID  Street Name, Building Name'
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
              >
                <MenuItem value='ktp'>KTP</MenuItem>
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
              customLabel='Date of Birth'
              withAsterisk
              name='date'
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
      </Box>
    </Form>
  );
};

export default PersonalInformationEdit;