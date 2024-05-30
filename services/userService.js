const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
async function createUser(userData) {
  try {
    const user = new User(userData);
    const savedUser = await user.save();
    return savedUser;
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
      return foundRestaurent;
    }
  } catch (e) {
    throw e;
  }
}

async function getUserReviews(restaurantId) {
  try {
    const foundRestaurantReviews = await Restaurant.findById(restaurantId);
    return foundRestaurantReviews.reviews;
  } catch (e) {
    throw e;
  }
}

module.exports = { createUser, addRestaurantReviewAndRating, getUserReviews };
