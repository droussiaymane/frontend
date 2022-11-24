import React from "react"
import SignInComponent from "../components/SignInComponent"

export const UserLoginPage = () => {
    const signInValue = "User"
    return(
        <SignInComponent globalRole={signInValue} />
    )
}