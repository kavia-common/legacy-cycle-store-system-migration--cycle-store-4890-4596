/**
 * Shared types used across the WebApplicationService.
 */

export type Role = "admin" | "staff" | "support" | "trainer" | "customer";

export interface JwtPayload {
  sub: string;
  name?: string;
  email?: string;
  roles?: Role[];
  exp?: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresIn?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  roles: Role[];
}

export interface InventoryItem {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  description?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id?: string;
  items: OrderItem[];
  total?: number;
  status?: string;
}

export interface SupportTicket {
  id?: string;
  subject: string;
  description: string;
  status?: string;
}

export interface TrainingMaterial {
  id: string;
  title: string;
  url: string;
}

export interface ApiError {
  status?: string;
  message?: string;
  details?: unknown;
  errorCode?: string;
}
