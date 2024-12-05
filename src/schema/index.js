const { gql } = require('apollo-server-express');

module.exports = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Int
    role: String!
  }

  type Query {
    listEmployees(page: Int, limit: Int, sort: String): [Employee!]!
    getEmployee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(name: String!, age: Int!, class: String!, subjects: [String!]!, attendance: Int, role: String!): Employee
    updateEmployee(id: ID!, name: String, age: Int, class: String, subjects: [String!], attendance: Int): Employee
  }
`;
