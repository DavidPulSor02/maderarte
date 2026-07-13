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
      <div class="auth-card">
        <a routerLink="/" class="auth-logo">
          <span class="auth-logo__mark">M</span> Maderarte
        </a>
        <h1>Inicia sesión</h1>
        <p class="auth-sub">Accede a la tienda para cotizar y comprar.</p>

        <form (submit)="submit($event)">
          <label>
            Correo electrónico
            <input type="email" name="email" [(ngModel)]="email" required autocomplete="email" />
          </label>
          <label>
            Contraseña
            <input type="password" name="password" [(ngModel)]="password" required autocomplete="current-password" />
          </label>

          <div *ngIf="error()" class="auth-error">{{ error() }}</div>

          <button type="submit" class="auth-btn" [disabled]="loading()">
            {{ loading() ? 'Entrando…' : 'Entrar' }}
          </button>
        </form>

        <p class="auth-alt">
          ¿No tienes cuenta? <a routerLink="/register">Regístrate</a>
        </p>
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
