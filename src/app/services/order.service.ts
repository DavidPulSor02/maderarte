import { Injectable, signal } from '@angular/core';

export interface RepairTicket {
  folio: string;
  name: string;
  email: string;
  phone: string;
  wood: string;
  damageType: string;
  description: string;
  status: string;
  progress: string[];
  paymentStatus: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private _tickets = signal<RepairTicket[]>([]);
  tickets = this._tickets;

  createRepairTicket(data: Omit<RepairTicket, 'folio' | 'status' | 'progress' | 'paymentStatus'>) {
    const folio = `REP-${Math.floor(Math.random() * 90000) + 10000}`;
    const ticket: RepairTicket = {
      ...data,
      folio,
      status: 'Diagnóstico',
      progress: ['Presupuesto aprobado', 'Diagnóstico', 'En reparación', 'Listo para entrega'],
      paymentStatus: 'Pendiente de pago en efectivo'
    };
    this._tickets.set([...this._tickets(), ticket]);
    return ticket;
  }

  findTicket(query: string) {
    const normalized = query.trim().toLowerCase();
    return this._tickets().find(t => t.folio.toLowerCase() === normalized || t.email.toLowerCase() === normalized);
  }
}
