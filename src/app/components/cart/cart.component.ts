import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="cart-card">
      <div class="cart-card__header">
        <div>
          <p class="eyebrow">Carrito</p>
          <h2>Tu selección</h2>
        </div>
        <span class="cart-badge">{{ cartService.cartCount() }}</span>
      </div>

      <div *ngIf="cart().length === 0" class="cart-empty">
        <p>No hay productos en el carrito.</p>
        <small>Haz clic en "Agregar" para comenzar.</small>
      </div>

      <div *ngIf="cart().length > 0" class="cart-items">
        <div *ngFor="let item of cart()" class="cart-item">
          <div>
            <p class="cart-item__title">{{ item.name }}</p>
            <p class="cart-item__meta">Cantidad: {{ item.qty }} · {{ item.wood }}</p>
          </div>
          <div class="cart-item__prices">
            <span>$ {{ item.unitPrice | number:'1.0-0' }}</span>
            <button type="button" (click)="remove(item.id, item.wood)">Eliminar</button>
          </div>
        </div>
      </div>

      <div *ngIf="cart().length > 0" class="cart-summary">
        <p class="cart-summary__label">Total</p>
        <p class="cart-summary__value">$ {{ total() | number:'1.0-0' }}</p>
      </div>

      <button
        *ngIf="cart().length > 0"
        class="cart-pay"
        type="button"
        [disabled]="paying()"
        (click)="payWithMercadoPago()"
      >
        {{ paying() ? 'Redirigiendo…' : 'Pagar con Mercado Pago' }}
      </button>

      <div *ngIf="payError()" class="cart-pay-error">{{ payError() }}</div>

      <form *ngIf="cart().length > 0" class="quote-form" (submit)="createQuote($event)">
        <label>
          Correo para cotización
          <input type="email" name="email" [(ngModel)]="quoteEmail" required />
        </label>
        <button type="submit">Generar cotización</button>
      </form>

      <div *ngIf="quoteCode" class="quote-success">
        Cotización creada con folio <strong>{{ quoteCode }}</strong>.
      </div>

      <button *ngIf="cart().length > 0" class="cart-clear" type="button" (click)="clear()">
        Vaciar carrito
      </button>
    </section>
  `,
  styles: [
    `
    .cart-card {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1.25rem;
      border-radius: 1rem;
      background: white;
      box-shadow: 0 18px 70px rgba(10, 17, 29, 0.07);
    }

    .cart-card__header {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: center;
    }

    .eyebrow {
      margin: 0 0 0.25rem;
      color: #7a7a7a;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .cart-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 2rem;
      min-height: 2rem;
      border-radius: 999px;
      background: #111827;
      color: white;
      font-weight: 700;
    }

    .cart-empty {
      padding: 1rem;
      border-radius: 0.75rem;
      background: #fbfaf8;
      color: #4b5563;
    }
    s

    .cart-item {
      display: flex;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.9rem 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .cart-item__title {
      margin: 0 0 0.25rem;
      font-weight: 600;
    }

    .cart-item__meta {
      margin: 0;
      color: #6b7280;
      font-size: 0.9rem;
    }

    .cart-item__prices {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.4rem;
      text-align: right;
    }

    .cart-item__prices button {
      border: none;
      background: transparent;
      color: #ef4444;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .cart-summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 0.5rem;
      border-top: 1px solid #e5e7eb;
    }

    .cart-summary__label {
      margin: 0;
      color: #6b7280;
    }

    .cart-summary__value {
      margin: 0;
      font-weight: 700;
      font-size: 1.1rem;
    }

    .cart-clear {
      width: 100%;
      padding: 0.9rem 1rem;
      border-radius: 0.75rem;
      border: 1px solid #d1d5db;
      background: #f9fafb;
      color: #111827;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .cart-clear:hover {
      background: #f3f4f6;
    }

    .cart-pay {
      width: 100%;
      padding: 0.95rem 1rem;
      border-radius: 0.75rem;
      border: none;
      background: #009ee3;
      color: white;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .cart-pay:hover:not(:disabled) {
      background: #0084c7;
    }

    .cart-pay:disabled {
      opacity: 0.7;
      cursor: default;
    }

    .cart-pay-error {
      padding: 0.75rem 1rem;
      border-radius: 0.75rem;
      background: #fef2f2;
      color: #b91c1c;
      font-size: 0.9rem;
    }
    `
  ]
})
export class CartComponent {
  cartService = inject(CartService);
  private api = inject(ApiService);
  cart = this.cartService.cart;
  total = this.cartService.total;
  quoteEmail = '';
  quoteCode = '';
  paying = signal(false);
  payError = signal('');

  remove(id: number, wood: string) {
    this.cartService.removeItem(id, wood);
  }

  clear() {
    this.cartService.clearCart();
    this.quoteCode = '';
  }

  createQuote(event: Event) {
    event.preventDefault();
    if (!this.quoteEmail) {
      return;
    }
    this.quoteCode = `COT-${Math.floor(Math.random() * 90000) + 10000}`;
    this.cartService.clearCart();
  }

  payWithMercadoPago() {
    if (this.cart().length === 0) {
      return;
    }
    this.paying.set(true);
    this.payError.set('');

    const items = this.cart().map((item) => ({
      title: `${item.name} (${item.wood})`,
      quantity: item.qty,
      unit_price: item.unitPrice,
    }));

    this.api.createPayment(items).subscribe({
      next: (res) => {
        // Redirige al checkout de Mercado Pago
        window.location.href = res.url;
      },
      error: (err) => {
        console.error('Error al iniciar el pago:', err);
        this.paying.set(false);
        this.payError.set(
          'No se pudo iniciar el pago. Verifica que la API esté corriendo y el Access Token configurado.'
        );
      },
    });
  }
}
