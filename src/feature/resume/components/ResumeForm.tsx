import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect } from 'react';
import { Resume } from '@feature/resume/models/Resume';
import { useSnackbar } from '@shared/hooks/useSnackbar';
import { FormButtons, BoxShadow } from '@shared/components';
import { fillPdf } from '@feature/resume/utils/pdfGenerator';
import { IdiomasForm } from '@feature/resume/components/IdiomasForm';
import { ResumeDataInitValues } from '@feature/resume/utils/resumeData.helper';
import { DatosPersonalesForm } from '@feature/resume/components/DatosPersonalesForm';
import { EducacionBasicaForm } from '@feature/resume/components/EducacionBasicaForm';
import { EducacionSuperiorForm } from '@feature/resume/components/EducacionSuperiorForm';
import { ExperienciaLaboralForm } from '@feature/resume/components/ExperienciaLaboralForm';
import { useActualizarResume, useCrearResume, useResumePorId } from '@feature/resume/hooks/useResume';
import { setLocalStorageItem, getLocalStorageItem, removeLocalStorageItem } from '@shared/utils/localStorage';

const STORAGE_KEY = 'resumeForm';

const FORM_CONFIG = {
  defaultValues: ResumeDataInitValues(),
};

type ResumeFormProps = {
  modo?: 'crear' | 'editar';
  resumeId?: string;
};

const ResumeForm: React.FC<ResumeFormProps> = ({ modo = 'crear', resumeId }) => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const crearResume = useCrearResume();
  const actualizarResume = useActualizarResume();

  const { data: resumeEditando, isLoading: cargandoResume } = useResumePorId(resumeId || '');

  const {
    reset,
    watch,
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Resume>(FORM_CONFIG);

  useEffect(() => {
    if (modo === 'editar' && resumeEditando) {
      reset(resumeEditando);
    }
  }, [modo, resumeEditando, reset]);

  useEffect(() => {
    if (modo === 'crear') {
      const savedData = getLocalStorageItem<Resume>(STORAGE_KEY);
      if (savedData) {
        reset(savedData);
      }
    }
  }, [reset, modo]);

  // Guardar en localStorage mientras se edita (solo en modo crear)
  useEffect(() => {
    const subscription = watch((value) => {
      if (modo === 'crear') {
        setLocalStorageItem(STORAGE_KEY, value);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, modo]);

  const onSubmit = useCallback(
    async (formData: Resume) => {
      try {
        if (modo === 'crear') {
          await crearResume.mutateAsync({ entity: formData });
          removeLocalStorageItem(STORAGE_KEY);
        } else {
          if (!resumeId) {
            throw new Error('No se puede actualizar un resume sin ID');
          }
          await actualizarResume.mutateAsync({
            entity: {
              ...formData,
              id: resumeId, // Ahora TypeScript sabe que resumeId no es undefined
            },
          });
        }
        navigate('/resume');
      } catch (error) {
        console.error('Error guardando los datos:', error);
      }
    },
    [crearResume, actualizarResume, modo, navigate, openSnackbar, resumeId]
  );

  const onGeneratePdf = async () => {
    const formData = getValues();
    try {
      const pdfUrl = await fillPdf(formData);
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Error generando el PDF:', error);
    }
  };

  const onError = useCallback(
    (errors: any) => {
      console.log('Errores detectados:', errors);
    },
    [openSnackbar]
  );

  if (modo === 'editar' && cargandoResume) {
    return (
      <BoxShadow>
        <p>Cargando datos del resume...</p>
      </BoxShadow>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormButtons handleSubmit={handleSubmit} onSubmit={onSubmit} onGeneratePdf={onGeneratePdf} />

      <DatosPersonalesForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />
      <EducacionBasicaForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />
      <EducacionSuperiorForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />
      <IdiomasForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />
      <ExperienciaLaboralForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />
    </form>
  );
};

export default ResumeForm;
