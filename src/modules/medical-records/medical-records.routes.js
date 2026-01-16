const express = require('express');
const router = express.Router();
const medicalRecordsController = require('./medical-records.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const rbacMiddleware = require('../../middlewares/rbac.middleware');
const subscriptionMiddleware = require('../../middlewares/subscription.middleware');

router.use(authMiddleware);
router.use(subscriptionMiddleware);

router.post('/', rbacMiddleware(['doctor']), medicalRecordsController.create);
router.get('/', medicalRecordsController.list);

module.exports = router;
