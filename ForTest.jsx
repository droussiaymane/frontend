import React, { useEffect, useState } from "react"
import SignInComponent from "../components/SignInComponent"
import { TopBarComponent } from "../components/TopBarComponent"
import { getUsers } from "../services/user.service";
import ListItem from '@mui/material/ListItem';

export const AdminDashboardPage = () => {
    const [users, setUsers] = useState([])
    useEffect(()=>{
        getUsers().then(function(data){setUsers(data)})
    },[])

    useEffect(()=>{
        console.log(users)
    }, [users])
    return(
        <>   
            <TopBarComponent />
            <p>I am the admin Dashboard!</p> 
            {
                users === undefined
                ?
                null
                :
                users.map((user) =>
                    <p key={user.userName}>
                                {user.userName}
                    </p>
                )
            }
        </>
    )
}