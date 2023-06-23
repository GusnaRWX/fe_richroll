import React from 'react';
import { Grid } from '@mui/material';
import { FieldArray, Formik } from 'formik';
import { Input, Button, IconButton, Select } from '@/components/_shared/form';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export default function CreateTaxRate() {
  const initialValues = {
    component: [{
      minIncome: '',
      maxIncome: '',
      rate: '',
      additionalAmount: ''
    }]
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const option = [
    {label: '5,0', value: '5'},
    {label: '6,0', value: '6'},
    {label: '7,0', value: '7'},
  ];

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => (
          <form>
            <FieldArray name='component' render={(arrayHelpers) => (
              <>
                {formik.values.component.map((item, index) => (
                  <>
                    <Grid
                      key={index}
                      container
                      border='1px #E5E7EB'
                      boxShadow='0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)'
                      direction='row'
                      p='0 15px 30px'
                    >
                      <Grid
                        item
                        container
                        alignItems='flex-end'
                        spacing={2}
                        marginTop={0}
                        marginLeft={0}
                        xs={12}
                        md={8}
                      >
                        <Grid item>
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
                            size='small'
                            onClick={() => arrayHelpers.remove(index)}
                          />
                        </Grid>
                        <Grid item>
                          <Input
                            customLabel='Min.Income'
                            withAsterisk
                            size='small'
                            value={formik.values.component[index].minIncome}
                            onChange={(e) => formik.setFieldValue(`component.${index}.minIncome`, e.target.value)}
                          />
                        </Grid>
                        <Grid item mb={0.5}>
                        -
                        </Grid>
                        <Grid item>
                          <Input
                            customLabel='Max.Income'
                            withAsterisk
                            size='small'
                            value={formik.values.component[index].maxIncome}
                            onChange={(e) => formik.setFieldValue(`component.${index}.maxIncome`, e.target.value)}
                          />
                        </Grid>
                        <Grid item>
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
                            size='small'
                            onClick={() => arrayHelpers.insert(index + 1, {
                              minIncome: '',
                              maxIncome: '',
                              rate: '',
                              additionalAmount: ''
                            })}
                          />
                        </Grid>
                      </Grid>
                      <Grid item container xs={12} md={3} alignItems='flex-end' spacing={1}>
                        <Grid item xs={6}>
                          <Select
                            fullWidth
                            size='small'
                            options={option}
                            value={formik.values.component[index].rate}
                            onChange={(e) => formik.setFieldValue(`component.${index}.rate`, e.target.value)} />
                        </Grid>
                        <Grid item xs={6}>
                          <Input
                            customLabel='Max.Income'
                            withAsterisk
                            size='small'
                            value={formik.values.component[index].additionalAmount}
                            onChange={(e) => formik.setFieldValue(`component.${index}.additionalAmount`, e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                ))}
              </>
            )} />
            <Button label='save' onClick={() => formik.submitForm()} />
          </form>
        )}
      </Formik>
    </>
  );
}
