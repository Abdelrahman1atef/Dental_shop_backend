const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Organization, OrganizationUser } = require('../../models');

const generateToken = (user, organizationUser) => {
    return jwt.sign(
        {
            user_id: user.id,
            organization_id: organizationUser.organization_id,
            role: organizationUser.role
        },
        process.env.JWT_SECRET || 'your_super_secret_key',
        { expiresIn: '1d' }
    );
};

const login = async (email, password, organizationId = null) => {
    const user = await User.scope('withPassword').findOne({ where: { email } });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // Fetch user's organizations
    const orgUsers = await OrganizationUser.findAll({
        where: { user_id: user.id, status: 'active' },
        include: [{ model: Organization }]
    });

    if (orgUsers.length === 0) {
        throw new Error('User does not belong to any active organization');
    }

    let selectedOrgUser;

    if (organizationId) {
        selectedOrgUser = orgUsers.find(ou => ou.organization_id === parseInt(organizationId));
        if (!selectedOrgUser) {
            throw new Error('User does not belong to the specified organization');
        }
    } else {
        if (orgUsers.length === 1) {
            selectedOrgUser = orgUsers[0];
        } else {
            // Return list of orgs if multiple and none selected
            return {
                requiresOrgSelection: true,
                organizations: orgUsers.map(ou => ({
                    id: ou.Organization.id,
                    name: ou.Organization.name,
                    slug: ou.Organization.slug
                }))
            };
        }
    }

    const token = generateToken(user, selectedOrgUser);
    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        },
        organization: {
            id: selectedOrgUser.Organization.id,
            name: selectedOrgUser.Organization.name,
            role: selectedOrgUser.role
        }
    };
};

module.exports = {
    login
};
