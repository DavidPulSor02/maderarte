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
      padding: 0.8rem 2rem;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
      position: sticky;
      top: 1rem;
      z-index: 50;
      margin: 1rem auto;
      max-width: 1200px;
      border-radius: 100px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      transition: all 0.3s ease;
    }
    .landing-brand {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      font-weight: 800;
      color: #2b1d12;
      text-decoration: none;
      font-size: 1.25rem;
      font-family: 'Playfair Display', serif;
    }
    .landing-brand__mark {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, #e07b39, #8b5a2b);
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.1rem;
      box-shadow: 0 2px 10px rgba(224, 123, 57, 0.3);
    }
    .landing-nav__links {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .landing-nav__links a {
      color: #4b3a2b;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      transition: color 0.2s;
    }
    .landing-nav__links a:not(.landing-cta):hover {
      color: #e07b39;
    }
    .landing-cta {
      background: #2b1d12;
      color: #fff !important;
      padding: 0.6rem 1.25rem;
      border-radius: 100px;
      transition: all 0.3s ease;
      font-weight: 600;
      box-shadow: 0 4px 15px rgba(43, 29, 18, 0.2);
    }
    .landing-cta:hover { 
      background: #e07b39; 
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(224, 123, 57, 0.3);
    }
    `,
  ],
})
export class LandingComponent {
  auth = inject(AuthService);
}
