import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'

const JWT_SECRET = 'vWsBwvuJ4phW89bh'
const JSON_COOKIE = {
  token: 'JSON-WEB-TOKEN',
  userInfo: 'GC_USER_NAME'
}

const checkToken = async (userToken) => {
  if (userToken) {
    const token = JSON.parse(userToken)
    const accessToken = token.accessToken
    const refreshToken = token.refreshToken

    // refreshToken Check
    const livingTokenState = await jwt.verify(refreshToken, JWT_SECRET, (err, data) => {
      if (err) {
        logout()
        return false
      } else {
        return true
      }
    })
    if (!livingTokenState) {
      throw new Error('{"refresh": false}')
    }

    // accessToken Check
    const chktoken = await jwt.verify(accessToken, JWT_SECRET, (err, data) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return false
        }
      } else {
        return data
      }
    })
    if (!chktoken) {
      throw new Error(`{"access": "${refreshToken}"}`)
    } else {
      return Promise.resolve(chktoken)
    }
  }
}

const getUserCookie = () => {
  return Cookies.get(JSON_COOKIE.userInfo)
}

const getTokenCookie = () => {
  return Cookies.get(JSON_COOKIE.token)
}

const setCookie = (data) => {
  if (data) {
    const token = data.token
    const user = data.user

    if (token) {
      Cookies.set(JSON_COOKIE.token, token, { expires: 7 })
    }
    if (user) {
      Cookies.set(JSON_COOKIE.userInfo, user, { expires: 7 })
    }
  }
}

const logout = () => {
  Cookies.remove(JSON_COOKIE.token, { expires: 7 })
  Cookies.remove(JSON_COOKIE.userInfo, { expires: 7 })
}

export default {
  checkToken,
  getUserCookie,
  getTokenCookie,
  setCookie,
  logout
}
