import { DropdownOption, enumToOptions } from '@core/utils/enumToOptions';

export enum EstadoEntidad {
  Activo = 'Activo',
  Inactivo = 'Inactivo',
}
export enum SiNo {
  Si = 'Sí',
  No = 'No',
}

export const departamentoOptions: DropdownOption[] = [
  { value: 'guajira', label: 'La Guajira' },
  { value: 'atlantico', label: 'Atlántico' },
];
export const municipioOptions: DropdownOption[] = [
  { value: 'uribia', label: 'Uribia' },
  { value: 'barranquilla', label: 'Barranquilla' },
];

export const siNoOptions: DropdownOption[] = enumToOptions(SiNo);
export const estadoEntidadOptions: DropdownOption[] = enumToOptions(EstadoEntidad);
