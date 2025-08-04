import { DropdownOption, enumToOptions } from '@core/utils/enumToOptions';

export enum NivelIdioma {
  Regular = 'Regular',
  Bien = 'Bien',
  MuyBien = 'Muy bien',
}
export enum TipoEmpresa {
  Publica = 'Pública',
  Privada = 'Privada',
}
export enum TipoLibretaMilitar {
  Primera = 'Primera Clase',
  Segunda = 'Segunda Clase',
}
export enum TipoDocumento {
  CC = 'Cédula de Ciudadanía (CC)',
  CE = 'Cédula de Extranjería (CE)',
  PAS = 'Pasaporte (PAS)',
}
export enum EducacionBasica {
  Primero = 'Primero',
  Segundo = 'Segundo',
  Tercero = 'Tercero',
  Cuarto = 'Cuarto',
  Quinto = 'Quinto',
  Sexto = 'Sexto',
  Septimo = 'Séptimo',
  Octavo = 'Octavo',
  Noveno = 'Noveno',
  Decimo = 'Décimo',
  Undecimo = 'Once',
}
export enum ModalidadAcademica {
  TC = 'Técnica',
  TL = 'Tecnológica',
  TE = 'Tecnológica Especializada',
  UN = 'Universitaria',
  ES = 'Especialización',
  MG = 'Maestría',
  DOC = 'Doctorado',
}

export const idiomaOptions: DropdownOption[] = enumToOptions(NivelIdioma);
export const tipoEmpresaOptions: DropdownOption[] = enumToOptions(TipoEmpresa);
export const tipoDocumentoOptions: DropdownOption[] = enumToOptions(TipoDocumento);
export const educacionBasicaOptions: DropdownOption[] = enumToOptions(EducacionBasica);
export const tipoLibretaMilitarOptions: DropdownOption[] = enumToOptions(TipoLibretaMilitar);
export const modalidadAcademicaOptions: DropdownOption[] = enumToOptions(ModalidadAcademica);
