import React, { createContext, useContext, useState } from 'react'

const StateContext = createContext()

const initialState = {
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({ children }) => {
    const [screenSize, setScreenSize] = useState(undefined)
    const [activeMenu, setActiveMenu] = useState(true)
    const [signedInUser, setSignedInUser] = useState({ username: "Enzo" })

    return (
        <StateContext.Provider
            value={{
                screenSize,
                setScreenSize,
                activeMenu,
                setActiveMenu,
                signedInUser
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
