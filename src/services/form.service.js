import axios from 'axios';

import jwt_decode from "jwt-decode";

export const getForms = async () =>{
    const data = await fetch('http://localhost:9090/getForms', {
      method: 'GET',
      // credentials: 'include', // Don't forget to specify this if you need cookies
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
    });
    const forms = await data.json();
    return forms  
}

export const deleteForm = async (formId) =>{
    return await fetch(`http://localhost:9090/deleteForm/${formId}`, {
      method: 'DELETE',
      // credentials: 'include', // Don't forget to specify this if you need cookies
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
    }).catch((err) => {
        console.log(err)
    });  
}

export const updateForm = async (formId, newInputs) =>{
    return await fetch(`http://localhost:9090/updateForm/${formId}`, {
      method: 'PUT',
      // credentials: 'include', // Don't forget to specify this if you need cookies
      body: JSON.stringify({
        "firstField": newInputs[0],
        "secondField": newInputs[1],
        "thirdField": newInputs[3],
      }),
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token"), 'Content-Type': 'application/json' }
    }).catch((err) => {
        console.log(err)
    });  
}