import React, { useState } from 'react';
import {
  Grid,
  Collapse,
  TableCell,
  TableRow,
  Avatar,
  Typography
} from '@mui/material';
import { IconButton, CheckBox } from '@/components/_shared/form';
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

function DisbursementRow (att) {
  const { item } = att;
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
        <TableCell>{item.nonTax}</TableCell>
        <TableCell>{item.netSalary}</TableCell>
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout='auto' sx={{ mt: '1rem', mb: '1rem' }} unmountOnExit>
            <Typography component='div' variant='text-sm' fontWeight='bold' color='#4B5563'>Net Calculation Payroll</Typography>

            <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '2rem', mb: '1rem' }}>Gross Payroll</Typography>
            <Grid container spacing={2} sx={{ mb: '1rem' }}>
              <Grid item xs={3}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Base Compensation</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Rp 5.000.000</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Supplementary Compensation</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Rp 2.500.000</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Ad Hoc</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Rp 2.000.000</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Gross Payroll</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Rp 9.500.000</Typography>
              </Grid>
            </Grid>
            
            <Grid container spacing={2}>
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Typography component='div' variant='text-base'>NPWP</Typography>
                <CheckBox
                  customLabel='NPWP Owner'
                  name='isMonthly'
                  checked={true}
                  disabled
                  onChange={(e) => console.log(e)}
                />
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Typography component='div' variant='text-base'>Status</Typography>
                <CheckBox
                  customLabel='Freelance/Contract/Irregular'
                  name='isStatus'
                  checked={false}
                  disabled
                  onChange={(e) => console.log(e)}
                />
              </Grid>
            </Grid>
            
            <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '2rem', mb: '1rem' }}>Other Taxable Income</Typography>
            <Grid container spacing={2} sx={{ mb: '1rem' }}>
              <Grid item xs={4}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Taxable Income Component 1</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Reimbursement</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Amount</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Rp 500.000</Typography>
              </Grid>
            </Grid>
            
            <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '2rem', mb: '1rem' }}>Statutory Benefits</Typography>
            <Grid container spacing={2} sx={{ mb: '1rem' }}>
              <Grid item xs={4}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Statutory Component 1</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Work accident insurance</Typography>
              </Grid>
              <Grid item xs={1.5}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Rates</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>0,24 %</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Amount</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Rp 10.000.000</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Total</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Rp 24.000</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: '1rem' }}>
              <Grid item xs={4}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Statutory Component 2</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Work accident insurance</Typography>
              </Grid>
              <Grid item xs={1.5}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Rates</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>1 %</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Amount</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Rp 10.000.000</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Total</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Rp 100.000</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: '1rem' }}>
              <Grid item xs={4}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151'>Employer-Paid </Typography>
                <CheckBox
                  customLabel='Split With Company '
                  name='isMonthly'
                  checked={true}
                  disabled
                  onChange={(e) => console.log(e)}
                />
              </Grid>
              <Grid item xs={1.5}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Rates</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>4 %</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Amount</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Rp 10.000.000</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Total</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Rp 400.000</Typography>
              </Grid>
            </Grid>

            <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '2rem', mb: '1rem' }}>Taxable Income Deduction</Typography>
            <Grid container spacing={2} sx={{ mb: '1rem' }}>
              <Grid item xs={4}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Deduction Component 1</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Non-Taxable Income</Typography>
              </Grid>
              <Grid item xs={3.5}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Status</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Maried (K1), Dependant 1</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Total</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Rp 58.500.000</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: '1rem' }}>
              <Grid item xs={4}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Deduction Component 2</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Occupational Allowance</Typography>
              </Grid>
              <Grid item xs={1.5}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Rates</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>5 %</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Amount</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Rp 10.124.000</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Total</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Rp 506.000</Typography>
              </Grid>
            </Grid>

            <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '2rem', mb: '1rem' }}>Income Tax</Typography>
            <Grid container spacing={2} sx={{ mb: '1rem' }}>
              <Grid item xs={4}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Total Taxable Income (Current Month)</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Rp 4.742.000</Typography>
              </Grid>
              <Grid item xs={1.5}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Rates</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>5 %</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Total Tax</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Rp 237.000</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: '1rem' }}>
              <Grid item xs={4}>
                <Typography component='div' variant='text-base' fontWeight='400' color='#374151' sx={{ mb: '1rem' }}>Annual Taxable Income</Typography>
                <Typography component='div' variant='text-base' fontWeight='400' color='#9CA3AF' sx={{ paddingLeft: '12px' }}>Rp 56.913.000</Typography>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default DisbursementRow;