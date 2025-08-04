import React from 'react';
import { Grid } from '@mui/material';

interface AutoGridRowProps {
  children: React.ReactNode;
  spacing?: number; // Espaciado entre columnas
  rowSpacing?: number; // Espaciado entre filas (margen inferior)
}

export const AutoGridRow: React.FC<AutoGridRowProps> = ({ children, spacing = 2, rowSpacing = 2 }) => {
  const count = React.Children.count(children);

  if (count > 4) {
    console.error('Error: AutoGridRow solo soporta hasta 4 columnas.');
    return null; // Evita renderizar el componente si hay más de 4 elementos
  }

  // Determinar el tamaño de cada columna según el número de hijos
  const columnSize = count === 1 ? 12 : count === 2 ? 6 : count === 3 ? 4 : 3;

  return (
    <Grid container spacing={spacing} sx={{ mb: rowSpacing }}>
      {React.Children.map(children, (child, index) => (
        <Grid key={index} item xs={12} sm={columnSize}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
};
