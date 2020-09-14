import { userApi } from './api'
import base64 from 'react-native-base64'

export const authUser = async (data) => {
  const response = await fetch(userApi + '/api/auth/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64.encode(`${data.username}:${data.password}`)}`
    }
  })
  return { status: response.status, body: await response.json() }
};

export const getAllUsers = async () => {
  return await fetch(userApi + '/users/', {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })
};

export const getUser = async (id) => {
  return await fetch(userApi + '/users/' + id, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })
};

export const createUser = async (data) => {
  const response = await fetch(userApi + '/api/users/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      full_name: data.full_name,
      username: data.username,
      email: data.email,
      password: data.password
    })
  })
  return { status: response.status, body: await response.json() }
};

export const updateUser = async (id, data) => {
  let user = {}
  if (data.full_name) {
    user.full_name = data.full_name
  } else if (data.username) {
    user.username = data.username
  } else if (data.email) {
    user.email = data.email
  } else if (data.password) {
    user.password = data.password
  }

  return await fetch(userApi + '/users/' + id, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: user
  })
};

export const deleteUser = async (id) => {
  return await fetch(userApi + '/users/' + id, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json'
    }
  })
};