import * as Yup from 'yup';
import { Button, Grid } from '@mui/material';
import { BoxShadow } from '@shared/components';
import { useNavigate, Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldErrors, useForm } from 'react-hook-form';
import { useAuthStore } from '@feature/auth/stores/useAuthStore';
import { CustomTextField } from '@shared/components/CustomTextField';
import { LoginFormValues } from '@feature/auth/models/LoginFormValues';
import { toastError } from '@infra/ui/notifications/toast/toastAdapter';

const defaultValues: LoginFormValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Correo inválido').required('Correo es requerido'),
  password: Yup.string().required('Contraseña es requerida'),
});

export default function LoginPage() {
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    defaultValues,
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const { register, formState, handleSubmit } = form;
  const { errors, isValid, isSubmitting } = formState;

  const onSubmit = async (loginData: LoginFormValues) => {
    try {
      await login(loginData.email, loginData.password);
      navigate('/');
    } catch {
      toastError('Credenciales inválidas o error al iniciar sesión');
    }
  };

  const onError = (errors: FieldErrors<LoginFormValues>) => {
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
        <h2 className="text-center">Resume Builder</h2>

        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <CustomTextField name="email" label="Correo" type="text" autoFocus register={register} errors={errors} />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <CustomTextField name="password" label="Contraseña" type="password" register={register} errors={errors} />
            </Grid>
          </Grid>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isValid || isSubmitting || loading}
          >
            Acceder
          </Button>

          <Grid container justifyContent="space-between">
            <Grid>
              <Link to="/register">¿No tienes una cuenta? Regístrate</Link>
            </Grid>
            <Grid>
              <Link to="/reset-password">¿Olvidaste tu contraseña?</Link>
            </Grid>
          </Grid>
        </form>
      </BoxShadow>
    </section>
  );
}
