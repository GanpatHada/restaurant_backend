require("./db");
const Restaurant = require("./models/Restaurant");
const User = require("./models/User");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
const {
  createRestaurant,
  getRestaurantByName,
} = require("./services/restaurantService");

const restaurantData = {
  name: "New Restaurant 3",
  cuisine: "Indian",
  address: "ajmer road",
  city: "jaipur",
  rating: 5,
  menu: [
    { name: "Pizza Margherita", price: 12.99 },
    { name: "Pasta Carbonara", price: 15.99 },
  ],
};
// createRestaurant(restaurantData);
// getRestaurantByName("New Restaurant 2");
// addDishToMenu("6654b82f6072b6cf724b4408", {
//   name: "kachori",
//   price: 15,
//   isVeg: "veg",
//   description: "a pie in english",
// });

async function createUser(userData) {
  try {
    const user = new User(userData);
    const savedUser = await user.save();
    console.log("User added", savedUser);
  } catch (e) {
    throw e;
  }
}

async function addRestaurantReviewAndRating(restaurantId, review) {
  try {
    const foundRestaurent = await Restaurant.findById(restaurantId);
    if (foundRestaurent) {
      foundRestaurent.reviews.push(review);
      foundRestaurent.averageRating =
        foundRestaurent.reviews.reduce((acc, curr) => acc + curr.ratings, 0) /
        foundRestaurent.reviews.length;
      await foundRestaurent.save();
      console.log(foundRestaurent);
    }
  } catch (e) {
    throw e;
  }
}
// addRestaurantReviewAndRating("6654b82f6072b6cf724b4408", {
//   userId: "6655611a96ba3d939a20d34d",
//   review: "nice place for foodie",
//   ratings: 5,
// });

// createUser({ userName: "Harry", profilePicture: "wwww.profile.com" });

async function getUserReviews(restaurantId) {
  try {
    const foundRestaurantReviews = await Restaurant.findById(restaurantId);
    console.log(foundRestaurantReviews.reviews);
  } catch (e) {
    throw e;
  }
}
// getUserReviews("6654b82f6072b6cf724b4408");

app.get("/", (req, res) => {
  res.send("welcome to express");
});

app.post("/restaurants", (req, res) => {
  try {
    const restaurantData = req.body;
    createRestaurant(restaurantData);
    res.status(201).json({ message: "Restaurant added successfully" });
  } catch (e) {
    res.stauts(500).json({ error: "Failed to add restaurant" });
  }
});

app.listen(PORT, () => {
  console.log("server started");
});
