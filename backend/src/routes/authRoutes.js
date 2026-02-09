const router = require("express").Router();
const { register, login } = require("../controllers/authController"); 
const auth = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

router.get("/check", auth, (req, res) => {
  res.json({ user: { email: req.userEmail } });
});

router.post("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.json({ message: "Logged out" });
});

module.exports = router;
