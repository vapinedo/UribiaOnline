import { useEffect, useState } from "react";

interface Municipio {
  value: string;
  label: string;
}

export const useMunicipios = (selectedDepartamento: string) => {
  const [data, setData] = useState<Municipio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedDepartamento) {
      setData([]);
      setIsLoading(false);
      return;
    }

    const fetchMunicipios = async () => {
      try {
        const response = await fetch("/departamentos_municipios_colombia.json"); // Ruta local del JSON

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("El formato de los datos no es un array.");
        }

        // Buscar el departamento seleccionado y extraer sus municipios
        const departamentoData = data.find((item: any) => item.departamento === selectedDepartamento);

        if (!departamentoData) {
          throw new Error(`No se encontraron municipios para el departamento: ${selectedDepartamento}`);
        }

        // Convertir los datos en el formato { value, label }
        const formattedMunicipios = departamentoData.ciudades.map((municipio: string) => ({
          value: municipio,
          label: municipio,
        }));

        setData(formattedMunicipios);
      } catch (err) {
        console.error("Error al cargar los municipios:", err);
        setError("Error al cargar los municipios. Verifica que el archivo JSON sea accesible.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMunicipios();
  }, [selectedDepartamento]);

  return { data, isLoading, error };
};