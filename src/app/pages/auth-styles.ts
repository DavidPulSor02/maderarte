// Estilos compartidos por las pantallas de autenticación (login y registro).
export const AUTH_STYLES = `
    :host { display: block; }
    .auth-wrap {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
      background: linear-gradient(135deg, #f5ede3 0%, #e7d3bd 100%);
    }
    .auth-card {
      width: 100%;
      max-width: 420px;
      background: #fff;
      border-radius: 1.25rem;
      padding: 2rem;
      box-shadow: 0 24px 70px rgba(60, 40, 20, 0.15);
    }
    .auth-logo {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 700;
      color: #8b5a2b;
      text-decoration: none;
      margin-bottom: 1.25rem;
    }
    .auth-logo__mark {
      width: 32px; height: 32px;
      border-radius: 50%;
      background: #e07b39;
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
    h1 { margin: 0 0 0.35rem; font-size: 1.6rem; color: #2b1d12; }
    .auth-sub { margin: 0 0 1.5rem; color: #6b7280; }
    form { display: grid; gap: 1rem; }
    label { display: grid; gap: 0.4rem; font-size: 0.9rem; color: #374151; font-weight: 600; }
    input {
      border: 1px solid #d8c7b3;
      border-radius: 0.75rem;
      padding: 0.85rem 1rem;
      font: inherit;
      background: #fffdfb;
      color: #111827;
    }
    input:focus { outline: 2px solid #e07b39; border-color: transparent; }
    .auth-btn {
      margin-top: 0.25rem;
      padding: 0.9rem 1rem;
      border: none;
      border-radius: 0.75rem;
      background: #8b5a2b;
      color: #fff;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s ease;
    }
    .auth-btn:hover:not(:disabled) { background: #6f4322; }
    .auth-btn:disabled { opacity: 0.7; cursor: default; }
    .auth-error {
      padding: 0.7rem 0.9rem;
      border-radius: 0.7rem;
      background: #fef2f2;
      color: #b91c1c;
      font-size: 0.9rem;
    }
    .auth-success {
      padding: 0.7rem 0.9rem;
      border-radius: 0.7rem;
      background: #ecfdf5;
      color: #047857;
      font-size: 0.9rem;
    }
    .auth-alt { margin: 1.25rem 0 0; text-align: center; color: #6b7280; font-size: 0.9rem; }
    .auth-alt a { color: #8b5a2b; font-weight: 600; }
`;
