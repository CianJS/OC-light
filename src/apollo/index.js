import { ApolloClient } from 'apollo-client'
import { withClientState } from 'apollo-link-state'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'

const apolloCache = new InMemoryCache({
  dataIdFromObject: e => `${e.__typename}_${e.id}` || null // eslint-disable-line no-underscore-dangle
})

const stateLink = withClientState({
  cache: apolloCache
})

const opts = {
  credentials: 'same-origin'
}

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
  ...opts
})

const link = ApolloLink.from([
  stateLink,
  httpLink
])

const cache = new InMemoryCache()

export default new ApolloClient({
  link,
  cache,
  connectToDevTools: true
})
