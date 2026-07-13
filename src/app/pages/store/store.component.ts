import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { CartComponent } from '../../components/cart/cart.component';
import { TrackingComponent } from '../../components/tracking/tracking.component';
import { RepairRequestComponent } from '../../components/repair/repair.component';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

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
    <header class="store-header">
      <div class="store-brand">
        <span class="store-brand__mark">M</span> Maderarte
      </div>

      <nav class="store-tabs">
        <button [class.active]="section() === 'catalogo'" (click)="section.set('catalogo')">Catálogo</button>
        <button [class.active]="section() === 'carrito'" (click)="section.set('carrito')">
          Cotización
          <span class="tab-badge" *ngIf="cart.cartCount() > 0">{{ cart.cartCount() }}</span>
        </button>
        <button [class.active]="section() === 'pedido'" (click)="section.set('pedido')">Mi pedido</button>
        <button [class.active]="section() === 'reparaciones'" (click)="section.set('reparaciones')">Reparaciones</button>
      </nav>

      <div class="store-user">
        <span class="store-user__email" *ngIf="auth.user() as u">{{ u.email }}</span>
        <button class="store-logout" (click)="logout()">Salir</button>
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
    :host { display: block; min-height: 100vh; background: #fbf7f1; }
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
      font-weight: 700;
      color: #8b5a2b;
    }
    .store-brand__mark {
      width: 30px; height: 30px;
      border-radius: 50%;
      background: #e07b39;
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
      color: #6b5844;
      font-weight: 600;
      padding: 0.55rem 0.9rem;
      border-radius: 0.6rem;
      cursor: pointer;
    }
    .store-tabs button:hover { background: #f3ece2; }
    .store-tabs button.active { background: #8b5a2b; color: #fff; }
    .tab-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.2rem;
      height: 1.2rem;
      padding: 0 0.35rem;
      margin-left: 0.35rem;
      border-radius: 999px;
      background: #e07b39;
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
      border: 1px solid #d8c7b3;
      background: #fff;
      color: #8b5a2b;
      font-weight: 600;
      padding: 0.5rem 0.9rem;
      border-radius: 0.6rem;
      cursor: pointer;
    }
    .store-logout:hover { background: #f3ece2; }
    .store-main {
      max-width: 1150px;
      margin: 0 auto;
      padding: 2rem 1.5rem 4rem;
    }
    .store-heading { margin-bottom: 1.5rem; }
    .store-heading h1 { margin: 0 0 0.35rem; color: #2b1d12; }
    .store-heading p { margin: 0; color: #6b7280; }
    `,
  ],
})
export class StoreComponent {
  cart = inject(CartService);
  auth = inject(AuthService);
  private router = inject(Router);

  section = signal<Section>('catalogo');

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
