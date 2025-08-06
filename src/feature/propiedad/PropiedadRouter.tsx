import { Route, Routes } from 'react-router-dom';
import PropiedadForm from '@feature/propiedad/components/PropiedadForm';
import PropiedadAdminPage from '@feature/propiedad/pages/PropiedadAdminPage';
import PropiedadDetallePage from '@feature/propiedad/pages/PropiedadDetallePage';
import PropiedadFormWrapper from '@feature/propiedad/components/PropiedadFormWrapper';

export default function PropiedadRouter() {
  return (
    <Routes>
      <Route path="/" element={<PropiedadAdminPage />} />
      <Route path="/nuevo" element={<PropiedadForm modo="crear" />} />
      <Route path="/editar/:id" element={<PropiedadFormWrapper />} />
      <Route path="/detalle/:id" element={<PropiedadDetallePage />} />
    </Routes>
  );
}