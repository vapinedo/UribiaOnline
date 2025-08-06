import { Route, Routes } from 'react-router-dom';
import BarrioForm from '@feature/barrio/components/BarrioForm';
import BarrioAdminPage from '@feature/barrio/pages/BarrioAdminPage';
import BarrioDetallePage from '@feature/barrio/pages/BarrioDetallePage';
import BarrioFormWrapper from '@feature/barrio/components/BarrioFormWrapper';

export default function BarrioRouter() {
  return (
    <Routes>
      <Route path="/" element={<BarrioAdminPage />} />
      <Route path="/nuevo" element={<BarrioForm modo="crear" />} />
      <Route path="/editar/:id" element={<BarrioFormWrapper />} />
      <Route path="/detalle/:id" element={<BarrioDetallePage />} />
    </Routes>
  );
}
