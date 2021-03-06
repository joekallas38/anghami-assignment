const { gql } = require('apollo-server');

module.exports = gql`
 type Contact {
    id: ID!
    name: String!
    email: String!
    phone: String!
    job: String!
    address: String!  
    createdAt: String!
    username: String!
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
    getContact(contactId: ID!): Contact
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createContact(name: String!,email: String!,phone: String!, job:String!,address:String!): Contact!
    updateContact(contactId: ID!, name: String!,email: String!,phone: String!, job:String!,address:String!): Contact!
    deleteContact(contactId: ID!): String!
  }
`;