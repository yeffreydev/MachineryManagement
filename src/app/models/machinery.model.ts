export interface Machinery {
  id: string;
  name: string;
  type: string;
  model: string;
  status: 'available' | 'rented' | 'maintenance';
  location: string;
  specifications: {
    power: string;
    capacity: string;
    weight: string;
    dimensions: string;
  };
  imageUrl: string;
}