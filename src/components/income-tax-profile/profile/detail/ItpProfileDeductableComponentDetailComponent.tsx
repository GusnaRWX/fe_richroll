import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';

export default function ItpProfileDeductableComponentDetailComponent() {

  const MaritalStatus = [
    {FUC : 'Single', Amount : 0},
    {FUC : 'Single', Amount : 100000},
    {FUC : 'Married', Amount : 100000},
    {FUC : 'Married with Spouse Earening (Claim)', Amount : 90000000},
    {FUC : 'Married with Spouse Earening (Claimed)', Amount : 100000},
  ];

  const NumberOfDependance = [
    {FUC : '1', Amount : 0},
    {FUC : '2', Amount : 100000},
    {FUC : '3', Amount : 100000000},
  ];

  return(
    <>
      <Paper sx={{p:'20px 32px', mt:'16px'}}>
        <Typography
          style={{
            color: '#223567',
            fontSize: '18px',
            fontWeight: '700',
            marginBottom:'16px  '
          }}
        >
          Marital Status
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography
              style={{
                color: '#223567',
                fontSize: '14px',
                fontWeight: '400',
                marginBottom:'6px  '
              }}
            >
              Factor Unit Condition
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography
              style={{
                color: '#223567',
                fontSize: '14px',
                fontWeight: '400',
                marginBottom:'6px  '
              }}
            >
              Amount
            </Typography>
          </Grid>
        </Grid>
        {MaritalStatus.map((maritalStatus, i) => (
          <Grid container spacing={2} key={i}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                style={{
                  color: '#223567',
                  fontSize: '14px',
                  fontWeight: '700',
                  marginBottom:'6px  '
                }}
              >
                {maritalStatus.FUC}
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                style={{
                  color: '#223567',
                  fontSize: '14px',
                  fontWeight: '700',
                  marginBottom:'6px  '
                }}
              >
                Rp. {maritalStatus.Amount}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Paper>
      <Paper sx={{p:'20px 32px', mt:'16px'}}>
        <Typography
          style={{
            color: '#223567',
            fontSize: '18px',
            fontWeight: '700',
            marginBottom:'16px  '
          }}
        >
          Number of Dependance
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography
              style={{
                color: '#223567',
                fontSize: '14px',
                fontWeight: '400',
                marginBottom:'6px  '
              }}
            >
              Factor Unit Condition
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography
              style={{
                color: '#223567',
                fontSize: '14px',
                fontWeight: '400',
                marginBottom:'6px  '
              }}
            >
              Amount
            </Typography>
          </Grid>
        </Grid>
        {NumberOfDependance.map((NumberOfDependance, n) => (
          <Grid container spacing={2} key={n}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                style={{
                  color: '#223567',
                  fontSize: '14px',
                  fontWeight: '700',
                  marginBottom:'6px  '
                }}
              >
                {NumberOfDependance.FUC}
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                style={{
                  color: '#223567',
                  fontSize: '14px',
                  fontWeight: '700',
                  marginBottom:'6px  '
                }}
              >
                Rp. {NumberOfDependance.Amount}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Paper>
      <Paper sx={{p:'20px 32px', mt:'16px'}}>
        <Typography
          style={{
            color: '#223567',
            fontSize: '18px',
            fontWeight: '700',
            marginBottom:'16px  '
          }}
        >
          Number of Dependance
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography
              style={{
                color: '#223567',
                fontSize: '14px',
                fontWeight: '400',
                marginBottom:'6px  '
              }}
            >
              Factor Unit Condition
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography
              style={{
                color: '#223567',
                fontSize: '14px',
                fontWeight: '400',
                marginBottom:'6px  '
              }}
            >
              Amount
            </Typography>
          </Grid>
        </Grid>
        {NumberOfDependance.map((NumberOfDependance, n) => (
          <Grid container spacing={2} key={n}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                style={{
                  color: '#223567',
                  fontSize: '14px',
                  fontWeight: '700',
                  marginBottom:'6px  '
                }}
              >
                {NumberOfDependance.FUC}
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography
                style={{
                  color: '#223567',
                  fontSize: '14px',
                  fontWeight: '700',
                  marginBottom:'6px  '
                }}
              >
                Rp. {NumberOfDependance.Amount}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Paper>
    </>
  );
}