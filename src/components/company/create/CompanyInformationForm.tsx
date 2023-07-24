/* eslint-disable no-unused-vars */
import React, { HTMLAttributes, useCallback, useRef, useState } from 'react';
import {
  Grid,
  Typography,
  Select,
  FormHelperText,
  Box,
  MenuItem,
  FormControl,
  Modal,
  IconButton
} from '@mui/material';
import { Input, Button, Textarea, FileUploadModal, CropperImage } from '@/components/_shared/form';
import { Alert, Text } from '@/components/_shared/common';
import { styled as MuiStyled } from '@mui/material/styles';
import { Image as ImageType } from '@/utils/assetsConstant';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { convertImageParams, ifThenElse, compareCheck } from '@/utils/helper';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import {
  administrativeFirstLevelRequested,
  administrativeSecondLevelRequested,
  administrativeThirdLevelRequsted
} from '@/store/reducers/slice/options/optionSlice';
import Webcam from 'react-webcam';
import { CameraAlt, Cancel } from '@mui/icons-material';
import { FiTrash2 } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';


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

const modalStyleCamera = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  bgcolor: 'background.paper',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  paddingTop: '.2rem',
  paddingRight: '.5rem',
  paddingLeft: '.5rem'
};

const ContentCameraWrapper = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

const videoConstraints = {
  width: 500,
  height: 720,
  facingMode: 'user'
};

interface ImagePriviewProps extends HTMLAttributes<HTMLDivElement> {
  image?: string;
}

