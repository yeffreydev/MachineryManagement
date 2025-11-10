export interface Maintenance {
  id: string;
  machineryId: string;
  tipo: string;
  fecha: Date;
  tecnico: string;
  descripcion: string;
  costo: number;
  estado: string;
}