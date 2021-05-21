import { ApolloServer, gql } from 'apollo-server-micro'

const typeDefs = gql`
  type Query {
    gists: [User!]!
  }
  type User {
    name: String
  }
`

const resolvers = {
    Query: {
        gists(parent, args, context) {
            return [{ name: 'Is this for real?' }]
        },
    },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
    api: {
        bodyParser: false,
    },
}

export default apolloServer.createHandler({ path: '/api/graphql' })