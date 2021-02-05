const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGO_URL } = require('./config.js');
const { MONGO_USERNAME } = require('./config.js');
const { MONGO_PASSWORD } = require('./config.js');

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