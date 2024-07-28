import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    restaurantName: String,
    items: [{ name: String, price: Number, quantity: Number }],
    totalAmount: Number,
    customerEmail: String,
    billingAddress: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  });


const Order = mongoose.model('Order', orderSchema);

export { Order };
