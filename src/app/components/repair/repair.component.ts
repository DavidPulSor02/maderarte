import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-repair-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="repair-panel" id="reparaciones">
      <div class="section-heading">
        <p class="eyebrow">Reparaciones</p>
        <h2>Solicita diagnóstico y reparación de muebles</h2>
      </div>
      <form class="repair-form" (submit)="submit($event)">
        <label>
          Nombre completo
          <input type="text" [(ngModel)]="name" name="name" required />
        </label>
        <label>
          Correo electrónico
          <input type="email" [(ngModel)]="email" name="email" required />
        </label>
        <label>
          Teléfono
          <input type="tel" [(ngModel)]="phone" name="phone" required />
        </label>
        <label>
          Tipo de madera
          <select [(ngModel)]="wood" name="wood">
            <option *ngFor="let woodType of woodTypes" [value]="woodType">{{ woodType }}</option>
          </select>
        </label>
        <label>
          Tipo de reparación
          <select [(ngModel)]="damageType" name="damageType">
            <option value="Arañazos">Arañazos</option>
            <option value="Desajuste">Desajuste</option>
            <option value="Humedad">Humedad</option>
            <option value="Otro">Otro</option>
          </select>
        </label>
        <label>
          Descripción del daño
          <textarea rows="4" [(ngModel)]="description" name="description" required></textarea>
        </label>
        <label>
          Fotos del daño (hasta 3)
          <input type="file" (change)="updateFiles($event)" multiple accept="image/*" />
          <small>{{ files.length }} archivo(s) seleccionados</small>
        </label>
        <div class="repair-actions">
          <button class="button button-primary" type="submit">Enviar solicitud</button>
          <p class="repair-note">Estimado 300–800 MXN; precio final tras diagnóstico presencial.</p>
        </div>
      </form>

      <div *ngIf="ticketFolio" class="repair-success">
        <p>Solicitud registrada con folio <strong>{{ ticketFolio }}</strong>.</p>
        <p>Estado actual: <strong>Diagnóstico</strong>.</p>
      </div>
    </section>
  `,
  styles: [
    `
    .repair-panel {
      display: grid;
      gap: 1rem;
      padding: 1.5rem;
      background: #fff8e7;
      border-radius: 1.25rem;
      box-shadow: 0 20px 50px rgba(15, 23, 42, 0.05);
    }

    .repair-form {
      display: grid;
      gap: 1rem;
    }

    label {
      display: grid;
      gap: 0.4rem;
      font-size: 0.95rem;
      color: #334155;
    }

    input,
    select,
    textarea {
      border: 1px solid #d1d5db;
      border-radius: 0.9rem;
      padding: 0.95rem 1rem;
      font: inherit;
      background: white;
      color: #111827;
    }

    .repair-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .repair-note {
      margin: 0;
      color: #5b4534;
      font-size: 0.95rem;
    }

    .repair-success {
      padding: 1rem;
      border-radius: 0.95rem;
      background: #f3efe3;
      border: 1px solid #e5d6c2;
      color: #5b463e;
    }
    `
  ]
})
export class RepairRequestComponent {
  private orderService = inject(OrderService);
  woodTypes = ['Roble', 'Nogal', 'Pino', 'Caoba'];
  name = '';
  email = '';
  phone = '';
  wood = 'Roble';
  damageType = 'Arañazos';
  description = '';
  files: File[] = [];
  ticketFolio = '';

  updateFiles(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.files = Array.from(input.files).slice(0, 3);
    }
  }

  submit(event: Event) {
    event.preventDefault();
    if (!this.name || !this.email || !this.phone || !this.description) {
      return;
    }
    const ticket = this.orderService.createRepairTicket({
      name: this.name,
      email: this.email,
      phone: this.phone,
      wood: this.wood,
      damageType: this.damageType,
      description: this.description
    });
    this.ticketFolio = ticket.folio;
  }
}
