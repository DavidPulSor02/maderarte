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
} from '../../lib/trpc';

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
}
