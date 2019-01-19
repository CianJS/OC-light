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

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $pw: String!) {
    loginUser (email: $email, pw: $pw) {
      name
    }
  }
`

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

export const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!, $password: String!) {
    addUser (name: $name, email: $email, pw: $password) {
      name
      email
      pw
    }
  }
`
