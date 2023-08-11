import url from "./url";

export function createRevision(toSend, token) {
  const init = {
    method: 'POST',
    body: JSON.stringify(toSend),
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
      "Content-type": "application/json; charset=UTF-8"
    })
  };
  return fetch(`${url}/revision/start`, init)
    .then(res => res.json());
}

export function getOne(id, token) {
  const init = {
    method: 'GET',
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
      "Content-type": "application/json; charset=UTF-8"
    })
  };
  return fetch(`${url}/revision/${id}`, init)
    .then(res => res.json());
}

export function sendMessage(id, toSend, token) {
  const init = {
    method: 'POST',
    body: JSON.stringify(toSend),
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
      "Content-type": "application/json; charset=UTF-8"
    })
  };
  return fetch(`${url}/revision/${id}/chat`, init)
    .then(res => res.json());
}

export function addToFavoriteSession(id, token) {
  const init = {
    method: 'PUT',
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
    })
  };
  return fetch(`${url}/revision/${id}/favorite`, init)
    .then(res => res.json());
}

export function addToFavoriteTool(id, token) {
  const init = {
    method: 'PUT',
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
    })
  };
  return fetch(`${url}/tools/${id}/favorite`, init)
    .then(res => res.json());
}

export function addToFavoriteRevisionTool(id, token) {
  const init = {
    method: 'PUT',
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
    })
  };
  return fetch(`${url}/revision-tools/${id}/favorite`, init)
    .then(res => res.json());
}