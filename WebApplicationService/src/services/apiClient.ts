/**
 * Minimal API client for WebApplicationService to call API Gateway endpoints.
 */
export type LoginResponse = { token: string; expiresIn?: number };

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// PUBLIC_INTERFACE
export async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    throw new Error('Invalid credentials');
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function getInventory(token: string) {
  const res = await fetch(`${API_URL}/inventory`, { headers: { authorization: `Bearer ${token}` }});
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
}
