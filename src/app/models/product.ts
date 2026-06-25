export interface Product {
  id: number;
  name: string;
  cat: string;
  description: string;
  image: string;
  status: 'available' | 'low' | 'bajo pedido';
  stock: number;
  basePrice: Record<string, number>;
}
