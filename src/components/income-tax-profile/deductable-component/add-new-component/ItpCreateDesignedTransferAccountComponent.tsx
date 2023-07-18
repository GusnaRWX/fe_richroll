import { Button, Input, Select, RadioGroup, Textarea } from '@/components/_shared/form';
import { InfoOutlined } from '@mui/icons-material';
import {
  Box,
  Typography,
  Grid,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { validationSchemeItpDta } from './validate';
import { Tax } from '@/types/tax';

interface ItpDtaProps {
  refProp: React.Ref<HTMLFormElement>;
  nextPage: (_val: number) => void;
  setValues: React.Dispatch<React.SetStateAction<Tax.ItpDtaParams>>
  infoValues: Tax.ItpDtaParams,
  setIsInDtaValid: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ItpCreateDesignedTransferAccountComponent({ refProp, nextPage, setValues, infoValues, setIsInDtaValid }: ItpDtaProps) {
  const {t} = useTranslation();
  const tPath = 'income_tax_profile.deductable_component.add_new_component.form.create_dta.';

  const formik = useFormik({
    initialValues: {
      bankType: infoValues?.bank,
      bank: infoValues?.bank,
      holder: infoValues?.holder,
      no: infoValues?.no,
      bankCode: infoValues?.bankCode,
      branchCode: infoValues?.branchCode,
      branchName: infoValues?.branchName,
      swiftCode: infoValues?.swiftCode,
      notes: infoValues?.notes,
    },
    validationSchema: validationSchemeItpDta,
    onSubmit: (values,  { setErrors }) => {
      console.log(values);
      handleSubmit(values, setErrors);
    }
  });

  const handleSubmit = (val, setErrors) => {
    const allInfoValues = {
      ...val
    };
    setValues(allInfoValues);
    nextPage(2);
    setIsInDtaValid(true);
    setErrors({});
  };

  // React.useEffect(() => {
  //   if (account !== 'central') {
  //     formik.resetForm();
  //   }
  // }, [account]);

  const Dummyoption = [
    { value: '1', label: 'Dummy 1' },
    { value: '2', label: 'Dummy 2' },
    { value: '3', label: 'Dummy 3' },
  ];

  return (
    <>
      <form ref={refProp} onSubmit={formik.handleSubmit}>
        <Typography
          style={{ color: '#223567', fontWeight: 700, fontSize: '16px' }}
        >
          {t(`${tPath}title`)}
        </Typography>
        <Grid container spacing={2} sx={{mt:'20px'}}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <RadioGroup
              name='bankType'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bankType}
              row
              options={[
                { label: t(`${tPath}type_option.central_account`), value: '1' },
                { label: t(`${tPath}type_option.individual_account`), value: '2' },
                { label: t(`${tPath}type_option.company_account_only`), value: '3' }
              ]}
              // error={formik.touched.bankType && Boolean(formik.errors.bankType)}
              // helperText={formik.touched.bankType && formik.errors.bankType}
            />
          </Grid>
        </Grid>

        <Grid container sx={{mt:'32px'}}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
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
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{marginTop: '32px'}}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Select
              withAsterisk
              customLabel={t(`${tPath}bank`)}
              size='small'
              fullWidth
              options={Dummyoption}
              name='bank'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bank}
              error={formik.touched.bank && Boolean(formik.errors.bank)}
              // helperText={formik.touched.bank && formik.errors.bank}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              placeholder={t(`${tPath}bank_account_holders_name_placeholder`)}
              customLabel={t(`${tPath}bank_account_holders_name`)}
              withAsterisk
              size='small'
              name='holder'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.holder}
              error={formik.touched.holder && Boolean(formik.errors.holder)}
              helperText={formik.touched.holder && formik.errors.holder}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{marginTop: '32px'}}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              placeholder={t(`${tPath}bank_account_no_placeholder`)}
              customLabel={t(`${tPath}bank_account_no`)}
              withAsterisk
              size='small'
              name='no'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.no}
              error={formik.touched.no && Boolean(formik.errors.no)}
              helperText={formik.touched.no && formik.errors.no}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Input
                  placeholder={t(`${tPath}bank_code_placeholder`)}
                  customLabel={t(`${tPath}bank_code`)}
                  size='small'
                  name='bankCode'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.bankCode}
                  error={formik.touched.bankCode && Boolean(formik.errors.bankCode)}
                  helperText={formik.touched.bankCode && formik.errors.bankCode}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Input
                  placeholder={t(`${tPath}branch_code_placeholder`)}
                  customLabel={t(`${tPath}branch_code`)}
                  size='small'
                  name='branchCode'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.branchCode}
                  error={formik.touched.branchCode && Boolean(formik.errors.branchCode)}
                  helperText={formik.touched.branchCode && formik.errors.branchCode}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{marginTop: '32px'}}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              placeholder={t(`${tPath}branch_name_placeholder`)}
              customLabel={t(`${tPath}branch_name`)}
              size='small'
              name='branchName'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.branchName}
              error={formik.touched.branchName && Boolean(formik.errors.branchName)}
              helperText={formik.touched.branchName && formik.errors.branchName}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              placeholder={t(`${tPath}swift_code_placeholder`)}
              customLabel={t(`${tPath}swift_code`)}
              size='small'
              name='swiftCode'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.swiftCode}
              error={formik.touched.swiftCode && Boolean(formik.errors.swiftCode)}
              helperText={formik.touched.swiftCode && formik.errors.swiftCode}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{marginTop: '12px'}}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Textarea
              customLabel={t(`${tPath}notes`)}
              placeholder={t(`${tPath}notes_placeholder`)}
              minRows={4}
              style={{ resize: 'vertical' }}
              name='notes'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.notes}
              // error={formik.touched.notes && Boolean(formik.errors.notes)}
              // helperText={formik.touched.notes && formik.errors.notes}
            />
            <Typography
              style={{
                fontSize: '14px',
                marginTop: '6px',
                color: '#6B7280',
              }}
            >
              {t(`${tPath}max_char_info`)}
            </Typography>
          </Grid>
        </Grid>

        <Box
          component='div'
          sx={{
            marginTop: '16px',
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
            gap: '16px',
          }}
        >
          <Button
            sx={{ padding: '9px', width: 'fit-content' }}
            label={t('button.back')}
            variant='outlined'
            onClick={() => nextPage(0)}
          />
          <Button
            sx={{ padding: '9px', width: 'fit-content' }}
            label={t('button.next')}
            variant='contained'
            type={'submit'}
          />
        </Box>
      </form>
    </>
  );
}
