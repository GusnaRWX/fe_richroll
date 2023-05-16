/* eslint-disable no-unused-vars */
import React, { HTMLAttributes, useState } from 'react';
import {
  Grid,
  Typography,
  Select,
  Box,
  MenuItem,
  FormControl } from '@mui/material';
import { Input, Button, Textarea, FileUploadModal } from '@/components/_shared/form';
import { styled as MuiStyled } from '@mui/material/styles';
import { Image as ImageType } from '@/utils/assetsConstant';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { CustomHooks } from '@/types/hooks';
import { convertImageParams } from '@/utils/helper';


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
  images;
  setImages;
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
  administrativeThird,
  images,
  setImages
}:CompanyInfoProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Typography component='h3' fontSize={18} color='primary'>Company Information</Typography>
      <form>
        <Typography variant='text-sm' component='div' color='primary' sx={{ mt: '16px' }}>Company Logo</Typography>
        <ImageReview image={!images ? ImageType.PLACEHOLDER : images} onClick={handleOpen}/>
        {
          errors.picture && (
            <Typography component='span' fontSize='12px' color='red.500'>This field is required</Typography>
          )
        }
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
      <FileUploadModal
        open={open}
        handleClose={handleClose}
        onChange={(e) => handleInputChange(convertImageParams('picture', !e.target.files ? null : e.target.files[0], setImages, handleClose))}
      />
    </>
  );
}

export default CompanyInformationForm;