const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        required: true
    },
    documents: [{
        type: String,
        required: false
    }],
    projectLink: {
        type: String,
        required: true
    }
})
projectSchema.virtual('id').get(function (){
    return this._id.toHexString();
})
projectSchema.set('toJSON', {
    virtuals: true
})


exports.Project = mongoose.model('Project', projectSchema)