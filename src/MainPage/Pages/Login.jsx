import React, { useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onClose, openRegister, closeLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
        
      const q = query(collection(db, 'users'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const role = userData.role;
        const name = userData.name; 

        if (role === 'student') {
          navigate('/student', { state: { name } });
          onClose()
        } else if (role === 'teacher') {
          navigate('/teacher', { state: { name } });
          onClose()
        } else {
          setErrorMessage('User role not recognized.');
        }
      } else {
        setErrorMessage('User not found in the database.');
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
      
    }
    
  };

  return (
    <div className="login_main_container">
      <div className="login_form">
        <div className="close_button" onClick={onClose}>
          <IoCloseSharp />
        </div>
        <h1>Login</h1>
        {errorMessage && <div className="error_message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className='login_button' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="show_register">
          <h3>
            Don't have an account? 
            <span onClick={openRegister} style={{ cursor: 'pointer', color: 'blue' }}> Register here</span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Login;
