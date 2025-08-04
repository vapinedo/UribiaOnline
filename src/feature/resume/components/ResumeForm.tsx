import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Resume } from '@core/models/Resume';
import { useSnackbar } from '@shared/hooks/useSnackbar';
import { FormButtons } from '@shared/components/FormButtons';
import { IdiomasForm } from '@feature/resume/components/IdiomasForm';
import { AppNotification } from '@shared/components/AppNotification';
import { ResumeDataInitValues } from '@feature/resume/utils/resumeData.helper';
import { DatosPersonalesForm } from '@feature/resume/components/DatosPersonalesForm';
import { EducacionBasicaForm } from '@feature/resume/components/EducacionBasicaForm';
import { EducacionSuperiorForm } from '@feature/resume/components/EducacionSuperiorForm';
import { ExperienciaLaboralForm } from '@feature/resume/components/ExperienciaLaboralForm';

const STORAGE_KEY = 'resumeForm';

const FORM_CONFIG = {
  defaultValues: ResumeDataInitValues(),
};

export const ResumeForm: React.FC = () => {
  const { openSnackbar, showSnackbar, handleSnackbarClose } = useSnackbar();
  const {
    reset,
    watch,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Resume>(FORM_CONFIG);

  useEffect(() => {
    const fetchData = async () => {
      const id = 'TU_ID_DOCUMENTO_AQUI'; // Cambia esto por el ID real (puedes pasarlo como prop, ruta, etc)
      const data = await getResumeById(id);
      if (data) {
        reset(data, { keepErrors: true });
      }
    };

    fetchData();
  }, [reset]);

  const onSubmit = async (formData: Resume) => {
    try {
      console.log('Guardando datos personales:', formData);
      setLocalStorageItem(STORAGE_KEY, formData);

      const id = await createResume(formData);
      console.log('Documento guardado con ID:', id);

      showSnackbar();
    } catch (error) {
      console.error('Error guardando los datos:', error);
    }
  };

  const onError = (errors: any) => {
    console.log('Errores detectados:', errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormButtons handleSubmit={handleSubmit} onSubmit={onSubmit} />

      <DatosPersonalesForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />
      <EducacionBasicaForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />
      <EducacionSuperiorForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />
      <IdiomasForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />
      <ExperienciaLaboralForm watch={watch} errors={errors} control={control} register={register} setValue={setValue} />

      <AppNotification
        severity="success"
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message="Datos guardados correctamente"
      />
    </form>
  );
};
