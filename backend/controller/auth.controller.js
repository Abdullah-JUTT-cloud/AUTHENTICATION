import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail,sendPasswordResetEmail } from "../mailTrap/emails.js";


export const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required");
        }
        const userAlreadyExist = await User.findOne({ email });
        if (userAlreadyExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            email,
            password: hashedPassword,
            name,
            VerificationToken: verificationToken,
            VerificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });
        await user.save();
        await sendVerificationEmail(email, verificationToken);
        generateTokenAndSetCookie(res, user._id);
        res.status(201).json({
            success: true, message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const verify = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            VerificationToken: code,
            VerificationTokenExpiresAt: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" })
        }
        user.isVerified = true;
        user.VerificationToken = undefined;
        user.VerificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        });


    } catch (error) {
        console.log("Error in verify controller", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    const {email,password}=req.body;
    try {
        if(!email || !password){
            throw new Error("All fields are required");
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message:"User not found"});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({success:false,message:"Invalid credentials"});
        }
        generateTokenAndSetCookie(res,user._id);
        user.lastLoginAt=Date.now();
        await user.save();
        res.status(200).json({
            success:true,
            message:"Login successfully",
            user:{
                ...user._doc,
                password:undefined
            }
        });
    } catch (error) {
        console.log("Error in login controller",error);
        res.status(400).json({success:false,message:error.message});
    }
}

export const forgotPassword = async (req, res) => {
    const {email}=req.body;
    try {
        const user=await User.findOne({email});
     if(!user){
        return res.status(400).json({success:false,message:"User not found"});
     }   
     const resetToken=crypto.randomBytes(32).toString("hex");
     const resetTokenExpiresAt=Date.now()+1*60*60*1000;
     user.resetPasswordToken=resetToken;
     user.resetPasswordExpiresAt=resetTokenExpiresAt;
     await user.save();
     await sendPasswordResetEmail(email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);
     res.status(200).json({success:true,message:"Password reset email sent successfully"});
    } catch (error) {
        console.log("Error in forgot password controller",error);
        res.status(400).json({success:false,message:error.message});
    }
}

export const logout = async (req, res) => {
   res.clearCookie("token");
   res.status(200).json({success:true,message:"Logout successfully"});
}
