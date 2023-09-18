import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertIcon, setShowAlertIcon] = useState("")
  const [showAlertMessage, setShowAlertMessage] = useState("")
  const [showProductModal, setShowProductModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [loader, setLoader] = useState(false);
  const [activeDesktopCart, setActiveDesktopCart] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth });

  useEffect(() => {
    if (showModal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  const onRequestShowAlert = ({ variant: variant, message: message, duration: time }) => {
    setShowAlert(true);
    setShowAlertIcon(variant);
    setShowAlertMessage(message);

    setTimeout(() => {
      setShowAlert(false);
      setShowAlertIcon("");
      setShowAlertMessage("");
    }, [time ? time : 3000])
  }

  const handleWidthDimension = () => {
    const updateWindowDimensions = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  };

  return (
    <AppContext.Provider
      value={{
        showModal,
        setShowModal,
        showProductModal,
        setShowProductModal,
        setActiveDesktopCart,
        activeDesktopCart,
        handleWidthDimension,
        windowSize,
        setWindowSize,
        loader,
        setLoader,
        isAddProduct,
        setIsAddProduct,
        showAlert,
        onRequestShowAlert,
        showAlertMessage,
        showAlertIcon
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
