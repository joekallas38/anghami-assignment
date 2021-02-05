const contactsResolvers = require('./contacts');
const usersResolvers = require('./users');

module.exports = {
    Query: {
        ...contactsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation
    }
};