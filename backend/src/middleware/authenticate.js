import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { canAccessModule } from '../config/roles.js';
import { Session } from '../models/Session.js';

export async function authenticate(request, _response, next) {
  const authorization = request.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : null;
  if (!token) return next(Object.assign(new Error('Authentication token is required.'), { statusCode: 401 }));
  try {
    request.user = jwt.verify(token, env.jwtSecret);
    const session = await Session.findOne({ tokenId: request.user.jti, status: 'active', expiresAt: { $gt: new Date() } });
    if (!session) return next(Object.assign(new Error('Session has expired or been signed out.'), { statusCode: 401 }));
    await Session.updateOne({ _id: session._id }, { $set: { lastActiveAt: new Date() } });
    next();
  } catch {
    next(Object.assign(new Error('Authentication token is invalid or expired.'), { statusCode: 401 }));
  }
}

export function authorize(...roles) {
  return (request, _response, next) => {
    if (!roles.includes(request.user?.role)) return next(Object.assign(new Error('You do not have permission for this action.'), { statusCode: 403 }));
    next();
  };
}

// Used with router.param('moduleKey', ...) so every /madarsa/:moduleKey route is role-checked.
export function authorizeModule(request, _response, next, moduleKey) {
  if (!canAccessModule(request.user?.role, moduleKey)) {
    return next(Object.assign(new Error('You do not have permission to open this module.'), { statusCode: 403 }));
  }
  next();
}
