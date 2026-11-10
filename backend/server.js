
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { connectDB, db } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());

// =========================
// TEMPORARY OTP STORAGE
// =========================

const otpStore = new Map();

// =========================
// EMAIL CONFIGURATION
// =========================

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// =========================
// LOGIN
// =========================

app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const sql = `
        SELECT user_id, full_name, email, role
        FROM users
        WHERE email = ? AND password_hash = ?
    `;

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error("Login database error:", err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        return res.status(200).json({
            message: "Login successful",
            user: result[0]
        });
    });
});

// =========================
// SEND OTP
// =========================

app.post("/send-otp", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: "Password must contain at least 8 characters"
        });
    }

    const checkSql = `
        SELECT user_id
        FROM users
        WHERE email = ?
    `;

    db.query(checkSql, [email], async (err, result) => {
        if (err) {
            console.error("Signup email check error:", err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.length > 0) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const otp = crypto.randomInt(100000, 1000000).toString();

        otpStore.set(email, {
            name,
            password,
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000
        });

        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "ML Studio Email Verification",
                text: `Your ML Studio OTP is ${otp}. It expires in 5 minutes.`
            });

            return res.status(200).json({
                message: "OTP sent successfully"
            });
        } catch (error) {
            console.error("OTP email error:", error);

            otpStore.delete(email);

            return res.status(500).json({
                message: "Failed to send OTP email"
            });
        }
    });
});

// =========================
// VERIFY OTP
// =========================

app.post("/verify-otp", (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({
            message: "Email and OTP are required"
        });
    }

    const data = otpStore.get(email);

    if (!data || data.otp !== String(otp) || Date.now() > data.expiresAt) {
        return res.status(400).json({
            message: "Invalid or expired OTP"
        });
    }

    return res.status(200).json({
        message: "Email verified successfully",
        verified: true
    });
});

// =========================
// SIGNUP
// =========================

app.post("/signup", (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({
            message: "Email and OTP are required"
        });
    }

    const data = otpStore.get(email);

    if (!data || data.otp !== String(otp) || Date.now() > data.expiresAt) {
        return res.status(400).json({
            message: "Invalid or expired OTP"
        });
    }

    const { name, password } = data;

    const sql = `
        INSERT INTO users (full_name, email, password_hash)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error("Signup database error:", err);

            if (err.code === "ER_DUP_ENTRY") {
                otpStore.delete(email);

                return res.status(409).json({
                    message: "Email already registered"
                });
            }

            return res.status(500).json({
                message: "Signup failed"
            });
        }

        otpStore.delete(email);

        return res.status(201).json({
            message: "Account created successfully",
            userId: result.insertId
        });
    });
});

// =========================
// START SERVER
// =========================

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();
