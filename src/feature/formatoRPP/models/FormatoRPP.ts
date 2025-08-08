export interface BeneficiarioRPP {
  niup: string;
  nombre: string;
  fotos: string[];
}

export interface FormatoRPP {
  id: string;
  idFundacion: string;
  fechaCreacion: Date;
  nombreActividad: string;
  nombreComponente: string;
  profesionalResponsable: string;
  beneficiarios: BeneficiarioRPP[];
}
