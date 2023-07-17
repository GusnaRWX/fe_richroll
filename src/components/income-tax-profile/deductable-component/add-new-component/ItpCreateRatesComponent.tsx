import React from 'react';
import { Button, Form, Input, Select } from '@/components/_shared/form';
import { Text } from '@/components/_shared/common';
import {
  FormGroup,
  FormControlLabel,
  Grid,
  InputAdornment,
  Typography,
  styled,
  Switch,
  Box,
} from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { validationSchemeItpRates, validationSchemeItpRatesManual } from './validate';
import { Tax } from '@/types/tax';


const condition = [
  {
    label: 'Martial Status',
    value: 'martial-status',
  },
];

const listMenuItem = [
  {
    label: '=',
    value: '='
  },
  {
    label: '≥',
    value: '≥'
  },
  {
    label: '≤',
    value: '≤'
  },
  {
    label: '≠',
    value: '≠'
  },
];

interface ItpRatesProps {
  refProp: React.Ref<HTMLFormElement>;
  nextPage: React.Dispatch<React.SetStateAction<number>>
  setValues: React.Dispatch<React.SetStateAction<Tax.ItpRatesParams>>
  infoValues: Tax.ItpRatesParams,
  setIsInRatesValid: React.Dispatch<React.SetStateAction<boolean>>
  btnRefSubmit: React.RefObject<HTMLButtonElement>
}

