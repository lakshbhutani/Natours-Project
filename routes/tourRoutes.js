const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
// const reviewController = require('../controllers/reviewController');
const reviewRouter = require('./../routes/reviewRoutes');

const tourRouter = express.Router();

// tourRouter.param('id', tourController.checkID);

// tourRouter
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('users'),
//     reviewController.createReview
//   );

tourRouter.use('/:tourId/reviews', reviewRouter);

tourRouter
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getToursList);

tourRouter.route('/tour-stats').get(tourController.getTourStats);
tourRouter
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

tourRouter
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

tourRouter
  .route('/distances/:latlng/unit/:unit')
  .get(tourController.getDistances);
// /tours-distance?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi

tourRouter
  .route('/')
  .get(tourController.getToursList)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

tourRouter
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .get(tourController.getTourById)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = tourRouter;
