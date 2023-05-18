import React, { HTMLAttributes, useState } from 'react';
import { Grid, Card, Button as MuiButton, Typography, Box, Pagination } from '@mui/material';
import { Scheduler } from '@aldabil/react-scheduler';
import styled from '@emotion/styled';
import { Add } from '@mui/icons-material';
import { IconButton } from '../_shared/form';
import { HiPencilAlt } from 'react-icons/hi';
import { BsTrashFill } from 'react-icons/bs';
import AnnualWorkCalendarCreateForm from './create/AnnualWorkCalendarCreateForm';

const ContentWrapper = styled(Card)(({
  padding: '2rem'
}));

const TopWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 width: 100%;
 margin-bottom: 1rem;
`;

const BoxWrapper = styled(Box)(({
  padding: '.5rem',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid #E5E7EB',
  borderRadius: '10px',
  marginBottom: '1rem'
}));

const LeftWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '1rem'
}));

const ButtonWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem'
}));

interface DotsColorProps extends HTMLAttributes<HTMLDivElement>{
  color?: string;
}

const Dots = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: ${({color}: DotsColorProps) => color};
`;

const ListWrapper = styled.div`
 display: flex;
 flex-direction: column;
`;

function AnnualWorkCalendarComponent() {
  const [openCreateForm, setOpenCreateForm] = useState(false);
  return (
    <>
      <TopWrapper>
        <Typography fontSize='24px' color='primary' fontWeight='bold'>Annual Work Calendar</Typography>
        <MuiButton
          variant='contained'
          size='small'
          color='primary'
          onClick={() => { setOpenCreateForm(true); }}
        ><Add fontSize='small' />&nbsp; Add Calendar Item</MuiButton>
      </TopWrapper>
      <ContentWrapper>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <Scheduler
              events={[]}
              disableViewNavigator={true}
              view='month'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Box width='100%' height='100%' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'  }}>
              <Box width='100%'>
                <Typography mb='2rem' fontWeight='bold' fontSize='16px' color='gray'>Upcoming Events</Typography>
                <Typography mb='.5rem'>15 March 2023</Typography>
                <BoxWrapper>
                  <LeftWrapper>
                    <Dots color='#7C3AED'/>
                    <ListWrapper>
                      <Typography fontSize='14px' fontWeight='bold' color='primary'>Chairman Birthday</Typography>
                      <Typography fontSize='12px' fontWeight='bold' color='gray'>Mar 15, 2023 - 11:15AM - 12:30PM</Typography>
                    </ListWrapper>
                  </LeftWrapper>
                  <ButtonWrapper>
                    <IconButton
                      parentColor='primary.50'
                      icons={
                        <HiPencilAlt fontSize={20} color='#223567'/>
                      }
                    />
                    <IconButton
                      parentColor='red.100'
                      icons={
                        <BsTrashFill fontSize={20} color='#EF4444'/>
                      }
                    />
                  </ButtonWrapper>
                </BoxWrapper>
                <Typography mb='.5rem'>24 March 2023</Typography>
                <BoxWrapper>
                  <LeftWrapper>
                    <Dots color='#D97706'/>
                    <ListWrapper>
                      <Typography fontSize='14px' fontWeight='bold' color='primary'>Ramadhan Holiday</Typography>
                      <Typography fontSize='12px' fontWeight='bold' color='gray'>Mar 15, 2023 - 11:15AM - 12:30PM</Typography>
                    </ListWrapper>
                  </LeftWrapper>
                  <ButtonWrapper>
                    <IconButton
                      parentColor='primary.50'
                      icons={
                        <HiPencilAlt fontSize={20} color='#223567'/>
                      }
                    />
                    <IconButton
                      parentColor='red.100'
                      icons={
                        <BsTrashFill fontSize={20} color='#EF4444'/>
                      }
                    />
                  </ButtonWrapper>
                </BoxWrapper>
                <Typography mb='.5rem'>25 March 2023</Typography>
                <BoxWrapper>
                  <LeftWrapper>
                    <Dots color='#D97706'/>
                    <ListWrapper>
                      <Typography fontSize='14px' fontWeight='bold' color='primary'>Ramadhan Holiday</Typography>
                      <Typography fontSize='12px' fontWeight='bold' color='gray'>Mar 15, 2023 - 11:15AM - 12:30PM</Typography>
                    </ListWrapper>
                  </LeftWrapper>
                  <ButtonWrapper>
                    <IconButton
                      parentColor='primary.50'
                      icons={
                        <HiPencilAlt fontSize={20} color='#223567'/>
                      }
                    />
                    <IconButton
                      parentColor='red.100'
                      icons={
                        <BsTrashFill fontSize={20} color='#EF4444'/>
                      }
                    />
                  </ButtonWrapper>
                </BoxWrapper>
              </Box>
              <Box width='100%'>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Pagination count={3} variant='outlined' shape='rounded' />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ContentWrapper>
      <AnnualWorkCalendarCreateForm
        open={openCreateForm}
        handleClose={() => setOpenCreateForm(false)}
        handleConfirm={() => setOpenCreateForm(false)}
      />
    </>
  );
}

export default AnnualWorkCalendarComponent;