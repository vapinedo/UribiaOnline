import { Resume } from '@core/models/Resume';
import { COORDINATES } from '@shared/constants/pdfCoordinates';
import { PDFDocument, PDFPage, rgb, StandardFonts } from 'pdf-lib';

interface DrawTextOptions {
  x: number;
  y: number;
  page?: PDFPage;
  text?: string;
  size?: number;
  caps?: boolean;
  maxWidth?: number;
}

class PDFGenerator {
  private page: any;
  private font: any;

  constructor(page: any, font: any) {
    this.page = page;
    this.font = font;
  }

  private drawText({
    text,
    x,
    y,
    size = 11,
    caps = false,
    maxWidth = 200, // Ancho máximo por defecto
    page = this.page,
  }: DrawTextOptions): void {
    if (!text) return;

    const finalText = caps ? text.toUpperCase() : text;
    let fontSize = size;
    let textWidth = this.getTextWidth(finalText, fontSize);

    // Si el texto es más largo que el espacio disponible, reducimos el tamaño
    if (textWidth > maxWidth) {
      // Calculamos el factor de reducción necesario
      const reductionFactor = maxWidth / textWidth;
      fontSize = Math.max(6, Math.floor(fontSize * reductionFactor));

      // Verificamos que el texto quepa con el nuevo tamaño
      textWidth = this.getTextWidth(finalText, fontSize);
      if (textWidth > maxWidth) {
        fontSize = Math.max(6, fontSize - 0.5);
      }
    }

    page.setFontSize(fontSize);
    page.drawText(finalText, {
      x,
      y,
      color: rgb(0, 0, 0),
      font: this.font, // Aseguramos que se use la fuente en negrita
    });
  }

  private getTextWidth(text: string, fontSize: number): number {
    // Aproximación del ancho del texto basada en el tamaño de fuente
    // Factor de conversión ajustado para Helvetica (fontSize * 0.6)
    const averageCharWidth = fontSize * 0.6;
    // Ajuste adicional para caracteres especiales y espacios
    const specialChars = text.match(/[áéíóúñÁÉÍÓÚÑ\s]/g) || [];
    const normalChars = text.length - specialChars.length;
    return normalChars * averageCharWidth + specialChars.length * averageCharWidth * 1.2;
  }

  private formatPhoneNumber(phone: string): string {
    // Eliminamos cualquier carácter que no sea número
    const numbers = phone.replace(/\D/g, '');
    // Formateamos el número en grupos de 3 dígitos
    return numbers.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
  }

