const express = require('express');
const router = express.Router();
const patientsController = require('./patients.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const subscriptionMiddleware = require('../../middlewares/subscription.middleware');

// Apply auth middleware to all routes
router.use(authMiddleware);
router.use(subscriptionMiddleware);

router.post('/', patientsController.create);
router.get('/', patientsController.list);
router.get('/:id', patientsController.get);
router.put('/:id', patientsController.update);

module.exports = router;
