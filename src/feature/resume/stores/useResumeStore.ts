// src/feature/resume/stores/useResumeStore.ts
import { create } from 'zustand';
import { Resume, DatosPersonales } from '@core/models/Resume';

// Función para inicializar datos personales vacíos
const datosPersonalesInit = (): DatosPersonales => ({
  sexo: '',
  email: '',
  nombres: '',
  telefono: '',
  tipoDocumento: '',
  primerApellido: '',
  paisNacimiento: '',
  segundoApellido: '',
  numeroDocumento: '',
  fechaNacimiento: '',
  distritoMilitar: '',
  tipoLibretaMilitar: '',
  paisCorrespondencia: '',
  municipioNacimiento: '',
  numeroLibretaMilitar: '',
  departamentoNacimiento: '',
  direccionCorrespondencia: '',
  municipioCorrespondencia: '',
  departamentoCorrespondencia: '',
});

export const useResumeStore = create<Resume>((set) => ({
  datosPersonales: datosPersonalesInit(),
  educacionBasica: {
    educacionBasica: '',
    tituloObtenido: '',
    fechaGrado: '',
  },
  educacionSuperior: [],
  idiomas: [],
  experienciaLaboral: [],

  updateDatosPersonales: (newState: Partial<DatosPersonales>) =>
    set((state) => ({
      ...state,
      datosPersonales: { ...state.datosPersonales, ...newState },
    })),
}));
