import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  API_URL,
  TrpcResponse,
  HelloResult,
  RegisterInput,
  LoginInput,
  LoginResult,
  AuthUser,
  PaymentItem,
  PaymentPreference,
  NotificationInput,
  NotificationResult,
  RepairRequestInput,
  RepairRequestResult,
  ProductInput,
} from '../../lib/trpc';
import { Product } from '../models/product';

/** Serializa el input de una query tRPC como parámetro `?input=`. */
function queryInput(input: unknown): string {
  return `?input=${encodeURIComponent(JSON.stringify(input))}`;
}

/**
 * Servicio para consumir la API zajo-api.
 *
 * tRPC expone cada procedimiento como una ruta HTTP:
 *   - query    -> GET  /trpc/<router>.<proc>
 *   - mutation -> POST /trpc/<router>.<proc>  (input en el body)
 *
 * La respuesta viene envuelta como { result: { data: ... } },
 * por eso usamos .pipe(map(r => r.result.data)) para devolver solo el dato.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  /** users.hello — devuelve un mensaje y la lista de usuarios. */
  hello(): Observable<HelloResult> {
    return this.http
      .get<TrpcResponse<HelloResult>>(`${API_URL}/users.hello`)
      .pipe(map((r) => r.result.data));
  }

  /** users.register — crea un usuario y devuelve sus datos básicos. */
  register(input: RegisterInput): Observable<AuthUser> {
    return this.http
      .post<TrpcResponse<AuthUser>>(`${API_URL}/users.register`, input)
      .pipe(map((r) => r.result.data));
  }

  /** users.login — valida credenciales y devuelve token + usuario. */
  login(input: LoginInput): Observable<LoginResult> {
    return this.http
      .post<TrpcResponse<LoginResult>>(`${API_URL}/users.login`, input)
      .pipe(map((r) => r.result.data));
  }

  /**
   * payments.createPreference — crea una preferencia de Checkout Pro
   * y devuelve la URL de Mercado Pago a la que hay que redirigir.
   */
  createPayment(items: PaymentItem[]): Observable<PaymentPreference> {
    return this.http
      .post<TrpcResponse<PaymentPreference>>(
        `${API_URL}/payments.createPreference`,
        { items }
      )
      .pipe(map((r) => r.result.data));
  }

  /**
   * notifications.sendMessage — envía un SMS o WhatsApp vía Twilio.
   * Por defecto usa WhatsApp.
   */
  sendNotification(input: NotificationInput): Observable<NotificationResult> {
    return this.http
      .post<TrpcResponse<NotificationResult>>(
        `${API_URL}/notifications.sendMessage`,
        input
      )
      .pipe(map((r) => r.result.data));
  }

  /**
   * notifications.sendRepairRequest — envía por WhatsApp al taller el
   * resumen de una solicitud de reparación y devuelve el folio.
   */
  sendRepairRequest(input: RepairRequestInput): Observable<RepairRequestResult> {
    return this.http
      .post<TrpcResponse<RepairRequestResult>>(
        `${API_URL}/notifications.sendRepairRequest`,
        input
      )
      .pipe(map((r) => r.result.data));
  }

  // ---- Productos (CRUD) ----

  /** products.getAll — catálogo completo. */
  getProducts(): Observable<Product[]> {
    return this.http
      .get<TrpcResponse<Product[]>>(`${API_URL}/products.getAll`)
      .pipe(map((r) => r.result.data));
  }

  /** products.getById — un producto por id. */
  getProduct(id: number): Observable<Product> {
    return this.http
      .get<TrpcResponse<Product>>(`${API_URL}/products.getById${queryInput({ id })}`)
      .pipe(map((r) => r.result.data));
  }

  /** products.create — crea un producto. */
  createProduct(input: ProductInput): Observable<Product> {
    return this.http
      .post<TrpcResponse<Product>>(`${API_URL}/products.create`, input)
      .pipe(map((r) => r.result.data));
  }

  /** products.update — actualiza un producto (campos parciales + id). */
  updateProduct(id: number, input: Partial<ProductInput>): Observable<Product> {
    return this.http
      .post<TrpcResponse<Product>>(`${API_URL}/products.update`, { id, ...input })
      .pipe(map((r) => r.result.data));
  }

  /** products.remove — elimina un producto. */
  removeProduct(id: number): Observable<{ success: boolean; id: number }> {
    return this.http
      .post<TrpcResponse<{ success: boolean; id: number }>>(
        `${API_URL}/products.remove`,
        { id }
      )
      .pipe(map((r) => r.result.data));
  }
}
