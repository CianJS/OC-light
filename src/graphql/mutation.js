import gql from 'graphql-tag'

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $pw: String!) {
    loginUser (email: $email, pw: $pw) {
      user {
        id
        username
      }
      token {
        accessToken
        refreshToken
      }
    }
  }
`

export const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!, $password: String!) {
    addUser (username: $name, email: $email, pw: $password) {
      username
      email
      pw
    }
  }
`

export const ReissuanceTokens = gql`
  mutation ReissuanceToken($refreshToken: String!) {
    reissuanceToken (refreshToken: $refreshToken) {
      id
      username
      accessToken
      refreshToken
    }
  }
`

export const FileUpload = gql`
  mutation($img: Upload!) {
    singleUpload(img: $img) {
      id
    }
  }
`
