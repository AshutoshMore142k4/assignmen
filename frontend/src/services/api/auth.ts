import { LoginPayload, RegisterPayload, AuthResponse } from '../../types/auth';

const API_URL = '/api/auth';

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Login failed');
  return data.data;
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Registration failed');
  return data.data;
} 