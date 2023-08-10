import React, { ReactElement, useState } from 'react';
import { Card, Box, Collapse, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface SimpleAccordionProps {
  title: ReactElement | string;
  header?: ReactElement;
  footer?: ReactElement;
  children;
}


function SimpleAccordion({title, header, footer, children}: SimpleAccordionProps) {
  const [open, setOpen] = useState(false);
  return (
    <Box width='100%'>
      <Card
        onClick={() => setOpen(!open)}
        sx={{
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
          padding: '6px 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '& :hover': {
            cursor: 'pointer'
          }
        }}
      >
        <Typography variant='text-base' fontWeight='bold' color='#6B7280' width='100%'>{title}</Typography>
        <ExpandMoreIcon sx={{ color: '#6B7280', transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </Card>
      {header}
      <Collapse in={open} timeout='auto' unmountOnExit sx={{ mt: open ? '1rem' : '0' }}>
        {children}
      </Collapse>
      {footer}
    </Box>
  );
}

export default SimpleAccordion;