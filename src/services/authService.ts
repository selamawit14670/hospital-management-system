import type { AuthUser, UserRole, AppRoute } from '../types';
import { DEMO_ACCOUNTS, ROLE_DEFAULT_ROUTES, getRoleFromRoute } from '../data/demoAccounts';

const STORAGE_KEY = 'medicare_auth_session_v1';

export interface LoginParams {
  email: string;
  password: string;
  selectedRole: UserRole;
  rememberMe?: boolean;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  redirectUrl?: AppRoute;
  error?: string;
}

export class AuthService {
  /**
   * Authenticate user with role verification
   */
  static async login(params: LoginParams): Promise<AuthResult> {
    const cleanEmail = params.email.trim().toLowerCase();
    const cleanPassword = params.password.trim();

    // Check against demo accounts
    const accountEntry = Object.values(DEMO_ACCOUNTS).find(
      (acc) => acc.email.toLowerCase() === cleanEmail
    );

    if (!accountEntry) {
      return {
        success: false,
        error: 'Invalid hospital credentials. Please verify your email and password.',
      };
    }

    if (accountEntry.password !== cleanPassword) {
      return {
        success: false,
        error: 'Incorrect password for this hospital account.',
      };
    }

    // Role Verification: Selected role on login screen must match the account's assigned role
    if (accountEntry.role !== params.selectedRole) {
      return {
        success: false,
        error: `Role Mismatch: This account belongs to role '${accountEntry.role}', but you selected '${params.selectedRole}'. Please select the matching role above.`,
      };
    }

    const authUser: AuthUser = {
      ...accountEntry.user,
      token: `demo_jwt_${accountEntry.role.toLowerCase()}_${Date.now()}`,
    };

    // Store in localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      } catch (err) {
        console.warn('Could not store auth session in localStorage', err);
      }
    }

    return {
      success: true,
      user: authUser,
      redirectUrl: ROLE_DEFAULT_ROUTES[authUser.role],
    };
  }

  /**
   * Retrieve active session from localStorage
   */
  static getCurrentUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as AuthUser;
      }
    } catch (err) {
      console.warn('Failed to parse stored auth session', err);
    }
    return null;
  }

  /**
   * Terminate active user session
   */
  static logout(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.warn('Failed to clear auth session', err);
      }
    }
  }

  /**
   * Check if a given user role is authorized for the requested path
   */
  static isAuthorized(userRole: UserRole | null | undefined, path: string): boolean {
    if (!userRole) return false;

    // Public / common paths
    if (path === '/login') return true;

    const requiredRole = getRoleFromRoute(path);
    if (!requiredRole) {
      // Legacy paths or general dashboard fallbacks
      return true;
    }

    return userRole === requiredRole;
  }
}
