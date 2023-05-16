import React, { useState } from 'react';
import  styled  from '@emotion/styled';
import { Typography, Button as MuiButton, Card, Box, TableRow, TableCell } from '@mui/material';
import { Add } from '@mui/icons-material';
import { styled as MuiStyled } from '@mui/material/styles';
import Table from '../_shared/form/Table';
import { IconButton } from '../_shared/form';
import { HiPencilAlt } from 'react-icons/hi';
import { useRouter } from 'next/router';

const TopWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 width: 100%;
 margin-bottom: 1rem;
`;

const ContentWrapper = MuiStyled(Card)(({
  padding: '1rem'
}));

const headerItems = [
  { key: 'profile_name', label: 'Profile Name' },
  { key: 'weekly_gross', label: 'Weekly Gross' },
  { key: 'weekly_net', label: 'Weekly Net' },
  { key: 'created_at', label: 'Date Created' },
  { key: 'updated_at', label: 'Last_Updated' }
];

const dataItems = [
  {
    profileName: 'Freelance',
    weeklyGross: '40 Hours',
    weeklyNet: '35 Hours',
    created_at: '20/12/2023',
    updated_at: '20/12/2023'
  },
  {
    profileName: 'Night Shift',
    weeklyGross: '40 Hours',
    weeklyNet: '35 Hours',
    created_at: '20/12/2023',
    updated_at: '20/12/2023'
  },
];
function WorkScheduleComponent() {
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [page, setPage] = useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <TopWrapper>
        <Typography fontWeight='bold' variant='h5' color='primary.main'>Work Schedule</Typography>
        <MuiButton variant='contained' onClick={() => { router.push('/company-management/work-schedule/create'); }} size='small'><Add />&nbsp; Add Work Schedule</MuiButton>
      </TopWrapper>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Table
            count={dataItems.length}
            rowsPerPageOptions={[5, 10, 15]}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onRowsPerPagesChange={(e) => handleChangeRowsPerPage(e)}
            headChildren={
              <TableRow>
                {
                  headerItems.map((item, index) => (
                    <TableCell key={index}>{item.label}</TableCell>
                  ))
                }
              </TableRow>
            }
            bodyChildren={
              <>
                {
                  dataItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.profileName}</TableCell>
                      <TableCell>{item.weeklyGross}</TableCell>
                      <TableCell>{item.weeklyNet}</TableCell>
                      <TableCell>{item.created_at}</TableCell>
                      <TableCell>{item.updated_at}</TableCell>
                      <TableCell>
                        <IconButton
                          parentColor='primary.50'
                          icons={<HiPencilAlt fontSize={20} color='#223567'/>}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                }
              </>
            }
          />
        </Box>
      </ContentWrapper>
    </>
  );
}

export default WorkScheduleComponent;