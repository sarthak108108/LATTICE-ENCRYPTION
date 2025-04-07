import { User_ce } from "../models/usermodel.js";

exports.register = async (req, res) => {
  const { username } = req.body;
  const public_key = "sample";
  try {
    let user = await User_ce.findOne({ username });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User_ce({ username, public_key });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

const generateLoginKey = () => {
  return toString(Math.floor(100000 + Math.random() * 900000).toString());
};

exports.login = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User_ce.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate loginKey and save to DB
    const loginKey = generateLoginKey();
    user.login_key = loginKey;
    await user.save();

    // Set cookie
    res.cookie("loginKey", loginKey, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "Lax", // adjust as needed
    });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.logout = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User_ce.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Remove loginKey from database
    user.login_key = null;
    await user.save();

    // Clear cookie from browser
    res.clearCookie("loginKey", {
      httpOnly: true,
      sameSite: "Lax", // or "None" if using cross-origin
      secure: false    // set to true if using HTTPS
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.getUserPublicKey = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User_ce.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ publicKey: user.public_key });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
