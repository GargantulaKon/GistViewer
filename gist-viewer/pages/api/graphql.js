import {ApolloServer, gql} from 'apollo-server-micro'
import {getGistById, getGistsByUser} from "../../library/githubAPI";

const typeDefs = gql`
  type Query {
    gists(username: String): [Gist!]!
    gist(id: String): Gist!
  }
  type Gist {
    url: String
  }
`

const resolvers = {
    Query: {
        async gists(parent, args, context) {
            try {
                console.log('args', args)
                return getGistsByUser(args.username)
            } catch (error) {
                console.error('api error', error)
            }
        },
        async gist(parent, args, context) {
            try {
                console.log('args', args)
                return getGistById(args.id)
            } catch (error) {
                console.error('api error', error)
            }
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