const mongoose = require("mongoose");
const ORDER_STATUS = require("../constants/orderStatus");

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [orderItemSchema],

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    required: true,
    enum: Object.values(ORDER_STATUS),
    default: ORDER_STATUS.PENDING
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);