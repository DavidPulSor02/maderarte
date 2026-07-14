import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AUTH_STYLES } from '../auth-styles';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-wrap">
      <!-- Panel izquierdo: imagen -->
      <div class="auth-visual">
        <img src="assets/auth-wood.jpg" alt="Madera artesanal" />
        <div class="auth-visual-overlay">
          <div class="auth-visual-quote">
            Cada pieza cuenta<br><span>una historia.</span>
          </div>
          <p class="auth-visual-sub">
            Muebles artesanales de madera hechos a la medida de tu hogar y tu estilo de vida.
          </p>
        </div>
      </div>

      <!-- Panel derecho: formulario -->
      <div class="auth-form-panel">
        <div class="auth-card">
          <a routerLink="/" class="auth-logo">
            <span class="auth-logo__mark">M</span> Maderarte
          </a>

          <h1>Bienvenido de vuelta</h1>
          <p class="auth-sub">Inicia sesión para cotizar y comprar tus muebles.</p>

          <form (submit)="submit($event)">
            <!-- Email -->
            <div class="field-group">
              <label class="field-label" for="login-email">Correo electrónico</label>
              <div class="field-input-wrap">
                <span class="field-icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  [(ngModel)]="email"
                  required
                  autocomplete="email"
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>

            <!-- Password -->
            <div class="field-group">
              <label class="field-label" for="login-password">Contraseña</label>
              <div class="field-input-wrap">
                <span class="field-icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  id="login-password"
                  [type]="showPw() ? 'text' : 'password'"
                  name="password"
                  [(ngModel)]="password"
                  required
                  autocomplete="current-password"
                  placeholder="Tu contraseña"
                />
                <button type="button" class="toggle-pw" (click)="showPw.set(!showPw())" [attr.aria-label]="showPw() ? 'Ocultar' : 'Mostrar'">
                  <svg *ngIf="!showPw()" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg *ngIf="showPw()" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
            </div>

            <div *ngIf="error()" class="auth-error">
              <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {{ error() }}
            </div>

            <button type="submit" id="login-submit-btn" class="auth-btn" [disabled]="loading()">
              <span class="spinner" *ngIf="loading()"></span>
              {{ loading() ? 'Entrando…' : 'Iniciar sesión' }}
            </button>
          </form>

          <p class="auth-alt">
            ¿No tienes cuenta? <a routerLink="/register">Regístrate gratis</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [AUTH_STYLES],
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  loading = signal(false);
  error = signal('');
  showPw = signal(false);

  submit(event: Event) {
    event.preventDefault();
    if (!this.email || !this.password) return;

    this.loading.set(true);
    this.error.set('');

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/tienda']),
      error: (err) => {
        this.loading.set(false);
        this.error.set(
          err?.error?.error?.message ?? 'Correo o contraseña incorrectos.'
        );
      },
    });
  }
}
