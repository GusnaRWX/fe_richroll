import { Box, Container } from '@mui/material';
import React from 'react';
import ProfileInformation from './ProfileInformation';
import EmployeeUpdatePassword from './EmployeeUpdatePassword';
import EmployeeDeleteAccount from './EmployeeDeleteAccount';

const EmployeeProfileComponent = () => {
  return (
    <Container maxWidth='lg'>
      <Box mb='24px'>
        <ProfileInformation />
        <EmployeeUpdatePassword />
        <EmployeeDeleteAccount />
      </Box>
    </Container>
  );
};

export default EmployeeProfileComponent;