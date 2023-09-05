import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (showModal === true) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [showModal])

    return (
        <AppContext.Provider value={{
            showModal,
            setShowModal
        }}>
            {children}
        </AppContext.Provider>
    )
} 