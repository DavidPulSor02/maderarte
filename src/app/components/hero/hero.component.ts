import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- ===== HERO ===== -->
    <div class="hero">
      <img src="assets/hero-bg.jpg" alt="Taller de carpintería" class="hero-bg-img" />
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-badges">
          <span class="hero-badge">🚚 Envío a domicilio</span>
          <span class="hero-badge">💵 Pago contra entrega</span>
          <span class="hero-badge">⭐ Artesanal 100%</span>
        </div>
        <h1>Arte en madera<br><span>para tu hogar</span></h1>
        <p>Muebles a medida, reparaciones profesionales y presupuestos personalizados. Madera de calidad, entregada en tu puerta.</p>
        <div class="hero-actions">
          <button class="btn-primary btn-pulse" (click)="irATienda()">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Ver catálogo y cotizar
          </button>
          <button class="btn-outline" (click)="irATienda()">Nuestros trabajos →</button>
        </div>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="hero-stat__num">+500</span>
            <span class="hero-stat__label">Clientes felices</span>
          </div>
          <div class="hero-stat-divider"></div>
          <div class="hero-stat">
            <span class="hero-stat__num">12</span>
            <span class="hero-stat__label">Años de experiencia</span>
          </div>
          <div class="hero-stat-divider"></div>
          <div class="hero-stat">
            <span class="hero-stat__num">8</span>
            <span class="hero-stat__label">Tipos de madera</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== SERVICIOS ===== -->
    <div class="services">
      <div class="section-header">
        <span class="section-eyebrow">Lo que ofrecemos</span>
        <h2>Carpintería artesanal <br>a tu medida</h2>
        <p>Calidad, precisión y atención personalizada en cada proyecto</p>
      </div>
      <div class="services-grid">
        <div class="service-card" (click)="irATienda()" style="cursor:pointer">
          <div class="service-img">
            <img src="assets/dining-table.jpg" alt="Diseño de muebles" class="service-img-custom" loading="lazy">
            <span class="service-badge">Diseño</span>
          </div>
          <div class="service-body">
            <h3>Productos a medida</h3>
            <p>Mesas, sillas, estantes y muebles personalizados según tu espacio y estilo.</p>
            <span class="service-link">Cotizar ahora →</span>
          </div>
        </div>
        <div class="service-card" (click)="irATienda()" style="cursor:pointer">
          <div class="service-img">
            <img src="assets/cabinet.jpg" alt="Reparación de muebles" class="service-img-custom" loading="lazy">
            <span class="service-badge">Expertos</span>
          </div>
          <div class="service-body">
            <h3>Reparaciones profesionales</h3>
            <p>Restauramos y reparamos tus muebles de madera con atención al detalle.</p>
            <span class="service-link">Solicitar reparación →</span>
          </div>
        </div>
        <div class="service-card" (click)="irATienda()" style="cursor:pointer">
          <div class="service-img">
            <img src="assets/shelf.jpg" alt="Tipos de madera" class="service-img-custom" loading="lazy">
            <span class="service-badge">Materiales</span>
          </div>
          <div class="service-body">
            <h3>Tipos de madera</h3>
            <p>Roble, nogal, pino y más. Selecciona la madera perfecta para tu proyecto.</p>
            <span class="service-link">Ver catálogo →</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== PROCESO DE COMPRA ===== -->
    <div class="process-section">
      <div class="section-header">
        <span class="section-eyebrow">Así de fácil</span>
        <h2>Tu mueble en 3 pasos</h2>
        <p>Sin complicaciones, sin sorpresas</p>
      </div>
      <div class="process-steps">
        <div class="process-step">
          <div class="process-step__num">01</div>
          <div class="process-step__icon">🛒</div>
          <h3>Elige y cotiza</h3>
          <p>Selecciona el producto, el tipo de madera y ajusta el tamaño. Recibe tu cotización al instante.</p>
        </div>
        <div class="process-arrow">→</div>
        <div class="process-step">
          <div class="process-step__num">02</div>
          <div class="process-step__icon">🪵</div>
          <h3>Confirmamos y fabricamos</h3>
          <p>Nuestros artesanos comienzan a trabajar. Puedes rastrear el progreso de tu pedido en tiempo real.</p>
        </div>
        <div class="process-arrow">→</div>
        <div class="process-step">
          <div class="process-step__num">03</div>
          <div class="process-step__icon">🏠</div>
          <h3>Recibe y paga</h3>
          <p>Te entregamos en casa. Pago seguro contra entrega. ¡Sin anticipos!</p>
        </div>
      </div>
    </div>

    <!-- ===== POR QUÉ ELEGIRNOS ===== -->
    <div class="features">
      <div class="section-header">
        <span class="section-eyebrow">Nuestras garantías</span>
        <h2>¿Por qué elegirnos?</h2>
        <p>Tres pilares que nos distinguen</p>
      </div>
      <div class="features-grid">
        <div class="feature-card accent">
          <div class="feature-icon">💵</div>
          <h3>Pago contra entrega</h3>
          <p>Paga únicamente cuando recibas tu mueble en casa. Sin anticipos, sin riesgos.</p>
          <span class="feature-badge">Exclusivo Maderarte</span>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>Inventario en tiempo real</h3>
          <p>Consulta disponibilidad actualizada al momento. Sin esperas ni sorpresas en tu pedido.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📍</div>
          <h3>Seguimiento completo</h3>
          <p>Rastrea tu pedido desde el corte hasta la entrega con nuestro sistema de tracking.</p>
        </div>
      </div>
    </div>

    <!-- ===== TESTIMONIOS ===== -->
    <div class="testimonials-section">
      <div class="section-header">
        <span class="section-eyebrow">Lo que dicen nuestros clientes</span>
        <h2>Miles de hogares<br>ya confían en nosotros</h2>
      </div>
      <div class="testimonials-grid">
        <div class="testimonial-card">
          <div class="testimonial-stars">★★★★★</div>
          <p class="testimonial-text">"Pedí una mesa de roble a medida y superó mis expectativas. La calidad de la madera es increíble y el acabado es perfecto. ¡Volveré a pedir!"</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">ML</div>
            <div>
              <strong>María López</strong>
              <span>Ciudad de México</span>
            </div>
          </div>
        </div>
        <div class="testimonial-card testimonial-card--accent">
          <div class="testimonial-stars">★★★★★</div>
          <p class="testimonial-text">"Me repararon un armario antiguo que tenía mucho valor sentimental. El resultado fue impresionante. Lo dejaron como nuevo. ¡Excelente servicio!"</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">CR</div>
            <div>
              <strong>Carlos Rodríguez</strong>
              <span>Guadalajara</span>
            </div>
          </div>
        </div>
        <div class="testimonial-card">
          <div class="testimonial-stars">★★★★★</div>
          <p class="testimonial-text">"El sistema de cotización es rapidísimo. En 5 minutos tenía el precio exacto de mis estantes. Y el seguimiento del pedido es muy tranquilizador."</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">AG</div>
            <div>
              <strong>Ana Gutiérrez</strong>
              <span>Monterrey</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== CTA FINAL ===== -->
    <div class="cta-section">
      <div class="cta-content">
        <h2>¿Listo para transformar tu hogar?</h2>
        <p>Cotiza tu proyecto hoy y recibe una respuesta en menos de 24 horas.</p>
        <button class="cta-btn" (click)="irATienda()">
          Empezar mi proyecto →
        </button>
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
