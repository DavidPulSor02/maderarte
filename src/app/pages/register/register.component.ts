import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AUTH_STYLES } from '../auth-styles';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-wrap">
      <!-- Panel izquierdo: imagen -->
      <div class="auth-visual">
        <img src="assets/auth-wood.jpg" alt="Madera artesanal" />
        <div class="auth-visual-overlay">
          <div class="auth-visual-quote">
            Tu visión,<br><span>nuestra madera.</span>
          </div>
          <p class="auth-visual-sub">
            Crea tu cuenta y empieza a diseñar el mueble perfecto con cotizaciones personalizadas en minutos.
          </p>
        </div>
      </div>

      <!-- Panel derecho: formulario -->
      <div class="auth-form-panel">
        <div class="auth-card">
          <a routerLink="/" class="auth-logo">
            <span class="auth-logo__mark">Z</span> Muebles Zajo
          </a>

          <h1>Crea tu cuenta</h1>
          <p class="auth-sub">Regístrate gratis y cotiza al instante.</p>

          <form (submit)="submit($event)">
            <!-- Email -->
            <div class="field-group">
              <label class="field-label" for="reg-email">Correo electrónico</label>
              <div class="field-input-wrap">
                <span class="field-icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  id="reg-email"
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
              <label class="field-label" for="reg-password">Contraseña <span style="font-weight:400;color:#9ca3af">(mín. 8 caracteres)</span></label>
              <div class="field-input-wrap">
                <span class="field-icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  id="reg-password"
                  [type]="showPw() ? 'text' : 'password'"
                  name="password"
                  [(ngModel)]="password"
                  required
                  minlength="8"
                  autocomplete="new-password"
                  placeholder="Mínimo 8 caracteres"
                />
                <button type="button" class="toggle-pw" (click)="showPw.set(!showPw())">
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
              <!-- Barra de fuerza -->
              <div *ngIf="password.length > 0">
                <div class="strength-bar-wrap">
                  <div class="strength-bar-seg" [class]="strengthClass(1)"></div>
                  <div class="strength-bar-seg" [class]="strengthClass(2)"></div>
                  <div class="strength-bar-seg" [class]="strengthClass(3)"></div>
                  <div class="strength-bar-seg" [class]="strengthClass(4)"></div>
                </div>
                <p class="strength-label">{{ strengthLabel() }}</p>
              </div>
            </div>

            <!-- Confirmar password -->
            <div class="field-group">
              <label class="field-label" for="reg-confirm">Repite la contraseña</label>
              <div class="field-input-wrap">
                <span class="field-icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4"/>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  id="reg-confirm"
                  [type]="showConfirm() ? 'text' : 'password'"
                  name="confirm"
                  [(ngModel)]="confirm"
                  required
                  autocomplete="new-password"
                  placeholder="Repite tu contraseña"
                  [style.border-color]="confirm.length > 0 ? (confirm === password ? '#10b981' : '#ef4444') : ''"
                />
                <button type="button" class="toggle-pw" (click)="showConfirm.set(!showConfirm())">
                  <svg *ngIf="!showConfirm()" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg *ngIf="showConfirm()" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
              <p *ngIf="confirm.length > 0 && confirm !== password" style="font-size:0.78rem;color:#ef4444;margin-top:0.25rem">
                Las contraseñas no coinciden
              </p>
              <p *ngIf="confirm.length > 0 && confirm === password" style="font-size:0.78rem;color:#10b981;margin-top:0.25rem">
                ✓ Las contraseñas coinciden
              </p>
            </div>

            <div *ngIf="error()" class="auth-error">
              <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {{ error() }}
            </div>

            <button type="submit" id="register-submit-btn" class="auth-btn" [disabled]="loading()">
              <span class="spinner" *ngIf="loading()"></span>
              {{ loading() ? 'Creando cuenta…' : 'Crear cuenta gratis' }}
            </button>
          </form>

          <p class="auth-alt">
            ¿Ya tienes cuenta? <a routerLink="/login">Inicia sesión</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [AUTH_STYLES],
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  confirm = '';
  loading = signal(false);
  error = signal('');
  showPw = signal(false);
  showConfirm = signal(false);

  /** Calcula nivel de fuerza: 1-4 */
  private get strengthLevel(): number {
    const pw = this.password;
    if (pw.length === 0) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return Math.max(1, score);
  }

  strengthLabel(): string {
    return ['', 'Débil', 'Regular', 'Buena', 'Muy fuerte'][this.strengthLevel];
  }

  strengthClass(segment: number): string {
    const level = this.strengthLevel;
    if (segment <= level) return `strength-bar-seg active-${level}`;
    return 'strength-bar-seg';
  }

  submit(event: Event) {
    event.preventDefault();

    if (this.password.length < 8) {
      this.error.set('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (this.password !== this.confirm) {
      this.error.set('Las contraseñas no coinciden.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const credentials = { email: this.email, password: this.password };

    // Registra y, si sale bien, inicia sesión automáticamente.
    this.auth
      .register(credentials)
      .pipe(switchMap(() => this.auth.login(credentials)))
      .subscribe({
        next: () => this.router.navigate(['/tienda']),
        error: (err) => {
          this.loading.set(false);
          this.error.set(
            err?.error?.error?.message ??
              'No se pudo crear la cuenta. ¿Ese correo ya está registrado?'
          );
        },
      });
  }
}
