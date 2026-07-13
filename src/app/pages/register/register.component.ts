import { Component, inject, signal } from '@angular/core';
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
      <div class="auth-card">
        <a routerLink="/" class="auth-logo">
          <span class="auth-logo__mark">M</span> Maderarte
        </a>
        <h1>Crea tu cuenta</h1>
        <p class="auth-sub">Regístrate para acceder a la tienda.</p>

        <form (submit)="submit($event)">
          <label>
            Correo electrónico
            <input type="email" name="email" [(ngModel)]="email" required autocomplete="email" />
          </label>
          <label>
            Contraseña (mínimo 8 caracteres)
            <input type="password" name="password" [(ngModel)]="password" required minlength="8" autocomplete="new-password" />
          </label>
          <label>
            Repite la contraseña
            <input type="password" name="confirm" [(ngModel)]="confirm" required autocomplete="new-password" />
          </label>

          <div *ngIf="error()" class="auth-error">{{ error() }}</div>

          <button type="submit" class="auth-btn" [disabled]="loading()">
            {{ loading() ? 'Creando cuenta…' : 'Registrarme' }}
          </button>
        </form>

        <p class="auth-alt">
          ¿Ya tienes cuenta? <a routerLink="/login">Inicia sesión</a>
        </p>
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
