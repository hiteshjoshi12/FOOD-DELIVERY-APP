import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Restaurant } from "./models/restaurantModel.js";
import { User } from "./models/userModel.js";
import { Order } from "./models/orderSchema.js";
import moment from 'moment';

mongoose.connect("mongodb+srv://hitesh:hitesh123@food-odering-app.fiesrq8.mongodb.net/demo")
.then(() => console.log("Connected to the database"));
const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/restro", async (req, res) => {
  try {
    let { city, search } = req.query;

    let query = { city: new RegExp(city, "i") };

    if (search) {
      query = {
        $and: [
          { city: new RegExp(city, "i") },
          {
            $or: [
              { restaurantName: new RegExp(search, "i") },
              { cuisines: new RegExp(search, "i") },
            ],
          },
        ],
      };
    }

    const restaurants = await Restaurant.find(query);

    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/users", (req, res) => {
  User.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/addrestro", (req, res) => {
  Restaurant.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/menu", async (req, res) => {
  const { restaurantName, id } = req.query;

  try {
    const restaurant = await Restaurant.findOne({
      restaurantName: restaurantName,
      _id: id,
    });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(restaurant.menuItems);
  } catch (error) {
    console.error("Error fetching menu items", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/restaurants/:restaurantname", async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      restaurantName: req.params.restaurantname,
    });
    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch restaurant data" });
  }
});

app.post("/updateRestro/:restaurantname", async (req, res) => {
  try {
    const restaurantName = req.params.restaurantname;
    const updatedData = req.body;

    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { restaurantName: restaurantName },
      updatedData,
      { new: true }
    );
    res.json(updatedRestaurant);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = await Order.create(req.body); // Create a new order in the database
    res.status(201).json(newOrder); // Send back the created order
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/api/report', async (req, res) => {
  try {
    const { restaurantName, startDate, endDate } = req.query;
    let query = { restaurantName };

    if (startDate && endDate) {
      // Convert startDate and endDate to Date objects
      const start = moment(startDate).startOf('day');
      const end = moment(endDate).endOf('day');
      
      query.createdAt = { $gte: start.toDate(), $lte: end.toDate() };
    }

    const orders = await Order.find(query);
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`);
});
