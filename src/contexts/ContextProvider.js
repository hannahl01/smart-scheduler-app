import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'

const StateContext = createContext()

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
    userProfile: false,
    notification: false,
    user: user ? JSON.parse(user) : null,
    token: token,
}

const initialStateUser = {
    user: initialState.user,
    token: initialState.token,
}

const initialStateNavBar = {
    userProfile: initialState.userProfile,
    notification: initialState.notification,
}

export const ContextProvider = ({ children }) => {
    const [screenSize, setScreenSize] = useState(undefined)
    const [activeMenu, setActiveMenu] = useState(true)
    const [signedInUser, setSignedInUser] = useState(initialState.user)
    const [signedInUserToken, setSignedInUserToken] = useState(
        initialState.token
    )
    const [googleConsentPage, setGoogleConsentPage] = useState('')

    const [calendarScheduleObj, setCalendarScheduleObj] = useState()
    const [scheduleData, setScheduleData] = useState([])

    const [isClicked, setIsClicked] = useState(initialStateNavBar)

    const addUserToLocalStorage = ({ user, token }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    const setupUser = async ({ userCredentials, endPoint }) => {
        try {
            const { data } = await axios.post(
                `http://localhost:8080/api/v1/auth/${endPoint}`,
                userCredentials
            )
            console.log(data)

            const { user, token, authUrl } = data
            setSignedInUser(user)
            setSignedInUserToken(token)
            setGoogleConsentPage(authUrl)
            addUserToLocalStorage({
                user,
                token,
            })
        } catch (error) {
            console.log(error)
        }
    }

    const logoutUser = () => {
        removeUserFromLocalStorage()
        setSignedInUser(null)
        setSignedInUserToken(null)
    }

    const openGoogleConsentPage = () => {
        window.open(googleConsentPage, '_self')
    }

    const fetchData = async () => {
        try {
            const { data } = await axios.get(
                'http://localhost:8080/api/v1/schedule'
            )
            console.log(data)
            setScheduleData(data)
        } catch (err) {
            console.log(err)
        }
    }

    const createEvent = async (data) => {
        try {
            const res = await axios.post(
                'http://localhost:8080/api/v1/schedule/event',
                data
            )
            console.log(res)
            return res
            // setScheduleData(data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleClick = (clicked) =>
        setIsClicked({ ...initialStateNavBar, [clicked]: true })

    return (
        <StateContext.Provider
            value={{
                initialStateNavBar,
                screenSize,
                setScreenSize,
                activeMenu,
                setActiveMenu,
                signedInUser,
                setupUser,
                logoutUser,
                openGoogleConsentPage,
                calendarScheduleObj,
                setCalendarScheduleObj,
                scheduleData,
                setScheduleData,
                fetchData,
                isClicked,
                setIsClicked,
                handleClick,
                createEvent,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
