const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/jwt");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ detail: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed,
      wallet_balance: 0,
    });

    const token = generateToken(user.email);

    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      user: { email: user.email, username: user.username },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ detail: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ detail: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ detail: "Invalid credentials" });
    }

    const token = generateToken(user.email);

    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      user: { email: user.email, username: user.username },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ detail: "Internal server error" });
  }
};
