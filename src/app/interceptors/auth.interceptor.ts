import { HttpInterceptorFn } from '@angular/common/http';

const TOKEN_KEY = 'muebleszajo_token';

/**
 * Adjunta el token JWT (si existe) como cabecera Authorization: Bearer
 * en todas las peticiones salientes hacia la API.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token: string | null = null;
  try {
    token = localStorage.getItem(TOKEN_KEY);
  } catch {
    token = null;
  }

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });
  return next(authReq);
};