  private fillPersonalInfo(datosPersonales: Resume['datosPersonales']): void {
    // Nombres
    this.drawText({ text: datosPersonales.primerApellido, ...COORDINATES.datosPersonales.nombres.primerApellido });
    this.drawText({ text: datosPersonales.segundoApellido, ...COORDINATES.datosPersonales.nombres.segundoApellido });
    this.drawText({ text: datosPersonales.nombres, ...COORDINATES.datosPersonales.nombres.nombres });

    // Documento
    if (datosPersonales.tipoDocumento in COORDINATES.datosPersonales.documento.tipo) {
      this.drawText({
        text: 'X',
        ...COORDINATES.datosPersonales.documento.tipo[
          datosPersonales.tipoDocumento as keyof typeof COORDINATES.datosPersonales.documento.tipo
        ],
      });
    }
    this.drawText({ text: datosPersonales.numeroDocumento, ...COORDINATES.datosPersonales.documento.numero });

    // Sexo
    if (datosPersonales.sexo in COORDINATES.datosPersonales.sexo) {
      this.drawText({
        text: 'X',
        ...COORDINATES.datosPersonales.sexo[datosPersonales.sexo as keyof typeof COORDINATES.datosPersonales.sexo],
      });
    }

    // Nacionalidad
    if (datosPersonales.paisNacimiento === 'Colombia') {
      this.drawText({
        text: 'X',
        ...COORDINATES.datosPersonales.nacionalidad.colombiana,
      });
    } else {
      this.drawText({
        text: 'X',
        ...COORDINATES.datosPersonales.nacionalidad.extranjera,
      });
      // Mostrar el nombre del país si no es Colombia
      this.drawText({
        text: datosPersonales.paisNacimiento,
        ...COORDINATES.datosPersonales.nacionalidad.paisExtranjero,
      });
    }
    this.drawText({ text: datosPersonales.paisNacimiento, ...COORDINATES.datosPersonales.ubicacion.paisNacimiento });

    // Libreta Militar
    if (datosPersonales.tipoLibretaMilitar in COORDINATES.datosPersonales.libretaMilitar.tipo) {
      this.drawText({
        text: 'X',
        ...COORDINATES.datosPersonales.libretaMilitar.tipo[
          datosPersonales.tipoLibretaMilitar as keyof typeof COORDINATES.datosPersonales.libretaMilitar.tipo
        ],
      });
    }
    this.drawText({ text: datosPersonales.numeroLibretaMilitar, ...COORDINATES.datosPersonales.libretaMilitar.numero });
    this.drawText({ text: datosPersonales.distritoMilitar, ...COORDINATES.datosPersonales.libretaMilitar.distrito });

    // Fecha de Nacimiento
    if (datosPersonales.fechaNacimiento?.includes('-')) {
      const [year, month, day] = datosPersonales.fechaNacimiento.split('-');
      this.drawText({
        text: year.split('').join(' '),
        ...COORDINATES.datosPersonales.fechaNacimiento.año,
        caps: false,
        size: 11,
      });
      this.drawText({
        text: month.split('').join(' '),
        ...COORDINATES.datosPersonales.fechaNacimiento.mes,
        caps: false,
        size: 11,
      });
      this.drawText({
        text: day.split('').join(' '),
        ...COORDINATES.datosPersonales.fechaNacimiento.dia,
        caps: false,
        size: 11,
      });
    }

    // Ubicación
    this.drawText({
      text: datosPersonales.departamentoNacimiento,
      ...COORDINATES.datosPersonales.ubicacion.departamentoNacimiento,
    });
    this.drawText({
      text: datosPersonales.municipioNacimiento,
      ...COORDINATES.datosPersonales.ubicacion.municipioNacimiento,
    });

    // Correspondencia
    this.drawText({
      text: datosPersonales.direccionCorrespondencia,
      ...COORDINATES.datosPersonales.correspondencia.direccion,
    });
    this.drawText({ text: datosPersonales.paisCorrespondencia, ...COORDINATES.datosPersonales.correspondencia.pais });
    this.drawText({
      text: datosPersonales.departamentoCorrespondencia,
      ...COORDINATES.datosPersonales.correspondencia.departamento,
    });
    this.drawText({
      text: datosPersonales.municipioCorrespondencia,
      ...COORDINATES.datosPersonales.correspondencia.municipio,
    });

    // Contacto
    this.drawText({
      text: this.formatPhoneNumber(datosPersonales.telefono),
      ...COORDINATES.datosPersonales.contacto.telefono,
    });
    this.drawText({
      text: datosPersonales.email,
      ...COORDINATES.datosPersonales.contacto.email,
      caps: false,
      size: 8,
    });
  }

  private fillEducacionBasica(educacionBasica: Resume['educacionBasica']): void {
    // Educación Básica - Mostrar X en la coordenada correspondiente
    if (educacionBasica.educacionBasica in COORDINATES.educacionBasica.educacionBasica) {
      this.drawText({
        text: 'X',
        ...COORDINATES.educacionBasica.educacionBasica[
          educacionBasica.educacionBasica as keyof typeof COORDINATES.educacionBasica.educacionBasica
        ],
      });
    }

    // Título Obtenido - Mostrar el valor capturado
    this.drawText({
      text: educacionBasica.tituloObtenido,
      ...COORDINATES.educacionBasica.tituloObtenido,
    });

    // Fecha de Grado
    if (educacionBasica.fechaGrado?.includes('-')) {
      const [year, month] = educacionBasica.fechaGrado.split('-');
      this.drawText({
        text: year.split('').join(' '),
        ...COORDINATES.educacionBasica.fechaGrado.año,
        caps: false,
        size: 11,
      });
      this.drawText({
        text: month.split('').join(' '),
        ...COORDINATES.educacionBasica.fechaGrado.mes,
        caps: false,
        size: 11,
      });
    }
  }

