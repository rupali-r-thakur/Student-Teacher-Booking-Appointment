
import React, { createContext, useContext, useState, useEffect } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const openRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  const closeRegister = () => setRegisterOpen(false);

  const openLogin = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  const closeLogin = () => setLoginOpen(false);
  useEffect(() => {
    if (isRegisterOpen || isLoginOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, [isRegisterOpen, isLoginOpen]);

  return (
    <ModalContext.Provider value={{ isRegisterOpen, isLoginOpen, openRegister, closeRegister, openLogin, closeLogin }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
