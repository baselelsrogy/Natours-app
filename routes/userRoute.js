// files are requires
const express = require('express');
const userController = require(`./../controllers/userController`);
const router = express.Router();

// Get users, Create user
router.route('/').get(userController.getAllUsers).post(userController.createUser);
// Get user by id, update user, delete user
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;
