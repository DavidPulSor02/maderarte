import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hero">
      <div class="hero-content">
        <h1>Arte en madera<br><span>para tu hogar</span></h1>
        <p>Presupuestos personalizados, precios variables según la madera y seguimiento completo de tu pedido.</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <button class="btn-primary" (click)="irATienda()">Cotiza tu proyecto →</button>
          <button class="btn-outline" (click)="irATienda()">Ver catálogo</button>
        </div>
      </div>
    </div>
    
    <div class="services">
      <div class="section-header">
        <h2>Lo que ofrecemos</h2>
        <p>Calidad artesanal y atención personalizada en cada proyecto</p>
      </div>
      <div class="services-grid">
        <div class="service-card">
          <div class="service-img">
            <img src="assets/dining-table.jpg" alt="Diseño de muebles" class="service-img-custom" loading="lazy">
            <span class="service-badge">Diseño</span>
          </div>
          <div class="service-body">
            <h3>Productos a medida</h3>
            <p>Mesas, sillas, estantes y muebles personalizados según tus necesidades.</p>
          </div>
        </div>
        <div class="service-card">
          <div class="service-img">
            <img src="assets/cabinet.jpg" alt="Reparación de muebles" class="service-img-custom" loading="lazy">
            <span class="service-badge">Expertos</span>
          </div>
          <div class="service-body">
            <h3>Reparaciones profesionales</h3>
            <p>Restauramos y reparamos tus muebles de madera con atención al detalle.</p>
          </div>
        </div>
        <div class="service-card">
          <div class="service-img">
            <img src="assets/shelf.jpg" alt="Tipos de madera" class="service-img-custom" loading="lazy">
            <span class="service-badge">Materiales</span>
          </div>
          <div class="service-body">
            <h3>Tipos de madera</h3>
            <p>Roble, nogal, pino y más. Selecciona la madera perfecta para tu proyecto.</p>
          </div>
        </div>
      </div>
    </div>
    

    <div class="features">
      <div class="section-header">
        <h2>¿Por qué elegirnos?</h2>
        <p>Tres pilares que nos distinguen</p>
      </div>
      <div class="features-grid">
        <div class="feature-card accent">
          <div class="feature-icon">💲</div>
          <h3>Solo pagamos en efectivo</h3>
          <p>Pago seguro al recibir tu pedido en la comodidad de tu hogar.</p>
          <span class="feature-badge">Método de pago exclusivo</span>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>Inventario actualizado</h3>
          <p>Consulta disponibilidad en tiempo real sin sorpresas.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📈</div>
          <h3>Estado de progreso</h3>
          <p>Seguimiento completo de tu pedido desde el corte hasta la entrega.</p>
        </div>
      </div>
    </div>
  `
})
export class HeroComponent {
  private router = inject(Router);

  irATienda() {
    // La tienda está protegida: si no hay sesión, el guard redirige a /login.
    this.router.navigate(['/tienda']);
  }
}

