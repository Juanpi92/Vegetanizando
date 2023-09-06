import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [activeDesktopCart, setActiveDesktopCart] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth });

    useEffect(() => {
        if (showModal === true) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [showModal])

    const handleWidthDimension = () => {
        const updateWindowDimensions = () => {
            setWindowSize({
                width: window.innerWidth,
            });
        };
        window.addEventListener('resize', updateWindowDimensions);
        return () => {
            window.removeEventListener('resize', updateWindowDimensions);
        };
    }

    return (
        <AppContext.Provider value={{
            showModal,
            setShowModal,
            setActiveDesktopCart,
            activeDesktopCart,
            handleWidthDimension,
            windowSize, 
            setWindowSize
        }}>
            {children}
        </AppContext.Provider>
    )
} 