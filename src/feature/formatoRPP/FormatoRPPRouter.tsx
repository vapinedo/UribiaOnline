import { Route, Routes } from 'react-router-dom';
import FormatoRPPForm from '@feature/formatoRPP/components/FormatoRPPForm';
import FormatoRPPAdminPage from '@feature/formatoRPP/pages/FormatoRPPAdminPage';
import FormatoRPPDetallePage from '@feature/formatoRPP/pages/FormatoRPPDetallePage';
import FormatoRPPFormWrapper from '@feature/formatoRPP/components/FormatoRPPFormWrapper';

export default function FormatoRPPRouter() {
  return (
    <Routes>
      <Route path="/" element={<FormatoRPPAdminPage />} />
      <Route path="/nuevo" element={<FormatoRPPForm modo="crear" />} />
      <Route path="/editar/:id" element={<FormatoRPPFormWrapper />} />
      <Route path="/detalle/:id" element={<FormatoRPPDetallePage />} />
    </Routes>
  );
}