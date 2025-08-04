import { useEffect, useState } from "react";

interface Departamento {
  value: string;
  label: string;
}

export const useDepartamentos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Departamento[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await fetch("/departamentos_municipios_colombia.json");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("El formato de los datos no es un array.");
        }

        const formattedDepartamentos = data.map((item: any) => ({
          value: item.departamento,
          label: item.departamento,
        }));

        setData(formattedDepartamentos);
      } catch (err) {
        console.error("Error al cargar los departamentos:", err);
        setError("Error al cargar los departamentos. Verifica que el archivo JSON sea accesible.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartamentos();
  }, []);

  return { data, isLoading, error };
};