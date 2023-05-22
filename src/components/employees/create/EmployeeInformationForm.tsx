/* eslint-disable no-unused-vars */
import React, { HTMLAttributes, useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  SelectChangeEvent
} from '@mui/material';
import { Input, Button, Select as CustomSelect, CheckBox, DatePicker, FileUploadModal } from '@/components/_shared/form';
import { styled as MuiStyled } from '@mui/material/styles';
import { Image as ImageType } from '@/utils/assetsConstant';
import styled from '@emotion/styled';
import { useAppSelectors, useAppDispatch } from '@/hooks/index';
import dayjs from 'dayjs';
import { Alert, Text } from '@/components/_shared/common';
import CancelIcon from '@mui/icons-material/Cancel';
import { Employees } from '@/types/employees';
import { validationSchemeEmployeeInformation } from './validate';
import { useFormik } from 'formik';
import { convertImageParams, getCompanyData } from '@/utils/helper';
import { getListPositionRequested } from '@/store/reducers/slice/options/optionSlice';


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
  setIsInformationValid: React.Dispatch<React.SetStateAction<boolean>>
}

function EmployeeInformationForm({ refProp, nextPage, setValues, infoValues, setIsInformationValid }: EmployeeProps) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { listDepartment, listPosition } = useAppSelectors(state => state.option);
  const [images, setImages] = useState<string | null>(infoValues?.images);

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
      const allInfoValues = {
        ...values,
        companyID: getCompanyData()?.id as string,
        images: String(images)
      };
      setValues(allInfoValues);
      nextPage(1);
      setIsInformationValid(true);
      setErrors({});
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

  return (
    <div>
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
              error={formik.touched.nickname && Boolean(formik.errors.nickname)}
              helperText={formik.touched.nickname && formik.errors.nickname}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem', marginTop: '.3rem' }}>
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
              withAsterisk
              value={formik.values.endDate as unknown as Date}
              onChange={(date: unknown) => formik.setFieldValue('endDate', date)}
              error={formik.errors.endDate ? String(formik.errors.endDate) : ''}
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
            <CustomSelect
              customLabel='Department'
              withAsterisk={false}
              variant='outlined'
              value={formik.values.department}
              onChange={(e: unknown) => {
                formik.handleChange(e);
                dispatch({
                  type: getListPositionRequested.toString(),
                  payload: {
                    departmentID: (e as SelectChangeEvent).target.value
                  }
                });
              }}
              onBlur={formik.handleBlur}
              fullWidth={true}
              name='department'
              size='small'
              options={listDepartment}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <CustomSelect
              customLabel='Position'
              withAsterisk={false}
              variant='outlined'
              value={formik.values.position}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth={true}
              name='position'
              size='small'
              options={listPosition}
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
        </Grid>
        <NextBtnWrapper>
          <Button fullWidth={false} size='small' label='Next' color='primary' type={'submit'} />
        </NextBtnWrapper>
      </form>
      <FileUploadModal
        open={open}
        handleClose={handleClose}
        onChange={(e) => formik.setFieldValue('picture', convertImageParams('picture', !e.target.files ? null : e.target.files[0], setImages, handleClose), false)}
      />
    </div>
  );
}

export default EmployeeInformationForm;