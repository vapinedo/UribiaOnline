import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import BoxShadow from '@shared/components/BoxShadow';
import { FieldErrors, useForm } from 'react-hook-form';
import { CustomTextField } from '@shared/components';
import { AutoGridRow } from '@shared/components/AutoGridRow';
import { CustomSelect } from '@shared/components/CustomSelect';
import { Fundacion } from '@feature/fundacion/models/Fundacion';
import { fundacionConfig } from '@feature/fundacion/FundacionConfig';
import { fundacionRepository } from '@feature/fundacion/repositories/fundacionRepository';
import { useCrearFundacion, useActualizarFundacion } from '@feature/fundacion/hooks/useFundacion';
import { useDepartamentos } from '@shared/hooks/useDepartamentos';
import { useMunicipios } from '@shared/hooks/useMunicipios';

type FundacionFormProps = {
  modo: 'crear' | 'editar';
  fundacionId?: string;
};

const defaultValues: Fundacion = {
  id: '',
  nit: '',
  logo: '',
  nombre: '',
  email: '',
  ciudad: '',
  telefono: '',
  direccion: '',
  descripcion: '',
  departamento: '',
  representanteLegal: '',
  fechaCreacion: new Date(),
  fechaActualizacion: new Date(),
};

export default function FundacionForm({ modo, fundacionId }: FundacionFormProps) {
  const navigate = useNavigate();
  const { data: departamentos } = useDepartamentos();
  const { data: municipios } = useMunicipios('La Guajira');

  const crearFundacion = useCrearFundacion();
  const actualizarFundacion = useActualizarFundacion();

  const { data: fundacionEditando, isLoading: cargandoFundacion } = useQuery({
    queryKey: ['fundacion', fundacionId],
    queryFn: () => fundacionRepository.obtenerPorId(fundacionId!),
    enabled: modo === 'editar' && !!fundacionId,
  });

  const form = useForm<Fundacion>({
    defaultValues,
    mode: 'onTouched',
  });

  const { control, register, formState, handleSubmit, reset } = form;
  const { errors, isSubmitting, isValid } = formState;

  useEffect(() => {
    if (modo === 'editar' && fundacionEditando) {
      reset(fundacionEditando);
    }
  }, [modo, fundacionEditando, reset]);

  const onSubmit = useCallback(
    async (fundacion: Fundacion) => {
      try {
        if (modo === 'crear') {
          await crearFundacion.mutateAsync({ entity: fundacion });
        } else {
          await actualizarFundacion.mutateAsync({ entity: fundacion });
        }
        navigate('/fundacions');
      } catch (error) {
        console.error(error);
      }
    },
    [crearFundacion, actualizarFundacion, modo, navigate]
  );

  const onError = useCallback((errors: FieldErrors<any>) => {
    console.log({ errors });
  }, []);

  if (modo === 'editar' && cargandoFundacion) {
    return (
      <BoxShadow>
        <p>Cargando datos del fundacion...</p>
      </BoxShadow>
    );
  }

  return (
    <BoxShadow>
      <header className="mb-4 d-flex justify-content-between align-items-center">
        <h2>{modo === 'crear' ? fundacionConfig.createTitle : fundacionConfig.editTitle}</h2>
      </header>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate autoComplete="off">
        <AutoGridRow spacing={2} rowSpacing={2}>
          <CustomTextField required name="nombre" label="Nombre de la fundación" errors={errors} register={register} />
          <CustomTextField
            required
            errors={errors}
            register={register}
            name="representanteLegal"
            label="Nombre del representante legal"
          />
          <CustomTextField required name="nit" label="NIT" errors={errors} register={register} />
          <CustomTextField required name="email" label="Correo electrónico" errors={errors} register={register} />
        </AutoGridRow>

        <AutoGridRow spacing={2} rowSpacing={2}>
          <CustomSelect
            required
            errors={errors}
            control={control}
            name="departamento"
            label="Departamento"
            options={departamentos ?? []}
          />
          <CustomSelect required name="ciudad" label="Ciudad" errors={errors} control={control} options={municipios ?? []} />
          <CustomTextField required name="direccion" label="Dirección" errors={errors} register={register} />
          <CustomTextField required name="telefono" label="Teléfono" errors={errors} register={register} />
        </AutoGridRow>

        <Button type="submit" color="success" variant="contained" sx={{ marginTop: 2 }} disabled={isSubmitting || !isValid}>
          {modo === 'crear' ? 'Guardar' : 'Actualizar'}
        </Button>
      </form>
    </BoxShadow>
  );
}
