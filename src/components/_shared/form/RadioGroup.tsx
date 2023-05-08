import React from 'react';
import {
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroupProps,
  Radio,
  FormHelperText,
  RadioProps
} from '@mui/material';
import { styled } from '@mui/material/styles';

type RadioOption = {
  label: string;
  value: string;
};

const AsteriskComponent = styled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

const CustomIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  backgroundColor: theme.palette.background.paper,
  outline: `1px solid ${theme.palette.grey[300]}`,
  backgroundImage: theme.palette.background.paper,
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  // 'input:hover ~ &': {
  //   backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  // },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.grey[300]
  },
}));

const CustomCheckedIcon = styled(CustomIcon)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
}));

function CustomRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color='default'
      checkedIcon={<CustomCheckedIcon />}
      icon={<CustomIcon />}
      {...props}
    />
  );
}

const RadioGroup = ({
  name,
  label,
  value,
  options,
  onChange,
  error,
  withAsterisk,
  ...props
}: RadioGroupProps & {
  options: RadioOption[],
  label: string,
  error?: string,
  withAsterisk?: boolean;
}) => {

  return (
    <FormControl component='fieldset' fullWidth>
      <FormLabel component='legend'>
        {label} {withAsterisk && <AsteriskComponent>*</AsteriskComponent>}
      </FormLabel>
      <MuiRadioGroup
        aria-label={label}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      >
        {
          options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<CustomRadio />}
              label={option.label}
            />
          ))
        }

      </MuiRadioGroup>
      {error && <FormHelperText sx={{ color: '#F43F5E' }}>{error}</FormHelperText>}
    </FormControl>
  );
};

export default RadioGroup;