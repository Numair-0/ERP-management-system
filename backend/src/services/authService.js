import bcrypt from 'bcryptjs';
import { randomUUID } from 'node:crypto';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { getModulesForRole, getRole } from '../config/roles.js';
import { userRepository } from '../repositories/userRepository.js';
import { Session } from '../models/Session.js';
import { AuditLog } from '../models/AuditLog.js';

function publicUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    roleTitle: getRole(user.role)?.title ?? user.role,
    modules: getModulesForRole(user.role),
  };
}

function httpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function unauthorized(message) {
  return httpError(401, message);
}

export const authService = {
  async login(email, password, context = {}) {
    const cleanEmail = typeof email === 'string' ? email.trim() : '';
    const cleanPassword = typeof password === 'string' ? password : '';
    if (!cleanEmail || !cleanPassword) {
      const error = new Error('Email and password are required.');
      error.statusCode = 400;
      throw error;
    }
    const user = await userRepository.findByEmail(cleanEmail);
    const validPassword = user && await bcrypt.compare(cleanPassword, user.passwordHash);
    if (!validPassword || user.status !== 'active' || !getRole(user.role)) throw unauthorized('Invalid email or password.');
    const safeUser = publicUser(user);
    if (!env.allowMultipleDevices) await Session.updateMany({ userId: user._id, status: 'active' }, { $set: { status: 'revoked' } });
    const tokenId = randomUUID();
    const expiresAt = new Date(Date.now() + env.sessionHours * 60 * 60 * 1000);
    await Session.create({ userId: user._id, tokenId, device: context.device || 'browser', userAgent: context.userAgent, ipAddress: context.ipAddress, expiresAt });
    const token = jwt.sign({ id: safeUser.id, role: user.role, jti: tokenId }, env.jwtSecret, { expiresIn: `${env.sessionHours}h` });
    await AuditLog.create({ userId: user._id, action: 'login', module: 'auth', ipAddress: context.ipAddress });
    return { user: safeUser, token };
  },

  async changePassword(email, currentPassword, newPassword) {
    const cleanEmail = typeof email === 'string' ? email.trim() : '';
    if (!cleanEmail || typeof currentPassword !== 'string' || !currentPassword || typeof newPassword !== 'string') {
      throw httpError(400, 'Email, current password and new password are required.');
    }
    if (newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      throw httpError(400, 'New password must be at least 8 characters and include a letter and a number.');
    }
    const user = await userRepository.findByEmail(cleanEmail);
    const validPassword = user && await bcrypt.compare(currentPassword, user.passwordHash);
    if (!validPassword || user.status !== 'active') throw unauthorized('Email or current password is incorrect.');
    if (currentPassword === newPassword) throw httpError(400, 'New password must be different from the current password.');
    await userRepository.updatePassword(user._id.toString(), await bcrypt.hash(newPassword, 10));
    return { message: 'Password changed successfully. Please sign in with your new password.' };
  },

  async getCurrentUser(userId) {
    const user = await userRepository.findPublicById(userId);
    if (!user || user.status !== 'active') throw unauthorized('User account not found.');
    return publicUser(user);
  },

  async logout(tokenId) {
    if (tokenId) await Session.updateOne({ tokenId }, { $set: { status: 'revoked' } });
  },

  async logoutAll(userId) {
    await Session.updateMany({ userId, status: 'active' }, { $set: { status: 'revoked' } });
  },
};
