import { authService } from '../services/authService.js';

export async function login(request, response, next) {
  try {
    const { email, username, mobile, password } = request.body;
    response.json(await authService.login(email || username || mobile, password, {
      device: request.headers['x-device-name'], userAgent: request.headers['user-agent'], ipAddress: request.ip,
    }));
  } catch (error) {
    next(error);
  }
}

export async function changePassword(request, response, next) {
  try {
    const { email, currentPassword, newPassword } = request.body || {};
    response.json(await authService.changePassword(email, currentPassword, newPassword));
  } catch (error) {
    next(error);
  }
}

export async function getCurrentUser(request, response, next) {
  try {
    response.json({ user: await authService.getCurrentUser(request.user.id) });
  } catch (error) {
    next(error);
  }
}

export async function logout(request, response, next) {
  try { await authService.logout(request.user.jti); response.json({ message: 'Signed out successfully.' }); } catch (error) { next(error); }
}

export async function logoutAll(request, response, next) {
  try { await authService.logoutAll(request.user.id); response.json({ message: 'All sessions were signed out.' }); } catch (error) { next(error); }
}