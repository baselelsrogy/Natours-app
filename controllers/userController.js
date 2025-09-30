const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const fs = require('fs');
// Route Handlers
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    reaults: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) create error if user POST password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password update. please use /updateMyPassword', 400));
  }

  const filteredBody = filterObj(req.body, 'name', 'email');

  // 2) update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true, runValidators: true });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    stauts: 'error',
    message: 'this route not defined yet!',
  });
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    stauts: 'error',
    message: 'this route not defined yet!',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    stauts: 'error',
    message: 'this route not defined yet!',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    stauts: 'error',
    message: 'this route not defined yet!',
  });
};
