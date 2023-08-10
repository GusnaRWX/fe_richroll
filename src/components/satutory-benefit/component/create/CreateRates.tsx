import React, { SetStateAction, Dispatch } from 'react';
import { IconButton, Input, Select, Button } from '@/components/_shared/form';
import { Text, Card } from '@/components/_shared/common';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  InputAdornment,
  Box,
  Typography,
  styled,
  Switch,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const rates = [
  {
    label: '6,0',
    value: '6',
  },
  {
    label: '7,0',
    value: '7',
  },
  {
    label: '8,0',
    value: '8',
  },
  {
    label: '9,0',
    value: '9',
  },
  {
    label: '10,0',
    value: '10',
  },
];

interface PropsInterface {
  nextPage: Dispatch<SetStateAction<number>>
  formik
}

export default function CreateRates({nextPage, formik}: PropsInterface) {
  // Translation Key
  const {t} = useTranslation();
  const t_key = 'satutory_benefit.component.form_&_detail.rates';

  const AsteriskComponent = styled('span')(({ theme }) => ({
    color: theme.palette.error.main,
  }));

  return (
    <>
      <>
        <Typography sx={{color: 'grey.700', fontWeight: 400, display: 'block', marginBottom: '15px'}}>{t(`${t_key}.contributor_option.label`)}<AsteriskComponent>*</AsteriskComponent></Typography>
        <FormGroup sx={{ display: 'inline', bgcolor: 'red' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.rates.employee}
                onChange={(e) =>
                  formik.setFieldValue('rates.employee', e.target.checked)
                }
              />
            }
            label={t(`${t_key}.contributor_option.employee`)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.rates.employer}
                onChange={(e) =>
                  formik.setFieldValue('rates.employer', e.target.checked)
                }
              />
            }
            label={t(`${t_key}.contributor_option.employer`)}
            sx={{ ml: '50px' }}
          />
          {formik.values.rates.employee && formik.values.rates.employer && (
            <Box margin='32px 0'>
              <FormControlLabel
                label={t(`${t_key}.match_rule_button`)}
                control={
                  <Switch
                    value={formik.values.rates.employerMatch}
                    onChange={(e) =>
                      formik.setFieldValue('rates.employerMatch', e.target.checked)
                    }
                  />
                }
              />
            </Box>
          )}
        </FormGroup>

        {!formik.values.rates.employee || !formik.values.rates.employer ? (
          <Typography sx={{color: '#223567', fontWeight: 700, marginTop: '36px', marginBottom: '30px'}}>{t(`${t_key}.sub_title`)}</Typography>
        ) : null}

        <Box display='flex' flexDirection='column' gap='32px'>
          {formik.values.rates.employee && (
            <Card
              sx={{
                paddingY: '20px',
                '.MuiCardContent-root': {
                  display: 'flex',
                  flexDirection: 'column',
                  gap:
                  formik.values.employee && formik.values.employer
                    ? '16px'
                    : '24px',
                },
              }}
            >
              {formik.values.rates.employee && formik.values.rates.employer && (
                <>
                  <Typography color='#223567' fontWeight='700' fontSize={18}>
                    {t(`${t_key}.contributor_option.employee`)}<AsteriskComponent>*</AsteriskComponent>
                  </Typography>
                  <Typography color='#223567' fontWeight='700'>
                    {t(`${t_key}.sub_title`)}<AsteriskComponent>*</AsteriskComponent>
                  </Typography>
                </>
              )}

              <Box component='div' sx={{width: '100%', display: 'flex', gap: '15px'}}>
                <Box component='div' sx={{width: '75%', display: 'flex', alignItems: 'flex-end', gap: '5px'}}>
                  <IconButton
                    icons={
                      <RemoveIcon
                        sx={{
                          color: '#B91C1C',
                          bgcolor: '#FEE2E2',
                          borderRadius: '5px',
                          width: '32px',
                          height: '32px',
                          padding: '8px',
                        }}
                      />
                    }
                    onClick={() =>
                      formik.setFieldValue(
                        'rates.employeeData.start',
                        formik.values.rates.employeeData.start - 1
                      )
                    }
                  />
                  <Box component='div'  sx={{width: '100%'}}>
                    <Input
                      withAsterisk
                      customLabel={t(`${t_key}.start`)}
                      size='small'
                      value={formik.values.rates.employeeData.start}
                      onChange={(e) => {
                        formik.setFieldValue(
                          'rates.employeeData.start',
                          e.target.value
                        );
                        formik.setFieldValue('rates.employerData.start', formik.values.rates.employerMatch ? e.target.value : null);
                      }}
                    />
                  </Box>

                  <Text title='-' color='#223567' fontWeight='700' mb='8px' />

                  <Box component='div' sx={{width: '100%'}}>
                    <Input
                      withAsterisk
                      customLabel={t(`${t_key}.end`)}
                      size='small'
                      value={formik.values.rates.employeeData.end}
                      onChange={(e) => {
                        formik.setFieldValue('rates.employeeData.end', e.target.value);
                        formik.setFieldValue('rates.employerData.end', formik.values.rates.employerMatch ? e.target.value : null);
                      }}
                    />
                  </Box>
                  <IconButton
                    icons={
                      <AddIcon
                        sx={{
                          color: 'white',
                          bgcolor: '#8DD0B8',
                          borderRadius: '5px',
                          width: '32px',
                          height: '32px',
                          padding: '8px',
                        }}
                      />
                    }
                    onClick={() =>
                      formik.setFieldValue(
                        'rates.employeeData.end',
                        formik.values.rates.employeeData.end + 1
                      )
                    }
                  />
                </Box>

                <Box component='div' sx={{width: '25%', display: 'flex', alignItems: 'flex-end'}}>
                  <Box component='div' sx={{width: '100px'}}>
                    <Select
                      displayEmpty
                      value={formik.values.rates.employeeData.rate}
                      onChange={(e) => {
                        formik.setFieldValue('rates.employeeData.rate', e.target.value);
                        if (formik.values.rates.employerMatch && !formik.values.rates.employer) {
                          formik.setFieldValue('rates.employerData.rate', e.target.value);
                        }
                      }}
                      size='small'
                      customLabel={t(`${t_key}.sub_title`)}
                      withAsterisk
                      endAdornment={
                        <InputAdornment position='end' sx={{ mr: '20px' }}>
                        %
                        </InputAdornment>
                      }
                      options={rates}
                    />
                  </Box>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box component='div' sx={{width: '100%'}}>
                    <Input
                      withAsterisk
                      customLabel={t(`${t_key}.additional_fixed_amount`)}
                      placeholder='Rp 0'
                      size='small'
                      value={formik.values.rates.employeeData.fixed}
                      onChange={(e) =>
                        formik.setFieldValue('rates.employeeData.fixed', e.target.value)
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>IDR</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box component='div'>
                    <Input
                      customLabel={t(`${t_key}.amount_cap`)}
                      placeholder='Rp 0'
                      size='small'
                      value={
                        formik.values.rates.employerMatch
                          ? formik.values.rates.employeeData.amountCap
                          : formik.values.rates.employerData.amountCap
                      }
                      disabled={formik.values.rates.employerMatch}
                      onChange={(e) =>
                        formik.setFieldValue(
                          'rates.employerData.amountCap',
                          e.target.value
                        )
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>IDR</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          )}

          {formik.values.rates.employer && (
            <Card
              sx={{
                paddingY: '20px',
                '.MuiCardContent-root': {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                },
              }}
            >
              {formik.values.rates.employee && formik.values.rates.employer && (
                <>
                  <Typography color='#223567' fontWeight='700' fontSize={18}>
                    {t(`${t_key}.contributor_option.employer`)}<AsteriskComponent>*</AsteriskComponent>
                  </Typography>
                  <Typography color='#223567' fontWeight='700'>
                    {t(`${t_key}.sub_title`)}<AsteriskComponent>*</AsteriskComponent>
                  </Typography>
                </>
              )}

              <Box component='div' sx={{width: '100%', display: 'flex', gap: '15px'}}>
                <Box component='div' sx={{width: '75%', display: 'flex', alignItems: 'flex-end', gap: '5px'}}>
                  <IconButton
                    icons={
                      <RemoveIcon
                        sx={{
                          color: '#B91C1C',
                          bgcolor: '#FEE2E2',
                          borderRadius: '5px',
                          width: '32px',
                          height: '32px',
                          padding: '8px',
                        }}
                      />
                    }
                    onClick={() =>
                      formik.setFieldValue(
                        'rates.employerData.start',
                        formik.values.rates.employerData.start - 1
                      )
                    }
                  />
                  <Box component='div'  sx={{width: '100%'}}>
                    <Input
                      withAsterisk
                      customLabel={t(`${t_key}.start`)}
                      size='small'
                      value={formik.values.rates.employerData.start}
                      onChange={(e) =>
                        formik.setFieldValue(
                          'rates.employerData.start',
                          e.target.value
                        )
                      }
                    />
                  </Box>

                  <Text title='-' color='#223567' fontWeight='700' mb='8px' />

                  <Box component='div' sx={{width: '100%'}}>
                    <Input
                      withAsterisk
                      customLabel={t(`${t_key}.end`)}
                      size='small'
                      value={formik.values.rates.employerData.end}
                      onChange={(e) =>
                        formik.setFieldValue('rates.employerData.end', e.target.value)
                      }
                    />
                  </Box>
                  <IconButton
                    icons={
                      <AddIcon
                        sx={{
                          color: 'white',
                          bgcolor: '#8DD0B8',
                          borderRadius: '5px',
                          width: '32px',
                          height: '32px',
                          padding: '8px',
                        }}
                      />
                    }
                    onClick={() =>
                      formik.setFieldValue(
                        'rates.employerData.end',
                        formik.values.rates.employerData.end + 1
                      )
                    }
                  />
                </Box>

                <Box component='div' sx={{width: '25%', display: 'flex', alignItems: 'flex-end'}}>
                  <Box component='div' sx={{width: '100px'}}>
                    <Select
                      displayEmpty
                      value={formik.values.rates.employerData.rate}
                      onChange={(e) =>
                        formik.setFieldValue('rates.employerData.rate', e.target.value)
                      }
                      size='small'
                      customLabel={t(`${t_key}.sub_title`)}
                      withAsterisk
                      endAdornment={
                        <InputAdornment position='end' sx={{ mr: '20px' }}>
                        %
                        </InputAdornment>
                      }
                      options={rates}
                    />
                  </Box>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box component='div' sx={{width: '100%'}}>
                    <Input
                      withAsterisk
                      customLabel={t(`${t_key}.additional_fixed_amount`)}
                      placeholder='Rp 0'
                      size='small'
                      value={formik.values.rates.employerData.fixed}
                      onChange={(e) =>
                        formik.setFieldValue('rates.employerData.fixed', e.target.value)
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>IDR</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Box component='div'>
                    <Input
                      customLabel={t(`${t_key}.amount_cap`)}
                      placeholder='Rp 0'
                      size='small'
                      value={
                        formik.values.rates.employerMatch
                          ? formik.values.rates.employeeData.amountCap
                          : formik.values.rates.employerData.amountCap
                      }
                      disabled={formik.values.rates.employerMatch}
                      onChange={(e) =>
                        formik.setFieldValue(
                          'rates.employerData.amountCap',
                          e.target.value
                        )
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>IDR</InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          )}
        </Box>

        <Grid
          container
          spacing={2}
          sx={{ justifyContent: 'flex-end', mt: '30px', gap: '15px' }}
        >
          <Button
            fullWidth={false}
            size='small'
            label={t('button.back')}
            variant='outlined'
            color='primary'
            onClick={() => nextPage(1)}
          />
        </Grid>
      </>
    </>
  );
}
