import MetaHead from '@/components/_shared/_core/layout/MetaHead';
import ProfileContainer from '@/containers/profile/ProfileContainer';
import React from 'react';
import { useRouter } from 'next/router';
import { useAppSelectors } from '@/hooks/index';

const Profile = () => {
  const router = useRouter();
  const { profile } = useAppSelectors(state => state.me);
  return (
    <>
      <MetaHead title='Kayaroll - Profile' />
      <ProfileContainer roles={router.query.role as string ?? profile?.roles?.join('')} />
    </>
  );
};

export default Profile;