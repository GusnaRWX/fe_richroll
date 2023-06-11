import { Text } from '@/components/_shared/common';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useAppSelectors } from '@/hooks/index';
import { relationshipItems } from '@/utils/options';

const PersonalInformationEmergencyTabComponent = () => {
  const { detailEmergencyContact } = useAppSelectors((state) => state.employment);
  console.log(detailEmergencyContact);
  const checkRelationshipItems = (relationship: number) => {
    return relationshipItems.find(item => +item.value === relationship)?.label;
  };
  return (
    <>
      <Typography component='h3' fontWeight='bold' fontSize={18} color='primary'>Emergency Contact</Typography>
      <Box sx={{ marginTop: '1rem', marginBottom: '2rem', width: '100%' }}>
        <Typography component='h3' fontWeight='bold' fontSize={18} color='primary'>Primary</Typography>
        <Grid container spacing={2} sx={{ marginTop: '.5rem', marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Full Name'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title={detailEmergencyContact?.primary?.name}
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Relationship'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title={checkRelationshipItems(detailEmergencyContact?.primary?.relationship)}
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem' }}>
            <Text
              title='Contact Number'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title={detailEmergencyContact?.primary?.phoneNumberPrefix + detailEmergencyContact?.primary?.phoneNumber}
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginBottom: '2rem', width: '100%' }}>
        <Typography component='h3' fontWeight='bold' fontSize={18} color='primary'>Secondary</Typography>
        <Grid container spacing={2} sx={{ marginTop: '.5rem', marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Full Name'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title={detailEmergencyContact?.secondary?.name}
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title='Relationship'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title={checkRelationshipItems(detailEmergencyContact?.secondary?.relationship)}
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem' }}>
            <Text
              title='Contact Number'
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title={detailEmergencyContact?.secondary?.phoneNumberPrefix + detailEmergencyContact?.secondary?.phoneNumber}
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PersonalInformationEmergencyTabComponent;