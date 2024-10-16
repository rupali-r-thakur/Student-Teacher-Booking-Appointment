import React, { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import './Register.css';

function Register({ onClose, openLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    course: '',
    phone: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const auth = getAuth();
    const db = getFirestore();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        course: formData.course,
        phone: formData.phone,
        role: 'student',  
      });

      setFormData({ name: '', email: '', password: '', confirmPassword: '', course: '', phone: '', role:'' });
      setErrorMessage('');
      onClose();
      openLogin();

    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="register_main_container">
      <div className="register_form">
        <div className="close_button" onClick={onClose}>
          <IoCloseSharp />
        </div>
        <h1>Register Only for Students</h1>
        {errorMessage && <div className="error_message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form_group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form_group">
            <label htmlFor="course">Course:</label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form_group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form_group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form_group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form_group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className='register_button'>Register</button>
        </form>
        <div className="show_login">
          <h3>
            Already have an account? 
            <span onClick={openLogin} className="login_link"> Login here</span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Register;