import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Button, Input, Select, Textarea } from '@/components/_shared/form';

export default function CreateBasicDetailComponent() {
  const Dummyoption = [
    { value: '1', label: 'Dummy 1' },
    { value: '2', label: 'Dummy 2' },
    { value: '3', label: 'Dummy 3' },
  ];
  return (
    <>
      <Grid container spacing={2} rowSpacing={4}>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <Input
            placeholder='Input Statutory Benefits Name'
            customLabel='Component Name'
            withAsterisk
            size='small'
          />
        </Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}></Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <Select
            placeholder='Select Country'
            customLabel='Country'
            withAsterisk
            size='small'
            fullWidth
            options={Dummyoption}
          />
        </Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <Select
            placeholder='Select Country'
            customLabel='Province'
            size='small'
            fullWidth
            options={Dummyoption}
          />
        </Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <Select
            placeholder='Select Country'
            customLabel='City'
            size='small'
            fullWidth
            options={Dummyoption}
          />
        </Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <Select
            placeholder='Select Country'
            customLabel='Sub-District'
            size='small'
            fullWidth
            options={Dummyoption}
          />
        </Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <Textarea
            customLabel='Citation'
            minRows={4}
            style={{ resize: 'vertical' }}
          />
          <Typography
            style={{
              fontSize: '14px',
              marginTop: '6px',
              color: '#6B7280',
            }}
          >
            Max. 120 Character
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}></Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <Textarea
            customLabel='Internal Notes'
            minRows={4}
            style={{ resize: 'vertical' }}
          />
          <Typography
            style={{
              fontSize: '14px',
              marginTop: '6px',
              color: '#6B7280',
            }}
          >
            Max. 120 Character
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          <Textarea
            customLabel='External Notes'
            minRows={4}
            style={{ resize: 'vertical' }}
          />
          <Typography
            style={{
              fontSize: '14px',
              marginTop: '6px',
              color: '#6B7280',
            }}
          >
            Max. 120 Character
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              color='primary'
              label='Next'
              sx={{ width: '63px' }}
            ></Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
