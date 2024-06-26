/* eslint-disable no-unused-vars */
import React, { HTMLAttributes, useState, useCallback, useRef, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  IconButton,
  Modal,
  Autocomplete,
  TextField,
  createFilterOptions
} from '@mui/material';
import Webcam from 'react-webcam';
import { Input, Button, Select as CustomSelect, CheckBox, DatePicker, FileUploadModal, CropperImage } from '@/components/_shared/form';
import { styled as MuiStyled } from '@mui/material/styles';
import { Image as ImageType } from '@/utils/assetsConstant';
import styled from '@emotion/styled';
import { useAppSelectors, useAppDispatch } from '@/hooks/index';
import dayjs from 'dayjs';
import { Alert, Text } from '@/components/_shared/common';
import { CameraAlt, Cancel } from '@mui/icons-material';
import { Employees } from '@/types/employees';
import { validationSchemeEmployeeInformation } from './validate';
import { useFormik } from 'formik';
import { convertImageParams, getCompanyData, randomInt, ifThenElse } from '@/utils/helper';
import { getListPositionRequested } from '@/store/reducers/slice/options/optionSlice';
import { Option } from '@/types/option';
import { BsTrash3 } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiTrash2 } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const videoConstraints = {
  width: 500,
  height: 720,
  facingMode: 'user'
};


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
  nextPage: (_val: number, _data: Employees.InformationValues) => void;
  nextPermPage: (_val: number, _data: Employees.InformationValues) => void;
  setValues: React.Dispatch<React.SetStateAction<Employees.InformationValues>>
  infoValues: Employees.InformationValues,
}

