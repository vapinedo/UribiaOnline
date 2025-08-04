import * as Yup from 'yup';
import { Button, Grid } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import BoxShadow from '@shared/components/BoxShadow';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FieldErrors } from 'react-hook-form';
import { useAuthStore } from '@core/stores/useAuthStore';
import { CustomTextField } from '@shared/components/CustomTextField';
import { ResetPasswordFormValues } from '@feature/auth/models/ResetPasswordFormValues';
import { toastError, toastSuccess } from '@infrastructure/notifications/notificationAdapter';

const defaultValues: ResetPasswordFormValues = {
  email: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Correo inválido').required('Correo es requerido'),
});

export default function ResetPasswordPage() {
  const { resetPassword, loading } = useAuthStore();
  const navigate = useNavigate();

  const form = useForm<ResetPasswordFormValues>({
    defaultValues,
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const { register, formState, handleSubmit } = form;
  const { errors, isValid, isSubmitting } = formState;

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      await resetPassword(data.email);
      toastSuccess('Hemos enviado un correo para restablecer tu contraseña.');
      navigate('/login');
    } catch {
      toastError('No se pudo enviar el correo. Verifica tu dirección.');
    }
  };

  const onError = (errors: FieldErrors<ResetPasswordFormValues>) => {
    console.log({ errors });
  };

  return (
    <section
      style={{
        display: 'flex',
        height: '100vh',
        marginTop: '-50px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <BoxShadow>
        <h2 className="text-center">Recuperar contraseña</h2>

        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTextField
                name="email"
                label="Correo electrónico"
                type="email"
                autoFocus
                register={register}
                errors={errors}
              />
            </Grid>
          </Grid>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isValid || isSubmitting || loading}
          >
            Enviar correo de recuperación
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">Volver al inicio de sesión</Link>
            </Grid>
          </Grid>
        </form>
      </BoxShadow>
    </section>
  );
}
