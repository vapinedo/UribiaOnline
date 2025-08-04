export interface DatosPersonales {
  sexo: string;
  email: string;
  nombres: string;
  telefono: string;
  tipoDocumento: string;
  primerApellido: string;
  paisNacimiento: string;
  segundoApellido: string;
  numeroDocumento: string;
  fechaNacimiento: string;
  distritoMilitar: string;
  tipoLibretaMilitar: string;
  paisCorrespondencia: string;
  municipioNacimiento: string;
  numeroLibretaMilitar: string;
  departamentoNacimiento: string;
  direccionCorrespondencia: string;
  municipioCorrespondencia: string;
  departamentoCorrespondencia: string;
}

export interface EducacionBasica {
  educacionBasica: string;
  tituloObtenido: string;
  fechaGrado: string;
}

export interface EducacionSuperior {
  modalidadAcademica: string;
  semestresAprobados: string;
  graduado: string;
  tituloObtenido: string;
  fechaGrado: string;
  tarjetProfesional: string;
}

export interface Idiomas {
  idioma: string;
  loHabla: string;
  loLee: string;
  loEscribe: string;
}

export interface ExperienciaLaboral {
  empresa: string;
  tipoEmpresa: string;
  paisEmpresa: string;
  departamentoEmpresa: string;
  municipioEmpresa: string;
  correoElectronico: string;
  telefonoEmpresa: string;
  fechaInicio: string;
  fechaFin: string;
  cargo: string;
  dependencia: string;
  direccionEmpresa: string;
}

export interface Resume {
  datosPersonales: DatosPersonales;
  educacionBasica: EducacionBasica;
  educacionSuperior: EducacionSuperior[];
  idiomas: Idiomas[];
  experienciaLaboral: ExperienciaLaboral[];
}
