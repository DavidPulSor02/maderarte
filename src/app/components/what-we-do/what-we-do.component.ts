import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-what-we-do',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="services-panel">
      <div class="section-heading">
        <p class="eyebrow">Qué hacemos</p>
        <h2>Servicios completos para tu proyecto de carpintería</h2>
      </div>
      <div class="service-grid">
        <article class="service-card">
          <strong>Productos a medida</strong>
          <p>Mesas, sillas, estantes y armarios con diseño adaptado a tu espacio.</p>
        </article>
        <article class="service-card">
          <strong>Cotizaciones rápidas</strong>
          <p>Selecciona madera, ajusta precios y recibe folio de cotización al instante.</p>
        </article>
        <article class="service-card">
          <strong>Reparaciones profesionales</strong>
          <p>Envía fotos del daño, recibe diagnóstico y seguimiento para tu pedido.</p>
        </article>
      </div>
    </section>
  `
})
export class WhatWeDoComponent {}
