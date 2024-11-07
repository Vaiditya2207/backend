import express from 'express';
import authRoutes from './authRoutes.js';
import codeRoutes from './codeRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/code', codeRoutes);

export default router;