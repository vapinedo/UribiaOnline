import { useQuery } from '@tanstack/react-query';
import { SelectOption } from '@shared/components/CustomSelect';

const TIME_1_HOUR = 1 * 60 * 60 * 1000;
const TIME_24_HOUR = 24 * 60 * 60 * 1000;
const COUNTRIES_API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags';

const sortAZCountries = (countries: SelectOption[]): SelectOption[] => {
  return countries.sort((a, b) => a.value.localeCompare(b.value));
};

const fetchCountries = async (): Promise<SelectOption[]> => {
  const response = await fetch(COUNTRIES_API_URL);
  if (!response.ok) throw new Error('Error al obtener listado de países');
  const data = await response.json();

  const countries = data.map((country: any) => ({
    value: country.name.common,
    label: `${country.name.common}`,
  }));

  return sortAZCountries(countries);
};

export const useCountries = () => {
  return useQuery({
    gcTime: TIME_24_HOUR,
    staleTime: TIME_1_HOUR,
    queryKey: ['countries'],
    queryFn: fetchCountries,
  });
};
