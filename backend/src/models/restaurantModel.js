import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    // required: true
  },
  city: {
    type: String,
    // required: true
  },
  country: {
    type: String,
    // required: true
  },
  delivery_cost: {
    type: Number,
    // required: true
  },
  delivery_time: {
    type: Number,
    // required: true
  },
  description: { 
    type: String 
  },
  cuisines: {
    type: [String],
    // required: true
  },
  menuItems: [
    {
      name: String,
      price: Number,
      description: String,
      img: String,

      // Add other fields as needed for menu items
    },
  ],
  imageUrl: String,
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Restaurant = mongoose.model("Restro", restaurantSchema);

export { Restaurant };
