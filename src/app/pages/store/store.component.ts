import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { CartComponent } from '../../components/cart/cart.component';
import { TrackingComponent } from '../../components/tracking/tracking.component';
import { RepairRequestComponent } from '../../components/repair/repair.component';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';

type Section = 'catalogo' | 'carrito' | 'pedido' | 'reparaciones';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    CommonModule,
    ProductListComponent,
    CartComponent,
    TrackingComponent,
    RepairRequestComponent,
  ],
  template: `
    <header class="hd-header">
      <div class="hd-bar">
        <a class="hd-logo" (click)="section.set('catalogo')">
          <img src="assets/logo-zajo.png" alt="Muebles Zajo" (error)="onLogoError($event)" />
        </a>

        <div class="hd-nav">
          <button class="hd-nav__item" [class.active]="section() === 'catalogo'" (click)="section.set('catalogo')">
            <span class="hd-nav__ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
            </span> Catálogo
          </button>
          <button class="hd-nav__item" [class.active]="section() === 'reparaciones'" (click)="section.set('reparaciones')">
            <span class="hd-nav__ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            </span> Reparaciones
          </button>
        </div>

        <div class="hd-search">
          <input
            type="search"
            placeholder="¿Qué buscas hoy?"
            [value]="productService.search()"
            (input)="onSearch($any($event.target).value)"
          />
          <button class="hd-search__btn" (click)="section.set('catalogo')" aria-label="Buscar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
        </div>

        <div class="hd-actions">
          <button class="hd-action" (click)="logout()">
            <span class="hd-action__ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </span><span>Cuenta</span>
          </button>
          <button class="hd-action" [class.active]="section() === 'pedido'" (click)="section.set('pedido')">
            <span class="hd-action__ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 9.4 7.5 4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.27 6.96 8.73 5.05 8.73-5.05"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </span><span>Órdenes</span>
          </button>
          <button class="hd-action hd-action--cart" [class.active]="section() === 'carrito'" (click)="section.set('carrito')">
            <span class="hd-action__ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            </span><span>Carrito</span>
            <span class="hd-badge" *ngIf="cart.cartCount() > 0">{{ cart.cartCount() }}</span>
          </button>
        </div>
      </div>

      <div class="hd-strip">
        <span class="hd-strip__open">Abierto</span> · Muebles Zajo
        <span class="hd-strip__loc" *ngIf="auth.user() as u">· {{ u.email }}</span>
      </div>
    </header>

    <main class="store-main">
      <ng-container [ngSwitch]="section()">
        <div *ngSwitchCase="'catalogo'">
          <div class="store-heading">
            <h1>Nuestros productos</h1>
            <p>Encuentra el mueble perfecto para tu hogar. Los precios varían según la madera.</p>
          </div>
          <app-product-list></app-product-list>
        </div>

        <div *ngSwitchCase="'carrito'">
          <div class="store-heading">
            <h1>Tu cotización</h1>
            <p>Revisa tu selección y paga en línea con Mercado Pago.</p>
          </div>
          <app-cart></app-cart>
        </div>

        <div *ngSwitchCase="'pedido'">
          <div class="store-heading">
            <h1>Seguimiento de tu pedido</h1>
            <p>Consulta el estado con tu folio o correo.</p>
          </div>
          <app-tracking></app-tracking>
        </div>

        <div *ngSwitchCase="'reparaciones'">
          <div class="store-heading">
            <h1>Solicitud de reparación</h1>
            <p>Restauramos y reparamos tus muebles de madera.</p>
          </div>
          <app-repair-request></app-repair-request>
        </div>
      </ng-container>
    </main>
  `,
  styles: [
    `
    :host { display: block; min-height: 100vh; background: #f5f5f5; }

    /* ===== Header estilo Home Depot ===== */
    .hd-header {
      background: #fff;
      border-bottom: 1px solid #e6e6e6;
      position: sticky;
      top: 0;
      z-index: 30;
    }
    .hd-bar {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0.6rem 1.25rem;
    }
    .hd-logo {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      text-decoration: none;
      flex-shrink: 0;
    }
    .hd-logo img { width: 46px; height: 46px; object-fit: contain; display: block; }
    .hd-logo__name {
      font-weight: 800;
      font-size: 0.95rem;
      line-height: 1;
      color: #2e8bd6;
      letter-spacing: 0.02em;
    }
    .hd-nav { display: flex; gap: 0.25rem; flex-shrink: 0; }
    .hd-nav__item {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      border: none;
      background: transparent;
      color: #333;
      font-weight: 600;
      font-size: 0.95rem;
      padding: 0.5rem 0.7rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .hd-nav__item:hover { color: #f96302; }
    .hd-nav__item.active { color: #f96302; }
    .hd-nav__ico { display: inline-flex; }
    .hd-nav__ico svg { width: 18px; height: 18px; }

    .hd-search {
      flex: 1;
      display: flex;
      align-items: stretch;
      min-width: 180px;
      border: 2px solid #d0d0d0;
      border-radius: 6px;
      overflow: hidden;
      transition: border-color 0.15s;
    }
    .hd-search:focus-within { border-color: #f96302; }
    .hd-search input {
      flex: 1;
      border: none;
      outline: none;
      padding: 0.7rem 1rem;
      font-size: 0.95rem;
      color: #111;
      background: #fff;
    }
    .hd-search__btn {
      border: none;
      background: #fff;
      color: #f96302;
      font-size: 1.1rem;
      padding: 0 1rem;
      cursor: pointer;
    }
    .hd-search__btn:hover { background: #fff5ef; }
    .hd-search__btn svg { width: 20px; height: 20px; display: block; }

    .hd-actions { display: flex; gap: 0.35rem; flex-shrink: 0; }
    .hd-action {
      position: relative;
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      gap: 0.15rem;
      border: none;
      background: transparent;
      color: #333;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.35rem 0.6rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .hd-action:hover, .hd-action.active { color: #f96302; }
    .hd-action__ico { display: inline-flex; }
    .hd-action__ico svg { width: 22px; height: 22px; }
    .hd-badge {
      position: absolute;
      top: 0.1rem;
      right: 0.35rem;
      min-width: 1.05rem;
      height: 1.05rem;
      padding: 0 0.28rem;
      border-radius: 999px;
      background: #f96302;
      color: #fff;
      font-size: 0.68rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .hd-strip {
      border-top: 1px solid #f0f0f0;
      background: #fff;
      font-size: 0.82rem;
      color: #555;
      padding: 0.4rem 1.25rem;
      max-width: 1280px;
      margin: 0 auto;
    }
    .hd-strip__open { color: #237a3e; font-weight: 700; }

    @media (max-width: 900px) {
      .hd-bar { flex-wrap: wrap; }
      .hd-search { order: 5; width: 100%; flex-basis: 100%; }
      .hd-logo__name { display: none; }
    }
    .store-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
      padding: 0.9rem 1.5rem;
      background: #fff;
      box-shadow: 0 2px 20px rgba(0,0,0,0.05);
      position: sticky;
      top: 0;
      z-index: 20;
    }
    .store-brand {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 800;
      font-size: 1.15rem;
      color: #111;
    }
    .store-brand__mark {
      width: 34px; height: 34px;
      border-radius: 6px;
      background: #f96302;
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
    .store-tabs {
      display: flex;
      gap: 0.25rem;
      flex-wrap: wrap;
    }
    .store-tabs button {
      position: relative;
      border: none;
      background: transparent;
      color: #333;
      font-weight: 600;
      padding: 0.55rem 0.9rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .store-tabs button:hover { background: #fff5ef; color: #f96302; }
    .store-tabs button.active { background: #f96302; color: #fff; }
    .tab-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.2rem;
      height: 1.2rem;
      padding: 0 0.35rem;
      margin-left: 0.35rem;
      border-radius: 999px;
      background: #f96302;
      color: #fff;
      font-size: 0.75rem;
    }
    .store-user {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .store-user__email { color: #6b7280; font-size: 0.9rem; }
    .store-logout {
      border: 1px solid #d0d0d0;
      background: #fff;
      color: #333;
      font-weight: 600;
      padding: 0.5rem 0.9rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .store-logout:hover { background: #f5f5f5; border-color: #f96302; color: #f96302; }
    .store-main {
      max-width: 1150px;
      margin: 0 auto;
      padding: 2rem 1.5rem 4rem;
    }
    .store-heading { margin-bottom: 1.5rem; }
    .store-heading h1 { margin: 0 0 0.35rem; color: #111; font-family: 'DM Sans', Arial, sans-serif; font-weight: 800; }
    .store-heading p { margin: 0; color: #6b7280; }
    `,
  ],
})
export class StoreComponent {
  cart = inject(CartService);
  auth = inject(AuthService);
  productService = inject(ProductService);
  private router = inject(Router);

  section = signal<Section>('catalogo');

  onSearch(value: string) {
    this.productService.search.set(value);
    if (value) this.section.set('catalogo');
  }

  /** Si no existe assets/logo-zajo.png, usa el logo SVG de respaldo. */
  onLogoError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img.src.endsWith('.svg')) return;
    img.src = 'assets/logo-zajo.svg';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
