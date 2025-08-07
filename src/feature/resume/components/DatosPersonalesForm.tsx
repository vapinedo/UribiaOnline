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
          errors={errors}
          register={register}
          label="Primer Apellido"
          name="datosPersonales.primerApellido"
        />
        <CustomTextField
          required
          errors={errors}
          register={register}
          label="Segundo Apellido"
          name="datosPersonales.segundoApellido"
        />
        <CustomTextField required name="datosPersonales.nombres" label="Nombres" errors={errors} register={register} />
        <CustomSelect
          required
          label="Sexo"
          errors={errors}
          control={control}
          options={sexoOptions}
          name="datosPersonales.sexo"
        />
      </AutoGridRow>

      <AutoGridRow spacing={2} rowSpacing={2}>
        <CustomSelect
          required
          errors={errors}
          control={control}
          label="Tipo de Documento"
          options={tipoDocumentoOptions}
          name="datosPersonales.tipoDocumento"
        />
        <CustomTextField
          required
          errors={errors}
          register={register}
          label="Número de Documento"
          name="datosPersonales.numeroDocumento"
        />
        <CustomTextField required name="datosPersonales.email" label="Email" errors={errors} register={register} />
        <CustomTextField required name="datosPersonales.telefono" label="Teléfono" errors={errors} register={register} />
      </AutoGridRow>

      <AutoGridRow spacing={2} rowSpacing={2}>
        <CustomDatePicker
          required
          errors={errors}
          control={control}
          label="Fecha de Nacimiento"
          name="datosPersonales.fechaNacimiento"
        />
        <CustomSelect
          required
          errors={errors}
          control={control}
          options={countries ?? []}
          label="País de Nacimiento"
          name="datosPersonales.paisNacimiento"
        />
        <CustomSelect
          required
          errors={errors}
          control={control}
          options={departamentos ?? []}
          label="Departamento de Nacimiento"
          name="datosPersonales.departamentoNacimiento"
        />
        <CustomSelect
          required
          errors={errors}
          control={control}
          options={municipios ?? []}
          label="Municipio de Nacimiento"
          name="datosPersonales.municipioNacimiento"
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
          errors={errors}
          control={control}
          options={countries ?? []}
          label="País de Correspondencia"
          name="datosPersonales.paisCorrespondencia"
        />
        <CustomSelect
          required
          errors={errors}
          control={control}
          options={departamentos ?? []}
          label="Departamento de Correspondencia"
          name="datosPersonales.departamentoCorrespondencia"
        />
        <CustomSelect
          required
          errors={errors}
          control={control}
          options={municipios ?? []}
          label="Municipio de Correspondencia"
          name="datosPersonales.municipioCorrespondencia"
        />
      </AutoGridRow>

      {selectedSexo === 'M' && (
        <AutoGridRow spacing={2} rowSpacing={2}>
          <CustomSelect
            required
            errors={errors}
            control={control}
            label="Tipo Libreta Militar"
            options={tipoLibretaMilitarOptions}
            name="datosPersonales.tipoLibretaMilitar"
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
