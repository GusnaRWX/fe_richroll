import React, { useEffect } from 'react';
import { Typography, Box, Grid, FormControl, Select, MenuItem } from '@mui/material';
import { Input, Button } from '@/components/_shared/form';
import { styled as MuiStyled } from '@mui/material/styles';
import { Employees } from '@/types/employees';
import { Alert, Text } from '@/components/_shared/common';
import { useFormik } from 'formik';
import { relationshipItems } from '@/utils/options';
import { validationSchemeEmployeeEmergencyContact } from '../create/validate';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';

const AsteriskComponent = MuiStyled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

interface EmergencyContactProps {
  refProp: React.Ref<HTMLFormElement>
  nextPage: (_val: number) => void;
  setValues: React.Dispatch<React.SetStateAction<Employees.EmergencyContactPatchValues>>;
  emergencyValues: Employees.EmergencyContactPatchValues;
  setIsEmergencyValid: React.Dispatch<React.SetStateAction<boolean>>;
  handleThirdEmergency: () => void
}

function EmergencyContactEdit({ refProp, nextPage, setValues, emergencyValues, setIsEmergencyValid, handleThirdEmergency }: EmergencyContactProps) {
  const {t} = useTranslation();
  const t_emergencyContact = 'company_management.employees.form_&_detail.emergency_contact';
  const t_primarySection = 'company_management.employees.form_&_detail.emergency_contact.primary_section';
  const t_secondarySection = 'company_management.employees.form_&_detail.emergency_contact.secondary_section';
  const formik = useFormik({
    initialValues: {
      // employeeID: employeeID,
      primaryId: emergencyValues?.primaryId,
      secondaryId: emergencyValues?.secondaryId,
      fullNamePrimary: emergencyValues?.fullNamePrimary,
      relationPrimary: emergencyValues?.relationPrimary?.toString(),
      phoneNumberPrefixPrimary: emergencyValues?.phoneNumberPrefixPrimary,
      phoneNumberPrimary: emergencyValues?.phoneNumberPrimary,
      fullNameSecondary: emergencyValues?.fullNameSecondary,
      relationSecondary: emergencyValues?.relationSecondary?.toString(),
      phoneNumberPrefixSecondary: emergencyValues?.phoneNumberPrefixSecondary,
      phoneNumberSecondary: emergencyValues?.phoneNumberSecondary
    },
    validationSchema: validationSchemeEmployeeEmergencyContact,
    onSubmit: (values, { setErrors }) => {
      setIsEmergencyValid(true);
      handleThirdEmergency();
      nextPage(4);
      setErrors({});
    }
  });

  useEffect(() => {
    const emergencyLastValue = {
      ...formik.values,
      phoneNumberPrimary: String(formik.values.phoneNumberPrimary)
    };
    setValues(emergencyLastValue);
  }, [formik.values]);

  const handleBack = (e) => {
    e.preventDefault();
    if (formik.isValid) {
      setValues({ ...formik.values });
      nextPage(1);
      setIsEmergencyValid(true);
    } else {
      setIsEmergencyValid(false);
    }

  };

  const checkRelationship = (value: unknown) => {
    if ((value as string)?.length === 0 || typeof value === 'undefined') {
      return <Text title={t(`${t_primarySection}.relationship_placeholder`)} color='grey.400' />;
    }
    const selected = relationshipItems?.find(item => item.value === value);
    if (selected) {
      return `${selected.label}`;
    }
    return null;
  };
  return (
    <>
      {
        Object.keys(formik.errors).length > 0 && (
          <Alert
            severity='error'
            content='Please fill in all the mandatory fields'
            icon={<CancelIcon />}
          />
        )
      }
      <Box>
        <Text
          component='h3'
          variant='text-lg'
          fontWeight={700}
          color='primary.500'
          title={t(`${t_emergencyContact}.title`)}
          mb='16px'
        />
      </Box>
      <form ref={refProp} onSubmit={formik.handleSubmit}>
        <Box sx={{ marginBottom: '3rem', width: '100%' }}>
          <Typography component='h3' fontSize={18} color='primary'>{t(`${t_primarySection}.title`)}</Typography>
          <Grid container spacing={2} sx={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Input
                name='fullNamePrimary'
                customLabel={t(`${t_primarySection}.fullname`)}
                withAsterisk={true}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size='small'
                value={formik.values.fullNamePrimary}
                placeholder={t(`${t_primarySection}.fulltime_placeholder`)}
                error={formik.touched.fullNamePrimary && Boolean(formik.errors.fullNamePrimary)}
                helperText={formik.touched.fullNamePrimary && formik.errors.fullNamePrimary}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <FormControl fullWidth>
                <Typography mb='6px'>{t(`${t_primarySection}.relationship`)}</Typography>
                <Select
                  fullWidth
                  variant='outlined'
                  size='small'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.relationPrimary}
                  name='relationPrimary'
                  displayEmpty
                  renderValue={(value: unknown) => {
                    return checkRelationship(value);
                  }}
                >
                  <MenuItem value='1'>Parent</MenuItem>
                  <MenuItem value='2'>Sibling</MenuItem>
                  <MenuItem value='3'>Spouse</MenuItem>
                  <MenuItem value='0'>Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem' }}>
              <Typography>{t(`${t_primarySection}.contact_number`)}<AsteriskComponent>*</AsteriskComponent></Typography>
              <Grid container spacing={2}>
                <Grid item xs={1} sm={3} md={2} lg={2} xl={2} spacing={2}>
                  <Select
                    variant='outlined'
                    size='small'
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumberPrefixPrimary}
                    name='phoneNumberPrefixPrimary'
                    MenuProps={{ disableAutoFocus: true }}
                    sx={{
                      backgroundColor: '#D9EFE7',
                      border: '1px solid #D9EFE7',
                      borderRadius: '9999px',
                      marginRight: '12px',
                      fontSize: '14px'
                    }}
                  >
                    <MenuItem value='+62'>+62</MenuItem>
                    <MenuItem value='+44'>+44</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9} xl={10} alignSelf='flex-end'>
                  <Input
                    name='phoneNumberPrimary'
                    placeholder={t(`${t_primarySection}.contact_number_placeholder`)}
                    withAsterisk={true}
                    size='small'
                    type='number'
                    error={formik.touched.phoneNumberPrimary && Boolean(formik.errors.phoneNumberPrimary)}
                    helperText={formik.touched.phoneNumberPrimary && formik.errors.phoneNumberPrimary}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumberPrimary}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ marginBottom: '3rem', width: '100%' }}>
          <Typography component='h3' fontSize={18} color='primary'>{t(`${t_secondarySection}.title`)}</Typography>
          <Grid container spacing={2} sx={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Input
                name='fullNameSecondary'
                customLabel={t(`${t_secondarySection}.fullname`)}
                withAsterisk={false}
                size='small'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={t(`${t_secondarySection}.fullname_placeholder`)}
                value={formik.values.fullNameSecondary}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6} spacing={2}>
              <FormControl fullWidth>
                <Typography mb='6px'>{t(`${t_secondarySection}.relationship`)}</Typography>
                <Select
                  fullWidth
                  variant='outlined'
                  size='small'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.relationSecondary}
                  name='relationSecondary'
                  displayEmpty
                  renderValue={(value: unknown) => {
                    return checkRelationship(value);
                  }}
                >
                  <MenuItem value='1'>Parent</MenuItem>
                  <MenuItem value='2'>Sibling</MenuItem>
                  <MenuItem value='3'>Spouse</MenuItem>
                  <MenuItem value='0'>Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem' }}>
              <Typography>{t(`${t_secondarySection}.contact_number`)}</Typography>
              <Grid container spacing={2} >
                <Grid item xs={1} sm={3} md={2} lg={2} xl={2} spacing={2}>
                  <Select
                    variant='outlined'
                    size='small'
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumberPrefixSecondary}
                    name='phoneNumberPrefixSecondary'
                    MenuProps={{ disableAutoFocus: true }}
                    sx={{
                      backgroundColor: '#D9EFE7',
                      border: '1px solid #D9EFE7',
                      borderRadius: '9999px',
                      marginRight: '12px',
                      fontSize: '14px'
                    }}
                  >
                    <MenuItem value='+62'>+62</MenuItem>
                    <MenuItem value='+44'>+44</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9} xl={10} alignSelf='flex-end'>
                  <Input
                    name='phoneNumberSecondary'
                    placeholder={t(`${t_secondarySection}.contact_number_placeholder`)}
                    withAsterisk={true}
                    size='small'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumberSecondary}
                  />
                </Grid>
              </Grid>
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
            <Button onClick={handleBack} label={t('button.back')} variant='outlined' />
          </Grid>
          <Grid item>
            <Button fullWidth={false} size='small' color='primary' type='submit' label={t('button.next')} />
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default EmergencyContactEdit;