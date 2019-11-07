const fs = require('fs');
const Tour = require('./../models/tourModel');

exports.getToursList = async (req, res) => {
  try {
    // 1A) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['sort', 'limit', 'duration', 'page', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);

    // 1B) Advance Filtering
    let queryString = JSON.stringify(req.query);
    queryString = queryString.replace(
      /\b(lte|gte|gt|lt)\b/g,
      match => `$${match}`
    );

    let query = Tour.find(JSON.parse(queryString));

    // // 2) Sorting
    if (req.query.sort) {
      query = query.sort('price');
      // sort('price ratingAverage')
    } else {
      query = query.sort('-createdAt');
    }

    // 3) Limiting fields
    if (req.query.fields) {
      query = query.select('name');
    } else {
      query = query.select('-__v');
    }

    //  4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    // page=2&limit=10, 1- 10, 11-20
    query = query.skip(skip).limit(limit);

    // Execute Query
    const tours = await query;
    // const tours = await Tour.find(
    //   JSON.parse(queryString),
    //   ['price', 'duration'],
    //   {
    //     sort: {
    //       price: 1
    //     }
    //   }
    // );

    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!'
    });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })
    res.status(200).json({
      status: 'success',
      data: { tour }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateExistingTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: { tour }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: tour
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
    });
  }
};