  private fillEducacionSuperior(educacionSuperior: Resume['educacionSuperior']): void {
    // Iteramos sobre cada bloque de educación superior
    educacionSuperior.forEach((educacion, index) => {
      const bloqueKey = `bloque${index + 1}` as keyof typeof COORDINATES.educacionSuperior;
      const coordenadas = COORDINATES.educacionSuperior[bloqueKey];

      // Título Obtenido
      this.drawText({
        text: educacion.tituloObtenido,
        ...coordenadas.tituloObtenido,
        size: 13, // Volvemos al tamaño anterior
      });

      // Fecha de Grado
      if (educacion.fechaGrado?.includes('-')) {
        const [year, month] = educacion.fechaGrado.split('-');
        // Dibujamos cada dígito del año por separado
        year.split('').forEach((digit, i) => {
          let xOffset = i * 12; // Espaciado base
          if (i === 2) {
            // Para el tercer dígito (penúltimo)
            xOffset += 2; // Añadimos un poco más de espacio
          } else if (i === 3) {
            // Para el último dígito
            xOffset += 4; // Añadimos más espacio para el último dígito
          }
          this.drawText({
            text: digit,
            x: coordenadas.fechaGrado.year.x + xOffset,
            y: coordenadas.fechaGrado.year.y,
            caps: false,
            size: 11,
          });
        });
        this.drawText({
          text: month.split('').join(' '), // Quitamos el espacio entre los dígitos del mes
          ...coordenadas.fechaGrado.mes,
          caps: false,
          size: 11,
        });
      }

      // Modalidad Académica
      this.drawText({
        text: educacion.modalidadAcademica,
        ...coordenadas.modalidad,
      });

      // Semestres Aprobados
      this.drawText({
        text: educacion.semestresAprobados,
        ...coordenadas.semestresAprobados,
      });

      // Graduado
      if (educacion.graduado === 'si' || educacion.graduado === 'no') {
        this.drawText({
          text: 'X',
          ...coordenadas.graduado[educacion.graduado],
          caps: true,
          size: 11,
        });
      }

      // Tarjeta Profesional
      this.drawText({
        text: educacion.tarjetProfesional,
        ...coordenadas.tarjetProfesional,
      });
    });
  }

  private fillIdiomas(idiomas: Resume['idiomas']): void {
    // Iteramos sobre cada bloque de idiomas
    idiomas.forEach((idioma, index) => {
      const bloqueKey = `bloque${index + 1}` as keyof typeof COORDINATES.idiomas;
      const coordenadas = COORDINATES.idiomas[bloqueKey];

      // Idioma
      this.drawText({
        text: idioma.idioma,
        ...coordenadas.idioma,
      });

      // Hablar
      if (idioma.loHabla === 'muy bien') {
        this.drawText({
          text: 'X',
          ...coordenadas.hablar.muyBien,
        });
      } else if (idioma.loHabla === 'bien') {
        this.drawText({
          text: 'X',
          ...coordenadas.hablar.bien,
        });
      } else if (idioma.loHabla === 'regular') {
        this.drawText({
          text: 'X',
          ...coordenadas.hablar.regular,
        });
      }

      // Leer
      if (idioma.loLee === 'muy bien') {
        this.drawText({
          text: 'X',
          ...coordenadas.leer.muyBien,
        });
      } else if (idioma.loLee === 'bien') {
        this.drawText({
          text: 'X',
          ...coordenadas.leer.bien,
        });
      } else if (idioma.loLee === 'regular') {
        this.drawText({
          text: 'X',
          ...coordenadas.leer.regular,
        });
      }

      // Escribir
      if (idioma.loEscribe === 'muy bien') {
        this.drawText({
          text: 'X',
          ...coordenadas.escribir.muyBien,
        });
      } else if (idioma.loEscribe === 'bien') {
        this.drawText({
          text: 'X',
          ...coordenadas.escribir.bien,
        });
      } else if (idioma.loEscribe === 'regular') {
        this.drawText({
          text: 'X',
          ...coordenadas.escribir.regular,
        });
      }
    });
  }

