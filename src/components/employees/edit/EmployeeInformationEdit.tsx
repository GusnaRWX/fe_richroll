import React, { HTMLAttributes, useState } from 'react';
import { Grid, Button as MuiButton, IconButton, Typography, Modal, Select, Box, MenuItem, FormControlLabel, Checkbox, FormControl } from '@mui/material';
import { Input, Button } from '@/components/_shared/form';
import { styled as MuiStyled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Image as ImageType } from '@/utils/assetsConstant';
import styled from '@emotion/styled';
import { Close } from '@mui/icons-material';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { AiOutlineCamera } from 'react-icons/ai';

const AsteriskComponent = MuiStyled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

const EmployeeSelfWrapper = MuiStyled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary[50],
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  borderRadius: '6px',
  width: '100%',
  marginBottom: '1rem'
}));

const NextBtnWrapper = MuiStyled(Box)(({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginTop: '2rem'
}));

const ModalHeader = MuiStyled(Box)(({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '18px',
  borderBottom: '1px solid #E5E7EB',
  paddingBottom: '1rem'
}));

const ModalBtnWrapper = MuiStyled(Box)(({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  gap: '.5rem'
}));

interface ImagePriviewProps extends HTMLAttributes<HTMLDivElement> {
  image?: string;
}

const ImageReview = styled.div`
  background-image: url(${({image}: ImagePriviewProps) => image});
  background-repeat: no-repeat;
  width: 102px;
  height: 102px;
  background-size: contain;
  margin-top: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  `;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '284px',
  bgcolor: 'background.paper',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  p: 2,
};

// const convertParams = (name, value) => {
//   const reader = new FileReader();
//   reader.readAsDataURL(value || '');

//   const obj = {
//     target: {
//       name, value
//     }
//   };

//   return obj;
// };



function EmployeeInformationEdit() {
  const [checked, setChecked] = useState(false);
  const [checkedSelf, setCheckedSelf] = useState(false);
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<string | null>(null);
  const handleCheck = () => {
    setChecked(!checked);
  };
  const handleCheckSelf = () => {
    setCheckedSelf(!checkedSelf);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const uploadImage = (data) => {
    if(!data) return;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (!reader.result) return;
      setImages(reader?.result as string);
    });
    handleClose();
    reader.readAsDataURL(data);
  };
  return (
    <>
      <Typography component='h3' fontSize={18} color='primary'>Employee Information</Typography>
      <form>
        <ImageReview image={!images ? ImageType.PLACEHOLDER : images} onClick={handleOpen}/>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='fullname'
              customLabel='Full Name'
              withAsterisk={true}
              size='small'
              placeholder='Input Full Name'
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='nickname'
              customLabel='Nickname'
              withAsterisk={false}
              size='small'
              placeholder='Input Nickname'
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem' }}>
            <Typography>Contact Number<AsteriskComponent>*</AsteriskComponent></Typography>
            <Grid container spacing={2}>
              <Grid item xs={1} sm={3} md={2} lg={2} xl={2} spacing={2}>
                <Select
                  variant='outlined'
                  size='small'
                  fullWidth
                  name='phoneNumberPrefix'
                  MenuProps={{ disableAutoFocus: true }}
                  sx={{
                    backgroundColor: '#D9EFE7',
                    border: '1px solid #D9EFE7',
                    borderRadius: '9999px',
                    marginRight: '12px'
                  }}
                >
                  <MenuItem value='+62'>+62</MenuItem>
                  <MenuItem value='+44'>+44</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={9} sm={9} md={9} lg={9} xl={10} alignSelf='flex-end'>
                <Input
                  name='phoneNumber'
                  placeholder='Input Correct Number'
                  withAsterisk={true}
                  size='small'
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='email'
              customLabel='Personal Email Address'
              withAsterisk={true}
              size='small'
              placeholder='Personal Email Address'
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography>Start Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker  sx={{
                '& .MuiOutlinedInput-input': {
                  padding: '10px 14px',
                  border: 'none !important'
                },
                width: '100%'
              }}/>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography>End Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker sx={{
                '& .MuiOutlinedInput-input': {
                  padding: '10px 14px',
                  border: 'none !important'
                },
                width: '100%'
              }}/>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <FormControlLabel
          sx={{ marginTop: '.5rem', marginBottom: '.5rem' }}
          value={true}
          label={<Typography fontWeight='bold'>Permanent</Typography>}
          control={
            <Checkbox checked={checked} onChange={handleCheck} color='primary' />
          }
          labelPlacement='end'
        />
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth>
              <Typography>Department<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                variant='outlined'
                size='small'
                name='department'
              >
                <MenuItem value='Marketing'>Marketing</MenuItem>
                <MenuItem value='Management'>Management</MenuItem>
                <MenuItem value='Finance'>Finance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth>
              <Typography>Position<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                variant='outlined'
                size='small'
                name='position'
              >
                <MenuItem value='Manager'>Manager</MenuItem>
                <MenuItem value='Assistance'>Assstance</MenuItem>
                <MenuItem value='Finance'>Finance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <EmployeeSelfWrapper>
              <FormControlLabel
                sx={{ marginTop: '.5rem', marginBottom: '.5rem', fontWeight: 'bold' }}
                value={true}
                label={ <Typography fontWeight='bold'>Employee Self Service</Typography> }
                control={
                  <Checkbox checked={checkedSelf} onChange={handleCheckSelf} color='primary' />
                }
                labelPlacement='end'
              />
              <Typography>Activate button to send account activation link via email. Employee Self Service enables self-data filling.</Typography>
            </EmployeeSelfWrapper>
          </Grid>
        </Grid>
        <NextBtnWrapper>
          <Button fullWidth={false} size='small' label='Next' color='primary'/>
        </NextBtnWrapper>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        keepMounted
        disableAutoFocus
      >
        <Box sx={modalStyle}>
          <ModalHeader>Choose an action</ModalHeader>
          <IconButton onClick={handleClose} sx={{
            position: 'fixed',
            top: 10,
            right: 0
          }}>
            <Close />
          </IconButton>
          <ModalBtnWrapper>
            <input
              id='input-file'
              onChange={(e) => uploadImage(!e.target.files ? null : e.target.files[0])}
              name='images'
              type='file'
              style={{ display: 'none' }}
              accept='image/'
            />
            <label htmlFor='input-file'>
              <MuiButton component='span' fullWidth size='small' variant='outlined'>
                <BsFileEarmarkPlus /> &nbsp; Browse File
              </MuiButton>
            </label>
            <MuiButton size='small' variant='outlined'>
              <AiOutlineCamera /> &nbsp; Take A Photo
            </MuiButton>
          </ModalBtnWrapper>
        </Box>
      </Modal>
    </>
  );
}

export default EmployeeInformationEdit;