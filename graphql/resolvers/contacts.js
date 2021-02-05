const { AuthenticationError } = require('apollo-server');
const { UserInputError } = require('apollo-server');

const Contact = require('../../models/Contact');
const checkAuth = require('../../util/check-auth');

const {
    validateContactInput
} = require('../../util/validators');

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
            //Validate Contact
            const { valid, errors } = validateContactInput(
                name,
                email,
                phone,
                job,
                address
            );
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            //check if phone already exists
            const phoneNumber = await Contact.findOne({
                $and: [
                    { "phone": phone },
                    { "user": user.id }
                ]
            });
            if (phoneNumber) {
                throw new UserInputError('Phone number already exists', {
                    errors: {
                        phone: 'Phone number already exists'
                    }
                });
            }
            //check if email already exists
            const emailExists = await Contact.findOne({
                $and: [
                    { "email": email },
                    { "user": user.id }
                ]
            });
            if (emailExists) {
                throw new UserInputError('Email already exists', {
                    errors: {
                        email: 'Email already exists'
                    }
                });
            }

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