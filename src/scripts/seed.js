const { User, Organization, OrganizationUser } = require('../models');
const sequelize = require('../config/database');
const createDatabase = require('../config/initDb');

async function seed() {
    try {
        await createDatabase();
        await sequelize.sync({ alter: true });

        console.log('🌱 Starting Seed...');

        // 1. Create an Organization (Clinic)
        const [org, createdOrg] = await Organization.findOrCreate({
            where: { slug: 'dental-shop-cairo' },
            defaults: {
                name: 'Dental Shop Cairo',
                subscription_status: 'active'
            }
        });

        if (createdOrg) console.log('✅ Organization Created:', org.name);
        else console.log('ℹ️ Organization already exists:', org.name);

        // 2. Create a User (Doctor)
        const [doctor, createdDoc] = await User.findOrCreate({
            where: { email: 'doctor@example.com' },
            defaults: {
                firstName: 'Ali',
                lastName: 'Doctor',
                phone: '01000000001',
                password: 'password123', // Will be hashed by hooks
                additionalInfo: { specialty: 'Dentist' }
            }
        });

        if (createdDoc) console.log('✅ Doctor Created:', doctor.email);
        else console.log('ℹ️ Doctor already exists:', doctor.email);

        // 3. Link them (Role: Doctor)
        const [linkDoc, createdLinkDoc] = await OrganizationUser.findOrCreate({
            where: { organization_id: org.id, user_id: doctor.id },
            defaults: {
                role: 'doctor',
                status: 'active'
            }
        });

        if (createdLinkDoc) console.log('🔗 Linked Doctor to Clinic');

        // 4. Create an Assistant
        const [assistant, createdAsst] = await User.findOrCreate({
            where: { email: 'assistant@example.com' },
            defaults: {
                firstName: 'Sara',
                lastName: 'Assistant',
                phone: '01000000002',
                password: 'password123',
                additionalInfo: {}
            }
        });

        if (createdAsst) console.log('✅ Assistant Created:', assistant.email);

        // 5. Link Assistant
        const [linkAsst, createdLinkAsst] = await OrganizationUser.findOrCreate({
            where: { organization_id: org.id, user_id: assistant.id },
            defaults: {
                role: 'assistant',
                status: 'active'
            }
        });

        if (createdLinkAsst) console.log('🔗 Linked Assistant to Clinic');

        console.log('\n✨ Seeding Complete! You can now login with:');
        console.log('   Email: doctor@example.com');
        console.log('   Password: password123');

    } catch (error) {
        console.error('❌ Seeding Failed:', error);
    } finally {
        await sequelize.close();
    }
}

seed();
