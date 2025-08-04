import React from 'react';
import { Button, Grid } from '@mui/material';
import { Resume } from '@core/models/Resume';
import { fillPdf } from '@feature/resume/utils/pdfGenerator';
import { getLocalStorageItem } from 'shared/utils/storage.helper';

interface FormButtonsProps {
  handleSubmit: (callback: (data: any) => void) => (e?: React.BaseSyntheticEvent) => void;
  onSubmit: (data: any) => void;
}

const STORAGE_KEY = 'resumeForm';

export const FormButtons: React.FC<FormButtonsProps> = ({ handleSubmit, onSubmit }) => {
  return (
    <Grid container spacing={2} justifyContent="flex-end" sx={{ marginBottom: 3 }}>
      <Grid item>
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
          Guardar
        </Button>
      </Grid>

      <Grid item>
        <Button
          color="success"
          variant="contained"
          onClick={async () => {
            const storedData = getLocalStorageItem<Resume>(STORAGE_KEY);
            if (storedData) {
              const pdfUrl = await fillPdf(storedData);
              window.open(pdfUrl, '_blank');
            } else {
              console.log('No hay datos para generar el PDF');
            }
          }}
        >
          Generar PDF
        </Button>
      </Grid>
    </Grid>
  );
};
