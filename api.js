// Модуль api.js
const toDosUrl = "https://wedev-api.sky.pro/api/v2/todos";
const userUrl = "https://wedev-api.sky.pro/api/user/login";

export let token;

export const setToken = (newToken) => {
  token = newToken;
}

export function getTodos() {
  return fetch(toDosUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
}

export function deleteTodo({ id }) {
  return fetch(`${toDosUrl}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
}

export function postTodo({ text }) {
  return fetch(toDosUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text,
    }),
  }).then((response) => {
    return response.json();
  });
}

export function login({ login, password }) {
  return fetch(userUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    return response.json();
  });
}