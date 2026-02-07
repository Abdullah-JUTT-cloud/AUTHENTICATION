import express from 'express';
import { signup, login, logout, verify,forgotPassword,resetPassword,checkAuth } from '../controller/auth.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';



const router = express.Router();

router.get('/checkauth',verifyToken,checkAuth);

router.post('/signup', signup);

router.post('/verify', verify);

router.post('/login', login);

router.post('/logout', logout);

router.post('/forgot-password',forgotPassword);

router.post('/reset-password/:token',resetPassword);

export default router;