  private fillExperienciaLaboral(experienciaLaboral: Resume['experienciaLaboral'], page: PDFPage): void {
    experienciaLaboral.forEach((experiencia, index) => {
      const bloqueKey = `bloque${index + 1}` as keyof typeof COORDINATES.experienciaLaboral;
      const coordenadas = COORDINATES.experienciaLaboral[bloqueKey];

      if (!coordenadas) return;

      // Empresa
      this.drawText({
        text: experiencia?.empresa,
        ...coordenadas?.empresa,
        size: 11,
        page,
      });

      // Tipo de empresa
      if (experiencia.tipoEmpresa === 'publica') {
        this.drawText({
          text: 'X',
          ...coordenadas.tipoEmpresa.publica,
          size: 14,
          page,
        });
      } else if (experiencia.tipoEmpresa === 'privada') {
        this.drawText({
          text: 'X',
          ...coordenadas.tipoEmpresa.privada,
          size: 14,
          page,
        });
      }

      // Pais Empresa
      this.drawText({
        text: experiencia?.paisEmpresa,
        ...coordenadas?.paisEmpresa,
        size: 11,
        page,
      });

      // Departamento Empresa
      this.drawText({
        text: experiencia?.departamentoEmpresa,
        ...coordenadas?.departamentoEmpresa,
        size: 11,
        page,
      });

      // Municipio Empresa
      this.drawText({
        text: experiencia?.municipioEmpresa,
        ...coordenadas?.municipioEmpresa,
        size: 11,
        page,
      });

      // Correo Empresa
      this.drawText({
        text: experiencia?.correoElectronico,
        ...coordenadas?.correoElectronico,
        size: 9,
        page,
      });

      // Telefono Empresa
      this.drawText({
        text: this.formatPhoneNumber(experiencia?.telefonoEmpresa),
        ...coordenadas?.telefonoEmpresa,
        size: 11,
        page,
      });

      // Fecha Inicio empresa
      if (experiencia.fechaInicio?.includes('-')) {
        const [year, month, day] = experiencia.fechaInicio.split('-');
        this.drawText({
          text: year.split('').join(' '),
          ...coordenadas.fechaInicio.año,
          caps: false,
          size: 11,
          page,
        });
        this.drawText({
          text: month.split('').join(' '),
          ...coordenadas.fechaInicio.mes,
          caps: false,
          size: 11,
          page,
        });
        this.drawText({
          text: day.split('').join(' '),
          ...coordenadas.fechaInicio.dia,
          caps: false,
          size: 11,
          page,
        });
      }

      // Fecha fin empresa
      if (experiencia.fechaFin?.includes('-')) {
        const [year, month, day] = experiencia.fechaFin.split('-');
        this.drawText({
          text: year.split('').join(' '),
          ...coordenadas.fechaFin.año,
          caps: false,
          size: 11,
          page,
        });
        this.drawText({
          text: month.split('').join(' '),
          ...coordenadas.fechaFin.mes,
          caps: false,
          size: 11,
          page,
        });
        this.drawText({
          text: day.split('').join(' '),
          ...coordenadas.fechaFin.dia,
          caps: false,
          size: 11,
          page,
        });
      }

      // Cargo Empresa
      this.drawText({
        text: experiencia?.cargo,
        ...coordenadas?.cargo,
        size: 11,
        page,
      });

      // Dependencia Empresa
      this.drawText({
        text: experiencia?.dependencia,
        ...coordenadas?.dependencia,
        size: 11,
        page,
      });

      // Direccion Empresa
      this.drawText({
        text: experiencia?.direccionEmpresa,
        ...coordenadas?.direccionEmpresa,
        size: 11,
        page,
      });
    });
  }

  public async fillPdf(resumeData: Resume): Promise<string> {
    const pdfUrl = '/FormatoUnicoHojaVida.pdf';
    const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const [page0, page1] = pdfDoc.getPages();
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const generator = new PDFGenerator(page0, font);
    generator.fillPersonalInfo(resumeData.datosPersonales);
    generator.fillEducacionBasica(resumeData.educacionBasica);
    generator.fillEducacionSuperior(resumeData.educacionSuperior);
    generator.fillIdiomas(resumeData.idiomas);
    generator.fillExperienciaLaboral(resumeData.experienciaLaboral, page1);

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  }
}

export const fillPdf = async (resumeData: Resume): Promise<string> => {
  const generator = new PDFGenerator(null, null);
  return generator.fillPdf(resumeData);
};
