import * as Yup from 'yup';
import { Button, Grid } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import BoxShadow from '@shared/components/BoxShadow';
import type { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FieldErrors } from 'react-hook-form';
import { useAuthStore } from '@core/stores/useAuthStore';
import { CustomTextField } from '@shared/components/CustomTextField';
import { RegisterFormValues } from '@feature/auth/models/RegisterFormValues';
import { toastError, toastSuccess } from '@infrastructure/notifications/notificationAdapter';

const defaultValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
  acceptTerms: false,
  confirmPassword: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nombre es requerido'),
  email: Yup.string().email('Correo inválido').required('Correo es requerido'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Contraseña es requerida'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Debes confirmar la contraseña'),
  acceptTerms: Yup.boolean().oneOf([true], 'Debes aceptar los términos').required('Debes aceptar los términos'),
});

export default function RegisterPage() {
  const { register: registerUser, loading } = useAuthStore();
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    defaultValues,
    mode: 'onTouched',
    resolver: yupResolver(validationSchema),
  });

  const { register, formState, handleSubmit } = form;
  const { errors, isValid, isSubmitting } = formState;

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      await registerUser(data.email, data.password, data.name);
      toastSuccess('Usuario registrado exitosamente. Revisa tu correo para verificar tu cuenta.');
      navigate('/login');
    } catch {
      toastError('Error al registrar el usuario');
    }
  };

  const onError = (errors: FieldErrors<RegisterFormValues>) => {
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
        <h2 className="text-center">Registro</h2>

        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTextField name="name" label="Nombre completo" register={register} errors={errors} />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField name="email" label="Correo" type="email" register={register} errors={errors} />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField name="password" label="Contraseña" type="password" register={register} errors={errors} />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                errors={errors}
                type="password"
                register={register}
                name="confirmPassword"
                label="Confirmar contraseña"
              />
            </Grid>

            <Grid item xs={12}>
              <label style={{ display: 'block', marginTop: 8 }}>
                <input type="checkbox" {...register('acceptTerms')} />
                {' Acepto los términos y condiciones'}
              </label>
              {errors.acceptTerms && <p style={{ color: 'red', fontSize: 12 }}>{errors.acceptTerms.message}</p>}
            </Grid>
          </Grid>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!isValid || isSubmitting || loading}
          >
            Crear cuenta
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
            </Grid>
          </Grid>
        </form>
      </BoxShadow>
    </section>
  );
}
