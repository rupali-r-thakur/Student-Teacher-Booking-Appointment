import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./MainPage/Components/Navbar";
import Home from './MainPage/Pages/Home';
import About from './MainPage/Pages/About';
import Contact from './MainPage/Pages/Contect'; 
import Footer from './MainPage/Components/Footer';
import Register from './MainPage/Pages/Register';
import Login from './MainPage/Pages/Login';
import Mainadminpage from './Admin/Mainadminpage';
import Student from './Student/Student';
import Teacher from './Teacher/Teacher';
import { ModalProvider, useModal } from './MainPage/context/ModalContext'; 

const App = () => {
  const location = useLocation();
  const { isRegisterOpen, isLoginOpen, openRegister, closeRegister, openLogin, closeLogin } = useModal();

  return (
    <>
      {location.pathname !== '/admin' && location.pathname !== '/student' && location.pathname !== '/teacher' && (
        <Navbar openRegister={openRegister} openLogin={openLogin} />
      )}
      {isRegisterOpen && <Register onClose={closeRegister} openLogin={openLogin} />}
      {isLoginOpen && <Login onClose={closeLogin} openRegister={openRegister} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Mainadminpage />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Teacher />} />
      </Routes>
      {location.pathname !== '/admin' && location.pathname !== '/student' && location.pathname !== '/teacher' && <Footer />}
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <ModalProvider>
      <App />
    </ModalProvider>
  </Router>
);

export default AppWrapper;
