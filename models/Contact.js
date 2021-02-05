const { model, Schema } = require('mongoose');

const contactSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    job: String,
    address: String,
    username: String,
    createdAt: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Contact', contactSchema);