const ImageReview = styled.div`
  background-image: url(${({ image }: ImagePriviewProps) => image});
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
  formik;
  companyType: [];
  companySector: [];
  countries: [];
  images;
  setImages;
  listAllCompany: []
}

function CompanyInformationForm({
  nextPage,
  formik,
  companyType,
  companySector,
  countries,
  images,
  setImages,
  listAllCompany
}: CompanyInfoProps) {
  const [isError, setIsError] = useState(false);
  const [isCaptureEnable, setCaptureEnable] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const [openCamera, setOpenCamera] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImages(imageSrc);
      // const nameFile = randomCode(5);
      // const fileImage = base64ToFile(imageSrc, nameFile);
      // formik.setFieldValue('picture', fileImage);
      handleClose();
      handleCloseCamera();
    }
  }, [webcamRef]);

  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const t_companyInformationSection = 'company.form.company_information.company_information_section';
  const t_companyAddressSection = 'company.form.company_information.company_address_section';
  const [modalCrop, setModalCrop] = useState(false);
  const [tempImageCrop, setTempImageCrop] = useState('');

  const handleCancelCrop = () => {
    setImages('');
    setModalCrop(false);
  };

  const handleSaveCropImage = (file, img) => {
    setTempImageCrop(img);
    formik.setFieldValue('picture', file);
  };

  const {
    administrativeFirst,
    administrativeSecond,
    administrativeThird
  } = useAppSelectors(state => state.option);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setModalCrop(true);
    setOpen(false);
  };

  const duplicateCompany = listAllCompany?.some(item => (item as { name: string }).name === formik.values.companyName);

  const handleCloseCamera = () => {
    setCaptureEnable(false);
    setOpenCamera(false);
  };

  const handleOpenCamera = () => {
    setCaptureEnable(true);
    setOpenCamera(true);
  };

  const handleNext = () => {
    formik.validateForm().then((a) => {
      if(Object.keys(a).length === 0) {
        formik.submitForm();
        setIsError(false);
        nextPage(1);
      } else {
        setIsError(true);
      }
    });
  };

  const resetPicture = () => {
    setImages(null);
    setTempImageCrop('');
  };

  return (
    <>
      {(isError || duplicateCompany) && (
        <Alert
          severity='error'
          content={t('alert_message.please_fill_in_all_the_mandatory_fields')}
          icon={<Cancel />}
        />
      )}
      <Typography component='h3' fontSize={18} color='primary' fontWeight={700}>{t(`${t_companyInformationSection}.title`)}</Typography>
      <form>
        <Typography variant='text-sm' component='div' color='primary' sx={{ mt: '16px' }}>{t(`${t_companyInformationSection}.company_logo`)}</Typography>
        <ImageReview
          image={ifThenElse(!tempImageCrop, ImageType.PLACEHOLDER, tempImageCrop)}
          onClick={handleOpen}
        />
        {
          tempImageCrop && (
            <IconButton
              sx={{
                position: 'absolute',
                border: '1px solid red',
                backgroundColor: 'white',
                borderRadius: '3px',
                left: '65px',
                height: '33px',
                width: '33px',
                ':hover': {
                  backgroundColor: 'white'
                },
                bottom: '5px'
              }}
              onClick={resetPicture}
            >
              <FiTrash2 style={{ zIndex: '999', color: 'red' }} />
            </IconButton>
          )
        }
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth error={compareCheck(formik.touched.companyType, Boolean(formik.errors.companyType))}>
              <Typography sx={{ mb: '6px' }}>{t(`${t_companyInformationSection}.company_type`)}<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                displayEmpty
                variant='outlined'
                size='small'
                placeholder={t(`${t_companyInformationSection}.compay_type_placeholder`)}
                name='companyType'
                value={formik.values.companyType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                renderValue={(value: string) => {
                  if (value.length === 0) {
                    return <Text title={t(`${t_companyInformationSection}.title`)} color='grey.400' />;
                  }
                  const selectedType = companyType.find(type => type?.['id'] === value);
                  if (selectedType) {
                    return `${selectedType?.['name']}`;
                  }
                  return null;
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root:hover': {
                        backgroundColor: '#223567',
                        color: 'white'
                      }
                    }
                  }
                }}
              >
                {companyType?.map((val, idx) => (
                  <MenuItem key={idx} value={val?.['id']}>{val?.['name']}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{ifThenElse(formik.touched.companyType, formik.errors.companyType, '')}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='companyName'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={compareCheck(formik.touched.companyName, Boolean(formik.errors.companyName))}
              helperText={ifThenElse(formik.touched.companyName, formik.errors.companyName, '')}
              customLabel={t(`${t_companyInformationSection}.company_name`)}
              withAsterisk={true}
              size='small'
              value={formik.values.companyName}
              placeholder={t(`${t_companyInformationSection}.company_name_placeholder`)}
            />
            {duplicateCompany && (
              <p style={{ color: '#EAB308', fontSize: '14px', margin: '5px 0' }}>{t(`${t_companyInformationSection}.name_already_used`)}</p>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='companyNPWP'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={compareCheck(formik.touched.companyNPWP, Boolean(formik.errors.companyNPWP))}
              helperText={ifThenElse(formik.touched.companyNPWP, formik.errors.companyNPWP, '')}
              customLabel={t(`${t_companyInformationSection}.company_npwp`)}
              withAsterisk={false}
              size='small'
              value={formik.values.companyNPWP}
              placeholder={t(`${t_companyInformationSection}.company_npwp_placeholder`)}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth error={compareCheck(formik.touched.companySector, Boolean(formik.errors.companySector))}>
              <Typography sx={{ mb: '6px' }}>{t(`${t_companyInformationSection}.company_sector`)}<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                displayEmpty
                variant='outlined'
                size='small'
                placeholder={t(`${t_companyInformationSection}.company_sector_placeholder`)}
                name='companySector'
                value={formik.values.companySector}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                renderValue={(value: string) => {
                  if (value.length === 0) {
                    return <Text title={t(`${t_companyInformationSection}.company_sector_placeholder`)} color='grey.400' />;
                  }
                  const selectedSector = companySector.find(type => type?.['id'] === value);
                  if (selectedSector) {
                    return `${selectedSector?.['name']}`;
                  }
                  return null;
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root:hover': {
                        backgroundColor: '#223567',
                        color: 'white'
                      }
                    }
                  }
                }}
              >
                {companySector?.map((val, idx) => (
                  <MenuItem key={idx} value={val?.['id']}>{val?.['name']}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{ifThenElse(formik.touched.companySector, formik.errors.companySector, '')}</FormHelperText>
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
              helperText={ifThenElse(formik.touched.companyEmail, formik.errors.companyEmail, '')}
              customLabel={t(`${t_companyInformationSection}.company_email_address`)}
              withAsterisk={true}
              size='small'
              value={formik.values.companyEmail}
              placeholder={t(`${t_companyInformationSection}.company_email_address_placeholder`)}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem', marginTop: '.3rem' }}>
            <Typography>{t(`${t_companyInformationSection}.contact_number`)}<AsteriskComponent>*</AsteriskComponent></Typography>
            <Grid container spacing={2}>
              <Grid item width='95px'>
                <Select
                  fullWidth
                  displayEmpty
                  variant='outlined'
                  size='small'
                  name='phoneNumberPrefix'
                  value={formik.values.phoneNumberPrefix}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  MenuProps={{
                    disableAutoFocus: true,
                    PaperProps: {
                      sx: {
                        '& .MuiMenuItem-root:hover': {
                          backgroundColor: '#223567',
                          color: 'white'
                        }
                      }
                    }
                  }}
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
              <Grid item width='calc(100% - 95px)' alignSelf='flex-end'>
                <Input
                  name='phoneNumber'
                  type='number'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={compareCheck(formik.touched.phoneNumber, Boolean(formik.errors.phoneNumber))}
                  helperText={ifThenElse(formik.touched.phoneNumber, formik.errors.phoneNumber, '')}
                  withAsterisk={true}
                  size='small'
                  value={formik.values.phoneNumber}
                  placeholder={t(`${t_companyInformationSection}.contact_number_placeholder`)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography component='h3' fontSize={18} color='primary' fontWeight={700}>{t(`${t_companyAddressSection}.title`)}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth error={compareCheck(formik.touched.countryCompanyAddress, Boolean(formik.errors.countryCompanyAddress))}>
              <Typography sx={{ mb: '6px' }}>{t(`${t_companyAddressSection}.contry`)}<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                displayEmpty
                variant='outlined'
                size='small'
                placeholder={t(`${t_companyAddressSection}.contry_placeholder`)}
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
                  if (value.length === 0) {
                    return <Text title={t(`${t_companyAddressSection}.contry_placeholder`)} color='grey.400' />;
                  }
                  const selectedCountry = countries.find(type => type?.['value'] === value);
                  if (selectedCountry) {
                    return `${selectedCountry?.['label']}`;
                  }
                  return null;
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root:hover': {
                        backgroundColor: '#223567',
                        color: 'white'
                      }
                    }
                  }
                }}
              >
                {countries?.map(item => (
                  <MenuItem key={item?.['label']} value={item?.['value']}>{item?.['label']}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{ifThenElse(formik.touched.countryCompanyAddress, formik.errors.countryCompanyAddress, '')}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth error={compareCheck(formik.touched.provinceCompanyAddress, Boolean(formik.errors.provinceCompanyAddress))}>
              <Typography sx={{ mb: '6px' }}>{t(`${t_companyAddressSection}.province`)}<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                displayEmpty
                variant='outlined'
                size='small'
                placeholder={t(`${t_companyAddressSection}.province_placeholder`)}
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
                  if (value.length === 0) {
                    return <Text title={t(`${t_companyAddressSection}.province_placeholder`)} color='grey.400' />;
                  }
                  const selectedProvince = administrativeFirst.find(type => type?.['value'] === value);
                  if (selectedProvince) {
                    return `${selectedProvince?.['label']}`;
                  }
                  return null;
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root:hover': {
                        backgroundColor: '#223567',
                        color: 'white'
                      }
                    }
                  }
                }}
              >
                {administrativeFirst?.map(item => (
                  <MenuItem key={item?.['label']} value={item?.['value']}>{item?.['label']}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{ifThenElse(formik.touched.provinceCompanyAddress, formik.errors.provinceCompanyAddress, '')}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth error={compareCheck(formik.touched.cityCompanyAddress, Boolean(formik.errors.cityCompanyAddress))}>
              <Typography sx={{ mb: '6px' }}>{t(`${t_companyAddressSection}.city`)}<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                displayEmpty
                variant='outlined'
                size='small'
                placeholder={t(`${t_companyAddressSection}.city_placeholder`)}
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
                  if (value.length === 0) {
                    return <Text title={t(`${t_companyAddressSection}.city_placeholder`)} color='grey.400' />;
                  }
                  const selectedCity = administrativeSecond.find(type => type?.['value'] === value);
                  if (selectedCity) {
                    return `${selectedCity?.['label']}`;
                  }
                  return null;
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root:hover': {
                        backgroundColor: '#223567',
                        color: 'white'
                      }
                    }
                  }
                }}
              >
                {administrativeSecond?.map(item => (
                  <MenuItem key={item?.['label']} value={item?.['value']}>{item?.['label']}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{ifThenElse(formik.touched.cityCompanyAddress, formik.errors.cityCompanyAddress, '')}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth error={compareCheck(formik.touched.subDistrictCompanyAddress, Boolean(formik.errors.subDistrictCompanyAddress))}>
              <Typography sx={{ mb: '6px' }}>{t(`${t_companyAddressSection}.sub_district`)}<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                displayEmpty
                variant='outlined'
                size='small'
                placeholder={t(`${t_companyAddressSection}.sub_district_placeholder`)}
                name='subDistrictCompanyAddress'
                value={formik.values.subDistrictCompanyAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                renderValue={(value: string) => {
                  if (value.length === 0) {
                    return <Text title={t(`${t_companyAddressSection}.sub_district_placeholder`)} color='grey.400' />;
                  }
                  const selectedSubDistrict = administrativeThird.find(type => type?.['value'] === value);
                  if (selectedSubDistrict) {
                    return `${selectedSubDistrict?.['label']}`;
                  }
                  return null;
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      '& .MuiMenuItem-root:hover': {
                        backgroundColor: '#223567',
                        color: 'white'
                      }
                    }
                  }
                }}
              >
                {administrativeThird?.map(item => (
                  <MenuItem key={item?.['label']} value={item?.['value']}>{item?.['label']}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{ifThenElse(formik.touched.subDistrictCompanyAddress, formik.errors.subDistrictCompanyAddress, '')}</FormHelperText>
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
              error={compareCheck(formik.touched.addressCompanyAddress, Boolean(formik.errors.addressCompanyAddress))}
              withAsterisk={true}
              customLabel={t(`${t_companyAddressSection}.street_and_buildig_name`)}
              placeholder={t(`${t_companyAddressSection}.street_and_buildig_name_placeholder`)}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='zipCodeCompanyAddress'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={compareCheck(formik.touched.zipCodeCompanyAddress, Boolean(formik.errors.zipCodeCompanyAddress))}
              helperText={ifThenElse(formik.touched.zipCodeCompanyAddress, formik.errors.zipCodeCompanyAddress, '')}
              customLabel={t(`${t_companyAddressSection}.zip_code`)}
              withAsterisk={true}
              size='small'
              value={formik.values.zipCodeCompanyAddress}
              placeholder={t(`${t_companyAddressSection}.zip_code_placeholder`)}
            />
          </Grid>
        </Grid>
        <NextBtnWrapper>
          <Button onClick={() => { router.push('/company'); }} fullWidth={false} size='small' label={t('button.cancel')} variant='outlined' sx={{ mr: '12px' }} color='primary' />
          <Button onClick={handleNext} fullWidth={false} size='small' label={t('button.next')} color='primary' />
        </NextBtnWrapper>
      </form>
      <FileUploadModal
        open={open}
        handleClose={handleClose}
        onChange={(e) => formik.handleChange(convertImageParams('picture', !e.target.files ? null : e.target.files[0], setImages, handleClose))}
        onCapture={handleOpenCamera}
      />
      <CropperImage
        open={modalCrop}
        onClose={handleCancelCrop}
        image={images}
        setCropValue={handleSaveCropImage}
        ratio={1}
      />
      <Modal
        open={openCamera}
        onClose={handleCloseCamera}
        keepMounted
      >
        <Box sx={modalStyleCamera}>
          {
            isCaptureEnable && (
              <>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginBottom: '.5rem'
                }}>
                  <IconButton onClick={handleCloseCamera}>
                    <Cancel />
                  </IconButton>
                </Box>
                <Box sx={ContentCameraWrapper}>
                  <Webcam
                    audio={false}
                    width={600}
                    height={360}
                    ref={webcamRef}
                    screenshotFormat='image/jpeg'
                    videoConstraints={videoConstraints}
                  />
                  <IconButton onClick={capture} sx={{ marginTop: '.5rem' }}>
                    <CameraAlt sx={{ fontSize: '30px' }} />
                  </IconButton>
                </Box>
              </>
            )
          }
        </Box>
      </Modal>
    </>
  );
}

export default CompanyInformationForm;