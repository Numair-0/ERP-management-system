export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export function authHeaders(withJson = false) {
  return {
    ...(withJson ? { 'Content-Type': 'application/json' } : {}),
    Authorization: `Bearer ${localStorage.getItem('markaz_token')}`,
  };
}
