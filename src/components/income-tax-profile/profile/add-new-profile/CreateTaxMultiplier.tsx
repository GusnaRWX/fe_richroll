import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Button, Select, Input } from '@/components/_shared/form';
import { FieldArray, Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';

// Import Icon
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


export default function CreateTaxMultiplier() {

  const DummyStatusOption = [
    {value:'1',label:'NPWP'},
    {value:'2',label:'Employment Status'},
  ];

  const DummyConditionOption = [
    {value:'1',label:'NPWP'},
    {value:'2',label:'Employment Status'},
  ];

  const DummyMultlipierOption = [
    {value:'1',label:'NPWP'},
    {value:'2',label:'Employment Status'},
  ];

  const validationSchecma = Yup.object().shape({
    status: Yup.string().required('This is required'),
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
        onSubmit={() => {
          console.log('here');
        }}
        validationSchema={validationSchecma}
      >
        {(formik) => (console.log(formik.values), (
          <>
            <FormikForm>
              <FieldArray
                name='component'
                render={(arrayHelper) => {
                  return(
                    <div>
                      {formik?.values?.component?.map((component, i) => (
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
                              Component {i + 1}
                            </Typography>
                            <Button
                              color='rose'
                              sx={{ bgcolor: '#FECACA', color: '#DC2626', width: 'fit-content' }}
                              startIcon={<DeleteIcon />}
                              label='Delete'
                              onClick={() => arrayHelper.remove(i)}
                            />
                          </Box>
                          <Grid container spacing={2} rowSpacing={4}>
                            <Grid item xs={6} md={6} lg={6} xl={6}>
                              <Select
                                customLabel='Status'
                                withAsterisk
                                size='small'
                                fullWidth
                                options={DummyStatusOption}
                                onChange={(e) => {
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
                              <Box sx={{padding:'16px', boxSizing:'border-box', bgcolor:'#F9FAFB', borderRadius:'4px'}}>
                                {formik.values.component[i]?.condition.map((_, index) => (
                                  <div key={index}>
                                    <Grid container spacing={2} sx={{marginBottom:'32px'}}>
                                      <Grid item xs={2} md={2} lg={2} xl={2}>
                                        <Select
                                          customLabel={`Condition ${index + 1}`}
                                          withAsterisk
                                          size='small'
                                          fullWidth
                                          options={DummyConditionOption}
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
                                          customLabel='Multlipier'
                                          withAsterisk
                                          size='small'
                                          fullWidth
                                          options={DummyMultlipierOption}
                                        />
                                      </Grid>
                                      <Grid item xs={4} md={4} lg={4} xl={4}/>
                                    </Grid>
                                  </div>
                                ))}
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                      <Box style={{padding:'16px', border:'1px solid #E5E7EB', borderRadius:'4px'}}>
                        <Button
                          color='secondary'
                          sx={{width: 'fit-content', color:'#FFF' }}
                          startIcon={<AddIcon />}
                          label='Component'
                          onClick={() =>
                            arrayHelper.insert(
                              formik.values.component.length + 1,
                              {
                                condition :[
                                  {
                                    conditionAction : '',
                                    conditionStatus : '',
                                    multiplier : '',
                                  },
                                  {
                                    conditionAction : '',
                                    conditionStatus : '',
                                    multiplier : '',
                                  },
                                ]
                              }
                            )
                          }
                        />
                      </Box>
                    </div>
                  );
                }}/>
            </FormikForm>
          </>
        ))}
      </Formik>
    </>
  );
}