export default function ItpCreateRatesComponent({ refProp, nextPage, setValues, infoValues, setIsInRatesValid, btnRefSubmit }: ItpRatesProps) {
  const {t} = useTranslation();
  const [deductableType, setDeductableType] = React.useState(infoValues?.type);
  const tPath = 'income_tax_profile.deductable_component.add_new_component.form.rates.';

  const initialValues = {
    type : infoValues.type,
    deductableCondition : infoValues.deductableCondition,
    amount : infoValues.amount,
    factorUnitCondition : infoValues.factorUnitCondition
  };

  const handleSubmit = (values) => {
    setIsInRatesValid(true);
    setValues(values);
    nextPage(2);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => handleSubmit(values),
    validationSchema : deductableType ? validationSchemeItpRates : validationSchemeItpRatesManual
  });

  const AsteriskComponent = styled('span')(({ theme }) => ({
    color: theme.palette.error.main,
  }));

  return (
    <>
      <form ref={refProp} onSubmit={formik.handleSubmit}>
        <Grid container flexDirection='column' gap={4}>
          <Grid item>
            <FormGroup>
              <Text
                title={t(`${tPath}select_type`)}
                color='grey.700'
                fontWeight='400'
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={deductableType}
                    name='type'
                    onChange={(e) => setDeductableType(e.target.checked)}
                    onBlur={formik.handleBlur}
                    value={formik.values.type}
                  />
                }
                label={
                  <Text
                    title='Auto'
                    color='primary.600'
                    fontWeight='700'
                  />
                }
              />
            </FormGroup>
          </Grid>
          {deductableType && (
            <Grid item>
              <Select
                customLabel={t(`${tPath}dc_condition`)}
                withAsterisk
                size='small'
                options={condition}
                name='deductableCondition'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.deductableCondition}
              // error={formik.touched.deductableCondition && Boolean(formik.errors.deductableCondition)}
              // helperText={formik.touched.deductableCondition && formik.errors.deductableCondition}
              />
            </Grid>
          )}
          <Grid item>
            {deductableType && (
              <Form p={2} display='flex' flexDirection='column' gap='24px' sx={{backgroundColor: 'grey.50'}}>
                <Grid container flexDirection='row'>
                  <Grid item xs={12} md={6}>
                    <Typography mb='6px'>{t(`${tPath}fu_condition`)} 1 <AsteriskComponent>*</AsteriskComponent></Typography>
                    <Grid item container flexDirection='row' gap={1.5}>
                      <Grid item xs={1.5}>
                        <Select
                          size='small'
                          options={listMenuItem}
                          name='factorUnitCondition.0.condition'
                          onChange={(e) => formik.setFieldValue(`factorUnitCondition[0].condition`, e.target.value)}
                          value={formik.values.factorUnitCondition[0].condition}
                        // error={formik.touched.deductableCondition && Boolean(formik.errors.deductableCondition)}
                        // helperText={formik.touched.deductableCondition && formik.errors.deductableCondition}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <Input
                          size='small'
                          onChange={(e) => formik.setFieldValue(`factorUnitCondition.0.factorUnitName`, e.target.value)}
                          value={formik.values.factorUnitCondition[0].factorUnitName}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={0} md={6} />
                </Grid>
                <Grid container flexDirection='row'>
                  <Grid pl={8.5} item xs={12} md={6}>
                    <Typography mb='6px'>{t(`${tPath}sub_condition`)} 1 <AsteriskComponent>*</AsteriskComponent></Typography>
                    <Grid item container flexDirection='row' gap={1.5}>
                      <Grid item xs={1.5}>
                        <Select
                          size='small'
                          options={listMenuItem}
                          onChange={(e) => formik.setFieldValue('factorUnitCondition.0.subCondition.0.condition', e.target.value)}
                          value={formik.values.factorUnitCondition[0].subCondition[0].condition}
                        />
                      </Grid>
                      <Grid item xs={8.8}>
                        <Input
                          size='small'
                          onChange={(e) => formik.setFieldValue('factorUnitCondition.0.subCondition.0.subName', e.target.value)}
                          value={formik.values.factorUnitCondition[0].subCondition[0].subName}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Input
                      size='small'
                      customLabel={t(`${tPath}amount`)}
                      withAsterisk
                      onChange={(e) => formik.setFieldValue('factorUnitCondition.0.subCondition.0.subAmount', e.target.value)}
                      value={formik.values.factorUnitCondition[0].subCondition[0].subAmount}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>Rp</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container flexDirection='row'>
                  <Grid pl={8.5} item xs={12} md={6}>
                    <Typography mb='6px'>{t(`${tPath}sub_condition`)} 2 <AsteriskComponent>*</AsteriskComponent></Typography>
                    <Grid item container flexDirection='row' gap={1.5}>
                      <Grid item xs={1.5}>
                        <Select
                          size='small'
                          options={listMenuItem}
                          onChange={(e) => formik.setFieldValue('factorUnitCondition.0.subCondition.1.condition', e.target.value)}
                          value={formik.values.factorUnitCondition[0].subCondition[1].condition}
                        />
                      </Grid>
                      <Grid item xs={8.8}>
                        <Input
                          size='small'
                          onChange={(e) => formik.setFieldValue('factorUnitCondition.0.subCondition.1.subName', e.target.value)}
                          value={formik.values.factorUnitCondition[0].subCondition[1].subName}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Input
                      size='small'
                      customLabel={t(`${tPath}amount`)}
                      withAsterisk
                      onChange={(e) => formik.setFieldValue('factorUnitCondition.0.subCondition.1.subAmount', e.target.value)}
                      value={formik.values.factorUnitCondition[0].subCondition[1].subAmount}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>Rp</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
            {!deductableType && (
              <>
                <Grid container flexDirection='row' gap={3}>
                  <Grid item xs={12} md={5.5}>
                    <Input
                      size='small'
                      customLabel={t(`${tPath}dc_condition`)}
                      withAsterisk
                      onChange={(e) => formik.setFieldValue('deductableCondition', e.target.value)}
                      value={formik.values.deductableCondition}
                    />
                  </Grid>
                  <Grid item xs={12} md={5.5}>
                    <Input
                      size='small'
                      customLabel={t(`${tPath}amount`)}
                      withAsterisk
                      onChange={(e) => formik.setFieldValue('amount', e.target.value)}
                      value={formik.values.amount}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>Rp</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </>
            )}
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
            onClick={() => nextPage(1)}
          />
          <button onClick={() => formik.submitForm()} ref={btnRefSubmit} hidden />
        </Box>
      </form>
    </>
  );
}
