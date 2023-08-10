import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { Text } from '@/components/_shared/common';
import { relationshipItems } from '@/utils/options';
import { useTranslation } from 'react-i18next';

type EmergencyContactType = {
  primary: {
    name: string;
    relationship: number;
    phoneNumberPrefix: string;
    phoneNumber: string;
  },
  secondary?: {
    name: string;
    relationship: number;
    phoneNumberPrefix: string;
    phoneNumber: string;
  }
}

interface EmergencyContactProps {
  data: EmergencyContactType
}


function EmergencyContactDetail({ data }: EmergencyContactProps) {
  const {t} = useTranslation();
  const t_emergencyContact = 'company_management.employees.form_&_detail.emergency_contact';
  const t_primarySection = 'company_management.employees.form_&_detail.emergency_contact.primary_section';
  const t_secondarySection = 'company_management.employees.form_&_detail.emergency_contact.secondary_section';

  const checkRelationshipItems = (relationship: number) => {
    return relationshipItems.find(item => +item.value === relationship)?.label;
  };

  return (
    <>
      <Typography component='h3' fontWeight='bold' fontSize={18} color='primary'>{t(`${t_emergencyContact}.title`)}</Typography>
      <Box sx={{ marginTop: '1rem', marginBottom: '2rem', width: '100%' }}>
        <Typography component='h3' fontWeight='bold' fontSize={18} color='primary'>{t(`${t_primarySection}.title`)}</Typography>
        <Grid container spacing={2} sx={{ marginTop: '.5rem', marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title={t(`${t_primarySection}.fullname`)}
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title={data?.primary?.name || ''}
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title={t(`${t_primarySection}.relationship`)}
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title={checkRelationshipItems(data?.primary?.relationship)}
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem' }}>
            <Text
              title={t(`${t_primarySection}.contact_number`)}
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title={data?.primary?.phoneNumberPrefix + data?.primary?.phoneNumber || ''}
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginBottom: '2rem', width: '100%' }}>
        <Typography component='h3' fontWeight='bold' fontSize={18} color='primary'>{t(`${t_secondarySection}.title`)}</Typography>
        <Grid container spacing={2} sx={{ marginTop: '.5rem', marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title={t(`${t_secondarySection}.fullname`)}
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title={data?.secondary?.name ?? ''}
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text
              title={t(`${t_secondarySection}.relationship`)}
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title={checkRelationshipItems(data?.secondary?.relationship as number)}
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem' }}>
            <Text
              title={t(`${t_secondarySection}.contact_number`)}
              fontWeight={500}
              color='grey.400'
            />
            <Text
              title={data?.secondary?.phoneNumberPrefix as string + data?.secondary?.phoneNumber || ''}
              fontWeight={400}
              color='grey.600'
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default EmergencyContactDetail;