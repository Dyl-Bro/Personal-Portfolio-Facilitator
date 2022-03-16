const express = require('express');
const router = express.Router();
const {Project} = require('../SCHEMAS/projectsSchema');
const multer = require('multer');



const fileStorage = multer.diskStorage({
    // Destination to store project files     
    destination: (req, file, cb) => {
        cb(null, 'UPLOAD-FILES')
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.split(' ').join('-');
        const extension = file.mimetype;
        cb(null, fileName)
  }
});
const upload = multer({storage: fileStorage})


router.post('/', upload.single('image'), async (req, res) => {
    const fileToUpload = req.file;
    const fileName = fileToUpload.filename;
    const basePath = `${req.protocol}://${req.get('host')}/UPLOAD-FILES/`;

    let newProject = new Project({
        title : req.body.title,
        image: `${basePath}${fileName}`,
        description: req.body.description,
        projectLink: req.body.projectLink
    });
    if(req.body.title==null||req.body.description==null||req.body.projectLink==null||req.file == null){
        return res.status(400).send('Project creation failed. Missing required filed(s). ');
    }
    newProject = await newProject.save();
    if(!newProject){
        return res.status(400).send('failed to create new project')
    }
    return res.status(200).send(newProject);
});
router.get('/', async (req, res) => {
    const projectList = await Project.find({});
    if(!projectList){
        return res.status(400).send('No Project List Found');
    }
    return res.status(200).send(projectList);
});
router.get('/:id', async (req, res) => {
    if(! req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(400).send('BAD CLIENT REQUEST, invalid object Id');
    }
    const project = await Project.findById(req.params.id);
    if(!project){
        return res.status(400).send('No Project found');
    }
    return res.status(200).send(project);
});
router.put('/documents/:id', upload.array('documents', 10), async (req, res) => {
    if(! req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(400).send('BAD CLIENT REQUEST, invalid object Id');
    }
    const files = req.files;
    let docPaths = [];//use to fill the path of the img itwill be the old one already in database or new filepath if user uploads it to request
    const basePath = `${req.protocol}://${req.get('host')}/UPLOAD-FILES/`;
    if(files){//case: user has uploaded a file in the put request
        files.map(file => {
            docPaths.push(`${basePath}${file.filename}`);
        })
    }
    const project = await Project.findByIdAndUpdate (
        req.params.id,
        {
            documents: docPaths
        },
        {new: true}
    )
    if(!project){
        return res.status(400).send('Project documents not successfully updated')
    }
    return res.status(200).send(project)
});
router.put('/:id', upload.single('image'), async (req, res) => {
    if(! req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(400).send('BAD CLIENT REQUEST, invalid object Id');
    }
    const basePath = `${req.protocol}://${req.get('host')}/UPLOAD-FILES/`
    const file = req.file;
    const currentProject = Project.findById(req.params.id);
    if(!currentProject){
        return res.status(400).send('Cannot Find Project')
    }
    let imgPath;
    if(file){
        imgPath = `${basePath}${req.file.filename}`
    } else {
        imgPath = currentProject.image
    }
    const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        {
           title: req.body.title,
           image: imgPath,
           description: req.body.description,
           projectLink: req.body.projectLink 
        },
        {new: true}
    );
    if(!updatedProject){
        return res.status(400).send('Project not updated')
    }
    return res.status(200).send(updatedProject);
})
router.delete('/:id', async (req, res) => {
    if(! req.params.id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(400).send('BAD CLIENT REQUEST, invalid object Id');
    }
    Project.findByIdAndRemove(req.params.id).then(project => {
        if(project){
            return res.status(200).send('Project succesfully deleted')
        } else{
            return res.status(404).send('Project not found.')
        }
    }).catch(err => {
        return res.status(400).send(err)
    });
});


module.exports = router;