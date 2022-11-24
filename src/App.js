import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
    Home,
    Calendar,
    Agenda,
    SharedLayout,
    ProtectedRoute,
    Landing,
    Register,
    Error,
} from './pages'

import './App.css'

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <SharedLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="home" element={<Home />} />
                        <Route path="calendar" element={<Calendar />} />
                        <Route path="agenda" element={<Agenda />} />
                    </Route>
                    <Route path="/register" element={<Register />} />
                    <Route path="/landing" element={<Landing />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
