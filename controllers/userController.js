const fs = require('fs');
// Route Handlers
exports.getAllUsers = (req, res) => {
  res.status(500).json({
    stauts: 'error',
    message: 'this route not defined yet!',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    stauts: 'success',
    users: users.length,
    data: {
      users,
    },
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    stauts: 'success',
    users: users.length,
    data: {
      users,
    },
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    stauts: 'success',
    users: users.length,
    data: {
      users,
    },
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    stauts: 'success',
    users: users.length,
    data: {
      users,
    },
  });
};
