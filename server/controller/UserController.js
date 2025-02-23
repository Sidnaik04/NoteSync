import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Error in register:", err); 
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        console.log("Login request received:", req.body); 

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found with email:", email);
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch for user:", email);
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("User authenticated successfully:", email);
        res.json({ token, user });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
