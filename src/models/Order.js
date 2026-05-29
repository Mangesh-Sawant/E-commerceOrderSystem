const mongoose = require("mongoose");
const cartItemSchema = require("../models/Cart");
const ORDER_STATUS = require("../constants/orderStatus");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
   cartItemSchema
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    required: true,
    enum: [ORDER_STATUS],
    default: ORDER_STATUS.PENDING
  }
}, { timestamps: true });

modules.export = mongoose.model("Order",orderSchema);