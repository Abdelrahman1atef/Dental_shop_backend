const rbacMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.organization || !req.organization.role) {
            return res.status(403).json({ message: 'Access denied. Role not found.' });
        }

        if (allowedRoles.includes(req.organization.role)) {
            next();
        } else {
            res.status(403).json({ message: 'Access denied. You do not have permission to perform this action.' });
        }
    };
};

module.exports = rbacMiddleware;
