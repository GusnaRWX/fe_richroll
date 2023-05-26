import React from 'react';
import { Button, Form, IconButton } from '@/components/_shared/form';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  RadioGroup,
  Radio,
  FormControlLabel,
  Box,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import {
  getCompensationComponentOptionRequested,
  postNewCnbProfileRequested,
} from '@/store/reducers/slice/cnb/compensationSlice';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getCompanyData } from '@/utils/helper';

export default function CreateCNBComponent() {
  const router = useRouter();
  const companyData = getCompanyData();
  const dispatch = useAppDispatch();
  const compensationComponentOption = useAppSelectors(
    (state) => state.compensation?.compensationComponentOption?.data?.items
  );

  React.useEffect(() => {
    dispatch({
      type: getCompensationComponentOptionRequested.toString(),
    });
  }, []);

  const AddButton = styled(Button)({
    color: 'white',
    maxWidth: '245px',
    padding: '8px 10px',
    '.MuiTypography-root': {
      fontSize: '12px',
    },
  });

  const Header = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  });

  const HeaderPageTitle = styled('div')({
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  });

  const NextBtnWrapper = styled(Box)({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  });

  const FormWrapper = styled('div')({
    padding: '20px 30px',
    boxShadow:
      '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  });

  const TextFieldWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '50%',
    gap: '24px',
  });

  const SectionInputWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '33px',
  });

  const InputWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '24px',
  });

  const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 0 0 1px rgb(16 22 26 / 40%)'
        : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
        : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background:
        theme.palette.mode === 'dark'
          ? 'rgba(57,75,89,.5)'
          : 'rgba(206,217,224,.5)',
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#137cbd',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  });

  interface SupplementType {
    id: number;
    data: {
      compensationComponentId: string;
      taxStatus: string;
      rateOrAmount: number | null;
      period: string;
    };
  }

  const [supplementaryList, setSupplementaryList] = React.useState<
  SupplementType[]
  >([]);

  interface BaseCompType {
    name: string;
    compensationComponentId: string;
    taxStatus: string;
    rateOrAmount: string;
    period: string;
  }

  const [BaseCompensation, setBaseCompensation] = React.useState<BaseCompType>({
    name: '',
    compensationComponentId: '',
    taxStatus: '',
    rateOrAmount: '',
    period: '',
  });

  const addSuplementary = () => {
    const newData = {
      id: Math.floor(Math.random() * 100 + 1),
      data: {
        compensationComponentId: '',
        taxStatus: '',
        rateOrAmount: 0,
        period: '',
      },
    };
    setSupplementaryList((prev) => [...prev, newData]);
  };

  const selectChange = (index: number, newItem: unknown, type: string) => {
    const items = [...supplementaryList];
    const item = { ...items[index] };
    if (type === 'compensation') {
      item.data.compensationComponentId = newItem as string;
    } else if (type === 'amount') {
      item.data.rateOrAmount = newItem as number;
    } else if (type === 'tax') {
      item.data.taxStatus = newItem as string;
    } else if (type === 'per') {
      item.data.period = newItem as string;
    }
    items[index] = item;
    setSupplementaryList(items);
  };

  const deleteSuplementary = (i: number) => {
    const items = [...supplementaryList];
    const search = items.filter((item) => {
      return item.id !== i;
    });
    setSupplementaryList(search);
  };

  function CreateNewCnbProfile() {
    dispatch({
      type: postNewCnbProfileRequested.toString(),
      Payload: {
        companyId: companyData?.id,
        name: BaseCompensation.name,
        baseCompensation: {
          compensationComponentId: parseInt(
            BaseCompensation.compensationComponentId
          ),
          taxStatus: BaseCompensation.taxStatus,
          amount:
            BaseCompensation.compensationComponentId === '1'
              ? 0
              : BaseCompensation.rateOrAmount,
          rate:
            BaseCompensation.compensationComponentId === '1'
              ? BaseCompensation.rateOrAmount
              : 0,
          period: BaseCompensation.period,
        },
        supplementaryCompensations: supplementaryList.map((item) => ({
          compensationComponentId: parseInt(item.data.compensationComponentId),
          taxStatus: item.data.taxStatus,
          amount:
            item.data.compensationComponentId === '1'
              ? 0
              : item.data.rateOrAmount,
          rate:
            item.data.compensationComponentId === '1'
              ? item.data.rateOrAmount
              : 0,
          period: item.data.period,
        })),
      },
    });
  }

  return (
    <div>
      <Header>
        <HeaderPageTitle>
          <IconButton
            parentColor='primary.500'
            icons={<ArrowBack sx={{ color: '#FFFFFF' }} />}
            onClick={() => {
              router.push('/compensation-benefits');
            }}
          />
          <Typography
            style={{
              color: '#223567',
              fontSize: '20px',
              fontWeight: '700',
              width: '250px',
            }}
          >
            Create New CnB Profile
          </Typography>
        </HeaderPageTitle>
        <NextBtnWrapper>
          <Button
            fullWidth={false}
            size='small'
            label='Cancel'
            variant='outlined'
            sx={{ mr: '12px' }}
            color='primary'
          />
          <Button
            fullWidth={false}
            size='small'
            label='Save'
            color='primary'
            onClick={() => CreateNewCnbProfile()}
          />
        </NextBtnWrapper>
      </Header>
      <FormWrapper>
        <Form style={{ marginBottom: '32px' }}>
          <Typography>
            Profile Name
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextFieldWrapper>
            <TextField
              fullWidth
              placeholder='Sales'
              value={BaseCompensation.name}
              onChange={(e) =>
                setBaseCompensation({
                  ...BaseCompensation,
                  name: e.target.value as string,
                })
              }
            />
          </TextFieldWrapper>
          <Typography
            style={{
              marginBottom: '17px',
              marginTop: '31px',
              fontSize: '18px',
              fontWeight: '700',
              color: '#223567',
            }}
          >
            Compensation
          </Typography>
          <Typography
            style={{
              marginBottom: '17px',
              fontSize: '16px',
              fontWeight: '700',
              color: '#223567',
            }}
          >
            Base
          </Typography>
          <SectionInputWrapper>
            <InputWrapper>
              <div id='right' style={{ width: '100%', maxWidth: '511px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <Typography style={{ fontSize: '14px' }}>
                    Compensation Component
                    <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <Select
                    fullWidth
                    value={BaseCompensation.compensationComponentId}
                    onChange={(e) =>
                      setBaseCompensation({
                        ...BaseCompensation,
                        compensationComponentId: e.target.value as string,
                      })
                    }
                  >
                    {compensationComponentOption?.map((Option, i) => (
                      <MenuItem key={i} value={Option.id}>
                        {Option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div id='center' style={{ maxWidth: '388px', width: '100%' }}>
                <Typography style={{ fontSize: '14px' }}>
                  Tax Status<span style={{ color: 'red' }}>*</span>
                </Typography>
                <RadioGroup
                  row
                  value={BaseCompensation.taxStatus}
                  onChange={(e) =>
                    setBaseCompensation({
                      ...BaseCompensation,
                      taxStatus: e.target.value,
                    })
                  }
                >
                  <FormControlLabel
                    value='true'
                    control={
                      <Radio size='small' checkedIcon={<BpCheckedIcon />} />
                    }
                    label='Taxable'
                  />
                  <FormControlLabel
                    value='false'
                    control={
                      <Radio size='small' checkedIcon={<BpCheckedIcon />} />
                    }
                    label='Non-Taxable'
                  />
                </RadioGroup>
              </div>
            </InputWrapper>
            <div>
              <Typography>
                {BaseCompensation?.compensationComponentId === '1'
                  ? 'Rate'
                  : 'Amount'}
                <span style={{ color: 'red' }}>*</span>
              </Typography>
              <InputWrapper style={{ maxWidth: '511px' }}>
                <TextField
                  fullWidth
                  value={BaseCompensation.rateOrAmount}
                  onChange={(e) =>
                    setBaseCompensation({
                      ...BaseCompensation,
                      rateOrAmount: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>Rp</InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position='end'>IDR</InputAdornment>
                    ),
                  }}
                />
                <Select
                  fullWidth
                  value={BaseCompensation.period}
                  onChange={(e) =>
                    setBaseCompensation({
                      ...BaseCompensation,
                      period: e.target.value as string,
                    })
                  }
                >
                  <MenuItem value='Per Week'>per Week</MenuItem>
                  <MenuItem value='Per Month'>per Month</MenuItem>
                  <MenuItem value='Per Year'>per Year</MenuItem>
                </Select>
              </InputWrapper>
            </div>
          </SectionInputWrapper>
        </Form>
        <div>
          <div>
            {supplementaryList.length > 0 && (
              <>
                <Typography
                  style={{
                    marginBottom: '17px',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#223567',
                  }}
                >
                  Suplementary
                </Typography>
                <Form>
                  {supplementaryList.map((suplement, i) => (
                    <SectionInputWrapper key={i}>
                      <InputWrapper>
                        <div
                          id='right'
                          style={{ width: '100%', maxWidth: '511px' }}
                        >
                          <div style={{ marginBottom: '16px' }}>
                            <Typography style={{ fontSize: '14px' }}>
                              Compensation Component {i + 1}
                              <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <Select
                              fullWidth
                              value={
                                supplementaryList[i].data
                                  .compensationComponentId
                              }
                              onChange={(e) =>
                                selectChange(
                                  i,
                                  e.target.value as string,
                                  'compensation'
                                )
                              }
                            >
                              {compensationComponentOption?.map((Option, j) => (
                                <MenuItem key={j} value={Option.id}>
                                  {Option.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </div>
                        </div>
                        <div
                          id='center'
                          style={{ maxWidth: '388px', flexGrow: '1' }}
                        >
                          <Typography style={{ fontSize: '14px' }}>
                            Tax Status<span style={{ color: 'red' }}>*</span>
                          </Typography>
                          <RadioGroup
                            row
                            value={supplementaryList[i].data.taxStatus}
                            onChange={(e) =>
                              selectChange(i, e.target.value as string, 'tax')
                            }
                          >
                            <FormControlLabel
                              value='true'
                              control={
                                <Radio
                                  size='small'
                                  checkedIcon={<BpCheckedIcon />}
                                />
                              }
                              label='Taxable'
                            />
                            <FormControlLabel
                              value='false'
                              control={
                                <Radio
                                  size='small'
                                  checkedIcon={<BpCheckedIcon />}
                                />
                              }
                              label='Non-Taxable'
                            />
                          </RadioGroup>
                        </div>
                        <div>
                          <Button
                            color='red'
                            startIcon={<DeleteIcon />}
                            label='Delete'
                            onClick={() => deleteSuplementary(suplement.id)}
                          />
                        </div>
                      </InputWrapper>
                      <div>
                        <Typography>
                          {suplement.data.compensationComponentId === '1'
                            ? 'Rate'
                            : 'Amount'}
                          <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <InputWrapper style={{ maxWidth: '511px' }}>
                          <TextField
                            fullWidth
                            type='number'
                            value={supplementaryList[i].data.rateOrAmount}
                            onChange={(e) => {
                              selectChange(
                                i,
                                e.target.value as unknown,
                                'amount'
                              );
                              console.log(supplementaryList[i]);
                            }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position='start'>
                                  Rp
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position='end'>
                                  IDR
                                </InputAdornment>
                              ),
                            }}
                          />
                          <Select
                            fullWidth
                            value={supplementaryList[i].data.period}
                            onChange={(e) =>
                              selectChange(i, e.target.value as string, 'per')
                            }
                          >
                            <MenuItem value='Per Week'>per Week</MenuItem>
                            <MenuItem value='Per Month'>per Month</MenuItem>
                            <MenuItem value='Per Year'>per Year</MenuItem>
                          </Select>
                        </InputWrapper>
                      </div>
                    </SectionInputWrapper>
                  ))}
                </Form>
              </>
            )}
          </div>
          <AddButton
            color='secondary'
            startIcon={<AddIcon />}
            label='Add Supplementary Compensation'
            onClick={() => addSuplementary()}
          />
        </div>
      </FormWrapper>
    </div>
  );
}
