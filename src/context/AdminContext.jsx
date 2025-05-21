import { createContext, useState } from "react";

export const AdminContext = createContext()

const AdminContextProvider=(props)=>{
    const [atoken,setAToken] = useState('')

    const backendUrl =

    const value={
        aToken,setAToken
    }
}
