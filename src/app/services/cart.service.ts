import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product';

export interface CartItem { id:number; name:string; wood:string; qty:number; unitPrice:number; image:string }

@Injectable({ providedIn: 'root' })
export class CartService {
  private _cart = signal<CartItem[]>([]);
  cart = this._cart;
  cartCount = computed(() => this._cart().reduce((s, c) => s + c.qty, 0));
  total = computed(() => this._cart().reduce((sum, item) => sum + item.qty * item.unitPrice, 0));

  addToCart(p: Product, wood: string){
    const cur = [...this._cart()];
    const idx = cur.findIndex(x => x.id === p.id && x.wood === wood);
    const price = p.basePrice[wood] ?? Object.values(p.basePrice)[0] ?? 0;
    if (idx >= 0) {
      cur[idx].qty += 1;
    } else {
      cur.push({ id: p.id, name: p.name, wood, qty: 1, unitPrice: price, image: p.image });
    }
    this._cart.set(cur);
  }

  removeItem(id: number, wood: string) {
    this._cart.set(this._cart().filter(item => !(item.id === id && item.wood === wood)));
  }

  clearCart() {
    this._cart.set([]);
  }
}
