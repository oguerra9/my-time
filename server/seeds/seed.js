const db = require('../config/connection');
const { User } = require('../models');
const userData = require('./userData.json');

db.once('open', async () => {
    try {
        await User.deleteMany({});
        
        await User.create(userData);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
});
