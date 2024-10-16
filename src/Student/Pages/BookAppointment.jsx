import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import './BookAppointment.css';

function BookAppointment() {
  const [student, setStudent] = useState(''); 
  const [teacher, setTeacher] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore();

    try {
      await addDoc(collection(db, 'appointments'), {
        student, 
        teacher,
        date,
        time,
        message,
        status: 'Pending' 
      });

      setSuccessMessage("Appointment booked successfully!");
      setStudent(''); 
      setTeacher('');
      setDate('');
      setTime('');
      setMessage('');
    } catch (error) {
      console.error("Error booking appointment: ", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="book_appointment_main_container">
      <h1>Book an Appointment</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="student">Your Name:</label>
          <input 
            type="text" 
            id="student" 
            value={student} 
            onChange={(e) => setStudent(e.target.value)} 
            placeholder="Enter your name" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="teacher">Select Teacher:</label>
          <input 
            type="text" 
            id="teacher" 
            value={teacher} 
            onChange={(e) => setTeacher(e.target.value)} 
            placeholder="Enter teacher's name" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input 
            type="date" 
            id="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input 
            type="time" 
            id="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea 
            id="message" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Additional information (optional)"
          />
        </div>
        <button type="submit" className="submit-button">Book Appointment</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default BookAppointment;
