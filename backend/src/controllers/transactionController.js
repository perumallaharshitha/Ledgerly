const Transaction = require("../models/Transaction");

exports.getTransactions = async (req, res) => {
  const txns = await Transaction.find({
    $or: [
      { from_user_email: req.userEmail },
      { to_user_email: req.userEmail }
    ]
  }).sort({ createdAt: -1 });

  res.json(txns);
};
