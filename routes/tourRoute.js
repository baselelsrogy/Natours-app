// files are requires
const express = require('express');
const tourController = require(`./../controllers/tourController`);

const router = express.Router();
router.param('id', tourController.checkID);

// Handling GET request, Handling POST request => CREATE
router.route('/').get(tourController.getAllTours).post(tourController.checkBody, tourController.createTour);
// GET tour by id, Handling PATCH Request => update, Handling DELETE Request
router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;
