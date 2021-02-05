const { gql } = require('apollo-server');

module.exports = gql`
  type Contact {
    id: ID!
    name: String!
    email: String!
    phone: String!
    job: String!
    address: String!  
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getContacts: [Contact]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;