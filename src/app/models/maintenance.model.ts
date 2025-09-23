export interface Maintenance {
  id: string;
  machineryId: string;
  maintenanceType: 'preventive' | 'corrective';
  date: Date;
  technician: string;
  description: string;
}