import React from 'react';
import { Card as MuiCard, CardContent } from '@mui/material';
import { SharedComponent } from '@/types/component';

const Card = ({ children, ...props }: SharedComponent.ComponentCard) => {
  return (
    <MuiCard
      color='backgroud.paper'
      {...props}
    >
      <CardContent
        sx={{ padding: '16px 16px' }}
      >
        {children}
      </CardContent>
    </MuiCard>
  );
};

export default Card;