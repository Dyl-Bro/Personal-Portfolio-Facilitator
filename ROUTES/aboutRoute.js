const express = require('express');
const router = express.Router();
const {AboutInfo} = require('../SCHEMAS/aboutSchema');


router.post('/', async (req, res) => {
    let newAboutSection = new AboutInfo({
        aboutMeDescription: req.body.aboutMeDescription,
        skills: req.body.skills,
        education: req.body.education
    })
    if(req.body.aboutMeDescription ==null ||req.body.skills == null|| req.body.education == null){
        return res.status(400).send('Request body missing required fields');
    }
    newAboutSection = await newAboutSection.save();
    if(!newAboutSection){
        return res.status(400).send('ABOUT ME SECTION NOT SUCCESSFULLY CREATED')
    }
    return res.status(200).send(newAboutSection);
});
router.get('/:id', async (req, res) => {
    if(! req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(400).send('BAD CLIENT REQUEST, invalid object Id');
    }
    const aboutSection = await AboutInfo.findById(req.params.id);
    if(!aboutSection){
        return res.status(400).send('ABOUT ME SECTION FAILED NOT SUCCESSFULLY RECEIVED')
    }
    return res.status(200).send(aboutSection);
})
router.put('/:id', async (req, res) => {
    if(! req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(400).send('BAD CLIENT REQUEST, invalid object Id');
    }
    const aboutSection = await AboutInfo.findByIdAndUpdate(
        req.params.id,
        {
            aboutMeDescription: req.body.aboutMeDescription,
            skills: req.body.skills,
            education: req.body.education
        }
    )
    if(!aboutSection){
        return res.status(400).send("ID NOT RECOGNIZED")
    }
    return res.status(200).send(aboutSection);
})


module.exports = router;