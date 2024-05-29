const mongoose = require("mongoose");
const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
    enum: ["Indian", "Chinese", "Japanese", "Italian"],
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  menu: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      description: String,
      isVeg: {
        type: String,
        enum: ["veg", "non-veg"],
      },
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      ratings: {
        type: Number,
        min: 0,
        max: 5,
      },
      review: String,
    },
  ],
});
const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;
