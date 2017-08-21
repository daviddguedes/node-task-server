'use strict';

const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');

exports.getContacts = async (user) => {
    const res = await Contact.find({
        user: user
    }, 'image first_name last_name phone email');
    return res;
}

exports.create = async (data) => {
    var contact = new Contact(data);
    var c = await contact.save();
    return c;
}

exports.update = async (id, data) => {
    var updated = await Contact
        .findByIdAndUpdate(id, {
            $set: {
                image: data.image,
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                email: data.email
            }
        });

    return updated;
}