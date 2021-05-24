import {ApolloServer, gql} from 'apollo-server-micro'
import {getGistById, getGistsByUser} from "../../library/githubAPI"
import {getAllFavoriteGists, removeFavoriteGist, setFavoriteGist} from "./gistFavorites"

const typeDefs = gql`
scalar JSON

  type Query {
    gists(username: String): [Gist!]!
    gist(id: String): Gist!
    getAllFavoriteGists: [GistFavorite!]!
  }
  type Mutation {
    setFavoriteGist(id: String!): GistFavorite!
    removeFavoriteGist(id: String!): GistFavorite!
  }
  type Gist {
    id: String!
    description: String
    created_at: String!
    url: String!
    files: JSON
  }
  type GistFavorite {
    gistId: String!
  }
`

const resolvers = {
    Query: {
        async gists(parent, args, context) {
            try {
                return getGistsByUser(args.username)
            } catch (error) {
                console.error('api error', error)
            }
        },
        async gist(parent, args, context) {
            try {
                return getGistById(args.id)
            } catch (error) {
                console.error('api error', error)
            }
        },
        async getAllFavoriteGists(parent, args, context) {
            try {
                return getAllFavoriteGists()
            } catch (error) {
                console.error('api error', error)
            }
        }
    },
    Mutation: {
        async setFavoriteGist(parent, args, context) {
            try {
                return setFavoriteGist(args.id)
            } catch (error) {
                console.error('api error', error)
            }
        },
        async removeFavoriteGist(parent, args, context) {
            try {
                return removeFavoriteGist(args.id)
            } catch (error) {
                console.error('api error', error)
            }
        },
    }
}

const apolloServer = new ApolloServer({typeDefs, resolvers})

export const config = {
    api: {
        bodyParser: false,
    },
}

export default apolloServer.createHandler({path: '/api/graphql'})