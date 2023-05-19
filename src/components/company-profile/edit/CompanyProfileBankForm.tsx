/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Grid,
  Typography,
  Select,
  Box,
  MenuItem,
  Alert,
  FormControl } from '@mui/material';
import { Input, CheckBox} from '@/components/_shared/form';
import { styled as MuiStyled } from '@mui/material/styles';
import { CustomHooks } from '@/types/hooks';
import { useAppSelectors } from '@/hooks/index';


const AsteriskComponent = MuiStyled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

interface CompanyBankProps {
  bank: [];
  paymentMethod: [];
  handleInputChange: (_e: CustomHooks.HandleInput) => CustomHooks.HandleInput;
  values;
  errors;
}

function CompanyProfileBankForm ({bank, paymentMethod, handleInputChange, values, errors} :CompanyBankProps) {
  const { responser } = useAppSelectors(state => state);
  const convertCheckbox = (name, event) => {
    const obj = {
      target: {
        name, value: event?.target?.checked
      }
    };
    return obj;
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
            <FormControl fullWidth>
              <Typography sx={{ mb: '6px' }}>Bank<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                variant='outlined'
                size='small'
                value={values.bankBankInformation}
                onChange={handleInputChange}
                name='bankBankInformation'
                placeholder='Select Bank'
              >
                {bank.map((val, idx) => (
                  <MenuItem key={idx} value={val?.['id']}>{val?.['name']}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='bankAccountHolderNameBankInformation'
              customLabel='Bank Account Holder’s Name'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Bank Account Holder’s Name'
              value={values.bankAccountHolderNameBankInformation}
              error={errors.bankAccountHolderNameBankInformation}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='bankAccoutNoBankInformation'
              customLabel='Bank Account No'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Bank Account No'
              value={values.bankAccoutNoBankInformation}
              error={errors.bankAccoutNoBankInformation}
            />
          </Grid>
          <Grid item xs={3} md={3} lg={3} xl={3}>
            <Input
              name='bankCodeBankInformation'
              customLabel='Bank Code'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Bank Code'
              value={values.bankCodeBankInformation}
              error={errors.bankCodeBankInformation}
            />
          </Grid>
          <Grid item xs={3} md={3} lg={3} xl={3}>
            <Input
              name='branchCodeBankInformation'
              customLabel='Branch Code'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Branch Code'
              value={values.branchCodeBankInformation}
              error={errors.branchCodeBankInformation}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='branchNameBankInformation'
              customLabel='Branch Name'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Branch Name'
              value={values.branchNameBankInformation}
              error={errors.branchNameBankInformation}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='swiftCodeBankInformation'
              customLabel='Swift Code'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Swift Code'
              value={values.swiftCodeBankInformation}
              error={errors.swiftCodeBankInformation}
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
            <Box>
              <CheckBox
                customLabel='Monthly'
                name='isMonthly'
                checked={values.isMonthly}
                onChange={(e) => handleInputChange(convertCheckbox('isMonthly', e))}
              />
              <CheckBox
                customLabel='Weekly'
                name='isWeekly'
                checked={values.isWeekly}
                onChange={(e) => handleInputChange(convertCheckbox('isWeekly', e))}
              />
              <CheckBox
                customLabel='Bi Weekly'
                name='isBiWeekly'
                checked={values.isBiWeekly}
                onChange={(e) => handleInputChange(convertCheckbox('isBiWeekly', e))}
              />
            </Box>
          </Grid>
        </Grid>
        {!!values.isMonthly && (
          <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Box component='div' sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <Box component='div' sx={{ mr: '14px' }}>
                  <Typography component='div' variant='text-base' sx={{ mb: '6px' }}>Monthly Pay Period (includes overtime)<AsteriskComponent>*</AsteriskComponent></Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    <Input
                      name='monthlyPeriodStart'
                      withAsterisk={true}
                      onChange={handleInputChange}
                      size='small'
                      placeholder='Day 1'
                      value={values.monthlyPeriodStart}
                      error={errors.monthlyPeriodStart}
                    />
                    <Typography component='div' variant='text-base'> - </Typography>
                    <Input
                      name='monthlyPeriodEnd'
                      withAsterisk={true}
                      onChange={handleInputChange}
                      size='small'
                      placeholder='Day 31'
                      value={values.monthlyPeriodEnd}
                      error={errors.monthlyPeriodEnd}
                    />
                  </Box>
                </Box>
                <Box component='div'>
                  <Input
                    name='monthlyPayrollDate'
                    customLabel='Payroll Date'
                    withAsterisk={true}
                    onChange={handleInputChange}
                    size='small'
                    placeholder='Input Date'
                    value={values.monthlyPayrollDate}
                    error={errors.monthlyPayrollDate}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <FormControl fullWidth>
                <Typography sx={{ mb: '6px' }}>Default Payment Method<AsteriskComponent>*</AsteriskComponent></Typography>
                <Select
                  fullWidth
                  variant='outlined'
                  size='small'
                  value={values.monthlyMethod}
                  onChange={handleInputChange}
                  name='monthlyMethod'
                >
                  {paymentMethod.map((val, idx) => (
                    <MenuItem key={idx} value={val?.['id']}>{val?.['name']}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
        {!!values.isWeekly && (
          <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <FormControl fullWidth>
                <Typography sx={{ mb: '6px' }}>Weekly Pay Period (includes overtime)<AsteriskComponent>*</AsteriskComponent></Typography>
                <Select
                  fullWidth
                  variant='outlined'
                  size='small'
                  value={values.weeklyPeriod}
                  onChange={handleInputChange}
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
              <FormControl fullWidth>
                <Typography sx={{ mb: '6px' }}>Default Payment Method<AsteriskComponent>*</AsteriskComponent></Typography>
                <Select
                  fullWidth
                  variant='outlined'
                  size='small'
                  value={values.weeklyMethod}
                  onChange={handleInputChange}
                  name='weeklyMethod'
                >
                  {paymentMethod.map((val, idx) => (
                    <MenuItem key={idx} value={val?.['id']}>{val?.['name']}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
        {!!values.isBiWeekly && (
          <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography component='div' variant='text-base' sx={{ mb: '6px' }}>Bi Weekly Pay Period (includes overtime)<AsteriskComponent>*</AsteriskComponent></Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <FormControl fullWidth>
                  <Select
                    fullWidth
                    variant='outlined'
                    size='small'
                    value={values.biWeeklyPeriod}
                    onChange={handleInputChange}
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
                    value={values.biWeeklyPeriodWeek}
                    onChange={handleInputChange}
                    name='biWeeklyPeriodWeek'
                  >
                    <MenuItem value='First Week'>First Week</MenuItem>
                    <MenuItem value='Second Week'>Second Week</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <FormControl fullWidth>
                <Typography sx={{ mb: '6px' }}>Default Payment Method<AsteriskComponent>*</AsteriskComponent></Typography>
                <Select
                  fullWidth
                  variant='outlined'
                  size='small'
                  value={values.biWeeklyMethod}
                  onChange={handleInputChange}
                  name='biWeeklyMethod'
                >
                  {paymentMethod.map((val, idx) => (
                    <MenuItem key={idx} value={val?.['id']}>{val?.['name']}</MenuItem>
                  ))}
                </Select>
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
      </form>
    </>
  );
}

export default CompanyProfileBankForm;