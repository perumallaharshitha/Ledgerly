const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    from_user_email: String,
    to_user_email: String,
    amount: Number,
    transaction_type: {
      type: String,
      enum: ["add_money", "transfer"]
    },
    status: { type: String, default: "completed" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
