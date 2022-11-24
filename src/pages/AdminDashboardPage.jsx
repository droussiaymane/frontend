import React, { useEffect, useState } from "react"
import SignInComponent from "../components/SignInComponent"
import { TopBarComponent } from "../components/TopBarComponent"
import { getUsers } from "../services/user.service";
import ListItem from '@mui/material/ListItem';
import UsersTableComponent from '../components/UsersTableComponent';
import Container from '@mui/material/Container';
import AddUserComponent from "../components/AddUserComponent";


export const AdminDashboardPage = () => {
    return(
        <>   
            <TopBarComponent />
            <br />
            <AddUserComponent />
            <br />
            <Container maxWidth="200px">
                <UsersTableComponent />
            </Container>
            
        </>
    )
}