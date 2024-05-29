const Restaurant = require("../models/Restaurant");

async function createRestaurant(restaurantData) {
  try {
    const newRestaurant = new Restaurant(restaurantData);
    const savedRestaurant = await newRestaurant.save();
    console.log("Created restaurant:", savedRestaurant);
  } catch (e) {
    throw e;
  }
}

async function getRestaurantByName(restaurantName) {
  try {
    const foundRestaurant = await Restaurant.findOne({ name: restaurantName });
    if (foundRestaurant) console.log(foundRestaurant);
    else console.log("Restaurant not found");
  } catch (e) {
    throw e;
  }
}

async function getAllRestaraunts() {
  try {
    const allResturants = await Restaurant.find();
    console.log(allResturants);
  } catch (e) {
    throw e;
  }
}

async function getRestaurantByCuisine(cuisine) {
  try {
    const foundRestaurant = await Restaurant.find({ cuisine: cuisine });
    if (foundRestaurant.length > 0) {
      console.log(foundRestaurant);
    } else {
      console.log("Restaurant not found");
    }
  } catch (e) {
    throw e;
  }
}
async function updateRestaurant(restaurantId, updatedData) {
  try {
    const foundRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updatedData,
      { new: true },
    );
    if (foundRestaurant) {
      console.log(foundRestaurant);
    } else console.log("Restaurant not found");
  } catch (e) {
    throw e;
  }
}

async function deleteRestaurant(restaurantId) {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(restaurantId);
    if (restaurant) {
      console.log("Restaurant deleted successfully");
    } else console.log("Restaurant not found");
  } catch (e) {
    throw e;
  }
}

async function getRestaurantByLocation(city) {
  try {
    const foundRestaurants = await Restaurant.find({ city: city });
    if (foundRestaurants.length > 0) console.log(foundRestaurants);
    else console.log("no restaurant found");
  } catch (error) {
    throw error;
  }
}

async function filterRestaurantsByRating(rating) {
  try {
    const foundRestaurants = await Restaurant.find({
      rating: { $gte: rating },
    });
    if (foundRestaurants.length > 0) {
      console.log(foundRestaurants);
    } else {
      console.log("no restaurant found");
    }
  } catch (error) {
    throw error;
  }
}

async function addDishToMenu(restaurantId, dish) {
  try {
    const foundRestaurant = await Restaurant.findById(restaurantId);
    if (foundRestaurant) {
      foundRestaurant.menu.push(dish);
      await foundRestaurant.save();
      console.log(foundRestaurant);
    } else {
      console.log("Restaurant not found");
    }
  } catch (e) {
    throw e;
  }
}
module.exports = { createRestaurant, getRestaurantByName };
