import { Route, Navigate, redirect } from "react-router-dom";
import React, {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import checkUser from "../common/auth";
import { getForms } from "../services/form.service";
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getUserRole } from "../services/user.service";
import { deleteForm, updateForm } from "../services/form.service";

export default function FormsComponent() {  
    const [forms, setForms] = useState([])
    const [firstField, setFirstField] = useState("")
    const [secondField, setSecondField] = useState("")
    const [thirdField, setThirdField] = useState("")    

    function handleRemove(formId) {
        const newForms = forms.filter((form) => form.id !== formId);
        setForms(newForms);
        deleteForm(formId)
      }
    function handleUpdate(formId, newInputs) {
        updateForm(formId, newInputs)
      }
    const roles = getUserRole()
    useEffect(()=>{
        getForms().then(function(data){setForms(data)})
        
    },[])

    useEffect(()=>{
        console.log(forms)
        console.log(roles)
    }, [forms])  

    return(
        <>
            {
                    forms.map((form) => 
                        <div key={form.id}>
                            <Box  mb={2}>
                                {
                                roles.includes("Edit")
                                ?
                                <>
                                    <TextField onChange={(e) => setFirstField(e.target.value)} style={{ marginRight: "20px" }}  size="small" id="outlined-helperText" label="First Field" defaultValue={form.firstField}/>
                                    <TextField onChange={(e) => setSecondField(e.target.value)} style={{ marginRight: "20px" }}  size="small" id="outlined-helperText" label="Second Field" defaultValue={form.secondField}/>
                                    <TextField onChange={(e) => setThirdField(e.target.value)} style={{ marginRight: "20px" }}  size="small" id="outlined-helperText" label="Third Field" defaultValue={form.thirdField}/>
                                    <Button variant="contained" style={{ marginRight: "20px", backgroundColor: 'blue' }} onClick={() => updateForm(form.id, [firstField, secondField, thirdField])}>Update</Button>
                                </>
                                :
                                    roles.includes("Read")
                                    ?
                                    <>
                                        <TextField style={{ marginRight: "20px" }} InputProps={{ readOnly: true }} variant="filled" size="small" id="outlined-helperText" label="First Field" defaultValue={form.firstField}/>
                                        <TextField style={{ marginRight: "20px" }} InputProps={{ readOnly: true }} variant="filled" size="small" id="outlined-helperText" label="Second Field" defaultValue={form.secondField}/>
                                        <TextField style={{ marginRight: "20px" }} InputProps={{ readOnly: true }} variant="filled" size="small" id="outlined-helperText" label="Third Field" defaultValue={form.thirdField}/>
                                    </>
                                    :
                                    null
                                }
                                {
                                    roles.includes("Delete")
                                    ?
                                        <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={() => handleRemove(form.id)} >Delete</Button>  
                                    :
                                        null
                                }  
                            </Box>
                            <br />
                        </div>
                    )
            }
        </>
    )
};