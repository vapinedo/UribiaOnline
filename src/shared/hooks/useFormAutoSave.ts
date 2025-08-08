import { useEffect } from 'react';

export function useFormAutoSave<T>(
  watch: (callback: (value: T) => void) => { unsubscribe: () => void },
  reset: (data: T) => void,
  storageKey: string,
  modo: string // 'crear' o 'editar'
) {
  // Cargar datos guardados al iniciar (solo en modo crear)
  useEffect(() => {
    if (modo === 'crear') {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        reset(JSON.parse(saved));
      }
    }
  }, [reset, modo, storageKey]);

  // Guardar en localStorage en cada cambio (solo en modo crear)
  useEffect(() => {
    const subscription = watch((value: T) => {
      if (modo === 'crear') {
        localStorage.setItem(storageKey, JSON.stringify(value));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, modo, storageKey]);

  // Función para limpiar el storage (llámala tras guardar exitosamente)
  const clearAutoSave = () => {
    localStorage.removeItem(storageKey);
  };

  return { clearAutoSave };
}
