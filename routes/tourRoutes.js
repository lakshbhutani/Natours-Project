const express = require('express');
const tourController = require('../controllers/tourController');
const tourRouter = express.Router();

tourRouter.param('id', tourController.checkID);

tourRouter
  .route('/')
  .get(tourController.getToursList)
  .post(tourController.checkBody, tourController.createTour);

tourRouter
  .route('/:id')
  .patch(tourController.updateExistingTour)
  .get(tourController.getTourById)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
