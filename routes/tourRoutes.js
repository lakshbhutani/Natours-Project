const express = require('express');
const tourController = require('../controllers/tourController');

const tourRouter = express.Router();

// tourRouter.param('id', tourController.checkID);

tourRouter
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getToursList);

tourRouter.route('/tour-stats').get(tourController.getTourStats);
tourRouter.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

tourRouter
  .route('/')
  .get(tourController.getToursList)
  .post(tourController.createTour);

tourRouter
  .route('/:id')
  .patch(tourController.updateExistingTour)
  .get(tourController.getTourById)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
