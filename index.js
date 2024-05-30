require("./db");
const restaurantRouter = require("./routers/Restaurant.router");
const express = require("express");
const helmet = require("helmet");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/restaurants", restaurantRouter);
app.use(helmet());
app.use(cors());

const {
  createRestaurant,
  getRestaurantByName,
  getAllRestaraunts,
  getRestaurantByCuisine,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantByLocation,
  filterRestaurantsByRating,
  addDishToMenu,
} = require("./services/restaurantService");

const {
  createUser,
  addRestaurantReviewAndRating,
  getUserReviews,
} = require("./services/userService");

restaurantRouter.post("/:restaurantId/menu", async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const updatedRestaurant = await addDishToMenu(restaurantId, req.body);
    res.status(200).json(updatedRestaurant);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch restaurant" });
    console.log(e);
  }
});

restaurantRouter.post("/:restaurantId/reviews", async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const review = req.body;
    const updatedRestaurant = await addRestaurantReviewAndRating(
      restaurantId,
      review,
    );
    res.status(200).json({
      message: "review added successfully",
      restaurant: updatedRestaurant,
    });
  } catch (e) {
    res.status(500).json({ error: "failed to add review" });
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
    throw e;
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
restaurantRouter.get("/", async (req, res) => {
  try {
    const allRestaurants = await getAllRestaraunts();
    res.json(allRestaurants);
  } catch (e) {
    res.status(500).json({ error: "failed to get restaurants" });
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
  restaurantRouter.get("/:restaurantId/reviews", async (req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
      const restaurantReviews = await getUserReviews(restaurantId);
      res.status(200).json({ reviews: restaurantReviews });
    } catch (e) {
      res.status(500).json({ error: "failed to fetch reviews" });
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
      res
        .status(200)
        .json({ message: "restaurant found", restaurant: restaurantsList });
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

app.post("/createUser", async (req, res) => {
  try {
    const userData = req.body;
    const user = await createUser(userData);
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: "Failed to create user" });
    console.log(e);
  }
});

app.get("/", (req, res) => {
  res.send("welcome to express");
});

app.listen(PORT, () => {
  console.log("server started at " + PORT);
});
