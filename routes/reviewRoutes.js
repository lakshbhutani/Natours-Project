const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const reviewRouter = express.Router({ mergeParams: true });

// POST /tour/234fde32/reviews
// GET /tour/234fde32/reviews
// POST /reviews

reviewRouter
  .route('/')
  .get(authController.protect, reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user', 'guide'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

reviewRouter
  .route('/:id')
  .patch(reviewController.updateReview)
  .get(reviewController.getReview)
  .delete(reviewController.deleteReview);

module.exports = reviewRouter;
