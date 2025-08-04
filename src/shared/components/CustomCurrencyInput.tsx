import React from 'react';
import MaskedInput from 'react-text-mask';
import { Controller, Control } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

interface CustomCurrencyInputProps extends Omit<TextFieldProps, 'name' | 'onChange' | 'value'> {
  name: string;
  label: string;
  helperText?: string;
  control: Control<any>;
  parseToNumber?: boolean;
}

const currencyMask = createNumberMask({
  prefix: '',
  suffix: '',
  decimalLimit: 2,
  decimalSymbol: ',',
  allowDecimal: true,
  integerLimit: null,
  allowNegative: false,
  allowLeadingZeroes: false,
  thousandsSeparatorSymbol: '.',
  includeThousandsSeparator: true,
});

const parseCurrencyToNumber = (value: string): number => {
  if (!value) return 0;
  const clean = value.replace(/\./g, '').replace(',', '.');
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? 0 : parsed;
};

const CustomCurrencyInput: React.FC<CustomCurrencyInputProps> = ({
  name,
  control,
  label,
  helperText,
  parseToNumber = false,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref, ...fieldRest } }) => (
        <MaskedInput
          mask={currencyMask}
          value={value}
          onChange={(e) => {
            const rawValue = e.target.value;
            if (parseToNumber) {
              const numericValue = parseCurrencyToNumber(rawValue);
              onChange(numericValue);
            } else {
              onChange(rawValue);
            }
          }}
          render={(inputRef, props) => (
            <TextField
              {...props}
              {...rest}
              fullWidth
              label={label}
              inputRef={inputRef}
              error={!!helperText}
              helperText={helperText}
              {...fieldRest}
            />
          )}
        />
      )}
    />
  );
};

export default CustomCurrencyInput;
