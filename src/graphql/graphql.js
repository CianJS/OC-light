import gql from 'graphql-tag'

export const GET_ALL_USER = gql`
  query getAllUser {
    getAllUser {
      name
      email
      pw
    }
  }
`
