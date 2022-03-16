const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

adminSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
adminSchema.set('toJSON', {
    virtuals: true,
});

exports.Admin = mongoose.model('Admin', adminSchema);