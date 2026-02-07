import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail } from "../mailTrap/emails.js";


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
export const login = async (req, res) => {
    res.send("login");
}
export const logout = async (req, res) => {
    res.send("logout");
}