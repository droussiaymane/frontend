import jwt_decode from "jwt-decode";

export default function checkUser(role){
    if (localStorage.getItem("token")){
        const token = localStorage.getItem("token")
        const decodedToken = jwt_decode(token)
        if (decodedToken.exp * 1000 > Date.now()){
            // Further check the role
            const roles = decodedToken["role"]
            if (role === "Admin") {
                if (roles.length === 1 && roles[0].authority === "ROLE_Admin"){
                    return true
                }
            } else if (role === "User"){
                if (roles[0].authority !== "ROLE_Admin"){
                    return true
                }
            }
        }
    }
    return false

}