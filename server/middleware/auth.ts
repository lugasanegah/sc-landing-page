import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Admin, IAdmin } from '../models/Admin';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET must be set. Did you forget to set the environment variable?",
  );
}

export interface AuthRequest extends Request {
  admin?: IAdmin;
}

export const generateToken = (adminId: string): string => {
  return jwt.sign({ adminId }, JWT_SECRET, { expiresIn: '24h' });
};

export const authenticateAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies?.adminToken;

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { adminId: string };
    const admin = await Admin.findById(decoded.adminId).select('-password');

    if (!admin || !admin.isActive) {
      return res.status(401).json({ message: 'Invalid token or admin account inactive.' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Invalid token.' });
  }
};

export const requireSuperAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.admin || req.admin.role !== 'super_admin') {
    return res.status(403).json({ message: 'Access denied. Super admin required.' });
  }
  next();
};