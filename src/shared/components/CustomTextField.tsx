import { get } from 'lodash';
import { TextField, TextFieldProps } from '@mui/material';
import { FieldErrors, FieldValues, Path, UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';

type CustomTextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  required?: boolean;
  errors?: FieldErrors<T>;
  register?: UseFormRegister<T> | UseFormRegisterReturn;
} & Omit<TextFieldProps, 'name' | 'error'>;

export function CustomTextField<T extends FieldValues>({
  name,
  label,
  errors,
  register,
  required,
  ...rest
}: CustomTextFieldProps<T>) {
  const validation = required ? { required: `${label} es obligatorio` } : undefined;
  const fieldRegister = typeof register === 'function' ? register(name, validation) : (register ?? {});
  const errorMessage = get(errors, `${name}.message`) as string | undefined;

  return (
    <TextField
      {...rest}
      fullWidth
      size="small"
      label={label}
      helperText={errorMessage}
      error={!!errorMessage}
      {...fieldRegister}
    />
  );
}
