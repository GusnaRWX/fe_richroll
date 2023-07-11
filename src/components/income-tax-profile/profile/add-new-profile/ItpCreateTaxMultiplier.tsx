import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Button, Select, Input } from '@/components/_shared/form';
import { FieldArray, Form as FormikForm, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

// Import Icon
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


export default function ItpCreateTaxMultiplier() {
  const {t} = useTranslation();
  const t_key = 'income_tax_profile.profile.detail.income_tax_multiplier';

  const DummyStatusOption = [
    {value:'1',label:'NPWP'},
    {value:'2',label:'Employment Status'},
  ];

  const DummyConditionOption = [
    {value:'1',label:'='},
    {value:'2',label:'≥'},
    {value:'3',label:'≤'},
    {value:'4',label:'≠'},
  ];

  const DummyMultlipierOption = [
    {value:'1',label:'50%'},
    {value:'2',label:'75%'},
    {value:'3',label:'100%'},
    {value:'4',label:'125%'},
    {value:'5',label:'150%'},
  ];

  const validationSchecma = Yup.object({
    component: Yup.array().of(
      Yup.object({
        status: Yup.string().required(),
        condition: Yup.array().of(
          Yup.object({
            conditionAction: Yup.string().required(),
            conditionStatus: Yup.string().required(),
            multiplier: Yup.string().required(),
          })
        )
      })
    )
  });

  interface ConditionType {
    conditionAction : string;
    conditionStatus : string;
    multiplier : string;
  }

  interface Component {
    status: string;
    condition : ConditionType[];
  }

  const initialValues: {
    component : Component[];
  } = {
    component : []
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={validationSchecma}
      >
        {(formik) => (
          <>
            <FormikForm>
              <FieldArray
                name='component'
                render={(arrayHelper) => {
                  return(
                    <div>
                      {formik?.values?.component?.map((componentItem, i) => (
                        <Box style={{padding:'16px', border:'1px solid #E5E7EB', borderRadius:'4px'}} key={i}>
                          <Box sx={{display:'flex', justifyContent:'space-between'}}>
                            <Typography
                              style={{
                                color: '#223567',
                                fontSize: '14px',
                                fontWeight: '700',
                                width: '250px',
                                marginTop: '-3px',
                              }}
                            >
                              {t(`${t_key}.component`)} {i + 1}
                            </Typography>
                            <Button
                              color='rose'
                              sx={{ bgcolor: '#FECACA', color: '#DC2626', width: 'fit-content' }}
                              startIcon={<DeleteIcon />}
                              label={t('button.delete')}
                              onClick={() => arrayHelper.remove(i)}
                            />
                          </Box>
                          <Grid container spacing={2} rowSpacing={4}>
                            <Grid item xs={6} md={6} lg={6} xl={6}>
                              <Select
                                customLabel={t(`${t_key}.status`)}
                                withAsterisk
                                size='small'
                                fullWidth
                                options={DummyStatusOption}
                                value={
                                  formik.values.component[i]
                                    ?.status
                                }
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    `component.${i}.status`,
                                    e.target.value
                                  );
                                  if (e.target.value === '1') {
                                    formik.setFieldValue(`component.${i}.condition.${0}.conditionStatus`, 'owner');
                                    formik.setFieldValue(`component.${i}.condition.${1}.conditionStatus`, 'non-owner');
                                  } else if (e.target.value === '2') {
                                    formik.setFieldValue(`component.${i}.condition.${0}.conditionStatus`, 'Fulltime');
                                    formik.setFieldValue(`component.${i}.condition.${1}.conditionStatus`, 'Freelance/ Contract/ Irregular');
                                  }
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} xl={12}>
                              {formik.values.component[i]?.status !== '' && (
                                <Box sx={{padding:'16px', boxSizing:'border-box', bgcolor:'#F9FAFB', borderRadius:'4px'}}>
                                  {formik.values.component[i]?.condition.map((_, index) => (
                                    <div key={index}>
                                      <Grid container spacing={2} sx={{marginBottom:'32px'}}>
                                        <Grid item xs={2} md={2} lg={2} xl={2}>
                                          <Select
                                            customLabel={t(`${t_key}.condition`) + (` ${index + 1}`)}
                                            withAsterisk
                                            size='small'
                                            fullWidth
                                            options={DummyConditionOption}
                                            value={
                                              formik.values.component[i]
                                                ?.condition[index]?.conditionAction
                                            }
                                            onChange={(e) =>
                                              formik.setFieldValue(
                                                `component.${i}.condition.${index}.conditionAction`,
                                                e.target.value
                                              )
                                            }
                                          />
                                        </Grid>
                                        <Grid item xs={4} md={4} lg={4} xl={4}>
                                          <Input
                                            size='small'
                                            sx={{marginTop:'30px'}}
                                            value={formik.values.component[i].condition[index]?.conditionStatus}
                                            aria-readonly
                                          />
                                        </Grid>
                                        <Grid item xs={2} md={2} lg={2} xl={2}>
                                          <Select
                                            customLabel={t(`${t_key}.multiplier`)}
                                            withAsterisk
                                            size='small'
                                            fullWidth
                                            options={DummyMultlipierOption}
                                            value={
                                              formik.values.component[i]
                                                ?.condition[index]?.multiplier
                                            }
                                            onChange={(e) =>
                                              formik.setFieldValue(
                                                `component.${i}.condition.${index}.multiplier`,
                                                e.target.value
                                              )
                                            }
                                          />
                                        </Grid>
                                        <Grid item xs={4} md={4} lg={4} xl={4}/>
                                      </Grid>
                                    </div>
                                  ))}
                                </Box>
                              )}
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                      <Box style={{padding:'16px', border:'1px solid #E5E7EB', borderRadius:'4px'}}>
                        <Button
                          color='secondary'
                          sx={{width: 'fit-content', color:'#FFF' }}
                          startIcon={<AddIcon />}
                          label={t('button.component')}
                          onClick={() =>
                            arrayHelper.insert(
                              formik.values.component.length + 1,
                              {
                                status: '',
                                condition :[
                                  {
                                    conditionAction: '',
                                    conditionStatus: '',
                                    multiplier: '',
                                  },
                                  {
                                    conditionAction: '',
                                    conditionStatus: '',
                                    multiplier: '',
                                  },
                                ],
                              }
                            )
                          }
                        />
                      </Box>
                      <Grid container xs={12} spacing={2} style={{marginTop: '16px'}}>
                        <Grid item xs={12} md={12} lg={12} xl={12}>
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                              color='primary'
                              label={t('button.next')}
                              sx={{ width: 'fit-content' }}
                              onClick={() => formik.submitForm()}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </div>
                  );
                }}/>
            </FormikForm>
          </>
        )}
      </Formik>
    </>
  );
}
