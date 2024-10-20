// import Cookies from 'js-cookie'

// const TokenKey = 'Admin-Token'

// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }

export function getToken() {
  return localStorage.getItem('_token')
}

export function setToken(token) {
  localStorage.setItem('_token', token)
}

export function removeToken() {
  localStorage.setItem('_token', '')
}
