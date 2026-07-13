// Configuración y tipos para consumir la API zajo-api (tRPC sobre HTTP).
// La API corre por defecto en http://localhost:3000 (ver zajo-api/src/index.ts).

export const API_URL = 'http://localhost:3000/trpc';

// Forma en que tRPC (sin batch) envuelve una respuesta correcta.
export interface TrpcResponse<T> {
  result: { data: T };
}

// --- Tipos de datos que devuelve la API ---

// Coincide con el modelo Users de prisma/schema.prisma
export interface ApiUser {
  id: number;
  id_role: number;
  email: string;
  verified: boolean;
}

// Salida de users.hello
export interface HelloResult {
  message: string;
  users: ApiUser[];
}

// Entrada de users.register
export interface RegisterInput {
  email: string;
  password: string;
}

// Usuario autenticado (lo que devuelven register y login)
export interface AuthUser {
  id: number;
  email: string;
  verified: boolean;
}

// Entrada de users.login
export interface LoginInput {
  email: string;
  password: string;
}

// Respuesta de users.login
export interface LoginResult {
  token: string;
  user: AuthUser;
}

// --- Mercado Pago ---

// Un ítem del carrito en el formato que espera la API
export interface PaymentItem {
  title: string;
  quantity: number;
  unit_price: number;
}

// Respuesta de payments.createPreference
export interface PaymentPreference {
  url: string;
}
