import MetaHead from '@/components/_shared/_core/layout/MetaHead';
import ProfileContainer from '@/containers/profile/ProfileContainer';
import React from 'react';

const Profile = () => {
  return (
    <>
      <MetaHead title='Kayaroll - Profile' />
      <ProfileContainer />
    </>
  );
};

export default Profile;