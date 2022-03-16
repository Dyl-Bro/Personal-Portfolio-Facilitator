const express = require('express');
const router = express.Router();
const {ContactInfo} = require('../SCHEMAS/contactSchema');

router.post('/', async (req, res) => {
    let contactInfo = new ContactInfo ({
        contact_phone : req.body.contact_phone,
        contact_email : req.body.contact_email,
        contact_linkedIn : req.body.contact_linkedIn
    })
    contactInfo = await contactInfo.save();
    if(!contactInfo){
        return res.status(400).send('contact info NOT succesfully created')
    }
    return res.status(200).send(contactInfo);

});
router.get('/:id', async (req, res) => {
    if(! req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(400).send('BAD CLIENT REQUEST, invalid object Id');
    }
    const contactInformation = await ContactInfo.findById(req.params.id);
    if(!contactInformation){
        return res.status(400).send('ID not recognized. Retreival failed.');
    }
    return res.status(200).send(contactInformation);
});
router.put('/:id', async (req, res) => {
    if(! req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(400).send('BAD CLIENT REQUEST, invalid object Id');
    }
    const contactinfo = await ContactInfo.findByIdAndUpdate(
        req.params.id,
        {
            contact_phone : req.body.contact_phone,
            contact_email : req.body.contact_email,
            contact_linkedIn : req.body.contact_linkedIn
        }
    );
    if(!contactinfo){
        return res.status(400).send('Contact Information Retreival failed')
    }
    return res.status(200).send(contactinfo);
    
})


module.exports = router;