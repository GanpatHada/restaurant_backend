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
    const foundRestaurant = await Restaurant.find({ name: restaurantName });
    return foundRestaurant;
  } catch (e) {
    throw e;
  }
}

async function getAllRestaraunts() {
  try {
    const allResturants = await Restaurant.find();
    return allResturants;
  } catch (e) {
    throw e;
  }
}

async function getRestaurantByCuisine(cuisine) {
  try {
    const foundRestaurant = await Restaurant.find({
      cuisine: new RegExp(cuisine, "i"),
    });
    return foundRestaurant;
  } catch (e) {
    throw e;
  }
}
async function updateRestaurant(restaurantId, updatedData) {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updatedData,
      { new: true },
    );
    console.log(updatedRestaurant);
    return updatedRestaurant;
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
    const foundRestaurants = await Restaurant.find({
      city: new RegExp(city, "i"),
    });
    return foundRestaurants;
  } catch (error) {
    throw error;
  }
}

async function filterRestaurantsByRating(rating) {
  try {
    const foundRestaurants = await Restaurant.find({
      rating: { $gte: rating },
    });
    return foundRestaurants;
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
module.exports = {
  createRestaurant,
  getRestaurantByName,
  getAllRestaraunts,
  getRestaurantByCuisine,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantByLocation,
  filterRestaurantsByRating,
  addDishToMenu,
};
