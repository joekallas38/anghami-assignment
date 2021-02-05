const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const { MONGO_URL } = require('./config.js');
const { MONGO_USERNAME } = require('./config.js');
const { MONGO_PASSWORD } = require('./config.js');

const Contact = require('./models/Contact');

const typeDefs = gql`
  type Contact {
    id: ID!
    name: String!
    phone: String!
    email: String!,
    job: String!,
    address: String!
  }
  type Query {
    getContacts: [Contact]
  }
`;

const resolvers = {
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

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGO_URL, {
    promiseLibrary: require('bluebird'), useNewUrlParser: true, user: MONGO_USERNAME,
    pass: MONGO_PASSWORD,
})
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 4000 });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    });