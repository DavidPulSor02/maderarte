import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private _products = signal<Product[]>([
    {
      id: 1,
      name: 'Mesa de Comedor Clásica',
      cat: 'Mesas',
      description: 'Mesa amplia con diseño clásico ideal para espacios familiares.',
      image: 'https://source.unsplash.com/800x600/?dining-table',
      status: 'available',
      stock: 8,
      basePrice: { Roble: 15000, Nogal: 18000, Pino: 9000, Caoba: 22000 }
    },
    {
      id: 2,
      name: 'Silla Moderna Tapizada',
      cat: 'Sillas',
      description: 'Silla cómoda con respaldo alto y tapizado premium.',
      image: 'https://source.unsplash.com/800x600/?upholstered-chair',
      status: 'available',
      stock: 12,
      basePrice: { Roble: 8400, Nogal: 10000, Pino: 5000, Caoba: 12000 }
    },
    {
      id: 3,
      name: 'Estante Minimalista',
      cat: 'Estantes',
      description: 'Estante ligero de líneas rectas para tu sala u oficina.',
      image: 'https://source.unsplash.com/800x600/?shelf',
      status: 'available',
      stock: 5,
      basePrice: { Roble: 9500, Nogal: 12000, Pino: 6000, Caoba: 14000 }
    },
    {
      id: 4,
      name: 'Gabinete Decorativo',
      cat: 'Armarios',
      description: 'Gabinete elegante con puertas de cierre suave.',
      image: 'https://source.unsplash.com/800x600/?cabinet',
      status: 'low',
      stock: 2,
      basePrice: { Roble: 16000, Nogal: 20000, Pino: 11000, Caoba: 24000 }
    },
    {
      id: 5,
      name: 'Mesa de Centro',
      cat: 'Mesas',
      description: 'Mesa de centro ideal para sala con acabados naturales.',
      image: 'https://source.unsplash.com/800x600/?coffee-table',
      status: 'available',
      stock: 6,
      basePrice: { Roble: 7000, Nogal: 9000, Pino: 4500, Caoba: 10000 }
    },
    {
      id: 6,
      name: 'Silla de Escritorio',
      cat: 'Sillas',
      description: 'Silla ergonómica para jornadas largas de trabajo.',
      image: 'https://source.unsplash.com/800x600/?office-chair',
      status: 'available',
      stock: 9,
      basePrice: { Roble: 6500, Nogal: 8000, Pino: 4000, Caoba: 9500 }
    },
    {
      id: 7,
      name: 'Librero Grande',
      cat: 'Estantes',
      description: 'Librero con múltiples niveles para colección y decoración.',
      image: 'https://source.unsplash.com/800x600/?bookcase',
      status: 'available',
      stock: 7,
      basePrice: { Roble: 13000, Nogal: 16000, Pino: 8000, Caoba: 19000 }
    },
    {
      id: 8,
      name: 'Armario Empotrado',
      cat: 'Armarios',
      description: 'Armario empotrado con gran capacidad de almacenaje.',
      image: 'https://source.unsplash.com/800x600/?wardrobe',
      status: 'low',
      stock: 1,
      basePrice: { Roble: 28000, Nogal: 35000, Pino: 18000, Caoba: 42000 }
    },
    {
      id: 9,
      name: 'Banca de Madera',
      cat: 'Sillas',
      description: 'Banca rústica perfecta para jardines y terrazas.',
      image: 'https://source.unsplash.com/800x600/?bench',
      status: 'available',
      stock: 10,
      basePrice: { Roble: 5000, Nogal: 6500, Pino: 3200, Caoba: 7800 }
    }
  ]);

  products = this._products;

  getAll() {
    return this._products();
  }
}
