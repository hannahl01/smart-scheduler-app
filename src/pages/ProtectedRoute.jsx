import React from 'react'
import { Navigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

function ProtectedRoute({ children }) {
    const { signedInUser } = useStateContext()
    if (!signedInUser) {
        return <Navigate to="/landing" />
    }
    return children
}

export default ProtectedRoute
