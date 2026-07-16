import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { AuthUser, LoginInput, LoginResult, RegisterInput } from '../../lib/trpc';

const TOKEN_KEY = 'muebleszajo_token';
const USER_KEY = 'muebleszajo_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(ApiService);

  // Estado reactivo de la sesión
  private _user = signal<AuthUser | null>(this.loadUser());
  private _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  user = this._user.asReadonly();
  isLoggedIn = computed(() => this._token() !== null);

  private loadUser(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  }

  /** Registra un usuario nuevo (no inicia sesión automáticamente). */
  register(input: RegisterInput): Observable<AuthUser> {
    return this.api.register(input);
  }

  /** Inicia sesión y guarda token + usuario. */
  login(input: LoginInput): Observable<LoginResult> {
    return this.api.login(input).pipe(
      tap((res) => this.setSession(res.token, res.user))
    );
  }

  logout() {
    this._token.set(null);
    this._user.set(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  private setSession(token: string, user: AuthUser) {
    this._token.set(token);
    this._user.set(user);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}
