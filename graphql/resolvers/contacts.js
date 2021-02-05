const Contact = require('../../models/Contact');

module.exports = {
    Query: {
        async getContacts() {
            try {
                const contacts = await Contact.find();
                return contacts;
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};