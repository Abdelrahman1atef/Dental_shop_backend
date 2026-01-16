const { Organization } = require('../models');

const subscriptionMiddleware = async (req, res, next) => {
    try {
        if (!req.organization || !req.organization.id) {
            return res.status(401).json({ message: 'Organization context missing.' });
        }

        const organization = await Organization.findByPk(req.organization.id);

        if (!organization) {
            return res.status(404).json({ message: 'Organization not found.' });
        }

        const { subscription_status } = organization;

        // If expired, only allow GET requests
        if (subscription_status === 'expired' && req.method !== 'GET') {
            return res.status(403).json({
                message: 'Subscription expired. Your organization is in read-only mode.'
            });
        }

        // Additional checks for 'past_due' could go here if needed

        next();
    } catch (error) {
        console.error('Subscription middleware error:', error);
        res.status(500).json({ message: 'Internal server error checking subscription.' });
    }
};

module.exports = subscriptionMiddleware;
