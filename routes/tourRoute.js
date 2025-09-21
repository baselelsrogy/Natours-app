// files are requires
const express = require('express');
const tourController = require(`./../controllers/tourController`);

const router = express.Router();

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);
// Handling GET request, Handling POST request => CREATE
router.route('/').get(tourController.getAllTours).post(tourController.createTour);
// GET tour by id, Handling PATCH Request => update, Handling DELETE Request
router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;
