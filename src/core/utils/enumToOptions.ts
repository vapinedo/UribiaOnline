export type DropdownOption = {
  label: string;
  value: string;
};

/**
 * Transforma un enum en un array de objetos { label, value },
 * útil para usar en componentes tipo Select/Dropdown.
 */
export function enumToOptions<T extends object>(enumObj: T): DropdownOption[] {
  return Object.entries(enumObj).map(([key, value]) => ({
    label: value,
    value: key,
  }));
}
