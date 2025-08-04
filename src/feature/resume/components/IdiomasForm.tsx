import React from 'react';
import { Button } from '@mui/material';
import { Resume } from '@core/models/Resume';
import { AutoGridRow } from '@components/AutoGridRow';
import { CustomSelect } from '@components/CustomSelect';
import TitledSection from '@shared/components/TitledSection';
import { CustomTextField } from '@components/CustomTextField';
import { idiomaOptions } from '@core/constants/dropdownOptions';
import { Control, FieldErrors, UseFormWatch, UseFormSetValue, UseFormRegister, useFieldArray } from 'react-hook-form';

const MAX_IDIOMAS = 2;

interface Props {
  control: Control<Resume>;
  watch: UseFormWatch<Resume>;
  errors: FieldErrors<Resume>;
  register: UseFormRegister<Resume>;
  setValue: UseFormSetValue<Resume>;
}

export const IdiomasForm: React.FC<Props> = (props) => {
  const { control, errors, register, setValue, watch } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'idiomas',
    shouldUnregister: false,
  });

  const handleAppend = () => {
    if (fields.length < MAX_IDIOMAS) {
      append({
        idioma: '',
        loHabla: '',
        loLee: '',
        loEscribe: '',
      });
    }
  };

  return (
    <TitledSection title="Idiomas">
      {fields.map((field, index) => (
        <div key={field.id}>
          <AutoGridRow spacing={2} rowSpacing={2}>
            <CustomTextField required errors={errors} register={register} label="Idioma" name={`idiomas.${index}.idioma`} />
            <CustomSelect
              required
              watch={watch}
              errors={errors}
              register={register}
              setValue={setValue}
              label="Lo Habla"
              options={idiomaOptions}
              name={`idiomas.${index}.loHabla`}
            />
            <CustomSelect
              required
              watch={watch}
              errors={errors}
              register={register}
              setValue={setValue}
              label="Lo Lee"
              options={idiomaOptions}
              name={`idiomas.${index}.loLee`}
            />
            <CustomSelect
              required
              watch={watch}
              errors={errors}
              register={register}
              setValue={setValue}
              label="Lo Escribe"
              options={idiomaOptions}
              name={`idiomas.${index}.loEscribe`}
            />
          </AutoGridRow>

          <Button
            size="small"
            color="error"
            variant="contained"
            disabled={fields.length === 1}
            style={{ marginBottom: '28px' }}
            onClick={() => {
              if (fields.length > 1) remove(index);
            }}
          >
            Eliminar
          </Button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAppend}
        disabled={fields.length >= MAX_IDIOMAS}
        style={{
          marginTop: '10px',
          background: fields.length >= MAX_IDIOMAS ? 'gray' : 'green',
          color: 'white',
          cursor: fields.length >= MAX_IDIOMAS ? 'not-allowed' : 'pointer',
        }}
      >
        Agregar Idioma ({fields.length}/{MAX_IDIOMAS})
      </button>
    </TitledSection>
  );
};
