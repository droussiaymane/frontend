import axios from 'axios';

import jwt_decode from "jwt-decode";

export function getUsername(){
  const token = localStorage.getItem("token")
  const decodedToken = jwt_decode(token)
  const username = decodedToken["sub"]
  return username
}

export function getUserRole(){
  const token = localStorage.getItem("token")
  const authorities = jwt_decode(token)["role"]
  var roles = []
  for (var i = 0; i < authorities.length; i++){
    console.log(authorities[i])
    if (authorities[i].authority === "ROLE_Admin"){
      roles.push("Admin")
    } else if (authorities[i].authority === "ROLE_UserEdit"){
      roles.push("Edit")
    } else if (authorities[i].authority === "ROLE_UserRead"){
      roles.push("Read")
    } else if (authorities[i].authority === "ROLE_UserDelete"){
      roles.push("Delete")
    }
  }
  return roles
}

export const getUsers = async () => {
  const data = await fetch('http://localhost:9090/getUsers', {
      method: 'GET',
      // credentials: 'include', // Don't forget to specify this if you need cookies
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
  });
  const users = await data.json();
  return users  
}

export const updateUserRoles = async (username, newRoles) => {
  const data = await fetch(`http://localhost:9090/editUserRoles/${username}`, {
      method: 'PUT',
      body: JSON.stringify(newRoles),
      // credentials: 'include', // Don't forget to specify this if you need cookies
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token"), 'Content-Type': 'application/json' },

  });
  const users = await data.json();
  return users  
}

export const createUser = async (userData) => {
  const data = await fetch(`http://localhost:9090/registerNewUser`, {
      method: 'POST',
      body: JSON.stringify(userData),
      // credentials: 'include', // Don't forget to specify this if you need cookies
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token"), 'Content-Type': 'application/json' },

  });
  const newUser = await data.json();
  return newUser  
}

export const deleteUser = async (userName) => {
  return await fetch(`http://localhost:9090/deleteUser/${userName}`, {
      method: 'DELETE',
      // credentials: 'include', // Don't forget to specify this if you need cookies
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token")},

  }).catch((err) => {
      console.log(err)
    });
    
}

export const updateUser = async (userName, newUserData) => {
  return await fetch(`http://localhost:9090/updateUser/${userName}`, {
      method: 'PUT',
      body: JSON.stringify(newUserData),
      // credentials: 'include', // Don't forget to specify this if you need cookies
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token"), 'Content-Type': 'application/json' },

  }).catch((err) => {
      console.log(err)
    });
}

export const getUserRolesByUsername = async (userName) => {
  const data = await fetch(`http://localhost:9090/getUserRole/${userName}`, {
      method: 'GET',
      // credentials: 'include', // Don't forget to specify this if you need cookies
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },

  })
  const roles = await data.json();
  return roles
}