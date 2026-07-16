import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav>
      <a class="nav-logo" href="#" (click)="showPage('home', $event)">
        <div class="nav-logo-icon">Z</div>
        <span>Muebles Zajo</span>
      </a>
      <div class="nav-links">
        <a href="#" (click)="showPage('home', $event)" id="nav-home" class="active">Inicio</a>
        <a href="#" (click)="showPage('catalog', $event)" id="nav-catalog">Catálogo</a>
        <a href="#" (click)="showPage('quote', $event)" id="nav-quote">
          Cotizar
          <span class="cart-badge" [textContent]="cartService.cartCount()"></span>
        </a>
        <a href="#" (click)="showPage('order', $event)" id="nav-order">Mi Pedido</a>
        <a href="#" (click)="showPage('repair', $event)" id="nav-repair">Reparaciones</a>
      </div>
    </nav>
  `
})
export class HeaderComponent {
  cartService = inject(CartService);

  showPage(page: string, event: Event) {
    event.preventDefault();
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Hide all nav links
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    
    // Show selected page
    const pageEl = document.getElementById('page-' + page);
    if (pageEl) {
      pageEl.classList.add('active');
    }
    
    // Show selected nav link
    const navEl = document.getElementById('nav-' + page);
    if (navEl) {
      navEl.classList.add('active');
    }
    
    window.scrollTo(0, 0);
  }
}

