import express from 'express';
import { signup, login, logout, verify } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/verify', verify);

router.post('/login', login);

router.post('/logout', logout);
export default router;
