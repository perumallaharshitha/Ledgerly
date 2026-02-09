const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { getBalance, addMoney, transferMoney } = require("../controllers/walletController");

router.get("/balance", auth, getBalance);
router.post("/add-money", auth, addMoney);
router.post("/transfer", auth, transferMoney);

module.exports = router;
