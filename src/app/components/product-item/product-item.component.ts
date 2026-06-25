import { Component, Input, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="product-card">
      <img [src]="product.image" alt="{{ product.name }}" class="product-card__image" />
      <div class="product-card__body">
        <div class="product-card__meta">
          <span class="badge">{{ product.cat }}</span>
          <span class="status" [class.low-stock]="product.status === 'low'">{{ availabilityLabel() }}</span>
        </div>
        <h3>{{ product.name }}</h3>
        <p>{{ product.description }}</p>
        <div class="product-card__details">
          <div>
            <label for="wood-{{product.id}}">Madera</label>
            <select id="wood-{{product.id}}" [value]="selectedWood()" (change)="selectedWood.set($any($event.target).value)">
              <option *ngFor="let wood of woodTypes" [value]="wood">{{ wood }}</option>
            </select>
          </div>
          <div class="inventory">Stock: {{ product.stock }} unidades</div>
        </div>
        <div class="product-card__footer">
          <div>
            <span class="price">$ {{ price() | number:'1.0-0' }}</span>
            <small class="price-note">Precio base</small>
          </div>
          <button (click)="add()">Agregar</button>
        </div>
      </div>
    </article>
  `,
  styles: [
    `
    .product-card {
      display: flex;
      flex-direction: column;
      background: white;
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: 0 16px 50px rgba(15, 23, 42, 0.08);
    }

    .product-card__image {
      width: 100%;
      min-height: 190px;
      object-fit: cover;
    }

    .product-card__body {
      padding: 1rem;
      display: grid;
      gap: 0.9rem;
    }

    .product-card__meta {
      display: flex;
      justify-content: space-between;
      gap: 0.75rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .badge {
      display: inline-flex;
      padding: 0.35rem 0.75rem;
      background: #f3e1cf;
      color: #7b4f30;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .status {
      font-size: 0.85rem;
      color: #4b5563;
    }

    .status.low-stock {
      color: #b45309;
    }

    h3 {
      margin: 0;
      font-size: 1.05rem;
      line-height: 1.3;
    }

    p {
      margin: 0;
      color: #4b5563;
      font-size: 0.95rem;
      min-height: 3rem;
    }

    .product-card__details {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }

    select {
      border: 1px solid #d1d5db;
      border-radius: 0.75rem;
      padding: 0.6rem 0.85rem;
      background: #fff;
      color: #111827;
    }

    .inventory {
      color: #6b7280;
      font-size: 0.85rem;
    }

    .product-card__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }

    .price {
      font-size: 1.2rem;
      font-weight: 700;
      color: #7f4413;
    }

    .price-note {
      display: block;
      color: #6b7280;
      font-size: 0.8rem;
    }

    button {
      border: none;
      border-radius: 0.85rem;
      padding: 0.85rem 1rem;
      background: #8b5a2b;
      color: white;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    button:hover {
      background: #6f4322;
    }
    `
  ]
})
export class ProductItemComponent {
  @Input() product!: Product;
  private cart = inject(CartService);
  selectedWood = signal('Roble');
  woodTypes = ['Roble', 'Nogal', 'Pino', 'Caoba'];
  price = computed(() => this.product.basePrice[this.selectedWood()] ?? 0);
  availabilityLabel = computed(() => this.product.status === 'low' ? 'Bajo pedido' : 'En stock');

  add(){
    this.cart.addToCart(this.product, this.selectedWood());
  }
}
