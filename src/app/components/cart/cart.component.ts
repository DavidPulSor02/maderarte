import { Component, inject, signal } from '@angular/core';
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
          <p class="eyebrow">Cotización</p>
          <h2>Tu selección</h2>
        </div>
        <span class="cart-badge">{{ cartService.cartCount() }}</span>
      </div>

      @if (cart().length === 0) {
        <div class="cart-empty">
          <p>Tu cotización está vacía.</p>
          <small>Agrega muebles desde el catálogo para comenzar.</small>
        </div>
      }

      @if (cart().length > 0) {
        <div class="cart-items">
          @for (item of cart(); track item.id + '-' + item.wood) {
            <div class="cart-item">
              <img class="cart-item__img" [src]="item.image" [alt]="item.name" />
              <div class="cart-item__info">
                <p class="cart-item__title">{{ item.name }}</p>
                <p class="cart-item__meta">{{ item.wood }} · $ {{ item.unitPrice | number: '1.0-0' }} c/u</p>
                <div class="qty-stepper">
                  <button type="button" (click)="dec(item.id, item.wood)" aria-label="Restar">−</button>
                  <span>{{ item.qty }}</span>
                  <button type="button" (click)="inc(item.id, item.wood)" aria-label="Sumar">+</button>
                </div>
              </div>
              <div class="cart-item__right">
                <span class="cart-item__subtotal">$ {{ item.qty * item.unitPrice | number: '1.0-0' }}</span>
                <button class="cart-item__remove" type="button" (click)="remove(item.id, item.wood)">Eliminar</button>
              </div>
            </div>
          }
        </div>

        <div class="cart-summary">
          <p class="cart-summary__label">Total</p>
          <p class="cart-summary__value">$ {{ total() | number: '1.0-0' }} <small>MXN</small></p>
        </div>

        <button class="cart-pay" type="button" [disabled]="paying()" (click)="payWithMercadoPago()">
          {{ paying() ? 'Redirigiendo…' : 'Pagar con Mercado Pago' }}
        </button>

        @if (payError()) {
          <div class="cart-msg cart-msg--error">{{ payError() }}</div>
        }

        <form class="quote-form" (submit)="createQuote($event)">
          <label>
            Correo para la cotización
            <input type="email" name="email" [(ngModel)]="quoteEmail" required />
          </label>
          <label>
            WhatsApp (con lada, ej. +52…)
            <input type="tel" name="phone" [(ngModel)]="quotePhone" placeholder="+521..." />
          </label>
          <button type="submit" [disabled]="notifying()">
            {{ notifying() ? 'Generando…' : 'Generar cotización' }}
          </button>
        </form>

        <button class="cart-clear" type="button" (click)="clear()">Vaciar carrito</button>
      }

      @if (quoteMsg()) {
        <div class="cart-msg cart-msg--ok">{{ quoteMsg() }}</div>
      }
      @if (quoteError()) {
        <div class="cart-msg cart-msg--warn">{{ quoteError() }}</div>
      }
    </section>
  `,
  styles: [
    `
      .cart-card {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem;
        border-radius: 16px;
        background: #fff;
        box-shadow: 0 18px 60px rgba(59, 31, 14, 0.1);
        border: 1px solid #efe5d6;
      }
      .cart-card__header {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
      }
      .cart-card__header h2 {
        margin: 0;
        color: #2a1a0d;
        font-family: 'Playfair Display', serif;
      }
      .eyebrow {
        margin: 0 0 0.15rem;
        color: #b8860b;
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-weight: 700;
      }
      .cart-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 2rem;
        min-height: 2rem;
        border-radius: 999px;
        background: #6b3a1f;
        color: #fff;
        font-weight: 700;
      }
      .cart-empty {
        padding: 2rem 1rem;
        text-align: center;
        border-radius: 12px;
        background: #faf6f0;
        color: #5a3e28;
        border: 1px dashed #e2d3bf;
      }
      .cart-empty p { margin: 0 0 0.25rem; font-weight: 600; }
      .cart-empty small { color: #8b6b4a; }

      .cart-items { display: flex; flex-direction: column; }
      .cart-item {
        display: grid;
        grid-template-columns: 56px 1fr auto;
        gap: 0.85rem;
        padding: 0.9rem 0;
        border-bottom: 1px solid #f0e8db;
        align-items: center;
      }
      .cart-item__img {
        width: 56px;
        height: 56px;
        object-fit: cover;
        border-radius: 10px;
      }
      .cart-item__title { margin: 0 0 0.2rem; font-weight: 600; color: #2a1a0d; }
      .cart-item__meta { margin: 0 0 0.5rem; color: #8b6b4a; font-size: 0.82rem; }

      .qty-stepper {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: #f7f3ec;
        border: 1px solid #e6d8c5;
        border-radius: 999px;
        padding: 0.15rem 0.35rem;
      }
      .qty-stepper button {
        width: 26px;
        height: 26px;
        border: none;
        border-radius: 50%;
        background: #fff;
        color: #6b3a1f;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        line-height: 1;
      }
      .qty-stepper button:hover { background: #6b3a1f; color: #fff; }
      .qty-stepper span { min-width: 1.4rem; text-align: center; font-weight: 700; color: #2a1a0d; }

      .cart-item__right { text-align: right; display: flex; flex-direction: column; gap: 0.4rem; align-items: flex-end; }
      .cart-item__subtotal { font-weight: 700; color: #2a1a0d; }
      .cart-item__remove {
        border: none;
        background: transparent;
        color: #c0392b;
        cursor: pointer;
        font-size: 0.82rem;
      }
      .cart-item__remove:hover { text-decoration: underline; }

      .cart-summary {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding-top: 0.75rem;
        margin-top: 0.25rem;
        border-top: 2px solid #f0e8db;
      }
      .cart-summary__label { margin: 0; color: #5a3e28; font-weight: 600; }
      .cart-summary__value {
        margin: 0;
        font-weight: 800;
        font-size: 1.5rem;
        color: #2a1a0d;
        font-family: 'Playfair Display', serif;
      }
      .cart-summary__value small { font-size: 0.7rem; color: #8b6b4a; font-family: inherit; }

      .cart-pay {
        width: 100%;
        padding: 0.95rem 1rem;
        border-radius: 12px;
        border: none;
        background: #009ee3;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.2s ease;
      }
      .cart-pay:hover:not(:disabled) { background: #0084c7; }
      .cart-pay:disabled { opacity: 0.6; cursor: default; }

      .quote-form {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        padding: 1rem;
        background: #faf6f0;
        border-radius: 12px;
        border: 1px solid #efe5d6;
      }
      .quote-form label {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        font-size: 0.82rem;
        color: #5a3e28;
        font-weight: 600;
      }
      .quote-form input {
        border: 1px solid #e0d2bf;
        border-radius: 9px;
        padding: 0.6rem 0.75rem;
        font-size: 0.9rem;
        background: #fff;
        color: #2a1a0d;
      }
      .quote-form input:focus { outline: 2px solid #d97b45; border-color: transparent; }
      .quote-form button {
        margin-top: 0.25rem;
        border: none;
        border-radius: 10px;
        padding: 0.8rem 1rem;
        background: #f96302;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.2s ease;
      }
      .quote-form button:hover:not(:disabled) { background: #e25601; }
      .quote-form button:disabled { opacity: 0.6; cursor: default; }

      .cart-clear {
        width: 100%;
        padding: 0.8rem 1rem;
        border-radius: 10px;
        border: 1px solid #e0d2bf;
        background: #fff;
        color: #6b3a1f;
        cursor: pointer;
        font-weight: 600;
      }
      .cart-clear:hover { background: #f7f3ec; }

      .cart-msg {
        padding: 0.75rem 1rem;
        border-radius: 10px;
        font-size: 0.88rem;
        font-weight: 600;
      }
      .cart-msg--error { background: #fdecea; color: #c0392b; }
      .cart-msg--warn { background: #fff8e1; color: #b8860b; }
      .cart-msg--ok { background: #e8f5ee; color: #2d7a4e; }
    `,
  ],
})
export class CartComponent {
  cartService = inject(CartService);
  private api = inject(ApiService);

  cart = this.cartService.cart;
  total = this.cartService.total;

  quoteEmail = '';
  quotePhone = '';

  paying = signal(false);
  payError = signal('');
  notifying = signal(false);
  quoteMsg = signal('');
  quoteError = signal('');

  inc(id: number, wood: string) {
    this.cartService.increaseQty(id, wood);
  }

  dec(id: number, wood: string) {
    this.cartService.decreaseQty(id, wood);
  }

  remove(id: number, wood: string) {
    this.cartService.removeItem(id, wood);
  }

  clear() {
    this.cartService.clearCart();
    this.quoteMsg.set('');
    this.quoteError.set('');
  }

  createQuote(event: Event) {
    event.preventDefault();
    if (!this.quoteEmail || this.cart().length === 0) return;

    const folio = `COT-${Math.floor(Math.random() * 90000) + 10000}`;
    const total = this.total();
    this.quoteError.set('');
    this.quoteMsg.set('');

    const finish = (extra = '') => {
      this.quoteMsg.set(`Cotización ${folio} generada por $ ${total.toLocaleString()} MXN.${extra}`);
      this.cartService.clearCart();
      this.quoteEmail = '';
      this.quotePhone = '';
    };

    // Si dejó WhatsApp, enviamos confirmación vía la API de notificaciones (Twilio).
    if (this.quotePhone.trim()) {
      this.notifying.set(true);
      this.api
        .sendNotification({
          to: this.quotePhone.trim(),
          body: `Muebles Zajo: tu cotización ${folio} por $${total.toLocaleString()} MXN quedó registrada. ¡Gracias por tu preferencia!`,
          type: 'whatsapp',
        })
        .subscribe({
          next: () => {
            this.notifying.set(false);
            finish(' Te enviamos la confirmación por WhatsApp.');
          },
          error: () => {
            this.notifying.set(false);
            finish('');
            this.quoteError.set(
              'La cotización se generó, pero no pudimos enviar el WhatsApp (revisa que la API esté corriendo y el número esté unido al sandbox).'
            );
          },
        });
    } else {
      finish('');
    }
  }

  payWithMercadoPago() {
    if (this.cart().length === 0) return;
    this.paying.set(true);
    this.payError.set('');

    const items = this.cart().map((item) => ({
      title: `${item.name} (${item.wood})`,
      quantity: item.qty,
      unit_price: item.unitPrice,
    }));

    this.api.createPayment(items).subscribe({
      next: (res) => {
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
