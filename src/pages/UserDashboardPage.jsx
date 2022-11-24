import React from "react"
import FormsComponent from "../components/FormsComponent"
import SignInComponent from "../components/SignInComponent"
import { TopBarComponent } from "../components/TopBarComponent"

export const UserDashboardPage = () => {
    return(
        // <SignInComponent signInValue={signInValue} />
        <>
            <TopBarComponent />
            <br />
            <FormsComponent />
            <p>I am the user Dashboard!</p> 
        </>
    )
}