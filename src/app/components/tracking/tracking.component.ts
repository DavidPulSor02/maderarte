import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="tracking-panel" id="mi-pedido">
      <div class="section-heading">
        <p class="eyebrow">Seguimiento</p>
        <h2>Consulta el estado de tu pedido</h2>
      </div>
      <form class="tracking-form" (submit)="search($event)">
        <label>
          Folio o correo electrónico
          <input type="text" [(ngModel)]="searchQuery" name="searchQuery" placeholder="Ej. COT-12345 o correo@dominio.com" />
        </label>
        <button type="submit" class="button button-primary">Buscar</button>
      </form>

      <div *ngIf="ticket" class="tracking-result">
        <p class="tracking-label">Folio: <strong>{{ ticket.folio }}</strong></p>
        <p>Estado: <strong>{{ ticket.status }}</strong></p>
        <p>Pago: <strong>{{ ticket.paymentStatus }}</strong></p>
        <div class="progress-bar">
          <div class="progress-step" *ngFor="let step of ticket.progress; let i = index" [class.active]="i <= activeStepIndex">
            <span>{{ step }}</span>
          </div>
        </div>
        <div class="tracking-details">
          <p><strong>Nombre:</strong> {{ ticket.name }}</p>
          <p><strong>Madera:</strong> {{ ticket.wood }}</p>
          <p><strong>Tipo de reparación:</strong> {{ ticket.damageType }}</p>
          <p><strong>Descripción:</strong> {{ ticket.description }}</p>
        </div>
      </div>

      <div *ngIf="searched && !ticket" class="tracking-empty">
        <p>No se encontró ningún pedido con ese folio o correo.</p>
      </div>
    </section>
  `,
  styles: [
    `
    .tracking-panel {
      display: grid;
      gap: 1rem;
      padding: 1.5rem;
      background: white;
      border-radius: 1.25rem;
      box-shadow: 0 20px 50px rgba(15, 23, 42, 0.05);
    }

    .tracking-form {
      display: grid;
      gap: 1rem;
    }

    label {
      display: grid;
      gap: 0.4rem;
      color: #334155;
    }

    input {
      border: 1px solid #d1d5db;
      border-radius: 0.9rem;
      padding: 0.95rem 1rem;
      font: inherit;
      background: white;
      color: #111827;
    }

    .progress-bar {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0.75rem;
    }

    .progress-step {
      padding: 0.95rem 0.85rem;
      border-radius: 0.95rem;
      background: #f3f4f6;
      color: #6b7280;
      text-align: center;
      font-size: 0.9rem;
    }

    .progress-step.active {
      background: #f7e7d3;
      color: #7f4413;
      font-weight: 700;
    }

    .tracking-details p {
      margin: 0.45rem 0;
      color: #475569;
    }

    .tracking-empty {
      padding: 1rem;
      border-radius: 0.95rem;
      background: #f8fafc;
      color: #475569;
    }

    .tracking-label {
      margin: 0;
      color: #334155;
      font-weight: 600;
    }
    `
  ]
})
export class TrackingComponent {
  private orderService = inject(OrderService);
  searchQuery = '';
  ticket: ReturnType<OrderService['findTicket']> | undefined;
  searched = false;

  get activeStepIndex() {
    return this.ticket ? this.ticket.progress.indexOf(this.ticket.status) : -1;
  }

  search(event: Event) {
    event.preventDefault();
    this.ticket = this.orderService.findTicket(this.searchQuery);
    this.searched = true;
  }
}
