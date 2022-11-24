import React, { useEffect, useState } from "react"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { getUsers } from "../services/user.service";
import { Button } from "@mui/material";
import ActionsComponent from "./ActionsComponent";

function renderSwitch(role) {
    switch(role) {
        case 'Admin':
            return {permission: 'Admin', color: 'black'};
        case 'UserEdit':
            return {permission: 'Edit', color: 'blue'}
        case 'UserDelete':
            return {permission: 'Delete', color: 'red'}
        case 'UserRead':
            return {permission: 'Read', color: 'green'}
        default:
            return null;
    }
}

const columns = [
  { field: 'userName', headerName: 'Username', width: 200 },
  { field: 'email', headerName: 'Email', width: 300 },
  { field: 'registrationTime', headerName: 'Registration Time', width: 200},
  { field: 'role', 
    renderCell: (cellValues) => {
        return (
            <>
                {
                    cellValues.value.map((role) => 
                        <div key={role.roleName}>
                            <Button style={{ backgroundColor: renderSwitch(role.roleName).color, marginRight: '3px' }} variant="contained">
                                {renderSwitch(role.roleName).permission}
                            </Button>
                        </div>
                    )
                }
            </>   
                
        )
    }, headerName: 'Permissions', width: 500 },
    { headerName: 'Actions', width: 100, 
        renderCell: (cellValues) => {
            return (
                <ActionsComponent username={cellValues.rowNode.id} />
            )
        },
    }];

export default function UsersTableComponent() {
    const [users, setUsers] = useState([])
    useEffect(()=>{
        getUsers().then(function(data){setUsers(data)})
    },[])

    useEffect(()=>{
        console.log(users)
    }, [users])
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={users}
                getRowId={(row) => row.userName}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}