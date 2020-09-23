import { userApi } from './api'
import base64 from 'react-native-base64'

export const authUser = async (data) => {
  const response = await fetch(userApi + '/auth/', {
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

export const getUser = async (username) => {
  const response = await fetch(userApi + '/users/' + username, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })

  return { status: response.status, body: await response.json() }
};

export const createUser = async (data) => {
  const response = await fetch(userApi + '/users/', {
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

export const updateUser = async (data, token) => {
  const response = await fetch(userApi + '/users/', {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${token}`
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

export const deleteUser = async (id) => {
  return await fetch(userApi + '/users/' + id, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json'
    }
  })
};