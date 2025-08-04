import { Route, Routes } from 'react-router-dom';
import PersonaPage from '@feature/persona/pages/PersonaAdminPage';
import PersonaForm from '@feature/persona/components/PersonaForm';
import PersonaDetallePage from '@feature/persona/pages/PersonaDetallePage';
import PersonaFormWrapper from '@feature/persona/components/PersonaFormWrapper';

export default function PersonaRouter() {
  return (
    <Routes>
      <Route path="/" element={<PersonaPage />} />
      <Route path="/nuevo" element={<PersonaForm modo="crear" />} />
      <Route path="/editar/:id" element={<PersonaFormWrapper />} />
      <Route path="/detalle/:id" element={<PersonaDetallePage />} />
    </Routes>
  );
}
