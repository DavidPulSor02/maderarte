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
  role?: string; // "admin" | "client"
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

// --- Notificaciones (Twilio: SMS / WhatsApp) ---

// Entrada de notifications.sendMessage
export interface NotificationInput {
  to: string;
  body: string;
  type: 'sms' | 'whatsapp';
}

// Respuesta de notifications.sendMessage
export interface NotificationResult {
  success: boolean;
  message: string;
  messageId: string;
}

// --- Solicitud de reparación ---

export interface RepairRequestInput {
  name: string;
  email: string;
  phone: string;
  wood: string;
  damageType: string;
  description: string;
  photosCount?: number;
}

export interface RepairRequestResult {
  success: boolean;
  folio: string;
  messageId: string;
}

// --- Productos ---

// Campos para crear/actualizar un producto (coincide con products.create del backend)
export interface ProductInput {
  name: string;
  cat: string;
  description?: string;
  image?: string;
  status?: 'available' | 'low' | 'bajo pedido';
  stock?: number;
  basePrice: Record<string, number>;
}
