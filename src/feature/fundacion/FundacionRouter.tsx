import { Route, Routes } from 'react-router-dom';
import FundacionForm from '@feature/fundacion/components/FundacionForm';
import FundacionAdminPage from '@feature/fundacion/pages/FundacionAdminPage';
import FundacionDetallePage from '@feature/fundacion/pages/FundacionDetallePage';
import FundacionFormWrapper from '@feature/fundacion/components/FundacionFormWrapper';

export default function FundacionRouter() {
  return (
    <Routes>
      <Route path="/" element={<FundacionAdminPage />} />
      <Route path="/nuevo" element={<FundacionForm modo="crear" />} />
      <Route path="/editar/:id" element={<FundacionFormWrapper />} />
      <Route path="/detalle/:id" element={<FundacionDetallePage />} />
    </Routes>
  );
}