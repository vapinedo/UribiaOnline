import { Route, Routes } from 'react-router-dom';
import ResumeForm from '@feature/resume/components/ResumeForm';
import ResumeAdminPage from '@feature/resume/pages/ResumeAdminPage';
import ResumeFormWrapper from '@feature/resume/components/ResumeWrapper';

export default function ResumeRouter() {
  return (
    <Routes>
      <Route path="/" element={<ResumeAdminPage />} />
      <Route path="/nuevo" element={<ResumeForm />} />
      <Route path="/editar/:id" element={<ResumeFormWrapper />} />
    </Routes>
  );
}
