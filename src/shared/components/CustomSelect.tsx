import { get } from 'lodash';
import { TextField, MenuItem } from '@mui/material';
import { Controller, Control, FieldErrors, FieldValues, Path } from 'react-hook-form';

export interface SelectOption {
  value: string;
  label: string;
}

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  required?: boolean;
  control: Control<T>;
  errors: FieldErrors<T>;
  options: SelectOption[];
}

export function CustomSelect<T extends FieldValues>({ name, label, control, errors, options, required }: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? `${label} es obligatorio` : false }}
      render={({ field }) => (
        <TextField
          {...field}
          select
          fullWidth
          size="small"
          label={label}
          variant="outlined"
          error={Boolean(get(errors, name))}
          helperText={String(get(errors, `${name}.message`) ?? '')}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
