export type Material = 'wood' | 'plastic' | 'paper';

export type Product = {
  id: number;
  name: string;
  cost: number;
  image: string;
  type: Material;
}
