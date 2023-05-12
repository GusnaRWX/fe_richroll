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
import { Input, Button } from '@/components/_shared/form';
import { styled as MuiStyled } from '@mui/material/styles';
import { Image as ImageType } from '@/utils/assetsConstant';
import styled from '@emotion/styled';
import { Close } from '@mui/icons-material';
import { BsFileEarmarkPlus } from 'react-icons/bs';
import { AiOutlineCamera } from 'react-icons/ai';
import { useForm } from '@/hooks/index';
import { checkRegulerExpression } from '@/utils/helper';
import dayjs from 'dayjs';
import { useAppDispatch } from '@/hooks/index';
import { useRouter } from 'next/router';
import { postEmployeeInfoRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';


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

interface EmployeeProps {
  refProp: React.Ref<HTMLFormElement>;
  companyType: [];
  companySector: [];
}

function CompanyInformationForm ({refProp, companyType, companySector} :EmployeeProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [images, setImages] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialValues, setInitialValues] = useState({
    companyID: 4,
    picture: [],
    fullName: '',
    nickname: '',
    phoneNumberPrefix: '',
    phoneNumber: '',
    email: '',
    startDate: dayjs(Date.now()),
    endDate: dayjs(Date.now()),
    isPermanent: false,
    department: '',
    position: '',
    isSelfService: false
  });

  const validate = (fieldOfValues = values) => {
    const temp = {...errors};

    if ('picture' in fieldOfValues)
      temp.picture = fieldOfValues.picture.length !== 0 ? '' : 'This field is required';

    if ('fullName' in fieldOfValues)
      temp.fullName = fieldOfValues.fullName ? '' : 'This field is required';

    if ('phoneNumber' in fieldOfValues)
      temp.phoneNumber = fieldOfValues.phoneNumber ? '' : 'This field is required';

    if ('email' in fieldOfValues) {
      const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailValue = fieldOfValues.email || '';
      let emailErrorMessage = '';
      if (!emailValue) {
        emailErrorMessage = 'Email is required';
      } else if (!checkRegulerExpression(patternEmail, emailValue)) {
        emailErrorMessage = 'Email should be valid';
      }
      temp.email = emailErrorMessage;
    }

    setErrors({
      ...temp
    });

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '');
  };

  const { values, errors, setErrors, handleInputChange } = useForm(initialValues, true, validate);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(errors);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validate()) {
      const inputData = new FormData();
      inputData.append('companyID', values.companyID);
      inputData.append('picture', values.picture);
      inputData.append('fullName', values.fullName);
      inputData.append('nickname', values.nickname);
      inputData.append('phoneNumberPrefix', values.phoneNumberPrefix);
      inputData.append('phoneNumber', values.phoneNumber);
      inputData.append('email', values.email);
      inputData.append('startDate', dayjs(values.startDate).format('YYYY-MM-DD'));
      inputData.append('endDate', dayjs(values.endDate).format('YYY-MM-DD'));
      inputData.append('isPermanent', values.isPermanent);
      inputData.append('department', values.department);
      inputData.append('position', values.position);
      inputData.append('isSelfService', values.isSelfService);
      dispatch({
        type: postEmployeeInfoRequested.toString(),
        payload: inputData
      });

      setInitialValues({
        companyID: 4,
        picture: [],
        fullName: '',
        nickname: '',
        phoneNumberPrefix: '',
        phoneNumber: '',
        email: '',
        startDate: dayjs(Date.now()),
        endDate: dayjs(Date.now()),
        isPermanent: false,
        department: '',
        position: '',
        isSelfService: false
      });
    }
  };

  return (
    <>
      <Typography component='h3' fontSize={18} color='primary'>Company Information</Typography>
      <form ref={refProp} onSubmit={(e) => handleSubmit(e)}>
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
                value={values.department}
                onChange={handleInputChange}
                name='companyType'
                placeholder='Select Company Type'
              >
                {companyType.map((val, idx) => (
                  <MenuItem key={idx} value={val?.['name']}>{val?.['name']}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='fullName'
              customLabel='Company Name'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Company Name'
              error={errors.fullName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='fullName'
              customLabel='Company NPWP'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Company NPWP'
              error={errors.fullName}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth>
              <Typography sx={{ mb: '6px' }}>Company Sector<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                variant='outlined'
                size='small'
                value={values.department}
                onChange={handleInputChange}
                name='companySector'
              >
                {companySector.map((val, idx) => (
                  <MenuItem key={idx} value={val?.['name']}>{val?.['name']}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='email'
              customLabel='Company Email Address'
              withAsterisk={true}
              size='small'
              onChange={handleInputChange}
              placeholder='Company Email Address'
              error={errors.email}
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
            <Input
              name='fullName'
              customLabel='Country'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Country'
              error={errors.fullName}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='fullName'
              customLabel='Province'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Province'
              error={errors.fullName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='fullName'
              customLabel='City'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input City'
              error={errors.fullName}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='fullName'
              customLabel='Sub-District'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Sub-District'
              error={errors.fullName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='fullName'
              customLabel='Street Name, Building Name'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Street Name, Building Name'
              error={errors.fullName}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='fullName'
              customLabel='ZIP Code'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input ZIP Code'
              error={errors.fullName}
            />
          </Grid>
        </Grid>
        <NextBtnWrapper>
          <Button onClick={() => { router.push('/company');}} fullWidth={false} size='small' label='Cancel' variant='outlined' sx={{ mr: '12px' }} color='primary'/>
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