function EmployeeInformationForm({ refProp, nextPage, nextPermPage, setValues, infoValues }: EmployeeProps) {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const t_employeeInformationSection = 'company_management.employees.form_&_detail.employee_information.employee_information_section';
  const t_employeeSelfService = 'company_management.employees.form_&_detail.employee_information.employee_information_section.employee_self_service_box';
  const webcamRef = useRef<Webcam>(null);
  const [openCamera, setOpenCamera] = useState(false);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImages(imageSrc);
      setModalCrop(true);
      handleClose();
      handleCloseCamera();
    }
  }, [webcamRef]);

  const [open, setOpen] = useState(false);
  const { listDepartment, listPosition } = useAppSelectors(state => state.option);
  const [images, setImages] = useState<string | null>(infoValues?.images);
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

  const { responser } = useAppSelectors(state => state);

  const formik = useFormik({
    initialValues: {
      picture: [],
      fullName: infoValues?.fullName,
      nickname: infoValues?.nickname,
      phoneNumberPrefix: infoValues?.phoneNumberPrefix,
      phoneNumber: infoValues?.phoneNumber,
      email: infoValues?.email,
      startDate: dayjs(infoValues?.startDate),
      endDate: dayjs(infoValues?.endDate),
      isPermanent: infoValues?.isPermanent,
      department: infoValues?.department,
      position: infoValues?.position,
      isSelfService: infoValues?.isSelfService
    },
    validationSchema: validationSchemeEmployeeInformation,
    onSubmit: (values, { setErrors }) => {
      console.log(values);
      handleSubmit(values, setErrors);
    }
  });

  const handleSubmit = (val, setErrors) => {
    const allInfoValues = {
      ...val,
      companyID: getCompanyData()?.id as string,
      images: String(images),
    };
    setValues(allInfoValues);
    if (formik.values.isSelfService) {
      nextPermPage(3, allInfoValues);
    } else {
      nextPage(1, allInfoValues);
    }
    setErrors({});
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setModalCrop(true);
    setOpen(false);
  };

  const phonePrefixOptions = [
    {
      label: '+62',
      value: '+62'
    },
    {
      label: '+44',
      value: '+44'
    }
  ];

  // Open camera
  const handleOpenCamera = () => {
    setCaptureEnable(true);
    setOpenCamera(true);
  };

  const handleCloseCamera = () => {
    setCaptureEnable(false);
    setOpenCamera(false);
  };
  // end open camera

  const filter = createFilterOptions<Option.FreesoloType>();

  const [mappedDepartment, setMappedDepartment] = useState(listDepartment);
  const [mappedListPosition, setMappedListPosition] = useState(listPosition);

  useEffect(() => {
    setMappedDepartment(listDepartment);
    setMappedListPosition(listPosition);
  }, [listDepartment, listPosition]);

  const handleDelete = (id: number) => {
    const temp = mappedDepartment.filter(item => +item.id !== +id);
    setMappedDepartment(temp);
  };

  const handleDeletePosition = (id: number) => {
    const temp = mappedListPosition.filter(item => +item.id !== +id);
    setMappedListPosition(temp);
  };

  const resetPicture = () => {
    setImages(null);
    setTempImageCrop('');
  };

  return (
    <div>
      {
        ifThenElse(Object.keys(formik.errors).length > 0, (
          <Alert
            severity='error'
            content='Please fill in all the mandatory fields'
            icon={<Cancel />}
          />
        ), null)
      }
      {
        ifThenElse(![200, 201, 0].includes(responser?.code), (
          <Alert
            severity='error'
            content={responser?.message}
            icon={<Cancel />}
          />
        ), null)
      }
      <Text
        component='h3'
        variant='text-lg'
        fontWeight={700}
        color='primary.500'
        title={t(`${t_employeeInformationSection}.title`)}
        mb='16px'
      />
      <form ref={refProp} onSubmit={formik.handleSubmit}>
        <Box component='div'>
          {/* <Text
            component='span'
            title='Employee Photo'
            color='primary.500'
          /> */}
          <div style={{ position: 'relative' }}>
            <ImageReview image={ifThenElse(!tempImageCrop, ImageType.PLACEHOLDER, tempImageCrop)} onClick={handleOpen} />
            {ifThenElse(tempImageCrop, (
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
            ), null)}
          </div>

          {
            ifThenElse(formik.errors.picture, (
              <Typography component='span' fontSize='12px' color='red.500'>This field is required</Typography>
            ), null)
          }
        </Box>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='fullName'
              customLabel={t(`${t_employeeInformationSection}.fullname`)}
              withAsterisk={true}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size='small'
              value={formik.values.fullName}
              placeholder={t(`${t_employeeInformationSection}.fullname_placeholder`)}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='nickname'
              customLabel={t(`${t_employeeInformationSection}.nickname`)}
              withAsterisk={false}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              size='small'
              value={formik.values.nickname}
              placeholder={t(`${t_employeeInformationSection}.nickname_placeholder`)}
              error={formik.touched.nickname && Boolean(formik.errors.nickname)}
              helperText={formik.touched.nickname && formik.errors.nickname}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem', marginTop: '.3rem' }}>
            <Typography>{t(`${t_employeeInformationSection}.contact_number`)}<AsteriskComponent>*</AsteriskComponent></Typography>
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
                  placeholder={t(`${t_employeeInformationSection}.contact_number_placeholder`)}
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
              customLabel={t(`${t_employeeInformationSection}.personal_email_address`)}
              withAsterisk={true}
              size='small'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t(`${t_employeeInformationSection}.personal_email_address_placeholder`)}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <DatePicker
              customLabel={t(`${t_employeeInformationSection}.start_date`)}
              withAsterisk
              value={formik.values.startDate as unknown as Date}
              onChange={(date: unknown) => formik.setFieldValue('startDate', date)}
              error={formik.touched.startDate && formik.errors.startDate ? String(formik.errors.startDate) : ''}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <DatePicker
              customLabel={t(`${t_employeeInformationSection}.end_date`)}
              value={formik.values.endDate as unknown as Date}
              onChange={(date: unknown) => formik.setFieldValue('endDate', date)}
              disabled={formik.values.isPermanent}
            />
          </Grid>
        </Grid>
        <CheckBox
          customLabel={t(`${t_employeeInformationSection}.permanent`)}
          name='isPermanent'
          checked={formik.values.isPermanent}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography mb='6px'>{t(`${t_employeeInformationSection}.department`)} <AsteriskComponent>*</AsteriskComponent></Typography>
            <Autocomplete
              id='department'
              freeSolo
              value={formik.values.department}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  formik.setFieldValue('department', newValue, false);
                } else if (newValue && newValue.inputValue) {
                  formik.setFieldValue('department', newValue.inputValue, false);
                  setMappedDepartment((prevDepartments) => [...prevDepartments, {
                    label: newValue.inputValue,
                    id: String(randomInt(100, 999))
                  }]);
                } else {
                  formik.setFieldValue('department', newValue?.label);
                  dispatch({
                    type: getListPositionRequested.toString(),
                    payload: {
                      departmentID: newValue?.value
                    }
                  });
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
                        }}>
                        <AiOutlinePlus />
                        {t('button.add_new')} {inputValue}
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
                    justifyContent: 'space-between',
                  }}>
                  <li {...props} style={{ width: '100%' }}>{option.label}</li>
                  {option.label.length > 0 && (
                    <BsTrash3 style={{ marginRight: '8px', cursor: 'pointer' }} onClick={() => {
                      handleDelete(option.id);
                    }} />
                  )}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  name='department'
                  error={formik.touched.department && Boolean(formik.errors.department)}
                  helperText={formik.touched.department && Boolean(formik.errors.department) ? formik.errors.department : ''}
                  {...params}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography mb='6px'>Position <AsteriskComponent>*</AsteriskComponent></Typography>
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
                    id: String(randomInt(100, 999))
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
                      <Box component='span'
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
                    justifyContent: 'space-between',
                  }}>
                  <li {...props} style={{ width: '100%' }}>{option.label}</li>
                  {option.label.length > 0 && (
                    <BsTrash3 style={{ marginRight: '8px', cursor: 'pointer' }} onClick={() => {
                      handleDeletePosition(option.id);
                    }} />
                  )}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  name='position'
                  error={formik.touched.position && Boolean(formik.errors.position)}
                  helperText={formik.touched.position && Boolean(formik.errors.position) ? formik.errors.position : ''}
                  {...params}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <EmployeeSelfWrapper>
              <CheckBox
                customLabel={t(`${t_employeeSelfService}.title`)}
                name='isSelfService'
                checked={formik.values.isSelfService}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Typography>{t(`${t_employeeSelfService}.desc`)}</Typography>
            </EmployeeSelfWrapper>
          </Grid>
        </Grid>
        <NextBtnWrapper>
          <Button fullWidth={false} size='small' label={t('button.next')} color='primary' type={'submit'} />
        </NextBtnWrapper>
      </form>
      <FileUploadModal
        open={open}
        handleClose={handleClose}
        onChange={(e) => convertImageParams('picture', !e.target.files ? null : e.target.files[0], setImages, handleClose)}
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
            ifThenElse(isCaptureEnable, (
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
            ), null)
          }
        </Box>
      </Modal>
    </div>
  );
}

export default EmployeeInformationForm;