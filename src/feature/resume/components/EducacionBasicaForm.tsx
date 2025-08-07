import React from 'react';
import { Resume } from '@core/models/Resume';
import { AutoGridRow } from '@shared/components/AutoGridRow';
import TitledSection from '@shared/components/TitledSection';
import { CustomSelect } from '@shared/components/CustomSelect';
import { CustomTextField } from '@shared/components/CustomTextField';
import { CustomDatePicker } from '@shared/components/CustomDatePicker';
import { educacionBasicaOptions } from '@core/constants/dropdownOptions';
import { Control, FieldErrors, UseFormWatch, UseFormSetValue, UseFormRegister } from 'react-hook-form';

interface Props {
  control: Control<Resume>;
  watch: UseFormWatch<Resume>;
  errors: FieldErrors<Resume>;
  register: UseFormRegister<Resume>;
  setValue: UseFormSetValue<Resume>;
}

export const EducacionBasicaForm: React.FC<Props> = (props) => {
  const { control, errors, register, watch } = props;

  return (
    <TitledSection title="Educacion Básica">
      <AutoGridRow spacing={2} rowSpacing={2}>
        <CustomSelect
          required
          errors={errors}
          control={control}
          label="Educación Básica"
          options={educacionBasicaOptions}
          name="educacionBasica.educacionBasica"
        />
        <CustomTextField
          required
          errors={errors}
          register={register}
          label="Título Obtenido"
          name="educacionBasica.tituloObtenido"
        />
        <CustomDatePicker
          required
          errors={errors}
          control={control}
          label="Fecha de Graduación"
          name="educacionBasica.fechaGrado"
        />
      </AutoGridRow>
    </TitledSection>
  );
};
