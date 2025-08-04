import React, { useEffect } from 'react';
import { Resume } from '@core/models/Resume';
import { useCountries } from '@shared/hooks/useCountries';
import { useMunicipios } from '@shared/hooks/useMunicipios';
import TitledSection from '@shared/components/TitledSection';
import { AutoGridRow } from '@shared/components/AutoGridRow';
import { CustomSelect } from '@shared/components/CustomSelect';
import { useDepartamentos } from '@shared/hooks/useDepartamentos';
import { CustomTextField } from '@shared/components/CustomTextField';
import { CustomDatePicker } from '@shared/components/CustomDatePicker';
import { Control, UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { sexoOptions, tipoDocumentoOptions, tipoLibretaMilitarOptions } from '@core/constants/dropdownOptions';

interface Props {
  control: Control<Resume>;
  watch: UseFormWatch<Resume>;
  errors: FieldErrors<Resume>;
  register: UseFormRegister<Resume>;
  setValue: UseFormSetValue<Resume>;
}

export const DatosPersonalesForm: React.FC<Props> = (props) => {
  const { data: countries } = useCountries();
  const { data: departamentos } = useDepartamentos();
  const { data: municipios } = useMunicipios('La Guajira');

  const { control, errors, register, setValue, watch } = props;

  const selectedSexo = watch('datosPersonales.sexo');

  useEffect(() => {
    if (selectedSexo !== 'M') {
      setValue('datosPersonales.tipoLibretaMilitar', '');
      setValue('datosPersonales.numeroLibretaMilitar', '');
      setValue('datosPersonales.distritoMilitar', '');
    }
  }, [selectedSexo, setValue]);

  return (
    <TitledSection title="Datos Personales">
      <AutoGridRow spacing={2} rowSpacing={2}>
        <CustomTextField
          required
          name="datosPersonales.primerApellido"
          label="Primer Apellido"
          errors={errors}
          register={register}
        />
        <CustomTextField
          required
          name="datosPersonales.segundoApellido"
          label="Segundo Apellido"
          errors={errors}
          register={register}
        />
        <CustomTextField required name="datosPersonales.nombres" label="Nombres" errors={errors} register={register} />
        <CustomSelect
          required
          name="datosPersonales.sexo"
          label="Sexo"
          errors={errors}
          register={register}
          watch={watch}
          setValue={setValue}
          options={sexoOptions}
        />
      </AutoGridRow>

      <AutoGridRow spacing={2} rowSpacing={2}>
        <CustomSelect
          required
          name="datosPersonales.tipoDocumento"
          label="Tipo de Documento"
          errors={errors}
          register={register}
          watch={watch}
          setValue={setValue}
          options={tipoDocumentoOptions}
        />
        <CustomTextField
          required
          name="datosPersonales.numeroDocumento"
          label="Número de Documento"
          errors={errors}
          register={register}
        />
        <CustomTextField required name="datosPersonales.email" label="Email" errors={errors} register={register} />
        <CustomTextField required name="datosPersonales.telefono" label="Teléfono" errors={errors} register={register} />
      </AutoGridRow>

      <AutoGridRow spacing={2} rowSpacing={2}>
        <CustomDatePicker
          required
          name="datosPersonales.fechaNacimiento"
          label="Fecha de Nacimiento"
          errors={errors}
          register={register}
          control={control}
        />
        <CustomSelect
          required
          name="datosPersonales.paisNacimiento"
          label="País de Nacimiento"
          errors={errors}
          register={register}
          watch={watch}
          setValue={setValue}
          options={countries ?? []}
        />
        <CustomSelect
          required
          name="datosPersonales.departamentoNacimiento"
          label="Departamento de Nacimiento"
          errors={errors}
          register={register}
          watch={watch}
          setValue={setValue}
          options={departamentos ?? []}
        />
        <CustomSelect
          required
          name="datosPersonales.municipioNacimiento"
          label="Municipio de Nacimiento"
          errors={errors}
          register={register}
          watch={watch}
          setValue={setValue}
          options={municipios ?? []}
        />
      </AutoGridRow>

      <AutoGridRow spacing={2} rowSpacing={2}>
        <CustomTextField
          required
          name="datosPersonales.direccionCorrespondencia"
          label="Dirección de Correspondencia"
          errors={errors}
          register={register}
        />
        <CustomSelect
          required
          name="datosPersonales.paisCorrespondencia"
          label="País de Correspondencia"
          errors={errors}
          register={register}
          watch={watch}
          setValue={setValue}
          options={countries ?? []}
        />
        <CustomSelect
          required
          name="datosPersonales.departamentoCorrespondencia"
          label="Departamento de Correspondencia"
          errors={errors}
          register={register}
          watch={watch}
          setValue={setValue}
          options={departamentos ?? []}
        />
        <CustomSelect
          required
          name="datosPersonales.municipioCorrespondencia"
          label="Municipio de Correspondencia"
          errors={errors}
          register={register}
          watch={watch}
          setValue={setValue}
          options={municipios ?? []}
        />
      </AutoGridRow>

      {selectedSexo === 'M' && (
        <AutoGridRow spacing={2} rowSpacing={2}>
          <CustomSelect
            required
            name="datosPersonales.tipoLibretaMilitar"
            label="Tipo Libreta Militar"
            errors={errors}
            register={register}
            watch={watch}
            setValue={setValue}
            options={tipoLibretaMilitarOptions}
          />
          <CustomTextField
            required
            name="datosPersonales.numeroLibretaMilitar"
            label="Numero Libreta Militar"
            errors={errors}
            register={register}
          />
          <CustomTextField
            required
            name="datosPersonales.distritoMilitar"
            label="Distrito Militar"
            errors={errors}
            register={register}
          />
        </AutoGridRow>
      )}
    </TitledSection>
  );
};
