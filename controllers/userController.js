const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    result: users.length,
    data: {
      users
    }
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    error: 'The rooute is not  yet defined!!'
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    error: 'The rooute is not  yet defined!!'
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    error: 'The rooute is not  yet defined!!'
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    error: 'The rooute is not  yet defined!!'
  });
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});
