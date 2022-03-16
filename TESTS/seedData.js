const {Admin} = require('../SCHEMAS/adminSchema');
const {ObjectId} = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const seedAdminId = new ObjectId(); 

const admin = new Admin ({
    _id: seedAdminId,
    name: 'Seed Admininstrator',
    email: 'SeedAdministrator@gmail.com',
    password: bcrypt.hashSync('SeedAdministratorPassword', 10)
})
module.exports.adminToken = jwt.sign(
    {adminId: admin._id}, process.env.SECRET, {expiresIn: '1d'}
)

module.exports.seedData = () => {
    try {
        admin.save();
    } catch (err) {
        console.log(err)
    }
};