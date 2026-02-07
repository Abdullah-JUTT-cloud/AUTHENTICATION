import express from 'express';
import { signup, login, logout, verify,forgotPassword } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/verify', verify);

router.post('/login', login);

router.post('/logout', logout);

router.post('/forgot-password',forgotPassword);

export default router;
