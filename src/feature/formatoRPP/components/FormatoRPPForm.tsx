import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FieldErrors, useForm } from 'react-hook-form';
import { AutoGridRow } from '@shared/components/AutoGridRow';
import { FormatoRPP } from '@feature/formatoRPP/models/FormatoRPP';
import { CustomTextField } from '@shared/components/CustomTextField';
import { formatoRPPConfig } from '@feature/formatoRPP/FormatoRPPConfig';
import { useListarFundacions } from '@feature/fundacion/hooks/useFundacion';
import { BoxShadow, CustomSelect, CustomDatePicker } from '@shared/components';
import { formatoRPPRepository } from '@feature/formatoRPP/repositories/formatoRPPRepository';
import { useCrearFormatoRPP, useActualizarFormatoRPP } from '@feature/formatoRPP/hooks/useFormatoRPP';

type FormatoRPPFormProps = {
  modo: 'crear' | 'editar';
  formatoRPPId?: string;
};

const defaultValues: FormatoRPP = {
  id: '',
  niup: '',
  fotos: [''],
  idFundacion: '',
  nombreOperador: '',
  nombreActividad: '',
  nombreBeneficiario: '',
  fechaCreacion: new Date(),
  profesionalResponsable: '',
};

export default function FormatoRPPForm({ modo, formatoRPPId }: FormatoRPPFormProps) {
  const navigate = useNavigate();
  const { data: fundaciones = [], isLoading: cargandoFundaciones } = useListarFundacions();

  const crearFormatoRPP = useCrearFormatoRPP();
  const actualizarFormatoRPP = useActualizarFormatoRPP();

  const { data: formatoRPPEditando, isLoading: cargandoFormatoRPP } = useQuery({
    queryKey: ['formatoRPP', formatoRPPId],
    queryFn: () => formatoRPPRepository.obtenerPorId(formatoRPPId!),
    enabled: modo === 'editar' && !!formatoRPPId,
  });

  const fundacionOptions = fundaciones.map((f) => ({
    label: f.nombre,
    value: f.id,
  }));

  const form = useForm<FormatoRPP>({
    defaultValues,
    mode: 'onTouched',
  });

  const { control, register, formState, handleSubmit, reset } = form;
  const { errors, isSubmitting, isValid } = formState;

  useEffect(() => {
    if (modo === 'editar' && formatoRPPEditando) {
      reset(formatoRPPEditando);
    }
  }, [modo, formatoRPPEditando, reset]);

  const onSubmit = useCallback(
    async (formatoRPP: FormatoRPP) => {
      try {
        if (modo === 'crear') {
          await crearFormatoRPP.mutateAsync({ entity: formatoRPP });
        } else {
          await actualizarFormatoRPP.mutateAsync({ entity: formatoRPP });
        }
        navigate('/formatoRPPs');
      } catch (error) {
        console.error(error);
      }
    },
    [crearFormatoRPP, actualizarFormatoRPP, modo, navigate]
  );

  const onError = useCallback((errors: FieldErrors<any>) => {
    console.log({ errors });
  }, []);

  if (modo === 'editar' && cargandoFormatoRPP) {
    return (
      <BoxShadow>
        <p>Cargando datos del formato RPP...</p>
      </BoxShadow>
    );
  }

  return (
    <BoxShadow>
      <header className="mb-4 d-flex justify-content-between align-items-center">
        <h2>{modo === 'crear' ? formatoRPPConfig.createTitle : formatoRPPConfig.editTitle}</h2>
      </header>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <AutoGridRow spacing={2} rowSpacing={2}>
          <CustomSelect
            required
            errors={errors}
            label="Fundación"
            control={control}
            name="idFundacion"
            options={fundacionOptions}
          />
          <CustomTextField required name="nombreOperador" label="Nombre del operador" errors={errors} register={register} />
          <CustomTextField
            required
            errors={errors}
            register={register}
            name="nombreActividad"
            label="Nombre de la actividad"
          />
          <CustomTextField
            required
            errors={errors}
            register={register}
            name="nombreBeneficiario"
            label="Nombre del beneficiario"
          />
        </AutoGridRow>

        <AutoGridRow spacing={2} rowSpacing={2}>
          <CustomTextField
            required
            errors={errors}
            register={register}
            name="profesionalResponsable"
            label="Nombre del profesional responsable"
          />
          <CustomTextField required name="niup" label="NIUP" errors={errors} register={register} />
          <CustomDatePicker required errors={errors} control={control} name="fechaCreacion" label="Fecha de Creación" />
        </AutoGridRow>

        <Button type="submit" color="success" variant="contained" sx={{ marginTop: 2 }} disabled={isSubmitting || !isValid}>
          {modo === 'crear' ? 'Guardar' : 'Actualizar'}
        </Button>
      </form>
    </BoxShadow>
  );
}
