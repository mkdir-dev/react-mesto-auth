export const BASE_URL = 'https://auth.nomoreparties.co'

function fixRes(res) {
  return res.ok ? res.json() : Promise.reject(`Произошла ошибка: ${res.status}`)
}

export function register(email, password) {
  return fetch(`${BASE_URL}/sign-up`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
    .then(res => fixRes(res))
}
