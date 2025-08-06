import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import BoxShadow from '@shared/components/BoxShadow';
import { Barrio } from '@feature/barrio/models/Barrio';
import { FieldErrors, useForm } from 'react-hook-form';
import { useCountries } from '@shared/hooks/useCountries';
import { useMunicipios } from '@shared/hooks/useMunicipios';
import { AutoGridRow } from '@shared/components/AutoGridRow';
import { useDepartamentos } from '@shared/hooks/useDepartamentos';
import { CustomTextField } from '@shared/components/CustomTextField';
import { barrioRepository } from '@feature/barrio/repositories/barrioRepository';
import { useCrearBarrio, useActualizarBarrio } from '@feature/barrio/hooks/useBarrio';

type BarrioFormProps = {
  modo: 'crear' | 'editar';
  barrioId?: string;
};

const defaultValues: Barrio = {
  id: '',
  nombre: '',
};

export default function BarrioForm({ modo, barrioId }: BarrioFormProps) {
  const navigate = useNavigate();

  const crearBarrio = useCrearBarrio();
  const actualizarBarrio = useActualizarBarrio();

  const { data: barrioEditando, isLoading: cargandoBarrio } = useQuery({
    queryKey: ['barrio', barrioId],
    queryFn: () => barrioRepository.obtenerPorId(barrioId!),
    enabled: modo === 'editar' && !!barrioId,
  });

  const { data: countries } = useCountries();
  const { data: departamentos } = useDepartamentos();
  const { data: municipios } = useMunicipios('La Guajira');

  const form = useForm<Barrio>({
    defaultValues,
    mode: 'onTouched',
  });

  const { control, register, formState, handleSubmit, reset } = form;
  const { errors, isSubmitting, isValid } = formState;

  useEffect(() => {
    if (modo === 'editar' && barrioEditando) {
      reset(barrioEditando);
    }
  }, [modo, barrioEditando, reset]);

  const onSubmit = useCallback(
    async (barrio: Barrio) => {
      try {
        if (modo === 'crear') {
          await crearBarrio.mutateAsync({ entity: barrio });
        } else {
          await actualizarBarrio.mutateAsync({ entity: barrio });
        }
        navigate('/barrios');
      } catch (error) {
        console.error(error);
      }
    },
    [crearBarrio, actualizarBarrio, modo, navigate]
  );

  const onError = useCallback((errors: FieldErrors<any>) => {
    console.log({ errors });
  }, []);

  if (modo === 'editar' && cargandoBarrio) {
    return (
      <BoxShadow>
        <p>Cargando datos del barrio...</p>
      </BoxShadow>
    );
  }

  return (
    <BoxShadow>
      <header className="mb-4 d-flex justify-content-between align-items-center">
        <h2>{modo === 'crear' ? 'Nuevo barrio' : 'Editar barrio'}</h2>
      </header>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <AutoGridRow spacing={2} rowSpacing={2}>
          <CustomTextField required name="nombre" label="Nombre" errors={errors} register={register} />
        </AutoGridRow>

        <Button
          type="submit"
          color="success"
          variant="contained"
          sx={{ marginTop: 2 }}
          disabled={isSubmitting || !isValid || crearBarrio.isPending || actualizarBarrio.isPending}
        >
          {modo === 'crear'
            ? crearBarrio.isPending
              ? 'Guardando...'
              : 'Guardar'
            : actualizarBarrio.isPending
              ? 'Actualizando...'
              : 'Actualizar'}
        </Button>
      </form>
    </BoxShadow>
  );
}
