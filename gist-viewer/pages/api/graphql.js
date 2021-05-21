import {ApolloServer, gql} from 'apollo-server-micro'
import {getGistsByUser} from "../../library/githubAPI";

const typeDefs = gql`
  type Query {
    gists(username: String): [Gist!]!
  }
  type Gist {
    url: String
  }
`

const resolvers = {
    Query: {
        async gists(parent, args, context) {
            console.log('args', args)
            return getGistsByUser(args.username)
        },
    },
}

const apolloServer = new ApolloServer({typeDefs, resolvers})

export const config = {
    api: {
        bodyParser: false,
    },
}

export default apolloServer.createHandler({path: '/api/graphql'})