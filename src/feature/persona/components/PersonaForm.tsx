import { Button } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { Persona } from '@core/models/Persona';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import BoxShadow from '@shared/components/BoxShadow';
import { FieldErrors, useForm } from 'react-hook-form';
import { useCountries } from '@shared/hooks/useCountries';
import { useMunicipios } from '@shared/hooks/useMunicipios';
import { AutoGridRow } from '@shared/components/AutoGridRow';
import { CustomSelect } from '@shared/components/CustomSelect';
import { useDepartamentos } from '@shared/hooks/useDepartamentos';
import { CustomTextField } from '@shared/components/CustomTextField';
import { CustomDatePicker } from '@shared/components/CustomDatePicker';
import PersonaService from '@infrastructure/repositories/personaRepository';
import { useCrearPersona, useActualizarPersona } from '@core/hooks/usePersona';
import { sexoOptions, tipoDocumentoOptions } from '@core/constants/dropdownOptions';

type PersonaFormProps = {
  modo: 'crear' | 'editar';
  personaId?: string;
};

const defaultValues: Persona = {
  id: '',
  sexo: '',
  email: '',
  nombres: '',
  telefono: '',
  tipoDocumento: '',
  primerApellido: '',
  paisNacimiento: '',
  segundoApellido: '',
  numeroDocumento: '',
  fechaNacimiento: '',
  municipioNacimiento: '',
  departamentoNacimiento: '',
};

export default function PersonaForm({ modo, personaId }: PersonaFormProps) {
  const navigate = useNavigate();

  const crearPersona = useCrearPersona();
  const actualizarPersona = useActualizarPersona();

  const { data: personaEditando, isLoading: cargandoPersona } = useQuery({
    queryKey: ['persona', personaId],
    queryFn: () => PersonaService.obtenerPorId(personaId!),
    enabled: modo === 'editar' && !!personaId,
  });

  const { data: countries } = useCountries();
  const { data: departamentos } = useDepartamentos();
  const { data: municipios } = useMunicipios('La Guajira');

  const form = useForm<Persona>({
    defaultValues,
    mode: 'onTouched',
  });

  const { control, register, formState, handleSubmit, reset } = form;
  const { errors, isSubmitting, isValid } = formState;

  useEffect(() => {
    if (modo === 'editar' && personaEditando) {
      reset(personaEditando);
    }
  }, [modo, personaEditando, reset]);

  const onSubmit = useCallback(
    async (persona: Persona) => {
      try {
        if (modo === 'crear') {
          await crearPersona.mutateAsync({ entity: persona });
        } else {
          await actualizarPersona.mutateAsync({ entity: persona });
        }
        navigate('/personas');
      } catch (error) {
        console.error(error);
      }
    },
    [crearPersona, actualizarPersona, modo, navigate]
  );

  const onError = useCallback((errors: FieldErrors<any>) => {
    console.log({ errors });
  }, []);

  if (modo === 'editar' && cargandoPersona) {
    return (
      <BoxShadow>
        <p>Cargando datos de la persona...</p>
      </BoxShadow>
    );
  }

  return (
    <BoxShadow>
      <header className="mb-4 d-flex justify-content-between align-items-center">
        <h2>{modo === 'crear' ? 'Nueva persona' : 'Editar persona'}</h2>
      </header>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <AutoGridRow spacing={2} rowSpacing={2}>
          <CustomTextField required name="nombres" label="Nombres" errors={errors} register={register} />
          <CustomTextField required name="primerApellido" label="Primer Apellido" errors={errors} register={register} />
          <CustomTextField required name="segundoApellido" label="Segundo Apellido" errors={errors} register={register} />
          <CustomSelect required name="sexo" label="Sexo" errors={errors} control={control} options={sexoOptions} />
        </AutoGridRow>

        <AutoGridRow spacing={2} rowSpacing={2}>
          <CustomSelect
            required
            errors={errors}
            control={control}
            name="tipoDocumento"
            label="Tipo de Documento"
            options={tipoDocumentoOptions}
          />
          <CustomTextField required errors={errors} register={register} label="Número de Documento" name="numeroDocumento" />
          <CustomTextField required name="email" label="Email" errors={errors} register={register} />
          <CustomTextField required name="telefono" label="Teléfono" errors={errors} register={register} />
        </AutoGridRow>

        <AutoGridRow spacing={2} rowSpacing={2}>
          <CustomDatePicker required errors={errors} control={control} name="fechaNacimiento" label="Fecha de Nacimiento" />
          <CustomSelect
            required
            errors={errors}
            control={control}
            name="paisNacimiento"
            options={countries ?? []}
            label="País de Nacimiento"
          />
          <CustomSelect
            required
            errors={errors}
            control={control}
            name="departamentoNacimiento"
            options={departamentos ?? []}
            label="Departamento de Nacimiento"
          />
          <CustomSelect
            required
            errors={errors}
            control={control}
            name="municipioNacimiento"
            options={municipios ?? []}
            label="Municipio de Nacimiento"
          />
        </AutoGridRow>

        <Button
          type="submit"
          color="success"
          variant="contained"
          sx={{ marginTop: 2 }}
          disabled={isSubmitting || !isValid || crearPersona.isPending || actualizarPersona.isPending}
        >
          {modo === 'crear'
            ? crearPersona.isPending
              ? 'Guardando...'
              : 'Guardar'
            : actualizarPersona.isPending
              ? 'Actualizando...'
              : 'Actualizar'}
        </Button>
      </form>
    </BoxShadow>
  );
}
