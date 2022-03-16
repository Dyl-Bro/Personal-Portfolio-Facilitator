const express = require('express');
const router = express.Router();
const {Admin} = require('../SCHEMAS/adminSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//default admin is pre-created and placed in database and admin login info information is storeed in .env file


router.post('/login', async (req, res) => {
    const admin = await Admin.findOne({email: req.body.email});
    const secret = process.env.SECRET;
    if(!admin){
        console.log("THE USER DOES NOT EXISTS IN THE DATABASE")
        return res.status(407).send('Admin Not Recognized')
    }
    if(admin && bcrypt.compareSync(req.body.password, admin.password)){
        console.log("THE USER DOES EXISTS IN THE DATABASE")
        const token = jwt.sign(
            {adminId: admin.id}, secret, {expiresIn: '1d'}
        )
        res.status(200).send({admin: admin.email, token: token})
    } else {
        console.log("THE USER DOES EXISTS IN THE DATABASE BUT IS NOT AUTHORIZING")
        res.status(400).send('Authorization failed')
    }
});
router.post('/register', async (req, res) => {
    let newAdmin = new Admin ({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    if(req.body.name ==null ||req.body.email == null|| req.body.password == null){
        return res.status(400).send('Request body missing required fields');
    }
    newAdmin = await newAdmin.save();
    if(!newAdmin){
        return res.status(400).send('client error, Admin not registered')
    }
    return res.status(200).send(newAdmin);
})








module.exports = router;