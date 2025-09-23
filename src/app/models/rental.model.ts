export interface Rental {
  id: string;
  machineryId: string;
  clientId: string;
  clientName: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'pending';
  cost: number;
}