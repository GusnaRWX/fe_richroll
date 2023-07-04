import React from 'react';
import { Button, CheckBox } from '@/components/_shared/form';
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { CustomModal } from '@/components/_shared/common';
import { useState } from 'react';
import { HiSelector } from 'react-icons/hi';
import DeleteIcon from '@mui/icons-material/Delete';
import { HiPencilAlt } from 'react-icons/hi';

const AddButton = styled(Button)({
  color: 'white',
  maxWidth: '245px',
  padding: '8px 10px',
  '.MuiTypography-root': {
    fontSize: '14px',
  },
});

export default function  ItpCreateTaxDeductableComponent() {
  const [isAddNewDeductableComponent, setIsAddNewDeductableComponent] =
    useState(false);
  const [initialDeductableValues, setInitialDeductableValues] = useState<
  string[]
  >([]);

  const selectedDeductableComponents = [
    {
      componentName: 'Marital Deductable',
      componentCondition: 'Marital Status',
    },
    {
      componentName: 'Employee Dependants 2023',
      componentCondition: 'Number Of Dependants',
    },
    {
      componentName: 'Occupational Allowances',
      componentCondition: 'Manual',
    },
    {
      componentName: 'Other Component 01',
      componentCondition: 'Manual',
    },
    {
      componentName: 'Other Component 02',
      componentCondition: 'Manual',
    },
  ];

  const handleClose = () => {
    setIsAddNewDeductableComponent(false);
  };

  const handleSubmit = () => {
    console.log('submit');
  };

  const onChangeCheckboxHandler = (e) => {
    const name: string = e.target.name;
    const checked: boolean = e.target.checked;

    if (checked) {
      // Select All
      if (name === 'Component Name') {
        const allValues: string[] = selectedDeductableComponents.map(
          (option) => option.componentName
        );
        setInitialDeductableValues([...allValues]);

        // Select One
      } else {
        setInitialDeductableValues((prevValues: string[]): any[] => [
          ...prevValues,
          name,
        ]);
      }
    } else {
      // Unchecked Select All
      if (name === 'Component Name') {
        setInitialDeductableValues([]);

        // Unchecked Select One
      } else {
        setInitialDeductableValues((prevValues) =>
          prevValues.filter((selectedCheckbox) => selectedCheckbox !== name)
        );
      }
    }
  };

  return (
    <>
      <Box component='div'>
        <Paper component='div' elevation={1} sx={{padding: '12px' }}>
          <Box
            component='div'
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography
              sx={{ fontWeight: 700, color: '#223567', fontSize: '18px' }}
            >
              Material Status
            </Typography>
            <Box sx={{ display: 'flex', gap: '4px' }}>
              <Button
                color='green'
                startIcon={<HiPencilAlt color='white' />}
                label='Edit'
                sx={{
                  backgroundColor: '#8DD0B8',
                  width: {xs: '68px', md: '73px'},
                  height: {xs: '29px', md: '30px'},
                  padding:{xs: '2px', md:'8px'},
                  color: ' white',
                }}
              />
              <Button
                color='red'
                startIcon={<DeleteIcon />}
                label='Delete'
                sx={{
                  width: {xs: '68px', md: '73px'},
                  height: {xs: '29px', md: '30px'},
                  padding:{xs: '2px', md:'8px'},
                  backgroundColor: '#FEE2E2',
                  color: '#B91C1C',
                }}
              />
            </Box>
          </Box>

          <Box sx={{ marginTop: '20px'}}>
            <Grid container xs={12} style={{marginTop: '6px'}}>
              <Grid item xs={6}>
                <Typography
                  sx={{ color: '#374151', fontWeight: 400, fontSize: '14px' }}
                >
                Factor Unit Condition
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  sx={{ color: '#374151', fontWeight: 400, fontSize: '14px' }}
                >
                Amount
                </Typography>
              </Grid>
            </Grid>

            <Grid container xs={12} style={{marginTop: '6px'}}>
              <Grid item xs={6}>
                <Typography
                  sx={{ color: '#4B5563', fontWeight: 700, fontSize: '14px' }}
                >
                Single
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  sx={{ color: '#4B5563', fontWeight: 700, fontSize: '14px' }}
                >
                Rp. 54.000.000
                </Typography>
              </Grid>
            </Grid>

            <Grid container xs={12} style={{marginTop: '6px'}}>
              <Grid item xs={6}>
                <Typography
                  sx={{ color: '#4B5563', fontWeight: 700, fontSize: '14px' }}
                >
                Married
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  sx={{ color: '#4B5563', fontWeight: 700, fontSize: '14px' }}
                >
                Rp. 58.500.000
                </Typography>
              </Grid>
            </Grid>

            <Grid container xs={12} style={{marginTop: '6px'}}>
              <Grid item xs={6}>
                <Typography
                  sx={{ color: '#4B5563', fontWeight: 700, fontSize: '14px' }}
                >
                Married with Spouse Earening (Claim)
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  sx={{ color: '#4B5563', fontWeight: 700, fontSize: '14px' }}
                >
                Rp. 112.500.000
                </Typography>
              </Grid>
            </Grid>

            <Grid container xs={12} style={{marginTop: '6px'}}>
              <Grid item xs={6}>
                <Typography
                  sx={{ color: '#4B5563', fontWeight: 700, fontSize: '14px'}}
                >
                Married with Spouse Earening (Claimed)
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  sx={{ color: '#4B5563', fontWeight: 700, fontSize: '14px' }}
                >
                Rp. 0
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Paper component='div' elevation={1} sx={{ padding: '12px', marginTop: '16px'} }>
          <Box
            component='div'
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography
              sx={{ fontWeight: 700, color: '#223567', fontSize: '18px' }}
            >
              Number of Dependance
            </Typography>
            <Box sx={{ display: 'flex', gap: '4px' }}>
              <Button
                color='green'
                startIcon={<HiPencilAlt color='white' />}
                label='Edit'
                sx={{
                  backgroundColor: '#8DD0B8',
                  width: {xs: '68px', md: '73px'},
                  height: {xs: '29px', md: '30px'},
                  padding:{xs: '2px', md:'8px'},
                  color: ' white',
                }}
              />
              <Button
                color='red'
                startIcon={<DeleteIcon />}
                label='Delete'
                sx={{
                  width: {xs: '68px', md: '73px'},
                  height: {xs: '29px', md: '30px'},
                  padding:{xs: '2px', md:'8px'},
                  backgroundColor: '#FEE2E2',
                  color: '#B91C1C',
                }}
              />
            </Box>
          </Box>

          <Grid container sx={{ marginTop: '20px' }} rowSpacing={1}>
            <Grid item xs={6}>
              <Typography
                sx={{ color: '#374151', fontWeight: 400, fontSize: '14px' }}
              >
                Factor Unit Condition
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{ color: '#374151', fontWeight: 400, fontSize: '14px' }}
              >
                Amount
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                sx={{ color: '#4B5563', fontWeight: 700, fontSize: '14px' }}
              >
                1
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{ color: '#4B5563', fontWeight: 700, fontSize: '14px' }}
              >
                Rp. 4.500.000
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                sx={{ color: '#4B5563', fontWeight: 700, fontSize: '14px' }}
              >
                2
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{ color: '#4B5563', fontWeight: 700, fontSize: '14px' }}
              >
                Rp. 9.000.000
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                sx={{ color: '#4B5563', fontWeight: 700, fontSize: '14px' }}
              >
                3
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{ color: '#4B5563', fontWeight: 700, fontSize: '14px' }}
              >
                Rp. 13.500.000
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper component='div' elevation={1} sx={{ padding: '12px', marginTop: '16px' }}>
          <Box
            component='div'
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Typography
              sx={{ fontWeight: 700, color: '#223567', fontSize: '18px' }}
            >
              Number of Dependance
            </Typography>
            <Box sx={{ display: 'flex', gap: '4px' }}>
              <Button
                color='green'
                startIcon={<HiPencilAlt color='white' />}
                label='Edit'
                sx={{
                  backgroundColor: '#8DD0B8',
                  width: {xs: '68px', md: '73px'},
                  height: {xs: '29px', md: '30px'},
                  padding:{xs: '2px', md:'8px'},
                  color: ' white',
                }}
              />
              <Button
                color='red'
                startIcon={<DeleteIcon />}
                label='Delete'
                sx={{
                  width: {xs: '68px', md: '73px'},
                  height: {xs: '29px', md: '30px'},
                  padding:{xs: '2px', md:'8px'},
                  backgroundColor: '#FEE2E2',
                  color: '#B91C1C',
                }}
              />
            </Box>
          </Box>

          <Grid container sx={{ marginTop: '20px' }} rowSpacing={1}>
            <Grid item xs={6}>
              <Typography
                sx={{ color: '#374151', fontWeight: 400, fontSize: '14px' }}
              >
                Factor Unit Condition
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{ color: '#374151', fontWeight: 400, fontSize: '14px' }}
              >
                Amount
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                sx={{ color: '#4B5563', fontWeight: 700, fontSize: '14px' }}
              >
                1
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{ color: '#4B5563', fontWeight: 700, fontSize: '14px' }}
              >
                Rp. 4.500.000
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        <Box component='div' sx={{ marginTop: '16px' }}>
          <Paper elevation={1} sx={{ padding: '16px' }}>
            <AddButton
              startIcon={<AddIcon />}
              label='Deductible'
              sx={{
                width: '136px',
                fontSize: '14px',
                backgroundColor: '#8DD0B8',
              }}
              onClick={() => setIsAddNewDeductableComponent(true)}
            />
          </Paper>
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
              variant='outlined'
              sx={{
                padding: '9px',
                width: '65px',
              }}
              label='Back'
            />
            <Button
              sx={{ padding: '9px', width: '65px' }}
              label='Next'
              variant='contained'
            />
          </Box>
        </Box>

        <CustomModal
          open={isAddNewDeductableComponent}
          handleClose={handleClose}
          handleConfirm={handleSubmit}
          title='Select Tax Deductable Components'
          width='678px'
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
              <Grid item xs={1} md={1} lg={1} xl={1}>
                <CheckBox
                  name='Component Name'
                  customLabel=''
                  checked={
                    initialDeductableValues.length ===
                  selectedDeductableComponents.length
                  }
                  onChange={onChangeCheckboxHandler}
                />
              </Grid>
              <Grid
                item
                xs={4}
                md={4}
                lg={4}
                xl={4}
                component='div'
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Typography sx={{ fontWeight: 500, color: '#1F2937' }}>
                Component Name
                </Typography>
                <HiSelector />
              </Grid>
              <Grid
                item
                xs={4}
                md={4}
                lg={4}
                xl={4}
                component='div'
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Typography sx={{ fontWeight: 500, color: '#1F2937' }}>
                Component Condition
                </Typography>
                <HiSelector />
              </Grid>
              <Grid item xs={3} md={3} lg={3} xl={3}>
                <AddButton
                  variant='contained'
                  startIcon={<AddIcon />}
                  label='Component'
                  sx={{ width: '136px', fontSize: '14px' }}
                />
              </Grid>
            </Grid>
          </Box>

          {selectedDeductableComponents.map((value, i) => {
            return (
              <Box sx={{ flexGrow: 1 }} key={i}>
                <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                  <Grid item xs={1} md={1} lg={1} xl={1}>
                    <CheckBox
                      name={value.componentName}
                      customLabel=''
                      checked={initialDeductableValues.includes(
                        value.componentName
                      )}
                      onChange={onChangeCheckboxHandler}
                    />
                  </Grid>
                  <Grid item xs={4} md={4} lg={4} xl={4}>
                    <Typography
                      sx={{ fontWeight: 500, color: '#4B5563', fontSize: '14px' }}
                    >
                      {value.componentName}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} md={4} lg={4} xl={4}>
                    <Typography sx={{ fontWeight: 400, color: '#4B5563' }}>
                      {value.componentCondition}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            );
          })}
        </CustomModal>
      </Box>
    </>
  );
}


