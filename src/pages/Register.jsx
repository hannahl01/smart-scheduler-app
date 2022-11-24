import jwtDecode from 'jwt-decode'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}

const Register = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState(initialState)
    const { signedInUser, setupUser } = useStateContext()

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const { name, email, password } = values
        setupUser({
            userCredentials: { name, email, password },
            endPoint: 'register',
        })
    }

    useEffect(() => {
        if (signedInUser) {
            setTimeout(() => {
                navigate('/home')
            }, 3000)
        }
    }, [signedInUser, navigate])

    useEffect(() => {
        /* global google */
        if (window.google) {
            google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: async (response) => {
                    console.log(
                        JSON.stringify({ credential: response.credential })
                    )
                    // send to server signup/login endpoint
                    // for now we'll just decode the credentials here
                    const tokenDecoded = jwtDecode(response.credential)
                    console.log(tokenDecoded)
                    setupUser({
                        userCredentials: { credential: response.credential },
                        endPoint: 'register/google',
                    })
                },
            })

            google.accounts.id.renderButton(
                document.getElementById('signUpDiv'),
                {
                    // type: "standard",
                    theme: 'filled_black',
                    // size: "small",
                    text: 'continue_with',
                    shape: 'pill',
                }
            )

            // google.accounts.id.prompt()
        }
    }, [])

    return (
        <div className="flex place-content-center place-items-center dark:bg-main-bg bg-main-bg min-h-screen w-full">
            <main className="flex flex-col place-items-center p-10 w-80 rounded-xl dark:bg-secondary-dark-bg bg-white">
                <div id="signUpDiv" data-text="signup_with"></div>
                <form
                    onSubmit={onSubmit}
                    className="flex flex-col place-items-center pt-10"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        onChange={handleChange}
                        className="mt-2"
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        onChange={handleChange}
                        className="mt-2"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={handleChange}
                        className="mt-2"
                    />
                    <button
                        type="submit"
                        className="w-40 mt-2 p-2 rounded-full hover:bg-cyan-600 bg-cyan-500"
                    >
                        Submit
                    </button>
                </form>
            </main>
        </div>
    )
}

export default Register
