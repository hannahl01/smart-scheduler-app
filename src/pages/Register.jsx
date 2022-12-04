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
                    theme: 'filled_white',
                    // size: "small",
                    text: 'continue_with',
                    shape: 'pill',
                }
            )

            // google.accounts.id.prompt()
        }
    }, [])

    return (
        <div className="flex flex-col place-content-center place-items-center dark:bg-main-bg bg-main-bg min-h-screen w-full">
            {/* <main className="flex flex-col place-items-center p-10 w-80 rounded-xl dark:bg-secondary-dark-bg bg-white"> */}
            {/* <form
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
                </form> */}

            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                <div id="signUpDiv" data-text="signup_with"></div>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-center font-semibold mx-4 mb-0">Or</p>
                </div>
                <form className="mt-2">
                    <div className="form-group mb-6">
                        <label
                            htmlFor="exampleInputEmail2"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleInputEmail2"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mb-6">
                        <label
                            htmlFor="exampleInputPassword2"
                            className="form-label inline-block mb-2 text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleInputPassword2"
                            placeholder="Password"
                        />
                    </div>
                    {/* <div className="flex justify-between items-center mb-6">
                        <div className="form-group form-check">
                            <input
                                type="checkbox"
                                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                id="exampleCheck2"
                            />
                            <label
                                className="form-check-label inline-block text-gray-800"
                                htmlFor="exampleCheck2"
                            >
                                Remember me
                            </label>
                        </div>
                        <a
                            href="#!"
                            className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
                        >
                            Forgot password?
                        </a>
                    </div> */}
                    <button
                        type="submit"
                        className="
        w-full
        px-6
        py-2.5
        bg-blue-600
        text-white
        font-medium
        text-xs
        leading-tight
        uppercase
        rounded
        shadow-md
        hover:bg-blue-700 hover:shadow-lg
        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-blue-800 active:shadow-lg
        transition
        duration-150
        ease-in-out"
                    >
                        Sign in
                    </button>
                    <p className="text-gray-800 mt-6 text-center">
                        Not a member?{' '}
                        <a
                            href="#!"
                            className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
                        >
                            Register
                        </a>
                    </p>
                </form>
            </div>
            {/* </main> */}
        </div>
    )
}

export default Register
