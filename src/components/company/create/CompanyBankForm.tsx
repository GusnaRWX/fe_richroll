/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Grid,
  Typography,
  Select,
  FormHelperText,
  Box,
  MenuItem,
  Alert,
  FormControl } from '@mui/material';
import { Input, Button, CheckBox} from '@/components/_shared/form';
import { Text } from '@/components/_shared/common';
import { styled as MuiStyled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useAppSelectors } from '@/hooks/index';
import { ifThenElse, compareCheck } from '@/utils/helper';


const AsteriskComponent = MuiStyled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

const NextBtnWrapper = MuiStyled(Box)(({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginTop: '2rem'
}));

interface CompanyBankProps {
  bank: [];
  paymentMethod: [];
  formik;
}

function CompanyBankForm ({bank, paymentMethod, formik} :CompanyBankProps) {
  const { responser } = useAppSelectors(state => state);
  const router = useRouter();
  const convertCheckbox = (name, event) => {
    return {
      target: {
        name, value: event?.target?.checked
      }
    };
  };

  const checkPaymentMethod = (value: string) => {
    if (value?.length === 0) {
      return <Text title='Select Payment Method' color='grey.400' />;
    }
    const selectedPaymentMethod = paymentMethod.find(type => type?.['id'] === value);
    if (selectedPaymentMethod) {
      return `${selectedPaymentMethod?.['name']}`;
    }
    return null;
  };

  return (
    <>
      <form>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography component='h3' fontSize={18} color='primary'>Bank Information</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth error={compareCheck(formik.touched.bankBankInformation, Boolean(formik.errors.bankBankInformation))}>
              <Typography sx={{ mb: '6px' }}>Bank<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                displayEmpty
                variant='outlined'
                size='small'
                placeholder='Select Bank'
                name='bankBankInformation'
                value={formik.values.bankBankInformation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                renderValue={(value: string) => {
                  if (value.length === 0) {
                    return <Text title='Select Bank' color='grey.400' />;
                  }
                  const selectedBank = bank.find(type => type?.['id'] === value);
                  if (selectedBank) {
                    return `${selectedBank?.['name']}`;
                  }
                  return null;
                }}
              >
                {bank?.map((val, idx) => (
                  <MenuItem key={idx} value={val?.['id']}>{val?.['name']}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{ifThenElse(formik.touched.bankBankInformation, formik.errors.bankBankInformation, '')}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='bankAccountHolderNameBankInformation'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={compareCheck(formik.touched.bankAccountHolderNameBankInformation, Boolean(formik.errors.bankAccountHolderNameBankInformation))}
              helperText={ifThenElse(formik.touched.bankAccountHolderNameBankInformation, formik.errors.bankAccountHolderNameBankInformation, '')}
              customLabel='Bank Account Holder’s Name'
              withAsterisk={true}
              size='small'
              value={formik.values.bankAccountHolderNameBankInformation}
              placeholder='Input Bank Account Holder’s Name'
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='bankAccoutNoBankInformation'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={compareCheck(formik.touched.bankAccoutNoBankInformation, Boolean(formik.errors.bankAccoutNoBankInformation))}
              helperText={ifThenElse(formik.touched.bankAccoutNoBankInformation, formik.errors.bankAccoutNoBankInformation, '')}
              customLabel='Bank Account No'
              withAsterisk={true}
              size='small'
              value={formik.values.bankAccoutNoBankInformation}
              placeholder='Input Bank Account No'
            />
          </Grid>
          <Grid item xs={3} md={3} lg={3} xl={3}>
            <Input
              name='bankCodeBankInformation'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={compareCheck(formik.touched.bankCodeBankInformation, Boolean(formik.errors.bankCodeBankInformation))}
              helperText={ifThenElse(formik.touched.bankCodeBankInformation, formik.errors.bankCodeBankInformation, '')}
              customLabel='Bank Code'
              withAsterisk={false}
              size='small'
              value={formik.values.bankCodeBankInformation}
              placeholder='Input Bank Code'
            />
          </Grid>
          <Grid item xs={3} md={3} lg={3} xl={3}>
            <Input
              name='branchCodeBankInformation'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={compareCheck(formik.touched.branchCodeBankInformation, Boolean(formik.errors.branchCodeBankInformation))}
              helperText={ifThenElse(formik.touched.branchCodeBankInformation, formik.errors.branchCodeBankInformation, '')}
              customLabel='Branch Code'
              withAsterisk={false}
              size='small'
              value={formik.values.branchCodeBankInformation}
              placeholder='Input Branch Code'
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='branchNameBankInformation'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={compareCheck(formik.touched.branchNameBankInformation, Boolean(formik.errors.branchNameBankInformation))}
              helperText={ifThenElse(formik.touched.branchNameBankInformation, formik.errors.branchNameBankInformation, '')}
              customLabel='Branch Name'
              withAsterisk={false}
              size='small'
              value={formik.values.branchNameBankInformation}
              placeholder='Input Branch Name'
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='swiftCodeBankInformation'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={compareCheck(formik.touched.swiftCodeBankInformation, Boolean(formik.errors.swiftCodeBankInformation))}
              helperText={ifThenElse(formik.touched.swiftCodeBankInformation, formik.errors.swiftCodeBankInformation, '')}
              customLabel='Swift Code'
              withAsterisk={false}
              size='small'
              value={formik.values.swiftCodeBankInformation}
              placeholder='Input Swift Code'
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography component='h3' fontSize={18} color='primary'>Payroll Information</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography component='div' variant='text-base'>Schedule Type<AsteriskComponent>*</AsteriskComponent></Typography>
            {
              compareCheck(!formik.values.isMonthly, !formik.values.isWeekly, !formik.values.isBiWeekly) && (
                <Box>
                  <Typography component='span' fontSize='12px' color='red.500'>This field is required</Typography>
                </Box>
              )
            }
            <Box>
              <CheckBox
                customLabel='Monthly'
                name='isMonthly'
                checked={formik.values.isMonthly}
                onChange={(e) => formik.handleChange(convertCheckbox('isMonthly', e))}
              />
              <CheckBox
                customLabel='Weekly'
                name='isWeekly'
                checked={formik.values.isWeekly}
                onChange={(e) => formik.handleChange(convertCheckbox('isWeekly', e))}
              />
              <CheckBox
                customLabel='Bi Weekly'
                name='isBiWeekly'
                checked={formik.values.isBiWeekly}
                onChange={(e) => formik.handleChange(convertCheckbox('isBiWeekly', e))}
              />
            </Box>
          </Grid>
        </Grid>
        {!!formik.values.isMonthly && (
          <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Box component='div' sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <Box component='div' sx={{ mr: '14px' }}>
                  <Typography component='div' variant='text-base' sx={{ mb: '6px' }}>Monthly Pay Period (includes overtime)<AsteriskComponent>*</AsteriskComponent></Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    <Input
                      name='monthlyPeriodStart'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={compareCheck(formik.touched.monthlyPeriodStart, Boolean(formik.errors.monthlyPeriodStart))}
                      helperText={ifThenElse(formik.touched.monthlyPeriodStart, formik.errors.monthlyPeriodStart, '')}
                      withAsterisk={true}
                      size='small'
                      value={formik.values.monthlyPeriodStart}
                      placeholder='Day 1'
                    />
                    <Typography component='div' variant='text-base'> - </Typography>
                    <Input
                      name='monthlyPeriodEnd'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={compareCheck(formik.touched.monthlyPeriodEnd, Boolean(formik.errors.monthlyPeriodEnd))}
                      helperText={ifThenElse(formik.touched.monthlyPeriodEnd, formik.errors.monthlyPeriodEnd, '')}
                      withAsterisk={true}
                      size='small'
                      value={formik.values.monthlyPeriodEnd}
                      placeholder='Day 31'
                    />
                  </Box>
                </Box>
                <Box component='div'>
                  <Input
                    name='monthlyPayrollDate'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={compareCheck(formik.touched.monthlyPayrollDate, Boolean(formik.errors.monthlyPayrollDate))}
                    helperText={ifThenElse(formik.touched.monthlyPayrollDate, formik.errors.monthlyPayrollDate, '')}
                    withAsterisk={true}
                    size='small'
                    value={formik.values.monthlyPayrollDate}
                    placeholder='Input Date'
                    customLabel='Payroll Date'
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <FormControl fullWidth error={compareCheck(formik.touched.monthlyMethod, Boolean(formik.errors.monthlyMethod))}>
                <Typography sx={{ mb: '6px' }}>Default Payment Method<AsteriskComponent>*</AsteriskComponent></Typography>
                <Select
                  fullWidth
                  displayEmpty
                  variant='outlined'
                  size='small'
                  placeholder='Select Payment Method'
                  name='monthlyMethod'
                  value={formik.values.monthlyMethod}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  renderValue={(value: string) => {
                    return checkPaymentMethod(value);
                  }}
                >
                  {paymentMethod?.map((val, idx) => (
                    <MenuItem key={idx} value={val?.['id']}>{val?.['name']}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>{ifThenElse(formik.touched.monthlyMethod, formik.errors.monthlyMethod, '')}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        )}
        {!!formik.values.isWeekly && (
          <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <FormControl fullWidth>
                <Typography sx={{ mb: '6px' }}>Weekly Pay Period (includes overtime)<AsteriskComponent>*</AsteriskComponent></Typography>
                <Select
                  fullWidth
                  variant='outlined'
                  size='small'
                  value={formik.values.weeklyPeriod}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='weeklyPeriod'
                >
                  <MenuItem value='Sunday'>Sunday</MenuItem>
                  <MenuItem value='Monday'>Monday</MenuItem>
                  <MenuItem value='Thursday'>Thursday</MenuItem>
                  <MenuItem value='Wednesday'>Wednesday</MenuItem>
                  <MenuItem value='Friday'>Friday</MenuItem>
                  <MenuItem value='Saturday'>Saturday</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <FormControl fullWidth error={compareCheck(formik.touched.weeklyMethod, Boolean(formik.errors.weeklyMethod))}>
                <Typography sx={{ mb: '6px' }}>Default Payment Method<AsteriskComponent>*</AsteriskComponent></Typography>
                <Select
                  fullWidth
                  displayEmpty
                  variant='outlined'
                  size='small'
                  placeholder='Select Payment Method'
                  name='weeklyMethod'
                  value={formik.values.weeklyMethod}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  renderValue={(value: string) => {
                    return checkPaymentMethod(value);
                  }}
                >
                  {paymentMethod?.map((val, idx) => (
                    <MenuItem key={idx} value={val?.['id']}>{val?.['name']}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>{ifThenElse(formik.touched.weeklyMethod, formik.errors.weeklyMethod, '')}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        )}
        {!!formik.values.isBiWeekly && (
          <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography component='div' variant='text-base' sx={{ mb: '6px' }}>Bi Weekly Pay Period (includes overtime)<AsteriskComponent>*</AsteriskComponent></Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <FormControl fullWidth>
                  <Select
                    fullWidth
                    variant='outlined'
                    size='small'
                    value={formik.values.biWeeklyPeriod}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='biWeeklyPeriod'
                  >
                    <MenuItem value='Sunday'>Sunday</MenuItem>
                    <MenuItem value='Monday'>Monday</MenuItem>
                    <MenuItem value='Thursday'>Thursday</MenuItem>
                    <MenuItem value='Wednesday'>Wednesday</MenuItem>
                    <MenuItem value='Friday'>Friday</MenuItem>
                    <MenuItem value='Saturday'>Saturday</MenuItem>
                  </Select>
                </FormControl>
                <Typography component='div' variant='text-base'> - </Typography>
                <FormControl fullWidth>
                  <Select
                    fullWidth
                    variant='outlined'
                    size='small'
                    value={formik.values.biWeeklyPeriodWeek}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='biWeeklyPeriodWeek'
                  >
                    <MenuItem value='First Week'>First Week</MenuItem>
                    <MenuItem value='Second Week'>Second Week</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <FormControl fullWidth error={compareCheck(formik.touched.biWeeklyMethod, Boolean(formik.errors.biWeeklyMethod))}>
                <Typography sx={{ mb: '6px' }}>Default Payment Method<AsteriskComponent>*</AsteriskComponent></Typography>
                <Select
                  fullWidth
                  displayEmpty
                  variant='outlined'
                  size='small'
                  placeholder='Select Payment Method'
                  name='biWeeklyMethod'
                  value={formik.values.biWeeklyMethod}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  renderValue={(value: string) => {
                    return checkPaymentMethod(value);
                  }}
                >
                  {paymentMethod?.map((val, idx) => (
                    <MenuItem key={idx} value={val?.['id']}>{val?.['name']}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>{ifThenElse(formik.touched.biWeeklyMethod, formik.errors.biWeeklyMethod, '')}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        )}
        {![200, 201, 0].includes(responser?.code) && (
          <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
            <Grid item xs={6} md={6} lg={6} xl={6}></Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Alert severity='error'>{responser?.message}</Alert>
            </Grid>
          </Grid>
        )}
        <NextBtnWrapper>
          <Button onClick={() => { router.push('/company');}} fullWidth={false} size='small' label='Cancel' variant='outlined' sx={{ mr: '12px' }} color='primary'/>
          <Button onClick={() => { formik.submitForm(); }} disabled={compareCheck(!formik.values.isMonthly, !formik.values.isWeekly, !formik.values.isBiWeekly)} fullWidth={false} size='small' label='Save' color='primary'/>
        </NextBtnWrapper>
      </form>
    </>
  );
}

export default CompanyBankForm;