import React, { HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  createFilterOptions,
  Autocomplete,
  TextField,
  Modal,
  IconButton
} from '@mui/material';
import { Input, Button, Select as CustomSelect, CheckBox, DatePicker, FileUploadModal } from '@/components/_shared/form';
import { styled as MuiStyled } from '@mui/material/styles';
import { Image as ImageType } from '@/utils/assetsConstant';
import styled from '@emotion/styled';
import { useAppSelectors } from '@/hooks/index';
import {
  base64ToFile,
  convertImageParams, randomCode,
} from '@/utils/helper';
import dayjs from 'dayjs';
import { Alert, Text } from '@/components/_shared/common';
import CancelIcon from '@mui/icons-material/Cancel';
import { Employees } from '@/types/employees';
import { useFormik } from 'formik';
import { validationSchemeEmployeeInformation } from './validate';
import { Option } from '@/types/option';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsTrash3 } from 'react-icons/bs';
import Webcam from 'react-webcam';
import { CameraAlt } from '@mui/icons-material';
import {Chip} from '@mui/material';
import TerminateAccount from '../options/TerminateAccount';

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
  margin-top: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  `;

interface EmployeeProps {
  refProp: React.Ref<HTMLFormElement>;
  nextPage: (_val: number) => void;
  setValues: React.Dispatch<React.SetStateAction<Employees.InformationValues>>
  infoValues: Employees.InformationValues,
  setIsInformationValid: React.Dispatch<React.SetStateAction<boolean>>,
  handleFirstInformation: () => void;
}

interface EmployeeInformationDetailProps {
  data: {
    fullName: string | undefined;
    department: string | undefined;
    email: string | undefined;
    endDate: string | null;
    picture: string | null;
    isPermanent: boolean;
    isSelfService: boolean;
    nickname: string | null;
    phoneNumber: string | null;
    position: string | null;
    startDate: string | null;
  }
}


function EmployeeInformationEdit({ nextPage, refProp, setValues, infoValues, setIsInformationValid, handleFirstInformation }: EmployeeProps, { data }: EmployeeInformationDetailProps) {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [openCamera, setOpenCamera] = useState(false);

  const handleCloseCamera = () => {
    setCaptureEnable(false);
    setOpenCamera(false);
  };

  const handleOpenCamera = () => {
    setCaptureEnable(true);
    setOpenCamera(true);
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImages(imageSrc);
      const nameFile = randomCode(5);
      const fileImage = base64ToFile(imageSrc, nameFile);
      formik.setFieldValue('picture', fileImage);
      handleClose();
      handleCloseCamera();
    }
  }, [webcamRef]);
  const { listDepartment, listPosition } = useAppSelectors(state => state.option);
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<string | null>(infoValues?.images);

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    // const allInfoValues = {
    //   ...val,
    //   images: images
    // };
    // setValues(allInfoValues);
    setIsInformationValid(true);
    handleFirstInformation();
    nextPage(1);
    setErrors({});
  };

  useEffect(() => {
    const allInfoValues = {
      ...formik.values,
      images: String(images)
    };
    setValues(allInfoValues);
  }, [formik.values]);

  const filter = createFilterOptions<Option.FreesoloType>();

  const [mappedDepartment, setMappedDeparment] = useState(listDepartment);
  const [mappedListPosition, setMappedListPosition] = useState(listPosition);

  const handleDelete = (id: number) => {
    const temp = [...mappedDepartment];
    temp.splice(id, 1);
    setMappedDeparment(temp);
  };

  const handleDeletePosition = (id: number) => {
    const temp = [...mappedListPosition];
    temp.splice(id, 1);
    setMappedListPosition(temp);
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
      <Text
        component='h3'
        variant='text-lg'
        fontWeight={700}
        color='primary.500'
        title='Employee Information'
        mb='16px'
      />
      <form ref={refProp} onSubmit={formik.handleSubmit}>
        <Box component='div'>
          <Text
            component='span'
            title='Employee Photo'
            color='primary.500'
          />
          <ImageReview image={!images ? ImageType.PLACEHOLDER : images} onClick={handleOpen} />
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
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <DatePicker
              customLabel='Start Date'
              withAsterisk
              value={formik.values.startDate as unknown as Date}
              onChange={(date: unknown) => formik.setFieldValue('startDate', date)}
              error={formik.touched.startDate && formik.errors.startDate ? String(formik.errors.startDate) : ''}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <DatePicker
              customLabel='End Date'
              value={formik.values.endDate as unknown as Date}
              onChange={(date: unknown) => formik.setFieldValue('endDate', date)}
              disabled={formik.values.isPermanent}
            />
          </Grid>
        </Grid>
        <CheckBox
          customLabel='Permanent'
          name='isPermanent'
          checked={formik.values.isPermanent}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text title='Department' mb='6px' />
            <Autocomplete
              id='department'
              freeSolo
              value={formik.values.department}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  formik.setFieldValue('department', newValue, false);
                } else if (newValue && newValue.inputValue) {
                  formik.setFieldValue('deparment', newValue.inputValue, false);
                  setMappedDeparment((prev) => [...prev, {
                    label: newValue.inputValue,
                    id: String(Math.random() * Math.PI)
                  }]);
                } else {
                  formik.setFieldValue('department', newValue?.label);
                }
              }}
              size='small'
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some((option) => inputValue === option.label);
                if (inputValue !== '' && !isExisting) {
                  filtered.push({
                    inputValue,
                    label: (
                      <Box
                        component='span'
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <AiOutlinePlus />
                        Add New {inputValue}
                      </Box>
                    ) as unknown as Element
                  });
                }
                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              options={mappedDepartment as readonly Option.FreesoloType[]}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              getOptionLabel={(option: any) => {
                if (typeof option === 'string') {
                  return option;
                }

                if (option.inputValue) {
                  return option.inputValue;
                }

                return option.label;
              }}
              renderOption={(props, option) => (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <li {...props} style={{ width: '100%' }}>{option.label}</li>
                  {option.label.length > 0 && (
                    <BsTrash3 style={{ marginRight: '8px', cursor: 'pointer' }}
                      onClick={() => { handleDelete(option.id); }}
                    />
                  )}
                </Box>
              )}
              renderInput={(params) => <TextField name='department' {...params} />}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Text title='Position' mb='6px' />
            <Autocomplete
              id='position'
              freeSolo
              value={formik.values.position}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  formik.setFieldValue('position', newValue, false);
                } else if (newValue && newValue.inputValue) {
                  formik.setFieldValue('position', newValue.inputValue, false);
                  setMappedListPosition((prev) => [...prev, {
                    label: newValue.inputValue,
                    id: String(Math.random() * Math.PI)
                  }]);
                } else {
                  formik.setFieldValue('position', newValue?.label);
                }
              }}
              size='small'
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some((option) => inputValue === option.label);
                if (inputValue !== '' && !isExisting) {
                  filtered.push({
                    inputValue,
                    label: (
                      <Box
                        component='span'
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <AiOutlinePlus />
                        Add New {inputValue}
                      </Box>
                    ) as unknown as Element
                  });
                }
                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              options={mappedListPosition as readonly Option.FreesoloType[]}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              getOptionLabel={(option: any) => {
                if (typeof option === 'string') {
                  return option;
                }

                if (option.inputValue) {
                  return option.inputValue;
                }

                return option.label;
              }}
              renderOption={(props, option) => (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <li {...props} style={{ width: '100%' }}>{option.label}</li>
                  {option.label.length > 0 && (
                    <BsTrash3 style={{ marginRight: '8px', cursor: 'pointer' }}
                      onClick={() => { handleDeletePosition(option.id); }}
                    />
                  )}
                </Box>
              )}
              renderInput={(params) => <TextField name='position' {...params} />}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <EmployeeSelfWrapper>
              <CheckBox
                customLabel='Employee Self Serive'
                name='isSelfService'
                checked={formik.values.isSelfService}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Typography>Activate button to send account activation link via email. Employee Self Service enables self-data filling.</Typography>
            </EmployeeSelfWrapper>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <Text
            variant='text-lg'
            title='Employee Status'
            fontWeight={700}
            color='primary.500'
          />
          {
            data?.isPermanent === false ? (
              <Chip label='Non Active' sx={{ backgroundColor: '#FEE2E2', color: '#166534', fontWeight: 'bold' }} />
            ) : (
              <Chip label='Active' sx={{ backgroundColor: '#DCFCE7', color: '#166534', fontWeight: 'bold' }} />
            )
          }
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TerminateAccount />
          </Grid>
        </Grid>
        <NextBtnWrapper>
          <Button fullWidth={false} size='small' label='Next' color='primary' type={'submit'} />
        </NextBtnWrapper>
      </form>
      <FileUploadModal
        open={open}
        handleClose={handleClose}
        onChange={(e) => formik.setFieldValue('picture', convertImageParams('picture', !e.target.files ? null : e.target.files[0], setImages, handleClose), false)}
        onCapture={handleOpenCamera}
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
    </>
  );
}

export default EmployeeInformationEdit;