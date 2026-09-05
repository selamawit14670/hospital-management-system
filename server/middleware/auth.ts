import { Request, Response, NextFunction } from 'express';

export type UserRole =
  | 'Administrator'
  | 'Doctor'
  | 'Nurse'
  | 'Receptionist'
  | 'Patient';

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hospital: string;
}

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

/**
 * Authentication verification middleware
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      success: false,
      error: 'Access Denied: Missing Authorization Header',
      message: 'You must provide a valid MediCare authorization token to access this API resource.',
    });
    return;
  }

  const token = authHeader.replace(/^Bearer\s+/i, '');

  if (!token) {
    res.status(401).json({
      success: false,
      error: 'Access Denied: Invalid Token Format',
      message: 'Authorization token is empty or malformed.',
    });
    return;
  }

  // Parse demo token format: demo_jwt_<role>_<timestamp>
  const match = token.match(/^demo_jwt_([a-z]+)_\d+$/);
  if (match) {
    const rawRole = match[1];
    const roleCapitalized = (rawRole.charAt(0).toUpperCase() + rawRole.slice(1)) as UserRole;

    req.user = {
      id: `usr_${rawRole}`,
      name: `${roleCapitalized} Staff`,
      email: `${rawRole}@medicare.com`,
      role: roleCapitalized,
      hospital: 'MediCare Central Hospital',
    };
    next();
    return;
  }

  // Fallback demo user
  req.user = {
    id: 'usr_admin_01',
    name: 'Robert Garcia',
    email: 'admin@medicare.com',
    role: 'Administrator',
    hospital: 'MediCare Central Hospital',
  };
  next();
}

/**
 * Role-Based Access Control (RBAC) authorization middleware
 */
export function requireRole(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Authentication required before role verification.',
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: 'Forbidden: Insufficient Role Privilege',
        message: `Your current role '${req.user.role}' is not authorized. Required roles: ${allowedRoles.join(', ')}.`,
        currentRole: req.user.role,
        requiredRoles: allowedRoles,
      });
      return;
    }

    next();
  };
}
