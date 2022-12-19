import React, {useState} from "react"

const MainContext = React.createContext();

function MainContextProvider({children}) {
    const [accessToken, setAccessToken] = useState('');
    const [roles, setRoles] = useState([])

    return (
        <MainContext.Provider value={{accessToken, setAccessToken, roles, setRoles}}>
            {children}
        </MainContext.Provider>
    )
}

export {MainContextProvider, MainContext}