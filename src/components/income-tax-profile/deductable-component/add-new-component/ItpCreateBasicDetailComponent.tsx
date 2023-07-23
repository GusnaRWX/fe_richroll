import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Button, Input, Select, Textarea } from '@/components/_shared/form';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { validationSchemeItpBasicDetail } from './validate';
import { Tax } from '@/types/tax';

interface ItpBasicDetailProps {
  refProp: React.Ref<HTMLFormElement>;
  nextPage: (_val: number) => void;
  setValues: React.Dispatch<React.SetStateAction<Tax.ItpBasicDetailParams>>
  infoValues: Tax.ItpBasicDetailParams,
  setIsInBasicDetailValid: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ItpCreateBasicDetailComponent({ refProp, nextPage, setValues, infoValues, setIsInBasicDetailValid }: ItpBasicDetailProps) {
  const {t} = useTranslation();
  const t_key = 'income_tax_profile.deductable_component.add_new_component.form.create_basic_detail';

  const Dummyoption = [
    { value: '1', label: 'Dummy 1' },
    { value: '2', label: 'Dummy 2' },
    { value: '3', label: 'Dummy 3' },
  ];


  const formik = useFormik({
    initialValues: {
      componentName: infoValues?.componentName,
      country: infoValues?.country,
      province: infoValues?.province,
      city: infoValues?.city,
      subDistrict: infoValues?.subDistrict,
      citation: infoValues?.citation,
      internalNotes: infoValues?.internalNotes,
      externalNotes: infoValues?.externalNotes,
    },
    validationSchema: validationSchemeItpBasicDetail,
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
    nextPage(1);
    setIsInBasicDetailValid(true);
    setErrors({});
  };


  return (
    <>
      <form ref={refProp} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={6} xl={6}>
            <Input
              placeholder={t(`${t_key}.name_placeholder`)}
              customLabel={t(`${t_key}.name`)}
              withAsterisk
              size='small'
              name='componentName'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.componentName}
              error={formik.touched.componentName && Boolean(formik.errors.componentName)}
              helperText={formik.touched.componentName && formik.errors.componentName}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{marginTop: '12px'}}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Select
              placeholder='Select Country'
              customLabel={t(`${t_key}.country`)}
              withAsterisk
              size='small'
              fullWidth
              options={Dummyoption}
              name='country'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
              error={formik.touched.country && Boolean(formik.errors.country)}
              // helperText={formik.touched.country && formik.errors.country}
            // />
            // {formik.touched.country && formik.errors.country ? (
            //   <Typography sx={{color: '#DC2626'}}>{formik.errors.country}</Typography>
            // ): null}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Select
              placeholder='Select Province'
              customLabel={t(`${t_key}.province`)}
              size='small'
              fullWidth
              options={Dummyoption}
              name='province'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.province}
              error={formik.touched.province && Boolean(formik.errors.province)}
              // helperText={formik.touched.province && formik.errors.province}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{marginTop: '12px'}}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Select
              placeholder='Select City'
              customLabel={t(`${t_key}.city`)}
              size='small'
              fullWidth
              options={Dummyoption}
              name='city'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              error={formik.touched.city && Boolean(formik.errors.city)}
              // helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Select
              placeholder='Select Country'
              customLabel={t(`${t_key}.sub_district`)}
              size='small'
              fullWidth
              options={Dummyoption}
              name='subDistrict'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subDistrict}
              error={formik.touched.subDistrict && Boolean(formik.errors.subDistrict)}
              // helperText={formik.touched.subDistrict && formik.errors.subDistrict}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{marginTop: '12px'}}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Textarea
              customLabel={t(`${t_key}.citation`)}
              minRows={4}
              style={{ resize: 'vertical' }}
              name='citation'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.citation}
              // error={formik.touched.citation && Boolean(formik.errors.citation)}
              // helperText={formik.touched.citation && formik.errors.citation}
            />
            <Typography
              style={{
                fontSize: '14px',
                marginTop: '6px',
                color: '#6B7280',
              }}
            >
              {t(`${t_key}.max_char_info`)}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{marginTop: '12px'}}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Textarea
              customLabel={t(`${t_key}.internal_notes`)}
              minRows={4}
              style={{ resize: 'vertical' }}
              name='internalNotes'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.internalNotes}
              // error={formik.touched.internalNotes && Boolean(formik.errors.internalNotes)}
              // helperText={formik.touched.internalNotes && formik.errors.internalNotes}
            />
            <Typography
              style={{
                fontSize: '14px',
                marginTop: '6px',
                color: '#6B7280',
              }}
            >
              {t(`${t_key}.max_char_info`)}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{marginTop: '12px'}}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Textarea
              customLabel={t(`${t_key}.external_notes`)}
              minRows={4}
              style={{ resize: 'vertical' }}
              name='externalNotes'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.externalNotes}
              // error={formik.touched.externalNotes && Boolean(formik.errors.externalNotes)}
              // helperText={formik.touched.externalNotes && formik.errors.externalNotes}
            />
            <Typography
              style={{
                fontSize: '14px',
                marginTop: '6px',
                color: '#6B7280',
              }}
            >
              {t(`${t_key}.max_char_info`)}
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
            label={t('button.next')}
            variant='contained'
            type={'submit'}
          />
        </Box>
      </form>
    </>
  );
}
