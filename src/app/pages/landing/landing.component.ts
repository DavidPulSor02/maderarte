import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';
import { WhatWeDoComponent } from '../../components/what-we-do/what-we-do.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, HeroComponent, WhatWeDoComponent],
  template: `
    <nav class="landing-nav">
      <a routerLink="/" class="landing-brand">
        <span class="landing-brand__mark">M</span> Maderarte
      </a>
      <div class="landing-nav__links">
        <a routerLink="/tienda">Tienda</a>
        <ng-container *ngIf="!auth.isLoggedIn(); else loggedIn">
          <a routerLink="/login">Ingresar</a>
          <a routerLink="/register" class="landing-cta">Crear cuenta</a>
        </ng-container>
        <ng-template #loggedIn>
          <a routerLink="/tienda" class="landing-cta">Ir a la tienda</a>
        </ng-template>
      </div>
    </nav>

    <app-hero></app-hero>

    <footer>
      <div class="footer-grid">
        <div class="footer-brand">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:.5rem">
            <div style="width:36px;height:36px;border-radius:50%;background:var(--orange);overflow:hidden;display:flex;align-items:center;justify-content:center;color:white;font-weight:700">M</div>
            <span style="color:var(--white);font-family:'Playfair Display',serif;font-size:18px;font-weight:700">Maderarte</span>
          </div>
          <p>Transformamos madera en obras de arte para tu hogar</p>
        </div>
        <div class="footer-col">
          <h4>Contacto</h4>
          <p>📞 +52 55 1234 5678</p>
          <p>✉️ info@maderarte.com</p>
          <p>📍 Ciudad de México, México</p>
        </div>
        <div class="footer-col">
          <h4>Horarios</h4>
          <p><strong style="color:var(--white)">Lunes a Viernes</strong></p>
          <p>9:00 AM – 6:00 PM</p>
          <p><strong style="color:var(--white)">Sábado</strong></p>
          <p>10:00 AM – 2:00 PM</p>
          <p>Domingo: Cerrado</p>
        </div>
      </div>
      <div class="footer-bottom">© 2026 MaderArte. Todos los derechos reservados.</div>
    </footer>
  `,
  styles: [
    `
    .landing-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: #fff;
      box-shadow: 0 2px 20px rgba(0,0,0,0.05);
      position: sticky;
      top: 0;
      z-index: 20;
    }
    .landing-brand {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 700;
      color: #8b5a2b;
      text-decoration: none;
      font-size: 1.1rem;
    }
    .landing-brand__mark {
      width: 32px; height: 32px;
      border-radius: 50%;
      background: #e07b39;
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
    .landing-nav__links {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }
    .landing-nav__links a {
      color: #4b3a2b;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
    }
    .landing-nav__links a:hover { color: #8b5a2b; }
    .landing-cta {
      background: #8b5a2b;
      color: #fff !important;
      padding: 0.55rem 1rem;
      border-radius: 0.7rem;
    }
    .landing-cta:hover { background: #6f4322; }
    `,
  ],
})
export class LandingComponent {
  auth = inject(AuthService);
}
