import React, { useState } from 'react';
import {
  Grid,
  Collapse,
  TableCell,
  TableRow,
  Avatar,
  Button as MuiButton,
  Typography
} from '@mui/material';
import { Input, IconButton, Select, RadioGroup } from '@/components/_shared/form';
import { Add } from '@mui/icons-material';
import { BsTrashFill } from 'react-icons/bs';
import { Image as ImageType } from '@/utils/assetsConstant';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import styled from '@emotion/styled';

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

function GrossRow (row) {
  const { item } = row;
  const [open, setOpen] = useState(false);

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
                  <HiChevronUp fontSize={20} color='#223567'/> :
                  <HiChevronDown fontSize={20} color='#223567'/>
              }
            />
          </ButtonWrapper>
        </TableCell>
      </TableRow>
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
                  value={''}
                  options={[
                    {value: '', label: 'All Status'},
                    {value: 'active', label: 'Active'},
                    {value: 'inactive', label: 'Inactive'},
                    {value: 'draft', label: 'Draft'},
                  ]}
                />
              </Grid>
              <Grid item>
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
              <Grid item>
                <Select
                  fullWidth
                  variant='outlined'
                  size='small'
                  customLabel='&nbsp;'
                  value={'active'}
                  options={[
                    {value: '', label: 'All Status'},
                    {value: 'active', label: 'Active'},
                    {value: 'inactive', label: 'Inactive'},
                    {value: 'draft', label: 'Draft'},
                  ]}
                />
              </Grid>
              <Grid item>
                <RadioGroup
                  label='Tax Status'
                  name='taxStatus'
                  options={[
                    {label: 'Taxable', value: '1'},
                    {label: 'Non-Taxable', value: '2'},
                  ]}
                  row
                />
              </Grid>
            </Grid>

            <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '2rem', mb: '1rem' }}>Overtime Hours</Typography>
            <Grid container spacing={2} sx={{ mb: '1rem' }}>
              <Grid item xs={3.5} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
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
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
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
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Input
                  name='amount'
                  size='small'
                  placeholder='Input overtime hours'
                  onKeyDown={(e) => console.log(e)}
                  type='text'
                  customLabel='Overtime Hours'
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
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
                <IconButton
                  parentColor='#FEE2E2'
                  onClick={() => { console.log(); }}
                  icons={
                    <BsTrashFill fontSize={20} color='#B91C1C'/>
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
            ><Add fontSize='small' />&nbsp; Add Overtime Hours</MuiButton>

            <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '2rem', mb: '1rem' }}>Supplementary</Typography>
            <Grid container spacing={2} sx={{ mb: '1rem' }}>
              <Grid item xs={3.5} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
                <Select
                  fullWidth
                  variant='outlined'
                  size='small'
                  customLabel='Compensation Component 1'
                  value={''}
                  options={[
                    {value: '', label: 'All Status'},
                    {value: 'active', label: 'Active'},
                    {value: 'inactive', label: 'Inactive'},
                    {value: 'draft', label: 'Draft'},
                  ]}
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
                    {value: '', label: 'All Status'},
                    {value: 'active', label: 'Active'},
                    {value: 'inactive', label: 'Inactive'},
                    {value: 'draft', label: 'Draft'},
                  ]}
                />
              </Grid>
              <Grid item xs={3}>
                <RadioGroup
                  label='Tax Status'
                  name='taxStatus'
                  options={[
                    {label: 'Taxable', value: '1'},
                    {label: 'Non-Taxable', value: '2'},
                  ]}
                  row
                />
              </Grid>
              <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
                <IconButton
                  parentColor='#FEE2E2'
                  onClick={() => { console.log(); }}
                  icons={
                    <BsTrashFill fontSize={20} color='#B91C1C'/>
                  }
                />
              </Grid>
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
                    {value: '', label: 'All Status'},
                    {value: 'active', label: 'Active'},
                    {value: 'inactive', label: 'Inactive'},
                    {value: 'draft', label: 'Draft'},
                  ]}
                />
              </Grid>
              <Grid item xs={7.5} sm={7.5} md={7.5} lg={7.5} xl={7.5} >
                <RadioGroup
                  label='Tax Status'
                  name='taxStatus'
                  options={[
                    {label: 'Taxable', value: '1'},
                    {label: 'Non-Taxable', value: '2'},
                  ]}
                  row
                />
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
                <IconButton
                  parentColor='#FEE2E2'
                  onClick={() => { console.log(); }}
                  icons={
                    <BsTrashFill fontSize={20} color='#B91C1C'/>
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
            ><Add fontSize='small' />&nbsp; Add Supplementaryc Compensation</MuiButton>

            <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '2rem', mb: '1rem' }}>Ad Hoc</Typography>
            <MuiButton
              variant='contained'
              size='small'
              color='secondary'
              sx={{ color: '#FFF' }}
              onClick={() => { console.log(true); }}
            ><Add fontSize='small' />&nbsp; Add Ad Hoc</MuiButton>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default GrossRow;