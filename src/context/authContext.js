'use client'

import { createContext, useContext, useState } from "react";

const authContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(false)
    return (
        <authContext.Provider value={{ isLoggedIn, setIsLoggedIn, setLoading, loading }}>
            {children}
        </authContext.Provider>
    )
}

export function useAuth() {
    return (
        useContext(authContext)
    )
}