/* eslint-disable no-unused-vars */
import React, { HTMLAttributes, useState } from 'react';
import {
  Grid,
  Button as MuiButton,
  IconButton,
  Typography,
  Modal,
  Select,
  Box,
  MenuItem,
  FormControl } from '@mui/material';
import { Input, Button, Textarea } from '@/components/_shared/form';
import { styled as MuiStyled } from '@mui/material/styles';
import { Image as ImageType } from '@/utils/assetsConstant';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Close } from '@mui/icons-material';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { AiOutlineCamera } from 'react-icons/ai';
import { CustomHooks } from '@/types/hooks';


const AsteriskComponent = MuiStyled('span')(({ theme }) => ({
  color: theme.palette.error.main
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
  margin-top: 6px;
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

interface CompanyInfoProps {
  nextPage: (_val: number) => void;
  values;
  errors;
  handleInputChange: (_e: CustomHooks.HandleInput) => CustomHooks.HandleInput;
  companyType: [];
  companySector: [];
  countries: [];
  administrativeFirst: [];
  administrativeSecond: [];
  administrativeThird: [];
}

function CompanyInformationForm ({
  nextPage,
  values,
  errors,
  handleInputChange,
  companyType,
  companySector,
  countries,
  administrativeFirst,
  administrativeSecond,
  administrativeThird
}:CompanyInfoProps) {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [images, setImages] = useState<string | null>(null);
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const convertParams = (name, value) => {
    const files = value;
    const reader = new FileReader();
    reader.readAsDataURL(value);
    reader.onloadend = function () {
      setImages(reader.result as string);
    };
    const obj = {
      target: {
        name, value: [files]
      }
    };
    return obj;
  };

  return (
    <>
      <Typography component='h3' fontSize={18} color='primary'>Company Information</Typography>
      <form>
        <Typography variant='text-sm' component='div' color='primary' sx={{ mt: '16px' }}>Company Logo</Typography>
        <ImageReview image={!images ? ImageType.PLACEHOLDER : images} onClick={handleOpen}/>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth>
              <Typography sx={{ mb: '6px' }}>Company Type<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                variant='outlined'
                size='small'
                value={values.companyType}
                onChange={handleInputChange}
                name='companyType'
                placeholder='Select Company Type'
              >
                {companyType.map((val, idx) => (
                  <MenuItem key={idx} value={val?.['id']}>{val?.['name']}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='companyName'
              customLabel='Company Name'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Company Name'
              value={values.companyName}
              error={errors.companyName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='companyNPWP'
              customLabel='Company NPWP'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Company NPWP'
              value={values.companyNPWP}
              error={errors.companyNPWP}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth>
              <Typography sx={{ mb: '6px' }}>Company Sector<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                variant='outlined'
                size='small'
                value={values.companySector}
                onChange={handleInputChange}
                name='companySector'
              >
                {companySector.map((val, idx) => (
                  <MenuItem key={idx} value={val?.['id']}>{val?.['name']}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='companyEmail'
              customLabel='Company Email Address'
              withAsterisk={true}
              size='small'
              onChange={handleInputChange}
              placeholder='Company Email Address'
              value={values.companyEmail}
              error={errors.companyEmail}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem', marginTop: '.3rem' }}>
            <Typography>Contact Number<AsteriskComponent>*</AsteriskComponent></Typography>
            <Grid container spacing={2}>
              <Grid item xs={1} sm={3} md={3} lg={3} xl={3}>
                <Select
                  variant='outlined'
                  size='small'
                  fullWidth
                  onChange={handleInputChange}
                  name='phoneNumberPrefix'
                  value={values.phoneNumberPrefix}
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
              <Grid item xs={9} sm={9} md={9} lg={9} xl={9} alignSelf='flex-end'>
                <Input
                  name='phoneNumber'
                  type='number'
                  placeholder='Input Correct Number'
                  withAsterisk={true}
                  onChange={handleInputChange}
                  size='small'
                  value={values.phoneNumber}
                  error={errors.phoneNumber}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography component='h3' fontSize={18} color='primary'>Company Address</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth>
              <Typography sx={{ mb: '6px' }}>Country<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                variant='outlined'
                size='small'
                name='countryCompanyAddress'
                value={values.countryCompanyAddress}
                onChange={handleInputChange}
              >
                {countries?.map(item => (
                  <MenuItem key={item?.['label']} value={item?.['value']}>{item?.['label']}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth>
              <Typography sx={{ mb: '6px' }}>Province<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                variant='outlined'
                size='small'
                name='provinceCompanyAddress'
                value={values.provinceCompanyAddress}
                onChange={handleInputChange}
              >
                {administrativeFirst.map(item => (
                  <MenuItem key={item?.['label']} value={item?.['value']}>{item?.['label']}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth>
              <Typography sx={{ mb: '6px' }}>City<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                variant='outlined'
                size='small'
                name='cityCompanyAddress'
                value={values.cityCompanyAddress}
                onChange={handleInputChange}
              >
                {administrativeSecond?.map(item => (
                  <MenuItem key={item?.['label']} value={item?.['value']}>{item?.['label']}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth>
              <Typography sx={{ mb: '6px' }}>Sub-District<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                variant='outlined'
                size='small'
                name='subDistrictCompanyAddress'
                value={values.subDistrictCompanyAddress}
                onChange={handleInputChange}
              >
                {administrativeThird?.map(item => (
                  <MenuItem key={item?.['label']} value={item?.['value']}>{item?.['label']}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Textarea
              name='addressCompanyAddress'
              maxRows={5}
              minRows={3}
              value={values.addressCompanyAddress}
              onChange={handleInputChange}
              error={errors.addressCompanyAddress}
              withAsterisk
              customLabel='Street Name, Building Name'
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='zipCodeCompanyAddress'
              value={values.zipCodeCompanyAddress}
              customLabel='ZIP Code'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input ZIP Code'
              error={errors.zipCodeCompanyAddress}
            />
          </Grid>
        </Grid>
        <NextBtnWrapper>
          <Button onClick={() => { router.push('/company');}} fullWidth={false} size='small' label='Cancel' variant='outlined' sx={{ mr: '12px' }} color='primary'/>
          <Button onClick={() => nextPage(1)} fullWidth={false} size='small' label='Next' color='primary'/>
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
              onChange={(e) => handleInputChange(convertParams('picture', !e.target.files ? null : e.target.files[0]))}
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

export default CompanyInformationForm;