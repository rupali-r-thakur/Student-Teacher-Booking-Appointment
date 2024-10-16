import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import './ScheduleAppointment.css';

function ScheduleAppointment() {
  const [studentName, setStudentName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [withWho, setWithWho] = useState('');
  const [teachers, setTeachers] = useState([]); 
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      const db = getFirestore();
      const teacherCollection = collection(db, 'users'); 
      const teacherSnapshot = await getDocs(teacherCollection);
      const teacherList = teacherSnapshot.docs
        .filter(doc => doc.data().role === 'teacher') 
        .map(doc => ({ id: doc.id, name: doc.data().name }));

      setTeachers(teacherList);
    };

    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore();

    try {
      await addDoc(collection(db, 'appointments'), {
        student: studentName,
        date,
        time,
        teacher: withWho,
        message,
        status: 'Pending',
      });

      setSuccessMessage(`Appointment scheduled with ${withWho} on ${date} at ${time}`);
      setStudentName('');
      setDate('');
      setTime('');
      setWithWho('');
      setMessage('');
    } catch (error) {
      console.error("Error scheduling appointment: ", error);
      alert("Failed to schedule appointment. Please try again.");
    }
  };

  return (
    <div className="appointment-main-container">
      <h1>Schedule an Appointment</h1>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label>Your Name:</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>With:</label>
          <select
            value={withWho}
            onChange={(e) => setWithWho(e.target.value)}
            required
          >
            <option value="" disabled>Select a teacher</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.name}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Optional message"
          />
        </div>
        <button type="submit" className="submit-button">Schedule Appointment</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default ScheduleAppointment;
