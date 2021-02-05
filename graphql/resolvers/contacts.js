const { AuthenticationError } = require('apollo-server');

const Contact = require('../../models/Contact');
const checkAuth = require('../../util/check-auth');

module.exports = {
    Query: {
        async getContacts(_, { }, context) {
            const user = checkAuth(context);

            try {
                const contacts = await Contact.find({ "user": user.id }).sort({ createdAt: -1 });
                return contacts;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getContact(_, { contactId }) {
            try {
                const contact = await Contact.findById(contactId);
                if (contact) {
                    return contact;
                } else {
                    throw new Error('Contact not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createContact(_, { name, email, phone, job, address }, context) {
            const user = checkAuth(context);
            console.log(user);

            const newContact = new Contact({
                name,
                email,
                phone,
                job,
                address,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const contact = await newContact.save();

            return contact;
        },
        async deleteContact(_, { contactId }, context) {
            const user = checkAuth(context);

            try {
                const contact = await Contact.findById(contactId);
                if (user.username === contact.username) {
                    await contact.delete();
                    return 'Contact deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};