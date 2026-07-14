// Estilos compartidos por las pantallas de autenticación (login y registro).
export const AUTH_STYLES = `
  :host { display: block; }

  .auth-wrap {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  /* ---- Panel izquierdo: imagen de madera ---- */
  .auth-visual {
    position: relative;
    overflow: hidden;
    background: #3B1F0E;
  }

  .auth-visual img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.7;
  }

  .auth-visual-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(160deg, rgba(59,31,14,0.55) 0%, rgba(107,58,31,0.8) 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 3rem;
  }

  .auth-visual-quote {
    color: #fff;
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 0.75rem;
  }

  .auth-visual-quote span {
    color: #D97B45;
  }

  .auth-visual-sub {
    color: rgba(255,255,255,0.7);
    font-size: 0.9rem;
    line-height: 1.6;
  }

  /* ---- Panel derecho: formulario ---- */
  .auth-form-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 2.5rem;
    background: #FDFAF7;
    overflow-y: auto;
  }

  .auth-card {
    width: 100%;
    max-width: 400px;
  }

  .auth-logo {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    color: #8b5a2b;
    text-decoration: none;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }

  .auth-logo__mark {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, #C0521E, #D97B45);
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1rem;
    box-shadow: 0 4px 12px rgba(192,82,30,0.35);
  }

  h1 {
    margin: 0 0 0.35rem;
    font-size: 1.75rem;
    color: #2b1d12;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
  }

  .auth-sub {
    margin: 0 0 2rem;
    color: #6b7280;
    font-size: 0.925rem;
  }

  form { display: grid; gap: 1.1rem; }

  .field-group { display: grid; gap: 0.4rem; }

  .field-label {
    font-size: 0.85rem;
    color: #374151;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .field-input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .field-icon {
    position: absolute;
    left: 0.9rem;
    color: #9ca3af;
    display: flex;
    align-items: center;
    pointer-events: none;
    transition: color 0.2s;
  }

  input {
    width: 100%;
    border: 1.5px solid #e2d5c3;
    border-radius: 0.75rem;
    padding: 0.85rem 2.75rem 0.85rem 2.75rem;
    font: inherit;
    font-size: 0.95rem;
    background: #fff;
    color: #111827;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  input:focus {
    outline: none;
    border-color: #C0521E;
    box-shadow: 0 0 0 3px rgba(192,82,30,0.12);
  }

  input:focus ~ .field-icon,
  .field-input-wrap:focus-within .field-icon {
    color: #C0521E;
  }

  .toggle-pw {
    position: absolute;
    right: 0.9rem;
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
    transition: color 0.2s;
  }

  .toggle-pw:hover { color: #C0521E; }

  /* Barra de fuerza de contraseña */
  .strength-bar-wrap {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    margin-top: 0.4rem;
  }

  .strength-bar-seg {
    height: 3px;
    border-radius: 10px;
    background: #e5e7eb;
    transition: background 0.3s;
  }

  .strength-bar-seg.active-1 { background: #ef4444; }
  .strength-bar-seg.active-2 { background: #f59e0b; }
  .strength-bar-seg.active-3 { background: #3b82f6; }
  .strength-bar-seg.active-4 { background: #10b981; }

  .strength-label {
    font-size: 0.75rem;
    margin-top: 0.3rem;
    color: #6b7280;
  }

  /* Botón principal */
  .auth-btn {
    margin-top: 0.5rem;
    padding: 0.95rem 1rem;
    border: none;
    border-radius: 0.75rem;
    background: linear-gradient(135deg, #C0521E, #D97B45);
    color: #fff;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.25s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 4px 14px rgba(192,82,30,0.4);
    font-family: 'DM Sans', sans-serif;
  }

  .auth-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #a8461a, #C0521E);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(192,82,30,0.5);
  }

  .auth-btn:disabled {
    opacity: 0.8;
    cursor: default;
    transform: none;
  }

  /* Spinner de carga */
  .spinner {
    width: 18px;
    height: 18px;
    border: 2.5px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Error / success */
  .auth-error {
    padding: 0.75rem 1rem;
    border-radius: 0.7rem;
    background: #fef2f2;
    color: #b91c1c;
    font-size: 0.875rem;
    border-left: 3px solid #ef4444;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .auth-success {
    padding: 0.75rem 1rem;
    border-radius: 0.7rem;
    background: #ecfdf5;
    color: #047857;
    font-size: 0.875rem;
    border-left: 3px solid #10b981;
  }

  /* Link alternativo */
  .auth-alt {
    margin: 1.5rem 0 0;
    text-align: center;
    color: #6b7280;
    font-size: 0.9rem;
  }

  .auth-alt a {
    color: #C0521E;
    font-weight: 700;
    text-decoration: none;
    transition: color 0.2s;
  }

  .auth-alt a:hover { color: #8b5a2b; text-decoration: underline; }

  /* Divider */
  .auth-divider {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0.5rem 0;
    color: #d1c4b3;
    font-size: 0.8rem;
  }
  .auth-divider::before,
  .auth-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #ede6d8;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .auth-wrap { grid-template-columns: 1fr; }
    .auth-visual { display: none; }
    .auth-form-panel { padding: 2rem 1.25rem; }
  }
`;
