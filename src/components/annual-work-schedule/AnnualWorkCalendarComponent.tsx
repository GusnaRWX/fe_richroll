import React, { HTMLAttributes, useState, useEffect, useRef } from 'react';
import { Grid, Card, Button as MuiButton, Typography, Box, Pagination } from '@mui/material';
import { Scheduler } from '@aldabil/react-scheduler';
import styled from '@emotion/styled';
import { Add } from '@mui/icons-material';
import { IconButton } from '../_shared/form';
import { BsTrashFill } from 'react-icons/bs';
import { HiPencilAlt } from 'react-icons/hi';
import AnnualWorkCalendarCreateForm from './create/AnnualWorkCalendarCreateForm';
import AnnualWorkCalendarUpdateForm from './update/AnnualWorkCalendarUpdateForm';
import ConfirmationModal from '../_shared/common/ConfirmationModal';
import {
  getListAnnualScheduleRequested,
  getListEventRequested,
  deleteAnnualScheduleRequested,
  getViewAnnualScheduleRequested
} from '@/store/reducers/slice/company-management/annual-work-schedule/annualSchedule';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import dayjs from 'dayjs';
import type { SchedulerRef } from '@aldabil/react-scheduler/types';
import { OverlayLoading } from '../_shared/common';
import { getCompanyData } from '@/utils/helper';


const ContentWrapper = styled(Card)(({
  padding: '2rem'
}));

const SchedulerWrapper = styled.div`
 & > div > div:last-child > div:last-child {
  overflow-x: hidden !important;
 }
`;

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
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [deletedId, setDeletedId] = useState(0);
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const { data, events, isLoading, totalPages } = useAppSelectors((state) => state.annualSchedule);
  const calendarRef = useRef<SchedulerRef>(null);

  useEffect(() => {
    dispatch({
      type: getListAnnualScheduleRequested.toString(),
      payload: {
        page: page,
        itemPerPage: 5,
        sort: '',
        direction: 'ASC',
        companyID: getCompanyData()?.id,
        search: '',
        start: '',
        end: ''
      }
    });
  }, [page]);

  const handleDelete = () => {
    const eventLength = calendarRef?.current?.scheduler?.events?.length;
    calendarRef?.current?.scheduler?.events?.splice(0, eventLength);
  };

  const handleChangePaginate = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDeleteSchedule = () => {
    console.log(deletedId);
    dispatch({
      type: deleteAnnualScheduleRequested.toString(),
      payload: deletedId
    });
    handleDelete();
    setDeleteConfirmation(false);
    setPage(1);
  };


  useEffect(() => {
    dispatch({ type: getListEventRequested.toString() });
    setRendered(true);
  }, []);



  useEffect(() => {
    if (rendered){
      calendarRef?.current?.scheduler.confirmEvent(events, 'create');
    }
  }, [events]);

  const handleViewUpdate = (id) => {
    dispatch({
      type: getViewAnnualScheduleRequested.toString(),
      payload: id
    });
    setTimeout(() => {
      setOpenUpdateForm(true);
    }, 1000);

  };

  return (
    <>
      <OverlayLoading open={isLoading}/>
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
            <SchedulerWrapper>
              <Scheduler
                events={[]}
                ref={calendarRef}
                disableViewNavigator={true}
                view='month'
                day={null}
                deletable={false}
                editable={false}
                viewerExtraComponent={(fields, eventsData) => {
                  return (
                    <div>
                      <p>Notes: {eventsData?.note}</p>
                    </div>
                  );
                }}
                week={null}
                month={{
                  weekDays: [0, 1,2,3,4,5,6],
                  weekStartOn: 1,
                  startHour: 1,
                  endHour: 23,
                  cellRenderer: () => {
                    return (
                      <MuiButton onClick={() => {
                        return null;
                      }}/>
                    );
                  }
                }}
              />
            </SchedulerWrapper>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Box width='100%' height='100%' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'  }}>
              <Box width='100%'>
                <Typography mb='2rem' fontWeight='bold' fontSize='16px' color='gray'>Upcoming Events</Typography>
                {
                  data?.items?.map((item) => (
                    <>
                      <Typography mb='.5rem'>{dayjs(item.start).format('DD MMM YYYY')}</Typography>
                      <BoxWrapper>
                        <LeftWrapper>
                          <Dots color={item?.eventType === 0 ? '#7C3AED' : '#D97706'}/>
                          <ListWrapper>
                            <Typography fontSize='14px' fontWeight='bold' color='primary'>{item?.name}</Typography>
                            <Typography fontSize='12px' fontWeight='bold' color='gray'>
                              {dayjs(item?.start).format('MMM D, YYYY ')} - {dayjs(item?.start).format('HH:mm')} - {dayjs(item?.end).format('HH:mm')}</Typography>
                          </ListWrapper>
                        </LeftWrapper>
                        <ButtonWrapper>
                          <IconButton
                            parentColor='primary.50'
                            onClick={() => { handleViewUpdate(item?.id); }}
                            icons={
                              <HiPencilAlt fontSize={20} color='#223567'/>
                            }
                          />
                          <IconButton
                            parentColor='red.100'
                            onClick={() => {
                              setDeleteConfirmation(true);
                              setDeletedId(item?.id);
                            }}
                            icons={
                              <BsTrashFill fontSize={20} color='#EF4444'/>
                            }
                          />
                        </ButtonWrapper>
                      </BoxWrapper>
                    </>
                  ))
                }
              </Box>
              <Box width='100%'>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Pagination count={totalPages} page={page} onChange={handleChangePaginate} variant='outlined' shape='rounded' />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ContentWrapper>
      <AnnualWorkCalendarCreateForm
        open={openCreateForm}
        handleClose={() => setOpenCreateForm(false)}
        handleConfirm={() => {
          setOpenCreateForm(false);
          handleDelete();
        }}
      />
      <AnnualWorkCalendarUpdateForm
        open={openUpdateForm}
        handleClose={() => setOpenUpdateForm(false)}
        handleConfirm={() => {
          setOpenUpdateForm(false);
          handleDelete();
        }}
      />
      <ConfirmationModal
        open={deleteConfirmation}
        handleClose={() => setDeleteConfirmation(false)}
        title='Delete Event from Annual Work Calendar'
        content='You are about to delete this event from the Annual Work Calendar. This action cannot be undone.'
        withCallback
        noChange={true}
        callback={() => {handleDeleteSchedule();}}
      />
    </>
  );
}

export default AnnualWorkCalendarComponent;