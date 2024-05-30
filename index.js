require("./db");
const Restaurant = require("./models/Restaurant");
const User = require("./models/User");
const restaurantRouter = require("./routers/Restaurant.router");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/restaurants", restaurantRouter);

const {
  createRestaurant,
  getRestaurantByName,
  getAllRestaraunts,
  getRestaurantByCuisine,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantByLocation,
  filterRestaurantsByRating,
} = require("./services/restaurantService");

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
restaurantRouter.get("/", async (req, res) => {
  try {
    const allRestaurants = await getAllRestaraunts();
    res.json(allRestaurants);
  } catch (e) {
    res.status(500).json({ error: "failed to get restaurants" });
  }
});

restaurantRouter.get("/search", async (req, res) => {
  try {
    const location = req.query.location;
    const restaurants = await getRestaurantByLocation(location);
    res.status(200).json({ messageOFLoc: "Restaurants found", restaurants });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }

  restaurantRouter.get("/:name", async (req, res) => {
    try {
      const restaurantName = req.params.name;
      const restaurantsList = await getRestaurantByName(restaurantName);
      res.status(200).json({ message: restaurantsList });
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch restaurant" });
      console.log(e);
    }
  });

  restaurantRouter.get("/rating/:rating", async (req, res) => {
    try {
      const rating = parseInt(req.params.rating);
      const restaurants = await filterRestaurantsByRating(rating);
      res.json({ message: "Restaurants found", restaurants });
    } catch (error) {
      res.status(500).json({ error: "failed to fetch" });
    }
  });
  restaurantRouter.get("/cuisine/:cuisineName", async (req, res) => {
    try {
      const restaurantList = await getRestaurantByCuisine(
        req.params.cuisineName,
      );
      res.json(restaurantList);
    } catch (e) {
      res.status(500).json({ error: "failed to get restaurant" });
      console.log(e);
    }
  });

  restaurantRouter.post("/", async (req, res) => {
    try {
      const restaurantData = req.body;
      await createRestaurant(restaurantData);
      res.status(201).json({ message: "Restaurant added successfully" });
    } catch (e) {
      res.status(500).json({ error: "Failed to add restaurant" });
    }
  });

  restaurantRouter.post("/:restaurantId", async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
      const updatedRestaurant = await updateRestaurant(restaurantId, req.body);
      console.log(req.body);
      res.status(200).json(updatedRestaurant);
    } catch (e) {
      res.status(500).json({ error: "Failed to fetch restaurant" });
      console.log(e);
    }
  });

  restaurantRouter.delete("/:restaurantId", async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
      await deleteRestaurant(restaurantId);
      res.status(200).json({ message: "Restaurant deleted successfully" });
    } catch (e) {
      res.status(500).json({ error: "Failed to delete restaurant" });
    }
  });
});

app.get("/", (req, res) => {
  res.send("welcome to express");
});

app.listen(PORT, () => {
  console.log("server started");
});
