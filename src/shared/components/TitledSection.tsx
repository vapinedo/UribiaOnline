import { Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface TitledSectionProps {
  title: string;
  children: ReactNode;
  titleVariant?: 'h4' | 'h5' | 'h6'; // puedes expandir si quieres
}

export default function TitledSection({ title, children, titleVariant = 'h5' }: TitledSectionProps) {
  return (
    <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Typography variant={titleVariant} gutterBottom sx={{ mb: 0 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}
