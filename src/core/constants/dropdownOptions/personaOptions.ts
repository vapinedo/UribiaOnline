import { enumToOptions, DropdownOption } from '@core/utils/enumToOptions';

export enum Sexo {
  M = 'Masculino (M)',
  F = 'Femenino (F)',
}

export const sexoOptions: DropdownOption[] = enumToOptions(Sexo);
