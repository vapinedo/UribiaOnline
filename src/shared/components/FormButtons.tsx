import React from 'react';
import { Button, Grid } from '@mui/material';

interface FormButtonsProps {
  handleSubmit: (callback: (data: any) => void) => (e?: React.BaseSyntheticEvent) => void;
  onSubmit: (data: any) => void;
  onGeneratePdf: () => void;
}

export const FormButtons: React.FC<FormButtonsProps> = ({ handleSubmit, onSubmit, onGeneratePdf }) => {
  return (
    <Grid container spacing={2} justifyContent="flex-end" sx={{ marginBottom: 3 }}>
      <Grid>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
          Guardar
        </Button>
      </Grid>

      <Grid>
        <Button color="success" variant="contained" onClick={onGeneratePdf}>
          Imprimir
        </Button>
      </Grid>
    </Grid>
  );
};
