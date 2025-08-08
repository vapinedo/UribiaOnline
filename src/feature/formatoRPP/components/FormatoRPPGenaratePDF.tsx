import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { FormatoRPP } from '@feature/formatoRPP/models/FormatoRPP';

// Puedes recibir los datos del formulario como argumento
export async function FormatoRPPGenaratePDF(formData: FormatoRPP, logoUrl: string) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // Tamaño A4

  // Cargar fuentes
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Cargar logo
  // const logoBytes = await fetch(logoUrl).then((res) => res.arrayBuffer());
  // const logoImage = await pdfDoc.embedPng(logoBytes);

  // --- Encabezado con logo ---
  // page.drawImage(logoImage, { x: 40, y: 770, width: 70, height: 70 });
  page.drawText('ASOCIACIÓN DE PADRES Y MADRES USUARIOS\nDE LOS SERVICIOS DE ATENCIÓN A LA PRIMERA INFANCIA', {
    x: 120,
    y: 810,
    size: 12,
    font,
    color: rgb(0, 0, 0),
    maxWidth: 400,
    lineHeight: 14,
  });
  page.drawText(`NIT No. 825.002.486 - 8`, { x: 120, y: 790, size: 10, font });

  // --- Datos generales ---
  page.drawText(`COMPONENTE: ${formData.nombreComponente}`, { x: 40, y: 750, size: 10, font });
  page.drawText(`ACTIVIDAD REALIZADA: ${formData.nombreActividad}`, { x: 40, y: 735, size: 10, font });
  // page.drawText(`MES: ${formData.fechaCreacion.getMonth() + 1}`, { x: 40, y: 720, size: 10, font });
  page.drawText(`PROFESIONAL: ${formData.profesionalResponsable}`, { x: 40, y: 705, size: 10, font });

  // --- Beneficiarios (en cuadrícula de 2x2 por ejemplo) ---
  let x = 40,
    y = 650;
  for (let i = 0; i < formData.beneficiarios.length; i++) {
    const b = formData.beneficiarios[i];
    let imgTop = y - 240;
    let imgHeight = 270;

    // Dibuja la imagen
    if (b.fotos && b.fotos[0]) {
      const fotoBytes = await fetch(b.fotos[0]).then((res) => res.arrayBuffer());
      const fotoImage = await pdfDoc.embedJpg(fotoBytes);
      page.drawImage(fotoImage, { x, y: imgTop, width: 250, height: imgHeight });
    }

    // Dibuja los textos justo debajo de la imagen
    const textY1 = imgTop - 15; // 15 puntos debajo de la imagen
    const textY2 = imgTop - 30; // 30 puntos debajo de la imagen

    page.drawText(`NOMBRE DEL BENEFICIARIO: ${b.nombre}`, { x, y: textY1, size: 9, font });
    page.drawText(`NIUP: ${b.niup}`, { x, y: textY2, size: 9, font });

    // Separación entre filas
    if ((i + 1) % 2 === 0) {
      x = 40;
      // Si es la primera fila, usa un salto mayor
      y -= i === 1 ? 340 : 320;
    } else {
      x += 260;
    }
  }

  // --- Descargar o mostrar PDF ---
  const pdfBytes = await pdfDoc.save();
  // Puedes usar FileSaver.js o crear un blob para descargar
  return pdfBytes;
}
