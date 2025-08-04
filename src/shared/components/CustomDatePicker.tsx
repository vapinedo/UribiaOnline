import { get } from 'lodash';
import dayjs from '@shared/utils/dayjsConfig';
import { DatePicker } from '@mui/x-date-pickers';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  required?: boolean;
  control: Control<T>;
  errors: FieldErrors<T>;
}

export function CustomDatePicker<T extends FieldValues>({ name, label, required, control, errors }: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? 'Este campo es obligatorio' : false }}
      render={({ field }) => (
        <DatePicker
          {...field}
          format="L"
          label={label}
          value={field.value ? dayjs(field.value) : null}
          onChange={(date) => field.onChange(date ? dayjs(date).format('YYYY-MM-DD') : null)}
          slotProps={{
            textField: {
              size: 'small',
              fullWidth: true,
              error: Boolean(get(errors, name)),
              helperText: String(get(errors, `${name}.message`) ?? ''),
            },
          }}
        />
      )}
    />
  );
}
