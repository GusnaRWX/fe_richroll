import React from 'react';
import Layout from '@/components/_shared/_core/layout/Index';
import ProfileComponent from '@/components/profile/ProfileComponent';
import EmployeeProfileComponent from '@/components/profile/employee/EmployeeProfileComponent';


interface ProfileContainerProps {
  roles: string
}

const ProfileContainer = ({ roles }: ProfileContainerProps) => {
  return (
    <Layout>
      {(roles === 'HR Admin' || roles === 'Super Admin') && <ProfileComponent />}
      {roles === 'Employee' && <EmployeeProfileComponent />}
    </Layout>
  );
};

export default ProfileContainer;