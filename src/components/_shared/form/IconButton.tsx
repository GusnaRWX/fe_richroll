import React, { ReactNode } from 'react';
import { Box, IconButton as MuiIconButton } from '@mui/material';
import { SharedComponent } from '@/types/component';
import { styled } from '@mui/material/styles';

const WrapperIconButton = styled(Box)(({
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '36px',
  height: '36px'
}));


/**
 * Icon Button
 * * parentColor will be apply in Box component, support primary.500 or other color on theme
 * 
 * @param param0 
 * @returns 
 */

const IconButton = ({
  parentColor,
  icons,
  ...props
}: SharedComponent.ComponentIconButton) => {
  const IconComponent = icons;
  return (
    <WrapperIconButton component='div' bgcolor={parentColor} >
      <MuiIconButton {...props}>
        {IconComponent as ReactNode}
      </MuiIconButton>
    </WrapperIconButton>
  );
};

export default IconButton;