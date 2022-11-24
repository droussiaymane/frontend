import React from "react"
import SignInComponent from "../components/SignInComponent"

export const AdminLoginPage = () => {
    const signInValue = "Admin"
    return(
        <SignInComponent globalRole={signInValue} />
    )
}