import React, { useState } from 'react';
import { Grid, Autocomplete, Typography, Button as MuiButton, TextField, createFilterOptions, InputAdornment, Box } from '@mui/material';
import { useFormik } from 'formik';
import { styled as MuiStyled } from '@mui/material/styles';
import { Select, RadioGroup, Input } from '@/components/_shared/form';
import { Add, Delete } from '@mui/icons-material';

const AsteriskComponent = MuiStyled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

interface SelectItemType {
  inputValue?: string;
  title: string;
  value?: string;
}

interface TempSupplementaryType {
  compensation: string;
  tax: string;
  rate: string;
  period: string;
}

function CnbEditForm() {
  const selectItems: readonly SelectItemType[] = [
    { title: 'Product', value: 'Product' },
    { title: 'Sales', value: 'Sales' },
    { title: 'Prep-Cook', value: 'Prep-cook' },
    { title: 'Waiter', value: 'Waiter' }
  ];
  const [suplementary, setSupplementary] = useState<Array<TempSupplementaryType>>([]);
  const formik = useFormik({
    initialValues: {
      profile: '',
      baseCompensation: '',
      baseTax: '',
      baseRate: '',
      basePeriod: '',
      suplementary: suplementary
    } as any,
    onSubmit: (values) => {
      console.log(values);
    }
  });
  const filter = createFilterOptions<SelectItemType>();

  const handleAddSupplementary = () => {
    const data = {
      compensation: '',
      tax: '',
      rate: '',
      period: '',
    };
    setSupplementary((prevState) => [...prevState, data]);
  };

  const handleDeleteItems = (index: number) => {
    const temp = [...suplementary];
    temp.splice(index, 1);
    setSupplementary(temp);
  };
  return (
    <>
      <Grid container mb='2rem'>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography mb='6px'>Compensation & Benefit Profile<AsteriskComponent>*</AsteriskComponent></Typography>
          <Autocomplete
            id='profile'
            freeSolo={true}
            value={formik.values.profile}
            onChange={(event, newValue) => {
              console.log('new value', newValue);
              if (typeof newValue === 'string') {
                formik.setFieldValue('profile', newValue, true);
              } else if (newValue && newValue.inputValue) {
                formik.setFieldValue('profile', newValue.inputValue, true);
              } else {
                formik.setFieldValue('profile', newValue?.title, true);
              }
            }}
            size='small'
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              const isExsisting = options.some((option) => inputValue === option.title);
              if (inputValue !== '' && !isExsisting) {
                filtered.push({
                  inputValue,
                  title: `Create New "${inputValue}"`
                });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={selectItems}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
              }

              if (option.inputValue) {
                return option.inputValue;
              }
              return option.title;
            }}
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
            renderInput={(params) => <TextField name='profile' {...params} />}
          />
        </Grid>
      </Grid>
      {
        formik.values.profile !== '' && (
          <>
            <Typography mb='1rem' fontSize='20px' fontWeight='bold' color='primary'>{formik.values.profile}</Typography>
            <Typography mb='1.5rem' fontSize='16px' fontWeight='bold' color='primary'>Base</Typography>
            <Grid mb='1rem' container spacing={3}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Select
                  customLabel='Compensation Component'
                  size='small'
                  value={formik.values.baseCompensation}
                  onChange={formik.handleChange}
                  withAsterisk
                  fullWidth
                  name='baseCompensation'
                  options={[
                    { label: 'Salary', value: 'salary' },
                    { label: 'Wage', value: 'Wage' },
                    { label: 'Comission', value: 'Commision' },
                    { label: 'Piece Rate', value: 'Piece Rate' }
                  ]}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <RadioGroup
                  withAsterisk
                  label='Tax Status'
                  name='baseTax'
                  value={formik.values.baseTax}
                  onChange={formik.handleChange}
                  options={[
                    { label: 'Taxable', value: 'Taxable' },
                    { label: 'Non-Taxable', value: 'Non-Taxable' }
                  ]}
                  row
                />
              </Grid>
            </Grid>
            <Grid mb='2rem' container spacing={2}>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <Input
                  customLabel='Rate'
                  withAsterisk
                  name='baseRate'
                  value={formik.values.baseRate}
                  size='small'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Typography color='grey.500'>IDR</Typography>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Typography color='grey.500'>Rp</Typography>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid mt='1.5rem' item xs={3} sm={3} md={3} lg={3} xl={3}>
                <Select
                  customLabel=''
                  size='small'
                  value={formik.values.basePeriod}
                  onChange={formik.handleChange}
                  fullWidth
                  name='baseRateType'
                  options={[
                    { label: 'Per Hour', value: 'Per Hour' },
                    { label: 'Per Day', value: 'Per Day' },
                    { label: 'Per Week', value: 'Per Week' },
                    { label: 'Per Month', value: 'Per Month' }
                  ]}
                />
              </Grid>
            </Grid>
            {
              suplementary.length > 0 && (
                <>
                  <Typography mb='1rem' color='primary' fontWeight='bold' fontSize='16px' >Supplementary</Typography>
                  {
                    suplementary.map((item, index) => (
                      <Box key={index} sx={{ width: '100%' }}>
                        <Grid mb='1rem' container spacing={4}>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Select
                              customLabel={'Compensation Component'}
                              size='small'
                              value={formik.values.suplementary[index]?.compensation}
                              onChange={formik.handleChange}
                              withAsterisk
                              fullWidth
                              name='compensation'
                              options={[
                                { label: 'Bonus', value: 'Bonus' },
                                { label: 'Overtime', value: 'Overtime' },
                                { label: 'Comission', value: 'Commision' },
                                { label: 'Piece Rate', value: 'Piece Rate' },
                                { label: 'Wage', value: 'Wage' },
                                { label: 'Salary', value: 'Salary' }
                              ]}
                            />
                          </Grid>
                          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                            <RadioGroup
                              withAsterisk
                              label='tax'
                              name='baseTax'
                              value={formik.values.suplementary[index]?.tax}
                              onChange={formik.handleChange}
                              options={[
                                { label: 'Taxable', value: 'Taxable' },
                                { label: 'Non-Taxable', value: 'Non-Taxable' }
                              ]}
                              row
                            />
                          </Grid>
                          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                            <MuiButton variant='contained' sx={{ backgroundColor: '#FEE2E2', color: '#B91C1C' }} size='small' onClick={() => handleDeleteItems(index)}><Delete />&nbsp; Delete</MuiButton>
                          </Grid>
                        </Grid>
                        <Grid mb='2rem' container spacing={2}>
                          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                            <Input
                              customLabel='Amount'
                              withAsterisk
                              name='rate'
                              value={formik.values.suplementary[index]?.rate}
                              size='small'
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <Typography color='grey.500'>IDR</Typography>
                                  </InputAdornment>
                                ),
                                startAdornment: (
                                  <InputAdornment position='start'>
                                    <Typography color='grey.500'>Rp</Typography>
                                  </InputAdornment>
                                )
                              }}
                            />
                          </Grid>
                          <Grid mt='1.5rem' item xs={3} sm={3} md={3} lg={3} xl={3}>
                            <Select
                              customLabel=''
                              size='small'
                              value={formik.values.suplementary[index]?.period}
                              onChange={formik.handleChange}
                              fullWidth
                              name='period'
                              options={[
                                { label: 'Per Hour', value: 'Per Hour' },
                                { label: 'Per Day', value: 'Per Day' },
                                { label: 'Per Week', value: 'Per Week' },
                                { label: 'Per Month', value: 'Per Month' }
                              ]}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    ))
                  }
                </>
              )
            }
            <MuiButton size='small' variant='contained' color='secondary' sx={{ color: '#FFFFFF' }} onClick={handleAddSupplementary}><Add />&nbsp;Add Supplementary Compensation</MuiButton>
          </>
        )
      }
    </>
  );
}

export default CnbEditForm;