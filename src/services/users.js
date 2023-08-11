import url from "./url";

export function signup(data) {
  const init = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
  };
  return fetch(`${url}/users/signup`, init)
    .then(res => res.json());
}

export function login(data) {
  const init = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
  };
  return fetch(`${url}/users/login`, init)
    .then(res => res.json());
}

export function deleteUser(data) {
  const init = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
  };
  return fetch(`${url}/users/delete`, init)
    .then(res => res.json());
}

export function getOneUser(token, idUser) {
  const init = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };
  return fetch(`${url}/users/${idUser}`, init)
    .then(res => res.json());
}

export function getHistory(token) {
  const init = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };
  return fetch(`${url}/users/special/history`, init)
    .then(res => res.json());
}

export function getFavorite(token) {
  const init = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  };
  return fetch(`${url}/users/special/favorite`, init)
    .then(res => res.json());
}