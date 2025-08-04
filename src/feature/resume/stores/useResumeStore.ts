import { create } from 'zustand';
import { Resume } from '@core/models/Resume';
import { datosPersonalesInit } from '@modules/resume/interfaces/DatosPersonales';

export const useResumeStore = create<Resume>((set) => ({
  datosPersonales: datosPersonalesInit(),

  updateDatosPersonales: (newState) =>
    set((state) => ({
      datosPersonales: { ...state.datosPersonales, ...newState },
    })),
}));
