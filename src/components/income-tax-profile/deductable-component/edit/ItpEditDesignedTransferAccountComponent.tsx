import { Input, Button } from '@/components/_shared/form';
import { InfoOutlined } from '@mui/icons-material';
import {
  Box,
  FormHelperText,
  MenuItem,
  Radio,
  Select,
  Typography,
  RadioGroup,
  FormControlLabel,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormik } from 'formik';
import * as Yup from 'yup';

interface ItpEditDesignedTransferAccountComponentProps {
  setValue: Dispatch<SetStateAction<number>>
}

export default function ItpEditDesignedTransferAccountComponent({ setValue }: ItpEditDesignedTransferAccountComponentProps) {
  const {t} = useTranslation();
  const [account, setAccount] = useState('central');
  const tPath = 'income_tax_profile.deductable_component.add_new_component.form.create_dta.';

  const AsteriskComponent = styled('span')(({ theme }) => ({
    color: theme.palette.error.main,
  }));

  const boxStyle = {
    display: 'flex',
    gap: '15px',
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
    marginTop: '32px',
  };

  const validationSchema = Yup.object({
    bank: Yup.string().required('This Field is Required'),
    holder: Yup.string().required('This Field is Required'),
    no: Yup.string().required('This Field is Required'),
    bankCode: Yup.string(),
    branchCode: Yup.string(),
    branchName: Yup.string(),
    swiftCode: Yup.string(),
    notes: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      bank: '',
      holder: '',
      no: '',
      bankCode: '',
      branchCode: '',
      branchName: '',
      swiftCode: '',
      notes: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setValue(2);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value);
  };

  React.useEffect(() => {
    if (account !== 'central') {
      formik.resetForm();
    }
  }, [account]);

  return (
    <Box component='div' sx={{ p: '16px' }}>
      <Typography
        style={{ color: '#223567', fontWeight: 700, fontSize: '16px' }}
      >
        {t(`${tPath}title`)}
      </Typography>
      <Box
        component='div'
        sx={{ display: ' flex', gap: '32px', marginTop: '27px' }}
      >
        <Box component='div' sx={{ display: 'flex', alignItems: 'center' }}>
          <RadioGroup row value={account} onChange={handleChange}>
            <FormControlLabel
              value='central'
              control={<Radio />}
              label={t(`${tPath}type_option.central_account`)}
            />
            <FormControlLabel
              value='individual'
              control={<Radio />}
              label={t(`${tPath}type_option.individual_account`)}
            />
            <FormControlLabel
              value='company'
              control={<Radio />}
              label={t(`${tPath}type_option.company_account_only`)}
            />
          </RadioGroup>
        </Box>
      </Box>
      <Box
        component='div'
        sx={{
          backgroundColor: '#E9EFFF',
          width: '100%',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <InfoOutlined sx={{ color: '#223567' }} />
        <Typography
          variant='text-base'
          component='div'
          sx={{
            marginLeft: '6.67px',
            fontWeight: 400,
            fontSize: '12px',
            color: '#223567',
          }}
        >
          {t(`${tPath}message`)}
        </Typography>
      </Box>

      <Box sx={boxStyle}>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <Typography
            component='div'
            sx={{ color: '#374151', fontWeight: 400 }}
          >
            {t(`${tPath}bank`)} <AsteriskComponent>*</AsteriskComponent>
          </Typography>

          <Select
            fullWidth
            placeholder='Select Bank'
            size='small'
            disabled={account !== 'central'}
            sx={
              account !== 'central'
                ? {
                  backgroundColor: '#F3F4F6',
                  color: '#6B7280',
                }
                : null
            }
            value={formik.values.bank}
            onChange={(e) => formik.setFieldValue('bank', e.target.value)}
          >
            <MenuItem value='1'>1</MenuItem>
            <MenuItem value='2'>2</MenuItem>
            <MenuItem value='3'>3</MenuItem>
          </Select>
          {formik.touched.bank && formik.errors.bank ?(
            <Typography sx={{color: '#DC2626'}}>{formik.errors.bank}</Typography>
          ):null}
        </Box>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <Typography
            component='div'
            sx={{ color: '#374151', fontWeight: 400 }}
          >
            {t(`${tPath}bank_account_holders_name`)} <AsteriskComponent>*</AsteriskComponent>
          </Typography>
          <Input
            size='small'
            placeholder={t(`${tPath}bank_account_holders_name_placeholder`)}
            disabled={account !== 'central'}
            sx={
              account !== 'central'
                ? {
                  backgroundColor: '#F3F4F6',
                  color: '#6B7280',
                }
                : null
            }
            value={formik.values.holder}
            onChange={(e) => formik.setFieldValue('holder', e.target.value)}
          />
          {formik.touched.holder && formik.errors.holder ?(
            <Typography sx={{color: '#DC2626'}}>{formik.errors.holder}</Typography>
          ):null}
        </Box>
      </Box>

      <Box sx={boxStyle}>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <Typography
            component='div'
            sx={{ color: '#374151', fontWeight: 400 }}
          >
            {t(`${tPath}bank_account_no`)} <AsteriskComponent>*</AsteriskComponent>
          </Typography>
          <Input
            size='small'
            placeholder={t(`${tPath}bank_account_no_placeholder`)}
            disabled={account !== 'central'}
            sx={
              account !== 'central'
                ? {
                  backgroundColor: '#F3F4F6',
                  color: '#6B7280',
                }
                : null
            }
            value={formik.values.no}
            onChange={(e) => formik.setFieldValue('no', e.target.value)}
          />
          {formik.touched.no && formik.errors.no ?(
            <Typography sx={{color: '#DC2626'}}>{formik.errors.no}</Typography>
          ):null}
        </Box>

        <Box
          component='div'
          sx={{
            width: { xs: '100%', md: '50%' },
            display: 'flex',
            gap: '15px',
          }}
        >
          <Box component='div' sx={{ width: '50%' }}>
            <Typography
              component='div'
              sx={{ color: '#374151', fontWeight: 400 }}
            >
              {t(`${tPath}bank_code`)}
            </Typography>
            <Input
              size='small'
              placeholder={t(`${tPath}bank_code_placeholder`)}
              disabled={account !== 'central'}
              sx={
                account !== 'central'
                  ? {
                    backgroundColor: '#F3F4F6',
                    color: '#6B7280',
                  }
                  : null
              }
            />
          </Box>

          <Box component='div' sx={{ width: '50%' }}>
            <Typography
              component='div'
              sx={{ color: '#374151', fontWeight: 400 }}
            >
              {t(`${tPath}branch_code`)}
            </Typography>
            <Input
              size='small'
              placeholder={t(`${tPath}branch_code_placeholder`)}
              disabled={account !== 'central'}
              sx={
                account !== 'central'
                  ? {
                    backgroundColor: '#F3F4F6',
                    color: '#6B7280',
                  }
                  : null
              }
              value={formik.values.branchCode}
              onChange={(e) =>
                formik.setFieldValue('branchCode', e.target.value)
              }
            />
          </Box>
        </Box>
      </Box>

      <Box sx={boxStyle}>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <Typography
            component='div'
            sx={{ color: '#374151', fontWeight: 400 }}
          >
            {t(`${tPath}branch_name`)}
          </Typography>

          <Input
            size='small'
            placeholder={t(`${tPath}branch_name_placeholder`)}
            disabled={account !== 'central'}
            sx={
              account !== 'central'
                ? {
                  backgroundColor: '#F3F4F6',
                  color: '#6B7280',
                }
                : null
            }
            value={formik.values.branchName}
            onChange={(e) => formik.setFieldValue('branchName', e.target.value)}
          />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <Typography
            component='div'
            sx={{ color: '#374151', fontWeight: 400 }}
          >
            {t(`${tPath}swift_code`)}
          </Typography>

          <Input
            size='small'
            placeholder={t(`${tPath}swift_code_placeholder`)}
            disabled={account !== 'central'}
            sx={
              account !== 'central'
                ? {
                  backgroundColor: '#F3F4F6',
                  color: '#6B7280',
                }
                : null
            }
            value={formik.values.swiftCode}
            onChange={(e) => formik.setFieldValue('swiftCode', e.target.value)}
          />
        </Box>
      </Box>

      <Box component='div' sx={{ marginTop: '32px' }}>
        <Typography
          component='div'
          sx={{ marginBottom: '7px', color: '#374151', fontWeight: 700 }}
        >
          {t(`${tPath}notes`)}
        </Typography>
        <Input
          size='small'
          placeholder={t(`${tPath}notes_placeholder`)}
          required
          sx={{
            color: '#6B7280',
            borderColor: '#E5E7EB',
          }}
          value={formik.values.notes}
          onChange={(e) => formik.setFieldValue('notes', e.target.value)}
        />
        <FormHelperText
          sx={{ fontWeight: 500, color: '#6B7280', fontSize: '14px' }}
        >
          {t(`${tPath}max_char_info`)}
        </FormHelperText>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap:'15px' }}>
            <Button
              color='primary'
              label={t('button.next')}
              sx={{ width: 'fit-content' }}
              onClick={() => formik.submitForm()}
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
