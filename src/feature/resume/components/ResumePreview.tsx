import React, { useState } from 'react';
import { fillPdf } from '@feature/resume/utils/pdfGenerator';
import { useResumeStore } from 'feature/resume/stores/useResumeStore';

const ResumePreview: React.FC = () => {
  const { primerApellido, segundoApellido, nombres } = useResumeStore(); // Obtener datos del estado global
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleGeneratePDF = async () => {
    const url = await fillPdf({ primerApellido, segundoApellido, nombres }); // Pasar datos a fillPdf
    setPdfUrl(url);
    // Abrir PDF en una nueva pestaña del navegador
    window.open(url, '_blank');
  };

  return (
    <div>
      <h2>Vista Previa</h2>
      <p>
        <strong>Primer Apellido:</strong> {primerApellido}
      </p>
      <p>
        <strong>Segundo Apellido:</strong> {segundoApellido}
      </p>
      <p>
        <strong>Nombres:</strong> {nombres}
      </p>

      <button onClick={handleGeneratePDF}>Generate PDF</button>

      {pdfUrl && (
        <div>
          <a href={pdfUrl} download="resume.pdf">
            <button>Download PDF</button>
          </a>
          <iframe src={pdfUrl} width="100%" height="500px" />
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
