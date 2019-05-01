import gql from 'graphql-tag'

export const GET_COMMUNITY = gql`
  query GetComuQuery {
    getComu {
      id
      title
      mainGenre
      smallGenre
      type
    }
  }
`

export const GET_USER_CHARACTER = gql`
  query GetMyInfoQuery($userId: Int!) {
    getMyInfo(userId: $userId) {
      user {
        id
        username
      }
      characters {
        name
        characterLink {
          path
          mimetype
          encoding
        }
      }
    }
  }
`
