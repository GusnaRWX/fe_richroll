import React, { useState } from 'react';
import {
  Box,
  Grid,
  Collapse,
  TableCell,
  TableRow,
  Avatar,
  Button as MuiButton,
  Typography
} from '@mui/material';
import { Input, IconButton, Select, CheckBox } from '@/components/_shared/form';
import { Add } from '@mui/icons-material';
import { BsTrashFill } from 'react-icons/bs';
import { Image as ImageType } from '@/utils/assetsConstant';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import styled from '@emotion/styled';
import { Payroll } from '@/types/payroll';

const AsteriskComponent = styled.span`
  color: #DC2626;
`;

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

function NetRow(att) {
  const { item } = att;
  const [open, setOpen] = useState(false);

  const [nonTaxable, setNonTaxable] = useState<Payroll.AddNonTaxable[] | []>([]);

  const handleAddNonTaxable = () => {
    setNonTaxable((prev) => [...prev, { componentId: '', amount: '' }]);
  };

  console.log(nonTaxable);

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
        <TableCell>{item.nonTax}</TableCell>
        <TableCell>{item.netSalary}</TableCell>
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
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout='auto' sx={{ mt: '1rem', mb: '1rem' }} unmountOnExit>
            <Typography component='div' variant='text-sm' fontWeight='bold' color='#4B5563'>Net Calculation Payroll</Typography>

            <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '2rem', mb: '1rem' }}>Gross Payroll</Typography>
            <Grid container spacing={2} sx={{ mb: '1rem' }}>
              <Grid item xs={3}>
                <Input
                  name='amount'
                  size='small'
                  value='5.000.000'
                  onKeyDown={(e) => console.log(e)}
                  type='text'
                  customLabel='Base Compensation'
                  disabled
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
              <Grid item xs={3}>
                <Input
                  name='amount'
                  size='small'
                  value='2.500.000'
                  onKeyDown={(e) => console.log(e)}
                  type='text'
                  customLabel='Supplementary Compensation'
                  disabled
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
              <Grid item xs={3}>
                <Input
                  name='amount'
                  size='small'
                  value='2.000.000'
                  onKeyDown={(e) => console.log(e)}
                  type='text'
                  customLabel='Ad Hoc'
                  disabled
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
              <Grid item xs={3}>
                <Input
                  name='amount'
                  size='small'
                  value='9.500.000'
                  onKeyDown={(e) => console.log(e)}
                  type='text'
                  customLabel='Gross Payroll'
                  disabled
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
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Typography component='div' variant='text-base'>NPWP</Typography>
                <CheckBox
                  customLabel='NPWP Owner'
                  name='isMonthly'
                  checked={true}
                  onChange={(e) => console.log(e)}
                />
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Typography component='div' variant='text-base'>Status</Typography>
                <CheckBox
                  customLabel='Freelance/Contract/Irregular'
                  name='isStatus'
                  checked={false}
                  onChange={(e) => console.log(e)}
                />
              </Grid>
            </Grid>

            <Box sx={{ background: '#F9FAFB', p: '8px', mt: '2rem' }}>
              <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mb: '1rem' }}>Statutory Benefits</Typography>
              <Grid container spacing={2} sx={{ mb: '1rem' }}>
                <Grid item xs={3.3}>
                  <Select
                    fullWidth
                    sx={{
                      background: '#FFF'
                    }}
                    variant='outlined'
                    size='small'
                    customLabel='Statutory Component 1'
                    value={''}
                    options={[
                      { value: '', label: 'All Status' },
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                      { value: 'draft', label: 'Draft' },
                    ]}
                  />
                </Grid>
                <Grid item xs={1.1}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Rates'
                    withAsterisk
                    InputProps={{
                      endAdornment: ('%'),
                      sx: {
                        '> input': {
                          paddingRight: '8px',
                          width: '45%'
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={3.3}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Amount'
                    withAsterisk
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
                <Grid item xs={3.3}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Total'
                    withAsterisk
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
                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
                  <IconButton
                    parentColor='#FEE2E2'
                    onClick={() => { console.log(); }}
                    icons={
                      <BsTrashFill fontSize={20} color='#B91C1C' />
                    }
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mb: '2rem' }}>
                <Grid item xs={3.3}>
                  <Typography component='div' variant='text-base'>Status<AsteriskComponent>*</AsteriskComponent></Typography>
                  <CheckBox
                    customLabel='Split With Company '
                    name='isStatus'
                    checked={false}
                    onChange={(e) => console.log(e)}
                  />
                </Grid>
                <Grid item xs={1.1}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Rates'
                    withAsterisk
                    disabled
                    InputProps={{
                      endAdornment: ('%'),
                      sx: {
                        '> input': {
                          paddingRight: '8px',
                          width: '45%'
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={3.3}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Amount'
                    withAsterisk
                    disabled
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
                <Grid item xs={3.3}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Total'
                    withAsterisk
                    disabled
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
              </Grid>

              <Grid container spacing={2} sx={{ mb: '1rem' }}>
                <Grid item xs={3.3}>
                  <Select
                    fullWidth
                    sx={{
                      background: '#FFF'
                    }}
                    variant='outlined'
                    size='small'
                    customLabel='Statutory Component 2'
                    value={''}
                    options={[
                      { value: '', label: 'All Status' },
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                      { value: 'draft', label: 'Draft' },
                    ]}
                  />
                </Grid>
                <Grid item xs={1.1}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Rates'
                    withAsterisk
                    InputProps={{
                      endAdornment: ('%'),
                      sx: {
                        '> input': {
                          paddingRight: '8px',
                          width: '45%'
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={3.3}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Amount'
                    withAsterisk
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
                <Grid item xs={3.3}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Total'
                    withAsterisk
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
                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
                  <IconButton
                    parentColor='#FEE2E2'
                    onClick={() => { console.log(); }}
                    icons={
                      <BsTrashFill fontSize={20} color='#B91C1C' />
                    }
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mb: '2rem' }}>
                <Grid item xs={3.3}>
                  <Typography component='div' variant='text-base'>Status<AsteriskComponent>*</AsteriskComponent></Typography>
                  <CheckBox
                    customLabel='Split With Company '
                    name='isStatus'
                    checked={true}
                    onChange={(e) => console.log(e)}
                  />
                </Grid>
                <Grid item xs={1.1}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Rates'
                    withAsterisk
                    InputProps={{
                      endAdornment: ('%'),
                      sx: {
                        '> input': {
                          paddingRight: '8px',
                          width: '45%'
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={3.3}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Amount'
                    withAsterisk
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
                <Grid item xs={3.3}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Total'
                    withAsterisk
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
              </Grid>

              <MuiButton
                variant='contained'
                size='small'
                color='secondary'
                sx={{ color: '#FFF' }}
                onClick={() => { console.log(true); }}
              ><Add fontSize='small' />&nbsp; Add Satutory Benefits</MuiButton>
            </Box>

            <Box sx={{ background: '#F9FAFB', p: '8px', mt: '2rem' }}>
              <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mb: '1rem' }}>Taxable Income Deduction</Typography>
              <Grid container spacing={2} sx={{ mb: '1rem' }}>
                <Grid item xs={4.4}>
                  <Select
                    fullWidth
                    sx={{
                      background: '#FFF'
                    }}
                    variant='outlined'
                    size='small'
                    customLabel='Deduction Component 1'
                    value={''}
                    options={[
                      { value: '', label: 'All Status' },
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                      { value: 'draft', label: 'Draft' },
                    ]}
                  />
                </Grid>
                <Grid item xs={3.3}>
                  <Select
                    fullWidth
                    sx={{
                      background: '#FFF'
                    }}
                    variant='outlined'
                    size='small'
                    customLabel='Status'
                    value={''}
                    options={[
                      { value: '', label: 'All Status' },
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                      { value: 'draft', label: 'Draft' },
                    ]}
                  />
                </Grid>
                <Grid item xs={3.3}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Total'
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
                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
                  <IconButton
                    parentColor='#FEE2E2'
                    onClick={() => { console.log(); }}
                    icons={
                      <BsTrashFill fontSize={20} color='#B91C1C' />
                    }
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mb: '2rem' }}>
                <Grid item xs={3.3}>
                  <Select
                    fullWidth
                    sx={{
                      background: '#FFF'
                    }}
                    variant='outlined'
                    size='small'
                    customLabel='Deduction Component 2'
                    value={''}
                    options={[
                      { value: '', label: 'All Status' },
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                      { value: 'draft', label: 'Draft' },
                    ]}
                  />
                </Grid>
                <Grid item xs={1.1}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Rates'
                    disabled
                    InputProps={{
                      endAdornment: ('%'),
                      sx: {
                        '> input': {
                          paddingRight: '8px',
                          width: '45%'
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={3.3}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Amount'
                    disabled
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
                <Grid item xs={3.3}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Total'
                    disabled
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
                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
                  <IconButton
                    parentColor='#FEE2E2'
                    onClick={() => { console.log(); }}
                    icons={
                      <BsTrashFill fontSize={20} color='#B91C1C' />
                    }
                  />
                </Grid>
              </Grid>

              <MuiButton
                variant='contained'
                size='small'
                color='secondary'
                sx={{ color: '#FFF' }}
                onClick={() => { console.log(true); }}
              ><Add fontSize='small' />&nbsp; Add Taxable Deductions</MuiButton>
            </Box>

            <Box sx={{ background: '#F9FAFB', p: '8px', mt: '2rem' }}>
              <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mb: '1rem' }}>Income Tax</Typography>
              <Grid container spacing={2} sx={{ mb: '1rem' }}>
                <Grid item xs={3.3}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Taxable Income'
                    disabled
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
                <Grid item xs={1.1}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Rates'
                    disabled
                    InputProps={{
                      endAdornment: ('%'),
                      sx: {
                        '> input': {
                          paddingRight: '8px',
                          width: '45%'
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={3.3}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Total Tax'
                    disabled
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
                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
                  <IconButton
                    parentColor='#FEE2E2'
                    onClick={() => { console.log(); }}
                    icons={
                      <BsTrashFill fontSize={20} color='#B91C1C' />
                    }
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={4.4}>
                  <Input
                    name='amount'
                    size='small'
                    placeholder='0'
                    onKeyDown={(e) => console.log(e)}
                    type='text'
                    customLabel='Annual Taxable Income'
                    disabled
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
              </Grid>
            </Box>

            <Typography
              component='div'
              variant='text-base'
              fontWeight='bold'
              color='primary.main'
              sx={{ mt: '2rem', mb: '1rem' }}
            >Non-Taxable Adjustment</Typography>
            {nonTaxable?.length > 0 && (
              nonTaxable?.map((nonTax: Payroll.AddNonTaxable) => (
                <Grid key={nonTax.componentId} container flexDirection='row' gap={3} alignItems='end' mb='1rem'>
                  <Grid item>
                    <Select
                      options={[]}
                      customLabel='Non-Taxable Component'
                      size='small'
                    />
                  </Grid>
                  <Grid item>
                    <Input
                      customLabel='Amount'
                      InputProps={{
                        startAdornment: 'Rp.',
                        endAdornment: 'IDR'
                      }}
                      withAsterisk
                      size='small'
                    />
                  </Grid>
                  <Grid item>
                    <IconButton
                      parentColor='#FEE2E2'
                      onClick={() => { console.log(); }}
                      icons={
                        <BsTrashFill fontSize={20} color='#B91C1C' />
                      }
                    />
                  </Grid>
                </Grid>
              ))
            )}
            <MuiButton
              variant='contained'
              size='small'
              color='secondary'
              sx={{ color: '#FFF' }}
              onClick={handleAddNonTaxable}
            ><Add fontSize='small' />&nbsp; Add Non-Taxable Adjustment</MuiButton>

          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default NetRow;