import { Router, Request, Response } from 'express';
import { requireAuth, requireRole, UserRole } from '../middleware/auth';

const router = Router();

const DEMO_CREDENTIALS: Record<
  string,
  { role: UserRole; name: string; email: string; pass: string; hospital: string; title: string }
> = {
  'admin@medicare.com': {
    role: 'Administrator',
    name: 'Robert Garcia',
    email: 'admin@medicare.com',
    pass: 'Admin123!',
    hospital: 'MediCare Central Command',
    title: 'Chief Hospital Administrator',
  },
  'doctor@medicare.com': {
    role: 'Doctor',
    name: 'Dr. Hana Mengistu',
    email: 'doctor@medicare.com',
    pass: 'Doctor123!',
    hospital: 'General Medicine',
    title: 'Attending Physician',
  },
  'nurse@medicare.com': {
    role: 'Nurse',
    name: 'Sister Almaz',
    email: 'nurse@medicare.com',
    pass: 'Nurse123!',
    hospital: 'Inpatient Care & Trauma Ward',
    title: 'Head Clinical Nurse',
  },
  'receptionist@medicare.com': {
    role: 'Receptionist',
    name: 'Selamawit D.',
    email: 'receptionist@medicare.com',
    pass: 'Reception123!',
    hospital: 'Central Outpatient Admissions',
    title: 'Patient Intake Officer',
  },
  'patient@medicare.com': {
    role: 'Patient',
    name: 'Abebe Kebede',
    email: 'patient@medicare.com',
    pass: 'Patient123!',
    hospital: 'MediCare Outpatient Services',
    title: 'Patient Member (#MED-84920)',
  },
};

/**
 * POST /api/auth/login
 * Validates credentials and verifies that selected role corresponds to account
 */
router.post('/login', (req: Request, res: Response): void => {
  const { email, password, selectedRole } = req.body || {};

  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: 'Missing required credentials',
      message: 'Email and password must both be provided.',
    });
    return;
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const account = DEMO_CREDENTIALS[cleanEmail];

  if (!account || account.pass !== String(password).trim()) {
    res.status(401).json({
      success: false,
      error: 'Invalid Credentials',
      message: 'Invalid hospital email or password.',
    });
    return;
  }

  // Role validation
  if (selectedRole && account.role !== selectedRole) {
    res.status(403).json({
      success: false,
      error: 'Role Mismatch',
      message: `Account role '${account.role}' does not match selected role '${selectedRole}'.`,
      expectedRole: account.role,
    });
    return;
  }

  const token = `demo_jwt_${account.role.toLowerCase()}_${Date.now()}`;

  res.json({
    success: true,
    message: `Authenticated successfully as ${account.role}`,
    token,
    user: {
      id: `usr_${account.role.toLowerCase()}`,
      name: account.name,
      email: account.email,
      role: account.role,
      hospital: account.hospital,
      title: account.title,
    },
  });
});

/**
 * GET /api/auth/me
 * Returns current authenticated user session
 */
router.get('/me', requireAuth, (req: Request, res: Response): void => {
  res.json({
    success: true,
    user: req.user,
  });
});

/**
 * GET /api/auth/admin-only
 * Test endpoint verifying Administrator role restriction on backend
 */
router.get('/admin-only', requireAuth, requireRole('Administrator'), (req: Request, res: Response): void => {
  res.json({
    success: true,
    message: 'Access granted to Administrator backend endpoint',
    user: req.user,
  });
});

/**
 * GET /api/auth/doctor-only
 * Test endpoint verifying Doctor role restriction on backend
 */
router.get('/doctor-only', requireAuth, requireRole('Doctor'), (req: Request, res: Response): void => {
  res.json({
    success: true,
    message: 'Access granted to Doctor backend endpoint',
    user: req.user,
  });
});

export default router;
