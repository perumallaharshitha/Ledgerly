const User = require("../models/User");
const Transaction = require("../models/Transaction");

exports.getBalance = async (req, res) => {
  const user = await User.findOne({ email: req.userEmail });
  if (!user) return res.status(404).json({ detail: "User not found" });
  res.json({ wallet_balance: user.wallet_balance, _id: user._id });
};

exports.addMoney = async (req, res) => {
  const { amount } = req.body;
  const user = await User.findOneAndUpdate(
    { email: req.userEmail },
    { $inc: { wallet_balance: amount } },
    { new: true }
  );

  await Transaction.create({
    to_user_email: req.userEmail,
    amount,
    transaction_type: "add_money"
  });

  res.json({ wallet_balance: user.wallet_balance });
};

exports.transferMoney = async (req, res) => {
  const { to_email, amount } = req.body;
  if (to_email === req.userEmail) return res.status(400).json({ detail: "Cannot transfer to self" });

  const sender = await User.findOne({ email: req.userEmail });
  const recipient = await User.findOne({ email: to_email });
  if (!recipient) return res.status(404).json({ detail: "Recipient not found" });
  if (sender.wallet_balance < amount) return res.status(400).json({ detail: "Insufficient balance" });

  sender.wallet_balance -= amount;
  recipient.wallet_balance += amount;
  await sender.save();
  await recipient.save();

  await Transaction.create({
    from_user_email: req.userEmail,
    to_user_email: to_email,
    amount,
    transaction_type: "transfer"
  });

  res.json({ wallet_balance: sender.wallet_balance });
};
