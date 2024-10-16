import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './ViewAllAppointments.css';

function ViewAllAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const db = getFirestore();
      const appointmentCollection = collection(db, 'appointments');
      const appointmentSnapshot = await getDocs(appointmentCollection);
      const appointmentList = appointmentSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(appointmentList);
    };

    fetchAppointments();
  }, []);

  return (
    <div className="appointment-container">
      <h1>All Appointments</h1>
      <div className="appointment-list">
        {appointments.map(appointment => (
          <div className="appointment-card" key={appointment.id}>
            <div className="appointment-header">
              <span className="appointment-date">{appointment.date}</span>
              <span className={`appointment-status ${appointment.status.toLowerCase()}`}>
                {appointment.status}
              </span>
            </div>
            <div className="appointment-details">
              <p><strong>Time:</strong> {appointment.time}</p>
              <p><strong>With:</strong> {appointment.teacher}</p>
              <p><strong>Booked By:</strong> {appointment.student}</p> 
              <p><strong>Message:</strong> {appointment.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewAllAppointments;
