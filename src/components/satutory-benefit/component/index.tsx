/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Grid,
  Select,
  MenuItem,
} from '@mui/material';
import { Button, Input } from '@/components/_shared/form';
import AddIcon from '@mui/icons-material/Add';
import { Search } from '@mui/icons-material';
import { useRouter } from 'next/router';
import BasicDatePicker from '@/components/_shared/form/DatePicker';
import styled from '@emotion/styled';
import SutatoryBenefitTable from './SatutoryBenefitComponentTable';
import { useTranslation } from 'react-i18next';


const SatutoryBenefitComponent = () => {
  // Translate Key
  const {t} = useTranslation();
  const t_key = 'satutory_benefit.component';

  const router = useRouter();
  const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 24px;
  `;

  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
    }
  };

  return (
    <>
      <TitleWrapper>
        <Typography variant='h5'>{t(`${t_key}.title`)}</Typography>
        <div>
          <Button
            onClick={() =>
              router.push('/satutory-benefit/component/add-new-component')
            }
            startIcon={<AddIcon />}
            label={t(`button.add_new_component`)}
          />
        </div>
      </TitleWrapper>
      <Paper style={{ padding: '36px 32px ' }}>
        <Grid
          container
          spacing={2}
          style={{ alignItems: 'center' }}
          sx={{ px: 3, pb:3 }}
        >
          <Grid item xs={3.5} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
            <Input
              name='search'
              size='small'
              placeholder='Search'
              onKeyDown={(e) => handleSearch(e)}
              type='text'
              InputProps={{
                startAdornment: <Search sx={{ color: '#9CA3AF' }} />,
              }}
            />
          </Grid>
          <Grid item xs={2.5} sm={2.5} md={2.5} lg={2.5} xl={2.5}>
            <Select
              fullWidth
              variant='outlined'
              size='small'
              placeholder='Sort by Status'
            >
              <MenuItem value='annual/paid leave'>Annual/Paid Leave</MenuItem>
              <MenuItem value='child care leave'>Child Care Leave</MenuItem>
              <MenuItem value='no pay leave'>No Pay Leave</MenuItem>
              <MenuItem value='maternirty leave'>Maternity Leave</MenuItem>
              <MenuItem value='paternity leave'>Paternity Leave</MenuItem>
              <MenuItem value='shared parental leave'>
                Shared Parental Leave
              </MenuItem>
              <MenuItem value='sick leave'>Sick Leave</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Grid
              container
              style={{ textAlign: 'center', alignItems: 'center' }}
            >
              <Grid item xs={5.5} sm={5.5} md={5.5} lg={5.5} xl={5.5}>
                <BasicDatePicker />
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                -
              </Grid>
              <Grid item xs={5.5} sm={5.5} md={5.5} lg={5.5} xl={5.5}>
                <BasicDatePicker sx={{ height: '15px' }} />{' '}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <SutatoryBenefitTable />
      </Paper>
    </>
  );
};

export default SatutoryBenefitComponent;
