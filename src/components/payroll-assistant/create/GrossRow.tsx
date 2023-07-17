import React, { useState, useEffect } from 'react';
import {
  Grid,
  Collapse,
  TableCell,
  TableRow,
  Avatar,
  Button as MuiButton,
  Typography,
  Box
} from '@mui/material';
import { Input, IconButton, Select, RadioGroup } from '@/components/_shared/form';
import { Add } from '@mui/icons-material';
import { BsTrashFill } from 'react-icons/bs';
import { Image as ImageType } from '@/utils/assetsConstant';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import styled from '@emotion/styled';
import { ifThenElse } from '@/utils/helper';
import { useFormik } from 'formik';
import { Payroll } from '@/types/payroll';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getListBaseCompensationRequested, getListTerminReqeusted, getListSuppCompensationRequested } from '@/store/reducers/slice/options/optionSlice';

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 gap: .5rem;
`;

const NameWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 margin: 0;
`;

function GrossRow(att) {
  const { item, isPreview } = att;
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { option } = useAppSelectors(state => state);
  const formik = useFormik({
    initialValues: {
      baseCompensationComponentId: '',
      amountBase: '',
      periodBase: '',
      taxStatusBase: 'non-taxable',


      // hoc
      hocComponent: [],
      overtimeComponent: { overtime: '', rate: '' }
    } as Payroll.GrossRowForm,
    onSubmit: (_val) => {
      console.log('kanjut', _val);
    },
  });

  const handleAddHoc = () => {
    formik.setValues({
      ...formik.values,
      hocComponent: [...formik.values.hocComponent, { componentName: '', amount: '' }]
    });
  };

  // const handleAddOvertime = () => {
  //   formik.setValues({
  //     ...formik.values,
  //     overtimeComponent: [...formik.values.overtimeComponent, { overtime: '', rate: '', /*rates: '' */ }]
  //   });
  // };

  const handleRemoveHoc = (idx) => {
    const updatedHoc = formik.values.hocComponent.filter((_, index) => index !== idx);
    formik.setValues({
      ...formik.values,
      hocComponent: updatedHoc
    });
  };

  // const handleRemoveOvertime = (idx) => {
  //   const updated = formik.values.overtimeComponent.filter((_, index) => index !== idx);
  //   formik.setValues({
  //     ...formik.values,
  //     overtimeComponent: updated
  //   });
  // };

  useEffect(() => {
    dispatch({ type: getListBaseCompensationRequested.toString() });
    dispatch({ type: getListSuppCompensationRequested.toString() });
  }, []);


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, boxShadow: open ? '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)' : 'none' }}>
        <TableCell>
          <NameWrapper>
            <Avatar
              src={ImageType.AVATAR_PLACEHOLDER}
              alt={item.name}
              sx={{
                width: 24, height: 24
              }}
            />
            &nbsp;{item.name}
          </NameWrapper>
        </TableCell>
        <TableCell>{item.attendance}</TableCell>
        <TableCell>{item.absent}</TableCell>
        <TableCell>{item.paidLeave}</TableCell>
        <TableCell>{item.unpaidLeave}</TableCell>
        <TableCell>
          <ButtonWrapper>
            <IconButton
              onClick={() => { setOpen(!open); }}
              icons={
                open ?
                  <HiChevronUp fontSize={20} color='#223567' /> :
                  <HiChevronDown fontSize={20} color='#223567' />
              }
            />
          </ButtonWrapper>
        </TableCell>
      </TableRow>

      {ifThenElse(
        isPreview,
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' sx={{ mt: '1rem', mb: '1rem' }} unmountOnExit>
              <Typography component='div' variant='text-sm' fontWeight='bold' color='#4B5563'>Gross Calculation Payroll</Typography>

              <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '2rem', mb: '1rem' }}>Base</Typography>
              <Grid container spacing={2} sx={{ mb: '1rem' }}>
                <Grid item xs={4}>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ mb: '1rem' }}>Compensation Component</Typography>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ paddingLeft: '12px' }}>Salary</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mb: '1rem' }}>
                <Grid item xs={4}>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ mb: '1rem' }}>Amount</Typography>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ paddingLeft: '12px' }}>Rp. 5.000.000,00</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ mb: '1rem' }}>&nbsp;</Typography>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ paddingLeft: '12px' }}>per Month</Typography>
                </Grid>
              </Grid>

              <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '2rem', mb: '1rem' }}>Supplementary</Typography>
              <Grid container spacing={2} sx={{ mb: '1rem' }}>
                <Grid item xs={4}>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ mb: '1rem' }}>Compensation Component 1</Typography>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ paddingLeft: '12px' }}>Transportation Allowance</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ mb: '1rem' }}>Tax Status</Typography>
                  <Typography variant='text-base' fontWeight='400' sx={{ marginLeft: '12px', padding: '3px 12px', background: '#E5E7EB', borderRadius: '4px' }}>Taxable</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mb: '1rem' }}>
                <Grid item xs={4}>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ mb: '1rem' }}>Amount</Typography>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ paddingLeft: '12px' }}>Rp. 500.000,00</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ mb: '1rem' }}>&nbsp;</Typography>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ paddingLeft: '12px' }}>per Month</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mb: '1rem' }}>
                <Grid item xs={4}>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ mb: '1rem' }}>Compensation Component 2</Typography>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ paddingLeft: '12px' }}>Housing Allowance</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ mb: '1rem' }}>Tax Status</Typography>
                  <Typography variant='text-base' fontWeight='400' sx={{ marginLeft: '12px', padding: '3px 12px', background: '#E5E7EB', borderRadius: '4px' }}>Taxable</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mb: '1rem' }}>
                <Grid item xs={4}>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ mb: '1rem' }}>Amount</Typography>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ paddingLeft: '12px' }}>Rp. 4.000.000,00</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ mb: '1rem' }}>&nbsp;</Typography>
                  <Typography component='div' variant='text-base' fontWeight='400' sx={{ paddingLeft: '12px' }}>per Month</Typography>
                </Grid>
              </Grid>
            </Collapse>
          </TableCell>
        </TableRow>,
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' sx={{ mt: '1rem', mb: '1rem' }} unmountOnExit>
              <Typography component='div' variant='text-sm' fontWeight='bold' color='#4B5563'>Gross Calculation Payroll</Typography>

              <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '2rem', mb: '1rem' }}>Base</Typography>
              <Grid container spacing={2}>
                <Grid item xs={3.5} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
                  <Select
                    fullWidth
                    variant='outlined'
                    size='small'
                    customLabel='Compensation Component'
                    value={formik.values.baseCompensationComponentId}
                    options={option?.listBaseCompensation}
                    name='baseCompensationComponentId'
                    onChange={(e) => {
                      formik.handleChange(e);
                      dispatch({ type: getListTerminReqeusted.toString(), payload: e.target.value });
                    }}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item>
                  <Input
                    name='amountBase'
                    size='small'
                    placeholder='Input amount'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.amountBase}
                    customLabel='Amount'
                    InputProps={{
                      startAdornment: ('Rp'),
                      endAdornment: ('IDR'),
                      sx: {
                        '> input': {
                          padding: '8.5px 8px'
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item>
                  <Select
                    fullWidth
                    variant='outlined'
                    size='small'
                    customLabel='&nbsp;'
                    value={formik.values.periodBase}
                    options={option?.listTermin}
                    name='periodBase'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item>
                  <RadioGroup
                    label='Tax Status'
                    name='taxStatusBase'
                    options={[
                      { label: 'Taxable', value: 'true' },
                      { label: 'Non-Taxable', value: 'false' },
                    ]}
                    value={formik.values.taxStatusBase}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    row
                  />
                </Grid>
              </Grid>

              <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '2rem', mb: '1rem' }}>Overtime Hours</Typography>
              {/* {formik.values.overtimeComponent?.length > 0 && (
                formik.values.overtimeComponent.map((_, index) => ( */}
              <Grid container spacing={2} sx={{ mb: '1rem' }} >
                {/* <Grid item xs={3.5} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
                  <Select
                    fullWidth
                    variant='outlined'
                    size='small'
                    customLabel='Overtime Type'
                    value={''}
                    options={[
                      {value: '', label: 'All Status'},
                      {value: 'active', label: 'Active'},
                      {value: 'inactive', label: 'Inactive'},
                      {value: 'draft', label: 'Draft'},
                    ]}
                  />
                </Grid> */}
                {/* <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                      <Input
                        name='amount'
                        size='small'
                        placeholder='Input rates'
                        onKeyDown={(e) => console.log(e)}
                        type='text'
                        customLabel='Rates'
                        InputProps={{
                          endAdornment: ('x Work Rate Hour'),
                          sx: {
                            '> input': {
                              paddingRight: '8px',
                              width: '36%'
                            }
                          }
                        }}
                      />
                    </Grid> */}
                <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='Input overtime hours'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Overtime Hours'
                    disabled
                    value={formik.values.overtimeComponent.overtime}
                    InputProps={{
                      endAdornment: ('Hours'),
                      sx: {
                        '> input': {
                          paddingRight: '8px'
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={2.5} sm={2.5} md={2.5} lg={2.5} xl={2.5}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='Input rate'
                    onKeyDown={(e) => console.log(e)}
                    value={formik.values.overtimeComponent.rate}
                    disabled
                    type='text'
                    customLabel='Rate'
                    InputProps={{
                      startAdornment: ('Rp'),
                      endAdornment: ('IDR'),
                      sx: {
                        '> input': {
                          padding: '8.5px 8px'
                        }
                      }
                    }}
                  />
                </Grid>
                {/* <Grid item xs={1} sm={1} md={1} lg={1} xl={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
                      <IconButton
                        parentColor='#FEE2E2'
                        onClick={() => { handleRemoveOvertime(index); }}
                        icons={
                          <BsTrashFill fontSize={20} color='#B91C1C' />
                        }
                      />
                    </Grid> */}
              </Grid>
              {/* ))
              )} */}


              {/* <MuiButton
                variant='contained'
                size='small'
                color='secondary'
                sx={{ color: '#FFF' }}
                onClick={handleAddOvertime}
              ><Add fontSize='small' />&nbsp; Add Overtime Hours</MuiButton> */}

              <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '2rem', mb: '1rem' }}>Supplementary</Typography>
              <Grid container spacing={2} sx={{ mb: '1rem' }}>
                <Grid item xs={3.5} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
                  <Select
                    fullWidth
                    variant='outlined'
                    size='small'
                    customLabel='Compensation Component 1'
                    value={''}
                    options={option?.listSuppCompensation}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='Input amount'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Amount'
                    InputProps={{
                      startAdornment: ('Rp'),
                      endAdornment: ('IDR'),
                      sx: {
                        '> input': {
                          padding: '8.5px 8px'
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={1.5}>
                  <Select
                    fullWidth
                    variant='outlined'
                    size='small'
                    customLabel='&nbsp;'
                    value={'active'}
                    options={[
                      { value: '', label: 'All Status' },
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                      { value: 'draft', label: 'Draft' },
                    ]}
                  />
                </Grid>
                <Grid item xs={3}>
                  <RadioGroup
                    label='Tax Status'
                    name='taxStatus'
                    options={[
                      { label: 'Taxable', value: '1' },
                      { label: 'Non-Taxable', value: '2' },
                    ]}
                    row
                  />
                </Grid>
                {/* <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
                  <IconButton
                    parentColor='#FEE2E2'
                    onClick={() => { console.log(); }}
                    icons={
                      <BsTrashFill fontSize={20} color='#B91C1C' />
                    }
                  />
                </Grid> */}
              </Grid>

              <Grid container spacing={2} sx={{ mb: '1rem' }}>
                <Grid item xs={3.5} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
                  <Select
                    fullWidth
                    variant='outlined'
                    size='small'
                    customLabel='Compensation Component 2'
                    value={''}
                    options={[
                      { value: '', label: 'All Status' },
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                      { value: 'draft', label: 'Draft' },
                    ]}
                  />
                </Grid>
                <Grid item xs={7.5} sm={7.5} md={7.5} lg={7.5} xl={7.5} >
                  <RadioGroup
                    label='Tax Status'
                    name='taxStatus'
                    options={[
                      { label: 'Taxable', value: '1' },
                      { label: 'Non-Taxable', value: '2' },
                    ]}
                    row
                  />
                </Grid>
                {/* <Grid item xs={1} sm={1} md={1} lg={1} xl={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
                  <IconButton
                    parentColor='#FEE2E2'
                    onClick={() => { console.log(); }}
                    icons={
                      <BsTrashFill fontSize={20} color='#B91C1C' />
                    }
                  />
                </Grid> */}
              </Grid>

              {/* <MuiButton
                variant='contained'
                size='small'
                color='secondary'
                sx={{ color: '#FFF' }}
                onClick={() => { console.log(true); }}
                disabled
              ><Add fontSize='small' />&nbsp; Add Supplementaryc Compensation</MuiButton> */}

              <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '2rem', mb: '1rem' }}>Ad Hoc</Typography>
              {formik.values.hocComponent.length > 0 && (
                formik.values.hocComponent.map((hoc: Payroll.HocComponent, index) => (
                  <Grid key={index} container flexDirection='row' gap={3} alignItems='end' mb='1rem'>
                    <Grid item md={4}>
                      <Input
                        customLabel='Ad-Hoc Component'
                        name={`hocComponent[${index}].componentName`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        size='small'
                        fullWidth
                        placeholder='Input Hoc Name'
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Input
                        name={`hocComponent[${index}].amount`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        customLabel='Amount'
                        withAsterisk
                        size='small'
                        fullWidth
                        placeholder='Input Amount'
                        InputProps={{
                          startAdornment: 'Rp.',
                          endAdornment: 'IDR'
                        }}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <IconButton
                        parentColor='#FEE2E2'
                        onClick={() => { handleRemoveHoc(index); }}
                        icons={
                          <BsTrashFill fontSize={20} color='#B91C1C' />
                        }
                      />
                    </Grid>
                  </Grid>
                ))
              )}
              <Box sx={{ display: 'block', mb: '10px' }}>
                <MuiButton
                  variant='contained'
                  size='small'
                  color='secondary'
                  sx={{ color: '#FFF' }}
                  onClick={handleAddHoc}
                ><Add fontSize='small' />&nbsp; Add Ad Hoc</MuiButton>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <MuiButton
                  variant='contained'
                  size='small'
                  color='primary'
                  sx={{ color: '#FFF' }}
                  onClick={formik.handleSubmit as any}
                >Calculate</MuiButton>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}

export default GrossRow;