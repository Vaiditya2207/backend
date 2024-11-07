import express from 'express';
import { compileCode, getCompilationResult } from '../controllers/codeController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/compile', authenticate, compileCode);
router.get('/compile-result/:codeId', authenticate, getCompilationResult);

export default router;