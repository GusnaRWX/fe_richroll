/* eslint-disable no-unused-vars */
import React, { HTMLAttributes, useState } from 'react';
import {
  Grid,
  Typography,
  Select,
  FormHelperText,
  MenuItem,
  FormControl } from '@mui/material';
import { Input, Textarea, FileUploadModal } from '@/components/_shared/form';
import { Text } from '@/components/_shared/common';
import { styled as MuiStyled } from '@mui/material/styles';
import { Image as ImageType } from '@/utils/assetsConstant';
import styled from '@emotion/styled';
import { convertImageParams } from '@/utils/helper';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import {
  administrativeFirstLevelRequested,
  administrativeSecondLevelRequested,
  administrativeThirdLevelRequsted
} from '@/store/reducers/slice/options/optionSlice';


const AsteriskComponent = MuiStyled('span')(({ theme }) => ({
  color: theme.palette.error.main
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
  formik;
  companyType: [];
  companySector: [];
  countries: [];
  images;
  setImages;
}

function ifThen(check, isTrue, isFalse) {
  if (!check) {
    return isFalse;
  } else {
    return isTrue;
  }
}

function compareCheck(firstArg, secondArg = true, thirdArg = true) {
  return (firstArg && secondArg && thirdArg);
}

function CompanyProfileInformationForm ({
  formik,
  companyType,
  companySector,
  countries,
  images,
  setImages
}:CompanyInfoProps) {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const {
    administrativeFirst,
    administrativeSecond,
    administrativeThird
  } = useAppSelectors(state => state.option);

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
        <ImageReview image={ifThen(!images, ImageType.PLACEHOLDER, images)} onClick={handleOpen}/>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth error={compareCheck(formik.touched.companyType, Boolean(formik.errors.companyType))}>
              <Typography sx={{ mb: '6px' }}>Company Type<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                displayEmpty
                variant='outlined'
                size='small'
                placeholder='Select Company Type'
                name='companyType'
                value={formik.values.companyType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                renderValue={(value: string) => {
                  if (value?.length === 0) {
                    return <Text title='Select Company Type' color='grey.400' />;
                  }
                  const selectedType = companyType.find(type => type?.['id'] === value);
                  if (selectedType) {
                    return `${selectedType?.['name']}`;
                  }
                  return null;
                }}
              >
                {companyType?.map((val, idx) => (
                  <MenuItem key={idx} value={val?.['id']}>{val?.['name']}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{compareCheck(formik.touched.companyType, formik.errors.companyType)}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='companyName'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={compareCheck(formik.touched.companyName, Boolean(formik.errors.companyName))}
              helperText={compareCheck(formik.touched.companyName, formik.errors.companyName)}
              customLabel='Company Company Name'
              withAsterisk={true}
              size='small'
              value={formik.values.companyName}
              placeholder='Input Company Name'
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='companyNPWP'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={compareCheck(formik.touched.companyNPWP, Boolean(formik.errors.companyNPWP))}
              helperText={compareCheck(formik.touched.companyNPWP, formik.errors.companyNPWP)}
              customLabel='Company Company NPWP'
              withAsterisk={false}
              size='small'
              value={formik.values.companyNPWP}
              placeholder='Input Company NPWP'
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth error={compareCheck(formik.touched.companySector, Boolean(formik.errors.companySector))}>
              <Typography sx={{ mb: '6px' }}>Company Sector<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                displayEmpty
                variant='outlined'
                size='small'
                placeholder='Select Company Sector'
                name='companySector'
                value={formik.values.companySector}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                renderValue={(value: string) => {
                  if (value?.length === 0) {
                    return <Text title='Select Company Sector' color='grey.400' />;
                  }
                  const selectedSector = companySector.find(type => type?.['id'] === value);
                  if (selectedSector) {
                    return `${selectedSector?.['name']}`;
                  }
                  return null;
                }}
              >
                {companySector?.map((val, idx) => (
                  <MenuItem key={idx} value={val?.['id']}>{val?.['name']}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{compareCheck(formik.touched.companySector, formik.errors.companySector)}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='companyEmail'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={compareCheck(formik.touched.companyEmail, Boolean(formik.errors.companyEmail))}
              helperText={compareCheck(formik.touched.companyEmail, formik.errors.companyEmail)}
              customLabel='Company Email Address'
              withAsterisk={true}
              size='small'
              value={formik.values.companyEmail}
              placeholder='Input Email Address'
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem', marginTop: '.3rem' }}>
            <Typography>Contact Number<AsteriskComponent>*</AsteriskComponent></Typography>
            <Grid container spacing={2}>
              <Grid item xs={1} sm={3} md={3} lg={3} xl={3}>
                <Select
                  fullWidth
                  displayEmpty
                  variant='outlined'
                  size='small'
                  name='phoneNumberPrefix'
                  value={formik.values.phoneNumberPrefix}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={compareCheck(formik.touched.phoneNumber, Boolean(formik.errors.phoneNumber))}
                  helperText={compareCheck(formik.touched.phoneNumber, formik.errors.phoneNumber)}
                  withAsterisk={true}
                  size='small'
                  value={formik.values.phoneNumber}
                  placeholder='Input Contact Number'
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
            <FormControl fullWidth error={compareCheck(formik.touched.countryCompanyAddress, Boolean(formik.errors.countryCompanyAddress))}>
              <Typography sx={{ mb: '6px' }}>Country<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                displayEmpty
                variant='outlined'
                size='small'
                placeholder='Select Country'
                name='countryCompanyAddress'
                value={formik.values.countryCompanyAddress}
                onChange={(e) => {
                  formik.handleChange(e);
                  dispatch({
                    type: administrativeFirstLevelRequested.toString(),
                    payload: {
                      countryId: e.target.value
                    }
                  });
                }}
                onBlur={formik.handleBlur}
                renderValue={(value: string) => {
                  if (value?.length === 0) {
                    return <Text title='Select Country' color='grey.400' />;
                  }
                  const selectedCountry = countries.find(type => type?.['value'] === value);
                  if (selectedCountry) {
                    return `${selectedCountry?.['label']}`;
                  }
                  return null;
                }}
              >
                {countries?.map(item => (
                  <MenuItem key={item?.['label']} value={item?.['value']}>{item?.['label']}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{compareCheck(formik.touched.countryCompanyAddress, formik.errors.countryCompanyAddress)}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth error={compareCheck(formik.touched.provinceCompanyAddress, Boolean(formik.errors.provinceCompanyAddress))}>
              <Typography sx={{ mb: '6px' }}>Province<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                displayEmpty
                variant='outlined'
                size='small'
                placeholder='Select Province'
                name='provinceCompanyAddress'
                value={formik.values.provinceCompanyAddress}
                onChange={(e) => {
                  formik.handleChange(e);
                  dispatch({
                    type: administrativeSecondLevelRequested.toString(),
                    payload: {
                      countryId: formik.values.countryCompanyAddress,
                      firstLevelCode: e.target.value
                    }
                  });
                }}
                onBlur={formik.handleBlur}
                renderValue={(value: string) => {
                  if (value?.length === 0) {
                    return <Text title='Select Province' color='grey.400' />;
                  }
                  const selectedProvince = administrativeFirst.find(type => type?.['value'] === value);
                  if (selectedProvince) {
                    return `${selectedProvince?.['label']}`;
                  }
                  return null;
                }}
              >
                {administrativeFirst?.map(item => (
                  <MenuItem key={item?.['label']} value={item?.['value']}>{item?.['label']}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{compareCheck(formik.touched.provinceCompanyAddress, formik.errors.provinceCompanyAddress)}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth error={compareCheck(formik.touched.cityCompanyAddress, Boolean(formik.errors.cityCompanyAddress))}>
              <Typography sx={{ mb: '6px' }}>City<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                displayEmpty
                variant='outlined'
                size='small'
                placeholder='Select City'
                name='cityCompanyAddress'
                value={formik.values.cityCompanyAddress}
                onChange={(e) => {
                  formik.handleChange(e);
                  dispatch({
                    type: administrativeThirdLevelRequsted.toString(),
                    payload: {
                      countryId: formik.values.countryCompanyAddress,
                      firstLevelCode: formik.values.provinceCompanyAddress,
                      secondLevelCode: e.target.value
                    }
                  });
                }}
                onBlur={formik.handleBlur}
                renderValue={(value: string) => {
                  if (value?.length === 0) {
                    return <Text title='Select City' color='grey.400' />;
                  }
                  const selectedCity = administrativeSecond.find(type => type?.['value'] === value);
                  if (selectedCity) {
                    return `${selectedCity?.['label']}`;
                  }
                  return null;
                }}
              >
                {administrativeSecond?.map(item => (
                  <MenuItem key={item?.['label']} value={item?.['value']}>{item?.['label']}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{compareCheck(formik.touched.cityCompanyAddress, formik.errors.cityCompanyAddress)}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth>
              <Typography sx={{ mb: '6px' }}>Sub-District<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                displayEmpty
                variant='outlined'
                size='small'
                placeholder='Select Sub-District'
                name='subDistrictCompanyAddress'
                value={formik.values.subDistrictCompanyAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                renderValue={(value: string) => {
                  if (value?.length === 0) {
                    return <Text title='Select Sub-District' color='grey.400' />;
                  }
                  const selectedSubDistrict = administrativeThird.find(type => type?.['value'] === value);
                  if (selectedSubDistrict) {
                    return `${selectedSubDistrict?.['label']}`;
                  }
                  return null;
                }}
              >
                {administrativeThird?.map(item => (
                  <MenuItem key={item?.['label']} value={item?.['value']}>{item?.['label']}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{compareCheck(formik.touched.subDistrictCompanyAddress, formik.errors.subDistrictCompanyAddress)}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Textarea
              name='addressCompanyAddress'
              maxRows={5}
              minRows={3}
              value={formik.values.addressCompanyAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={ifThen(formik.touched.addressCompanyAddress, formik.errors.addressCompanyAddress, false)}
              withAsterisk={true}
              customLabel='Street Name, Building Name'
              placeholder='Input Address Details'
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='zipCodeCompanyAddress'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={compareCheck(formik.touched.zipCodeCompanyAddress, Boolean(formik.errors.zipCodeCompanyAddress))}
              helperText={compareCheck(formik.touched.zipCodeCompanyAddress, formik.errors.zipCodeCompanyAddress)}
              customLabel='ZIP Code'
              withAsterisk={true}
              size='small'
              value={formik.values.zipCodeCompanyAddress}
              placeholder='Input ZIP Code'
            />
          </Grid>
        </Grid>
      </form>
      <FileUploadModal
        open={open}
        handleClose={handleClose}
        onChange={(e) => formik.handleChange(convertImageParams('picture', !e.target.files ? null : e.target.files[0], setImages, handleClose))}
      />
    </>
  );
}

export default CompanyProfileInformationForm;