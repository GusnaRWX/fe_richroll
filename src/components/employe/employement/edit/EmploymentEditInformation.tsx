
import { Box, Grid, Typography, Modal, IconButton } from '@mui/material';
import React, { HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';

import { Image as ImageType } from '@/utils/assetsConstant';
import { styled as MuiStyled } from '@mui/material/styles';
import {
  convertImageParams
} from '@/utils/helper';
import styled from '@emotion/styled';
import { Input, Select as CustomSelect, FileUploadModal, CropperImage } from '@/components/_shared/form';
import { Employment } from '@/types/employment';
import { useFormik } from 'formik';
import { Alert, Text } from '@/components/_shared/common';
import CancelIcon from '@mui/icons-material/Cancel';
import Webcam from 'react-webcam';
import { CameraAlt } from '@mui/icons-material';
import { validationSchemeEmployeeInformation } from './validate';
import { useAppSelectors } from '@/hooks/index';
import dayjs from 'dayjs';
import { ifThenElse } from '@/utils/helper';
import { FiTrash2 } from 'react-icons/fi';


const AsteriskComponent = MuiStyled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

interface ImagePriviewProps extends HTMLAttributes<HTMLDivElement> {
  image?: string;
}



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

const ImageReview = styled.div`
  background-image: url(${({ image }: ImagePriviewProps) => image});
  background-repeat: no-repeat;
  width: 102px;
  height: 102px;
  background-size: contain;
  margin-top: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  `;

interface EmploymentInfoProps {
  refProp: React.Ref<HTMLFormElement>;
  setValues: React.Dispatch<React.SetStateAction<Employment.InformationPayload>>
  infoValues: Employment.InformationPayload,
  handleFirstInformation: () => void;
}

const EmploymentEditInformation = ({ refProp, setValues, infoValues, handleFirstInformation }: EmploymentInfoProps) => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [openCamera, setOpenCamera] = useState(false);
  const [images, setImages] = useState<string | null>(infoValues?.images);
  const [open, setOpen] = useState(false);
  const [modalCrop, setModalCrop] = useState(false);
  const [tempImageCrop, setTempImageCrop] = useState(infoValues?.images);
  const { detailInformation, detailCnb } = useAppSelectors((state) => state.employment);
  const handleCloseCamera = () => {
    setCaptureEnable(false);
    setOpenCamera(false);
  };
  console.log(images, 'images');

  const handleOpenCamera = () => {
    setCaptureEnable(true);
    setOpenCamera(true);
  };

  const handleCancelCrop = () => {
    setImages(infoValues?.images);
    setTempImageCrop(infoValues?.images);
    setModalCrop(false);
  };

  const handleSaveCropImage = (file, img) => {
    setTempImageCrop(img);
    console.log(file);
    formik.setFieldValue('picture', file);
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImages(imageSrc);
      handleClose();
      handleCloseCamera();
    }
  }, [webcamRef]);

  const formik = useFormik({
    initialValues: {
      picture: [],
      fullName: infoValues?.fullName,
      nickname: infoValues?.nickname,
      phoneNumberPrefix: infoValues.phoneNumberPrefix,
      phoneNumber: infoValues?.phoneNumber,
      email: infoValues?.email,
      startDate: dayjs(infoValues?.startDate),
      endDate: dayjs(infoValues?.endDate),
      isPermanent: infoValues?.isPermanent,
      department: infoValues?.department,
      position: infoValues?.position,
      isSelfService: infoValues?.isSelfService,
    },
    validationSchema: validationSchemeEmployeeInformation,
    onSubmit: (values, { setErrors }) => {
      handleSubmit(values, setErrors);
    }
  });

  const phonePrefixOptions = [
    {
      label: '+62',
      value: '+62'
    },
    {
      label: '+62',
      value: '+62'
    }
  ];

  const handleSubmit = (_val, setErrors) => {
    handleFirstInformation();
    setErrors({});
  };

  useEffect(() => {
    const allInfoValues = {
      ...formik.values,
      images: String(images)
    };
    setValues(allInfoValues);
  }, [formik.values]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setModalCrop(true);
    setOpen(false);
  };

  const resetImages = () => {
    setImages(null);
    setTempImageCrop('');
  };
  return (
    <>
      {
        Object.keys(formik.errors).length > 0 && (
          <Alert
            severity='error'
            content='Please fill in all the mandatory fields'
            icon={<CancelIcon />}
          />
        )
      }
      <Box
        id='employe-information'
      >
        <Text
          title='Employee Information'
          color='primary.500'
          fontWeight={700}
          fontSize='18px'
        />
        <form ref={refProp}>
          <Box component='div'>
            <Text
              component='span'
              title='Employee Photo'
              color='primary.500'
            />
            <div style={{ position: 'relative' }}>
              <ImageReview image={!tempImageCrop ? ImageType.PLACEHOLDER : tempImageCrop} onClick={handleOpen} />
              {tempImageCrop && (
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
                  onClick={resetImages}
                >
                  <FiTrash2 style={{ zIndex: '999', color: 'red' }} />
                </IconButton>
              )}
            </div>
            {
              formik.errors.picture && (
                <Typography component='span' fontSize='12px' color='red.500'>This field is required</Typography>
              )
            }
          </Box>
          <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Input
                name='fullName'
                customLabel='Full Name'
                withAsterisk={true}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size='small'
                value={formik.values.fullName}
                placeholder='Input Full Name'
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Input
                name='nickname'
                customLabel='Nickname'
                withAsterisk={false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size='small'
                value={formik.values.nickname}
                placeholder='Input Nickname'
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem' }}>
              <Typography>Contact Number<AsteriskComponent>*</AsteriskComponent></Typography>
              <Grid container spacing={2}>
                <Grid item xs={1} sm={3} md={2} lg={2} xl={2} spacing={2}>
                  <CustomSelect
                    variant='outlined'
                    size='small'
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name='phoneNumberPrefix'
                    value={formik.values.phoneNumberPrefix}
                    options={phonePrefixOptions}
                    MenuProps={{ disableAutoFocus: true }}
                    sx={{
                      backgroundColor: '#D9EFE7',
                      border: '1px solid #D9EFE7',
                      borderRadius: '9999px',
                      marginRight: '12px',
                      fontSize: '14px'
                    }}
                  />
                </Grid>
                <Grid item xs={9} sm={9} md={9} lg={9} xl={10} alignSelf='flex-end'>
                  <Input
                    name='phoneNumber'
                    type='number'
                    placeholder='Input Correct Number'
                    withAsterisk={true}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    size='small'
                    value={formik.values.phoneNumber}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Personal Email Address'
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
          </Grid>
          <Grid container rowGap={3}>
            <Grid item md={6}>
              <Text title='Start Date' fontWeight={400} color='grey.400' fontSize='14px' />
              <Text title={dayjs(formik.values.startDate).format('DD/MM/YYYY')} fontWeight={400} color='grey.600' fontSize='14px' />
            </Grid>
            <Grid item md={6}>
              <Text title='End Date' fontWeight={400} color='grey.400' fontSize='14px' />
              <Text title={detailInformation?.endDate === null ? '-' : dayjs(detailInformation.endDate).format('DD/MM/YYYY')} fontWeight={400} color='grey.600' fontSize='14px' />
            </Grid>
            <Grid item md={6}>
              <Text title='Department' fontWeight={400} color='grey.400' fontSize='14px' />
              <Text title={formik.values.department} fontWeight={400} color='grey.600' fontSize='14px' />
            </Grid>
            <Grid item md={6}>
              <Text title='Position' fontWeight={400} color='grey.400' fontSize='14px' />
              <Text title={formik.values.position} fontWeight={400} color='grey.600' fontSize='14px' />
            </Grid>
          </Grid >
        </form>
        {/* file upload modal and file upload from camera */}
        <FileUploadModal
          open={open}
          handleClose={handleClose}
          onChange={(e) => formik.setFieldValue('picture', convertImageParams('picture', !e.target.files ? null : e.target.files[0], setImages, handleClose), false)}
          onCapture={handleOpenCamera}
        />
        <CropperImage
          open={modalCrop}
          onClose={handleCancelCrop}
          image={images}
          setCropValue={handleSaveCropImage}
          ratio={1/1}
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
                      <CancelIcon />
                    </IconButton>
                  </Box>
                  <Box sx={ContentCameraWrapper}>
                    <Webcam
                      audio={false}
                      width={600}
                      height={300}
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
        {/* end */}
      </Box>
      <Box
        id='compensation-benefits'
        mt='24px'
      >
        <Text
          title='Compensation and Benefit'
          color='primary.500'
          fontWeight={700}
          fontSize='16px'
          mb='16px'
        />
        {
          ifThenElse(detailCnb === null, (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <h3>Data Not Found</h3>
              </Box>
            </>
          ), (
            <>
              <Grid container>
                <Grid item md={6}>
                  <Text
                    title='Base'
                    color='primary.500'
                    fontWeight={700}
                    fontSize='16px'
                  />
                  <Grid container alignItems='center' mt='16px'>
                    <Grid item md={4}>
                      <Text
                        title={detailCnb?.base?.component?.name}
                        fontSize='14px'
                        fontWeight={700}
                        color='primary.700'
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Text
                        title='Amount'
                        mb='14px'
                        fontSize='14px'
                        fontWeight={400}
                        color='grey.400'
                      />
                      <Text
                        title={detailCnb?.base?.amount}
                        fontSize='14px'
                        fontWeight={400}
                        color='grey.700'
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Text
                        title={'Per' + ' ' + detailCnb?.base?.term?.name}
                        fontSize='14px'
                        fontWeight={400}
                        color='grey.700'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={6}>
                  <Text
                    title='Supplementary'
                    color='primary.500'
                    fontWeight={700}
                    fontSize='16px'
                  />
                  {
                    detailCnb?.supplementaries?.map((item, index) => (
                      <Grid key={index} container alignItems='center' mt='16px'>
                        <Grid item md={4}>
                          <Text
                            title={item?.component?.name}
                            fontSize='14px'
                            fontWeight={700}
                            color='primary.700'
                          />
                        </Grid>
                        <Grid item md={4}>
                          <Text
                            title='Amount'
                            mb='14px'
                            fontSize='14px'
                            fontWeight={400}
                            color='grey.400'
                          />
                          <Text
                            title={item?.amount}
                            fontSize='14px'
                            fontWeight={400}
                            color='grey.700'
                          />
                        </Grid>
                        <Grid item md={4}>
                          <Text
                            title={'Per' + ' ' + item?.term?.name}
                            fontSize='14px'
                            fontWeight={400}
                            color='grey.700'
                          />
                        </Grid>
                      </Grid>
                    ))
                  }
                </Grid>
              </Grid>
            </>
          ))
        }
      </Box>
    </>
  );
};

export default EmploymentEditInformation;