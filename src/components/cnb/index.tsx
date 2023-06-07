import React from 'react';
import EnhancedTable from './EnhancedTable';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Button } from '../_shared/form';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import { Card } from '../_shared/common';


const CNBComponent = () => {
  const router = useRouter();
  const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 24px;
  `;

  return (
    <>
      <TitleWrapper>
        <Typography variant='h5'>Compensation and Benefits</Typography>
        <div>
          <Button
            onClick={() => router.push('/compensation-benefits/create')}
            startIcon={<AddIcon />}
            label='Add Profile'
          />
        </div>
      </TitleWrapper>
      <Card>
        <EnhancedTable/>
      </Card>
    </>
  );
};

export default CNBComponent;
