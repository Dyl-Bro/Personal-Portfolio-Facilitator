const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    contact_phone: {
        type: String,
        required: true
    },
    contact_email: {
        type: String,
        required: true
    },
    contact_linkedIn: {
        type: String,
        required: false
    }
});

contactSchema.virtual('id').get(function ()  {
    return this._id.toHexString();
});
contactSchema.set('toJSON', {
    virtuals: true
});

exports.ContactInfo = mongoose.model('ContactInfo', contactSchema);