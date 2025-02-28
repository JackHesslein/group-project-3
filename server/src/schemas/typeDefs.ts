const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Park {
    _id: ID!
    name: String!
    species: [String]!
    code: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    getParksByName(name: String!): [Park]
    getParkByCode(code: String!): Park
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveFavSpecies(species: String!): User
    deleteFavSpecies(species: String!): User
  }
`;

export default typeDefs;
