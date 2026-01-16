const express = require('express');
const router = express.Router();
const appointmentsController = require('./appointments.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const subscriptionMiddleware = require('../../middlewares/subscription.middleware');

router.use(authMiddleware);
router.use(subscriptionMiddleware);

router.post('/', appointmentsController.create);
router.get('/', appointmentsController.list);
router.put('/:id', appointmentsController.update);

module.exports = router;
