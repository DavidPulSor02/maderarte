import { Injectable, inject, signal } from '@angular/core';
import { Product } from '../models/product';
import { ApiService } from './api.service';
import { ProductInput } from '../../lib/trpc';

// Catálogo de respaldo: se muestra al instante y si la API no está disponible.
// Coincide con prisma/seed.ts del backend.
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Mesa de Comedor Clásica',
    cat: 'Mesas',
    description: 'Mesa amplia con diseño clásico ideal para espacios familiares.',
    image: 'https://mueblesdiaz.com/wp-content/uploads/2025/12/935-4.jpg',
    status: 'available',
    stock: 8,
    basePrice: { Roble: 15000, Nogal: 18000, Pino: 9000, Caoba: 22000 },
  },
  {
    id: 2,
    name: 'Silla Moderna Tapizada',
    cat: 'Sillas',
    description: 'Silla cómoda con respaldo alto y tapizado premium.',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=70',
    status: 'available',
    stock: 12,
    basePrice: { Roble: 8400, Nogal: 10000, Pino: 5000, Caoba: 12000 },
  },
  {
    id: 3,
    name: 'Estante Minimalista',
    cat: 'Estantes',
    description: 'Estante ligero de líneas rectas para tu sala u oficina.',
    image: 'https://images.unsplash.com/photo-1580628881159-4eae247a6bf5?auto=format&fit=crop&w=600&q=70',
    status: 'available',
    stock: 5,
    basePrice: { Roble: 9500, Nogal: 12000, Pino: 6000, Caoba: 14000 },
  },
  {
    id: 4,
    name: 'Gabinete Decorativo',
    cat: 'Armarios',
    description: 'Gabinete elegante con puertas de cierre suave.',
    image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=600&q=70',
    status: 'low',
    stock: 2,
    basePrice: { Roble: 16000, Nogal: 20000, Pino: 11000, Caoba: 24000 },
  },
  {
    id: 5,
    name: 'Mesa de Centro',
    cat: 'Mesas',
    description: 'Mesa de centro ideal para sala con acabados naturales.',
    image: 'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?auto=format&fit=crop&w=600&q=70',
    status: 'available',
    stock: 6,
    basePrice: { Roble: 7000, Nogal: 9000, Pino: 4500, Caoba: 10000 },
  },
  {
    id: 6,
    name: 'Silla de Escritorio',
    cat: 'Sillas',
    description: 'Silla ergonómica para jornadas largas de trabajo.',
    image: 'https://images.unsplash.com/photo-1589779256250-a8743f78f4af?auto=format&fit=crop&w=600&q=70',
    status: 'available',
    stock: 9,
    basePrice: { Roble: 6500, Nogal: 8000, Pino: 4000, Caoba: 9500 },
  },
  {
    id: 7,
    name: 'Librero Grande',
    cat: 'Estantes',
    description: 'Librero con múltiples niveles para colección y decoración.',
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=70',
    status: 'available',
    stock: 7,
    basePrice: { Roble: 13000, Nogal: 16000, Pino: 8000, Caoba: 19000 },
  },
  {
    id: 8,
    name: 'Armario Empotrado',
    cat: 'Armarios',
    description: 'Armario empotrado con gran capacidad de almacenaje.',
    image: 'https://images.unsplash.com/photo-1722349674028-a148f4364e43?auto=format&fit=crop&w=600&q=70',
    status: 'low',
    stock: 1,
    basePrice: { Roble: 28000, Nogal: 35000, Pino: 18000, Caoba: 42000 },
  },
  {
    id: 9,
    name: 'Banca de Madera',
    cat: 'Sillas',
    description: 'Banca rústica perfecta para jardines y terrazas.',
    image: 'https://images.unsplash.com/photo-1573493334464-21388936965a?auto=format&fit=crop&w=600&q=70',
    status: 'available',
    stock: 10,
    basePrice: { Roble: 5000, Nogal: 6500, Pino: 3200, Caoba: 7800 },
  },
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = inject(ApiService);

  // Arranca con el catálogo de respaldo para que se vea de inmediato.
  private _products = signal<Product[]>(FALLBACK_PRODUCTS);
  products = this._products.asReadonly();

  loading = signal(false);
  error = signal('');

  // Texto de búsqueda compartido entre el header y el catálogo.
  search = signal('');

  constructor() {
    this.reload();
  }

  /** Intenta cargar el catálogo desde la API; si falla o viene vacío, conserva el respaldo. */
  reload() {
    this.loading.set(true);
    this.error.set('');
    this.api.getProducts().subscribe({
      next: (list) => {
        if (Array.isArray(list) && list.length > 0) {
          // Las imágenes se toman SIEMPRE de este archivo (FALLBACK_PRODUCTS),
          // aunque el resto de los datos venga de la base de datos.
          const imgById = new Map(FALLBACK_PRODUCTS.map((p) => [p.id, p.image]));
          this._products.set(
            list.map((p) => ({ ...p, image: imgById.get(p.id) ?? p.image }))
          );
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.warn('API de productos no disponible, usando catálogo local:', err);
        this.loading.set(false);
        // Se conserva el catálogo de respaldo ya cargado.
      },
    });
  }

  getAll() {
    return this._products();
  }

  create(input: ProductInput) {
    return this.api.createProduct(input);
  }

  update(id: number, input: Partial<ProductInput>) {
    return this.api.updateProduct(id, input);
  }

  remove(id: number) {
    return this.api.removeProduct(id);
  }
}
