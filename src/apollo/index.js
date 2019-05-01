import { ApolloClient } from 'apollo-client'
import { withClientState } from 'apollo-link-state'
// import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { createUploadLink } from 'apollo-upload-client'

const apolloCache = new InMemoryCache({
  dataIdFromObject: e => `${e.__typename}_${e.id}` || null // eslint-disable-line no-underscore-dangle
})

const stateLink = withClientState({
  cache: apolloCache
})

const opts = {
  credentials: 'same-origin'
}

// const httpLink = new HttpLink({
//   uri: 'http://localhost:4000',
//   ...opts
// })

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log('ErrorLinks:', message))
})

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000',
  ...opts
})

const link = ApolloLink.from([
  errorLink,
  stateLink,
  uploadLink
])

const cache = new InMemoryCache()

export default new ApolloClient({
  link,
  cache,
  connectToDevTools: true
})
