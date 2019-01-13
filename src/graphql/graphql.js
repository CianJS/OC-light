import gql from 'graphql-tag'

export const GET_ALL_USER = gql`
  query GetAllUserQuery {
    getAllUser {
      name
      email
      pw
    }
  }
`

export const GET_COMMUNITY = gql`
  query GetComuQuery {
    getComu {
      title
      mainGenre
      smallGenre
      type
    }
  }
`
