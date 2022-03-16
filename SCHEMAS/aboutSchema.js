const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema({
    aboutMeDescription: {
        type: String, 
        required: true
    },
    skills: [{
        type: String,
        required: false
    }],
    education: [{
        type: String,
        required: false
    }]
});

aboutSchema.virtual('id').get(function() {
    return this._id.toHexString();
});
aboutSchema.set('toJSON', {
    virtuals: true
});

exports.AboutInfo = mongoose.model('AboutInfo', aboutSchema)