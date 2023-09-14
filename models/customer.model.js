const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    mobile_number: {
        type: Number,
        required: true,
        maxlength: 15
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        set: value => bcrypt.hashSync(value, 10)
    },
    razor_id: {
        type: String,
        required: false,
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: {
        getters: true,
        setters: true
    },
    toObject: {
        getters: true,
        setters: true
    }
});

const Customer = mongoose.model('customers', CustomerSchema);

module.exports = Customer;