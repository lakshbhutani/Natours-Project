const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const reviewRouter = express.Router({ mergeParams: true });

// POST /tour/234fde32/reviews
// GET /tour/234fde32/reviews
// POST /reviews

reviewRouter.use(authController.protect);

reviewRouter
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

reviewRouter
  .route('/:id')
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .get(reviewController.getReview)
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = reviewRouter;
