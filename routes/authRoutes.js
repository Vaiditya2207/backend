import express from 'express';
import { signIn, signUp } from '../controllers/authController.js';
import { updateEmail, updatePassword, deleteMail } from '../controllers/userController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);

router.put('/update-email', authenticate, updateEmail);
router.put('/update-password', authenticate, updatePassword);
router.delete('/delete-mail', authenticate, deleteMail);

export default router;
