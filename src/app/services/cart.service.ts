import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from '../models/product';

export interface CartItem {
  id: number;
  name: string;
  wood: string;
  qty: number;
  unitPrice: number;
  image: string;
}

const STORAGE_KEY = 'muebleszajo_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _cart = signal<CartItem[]>(this.loadCart());
  cart = this._cart.asReadonly();

  cartCount = computed(() => this._cart().reduce((s, c) => s + c.qty, 0));
  total = computed(() => this._cart().reduce((sum, item) => sum + item.qty * item.unitPrice, 0));

  constructor() {
    // Persiste el carrito en localStorage cada vez que cambia.
    effect(() => {
      const data = this._cart();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        /* almacenamiento no disponible: se ignora */
      }
    });
  }

  private loadCart(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
    } catch {
      return [];
    }
  }

  addToCart(p: Product, wood: string, qty = 1) {
    const cur = [...this._cart()];
    const idx = cur.findIndex((x) => x.id === p.id && x.wood === wood);
    const price = p.basePrice[wood] ?? Object.values(p.basePrice)[0] ?? 0;
    if (idx >= 0) {
      cur[idx] = { ...cur[idx], qty: cur[idx].qty + qty };
    } else {
      cur.push({ id: p.id, name: p.name, wood, qty, unitPrice: price, image: p.image });
    }
    this._cart.set(cur);
  }

  /** Sube en 1 la cantidad de un ítem. */
  increaseQty(id: number, wood: string) {
    this._cart.set(
      this._cart().map((item) =>
        item.id === id && item.wood === wood ? { ...item, qty: item.qty + 1 } : item
      )
    );
  }

  /** Baja en 1 la cantidad; si llega a 0 elimina el ítem. */
  decreaseQty(id: number, wood: string) {
    const next = this._cart()
      .map((item) =>
        item.id === id && item.wood === wood ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);
    this._cart.set(next);
  }

  removeItem(id: number, wood: string) {
    this._cart.set(this._cart().filter((item) => !(item.id === id && item.wood === wood)));
  }

  clearCart() {
    this._cart.set([]);
  }
}
