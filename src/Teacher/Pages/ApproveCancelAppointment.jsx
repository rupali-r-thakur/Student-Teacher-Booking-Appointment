import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import './ApproveCancelAppointment.css';

function ApproveCancelAppointment() {
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

  const handleApprove = async (id) => {
    const db = getFirestore();
    const appointmentRef = doc(db, 'appointments', id);
    
    try {
      await updateDoc(appointmentRef, { status: 'Approved' });
      alert(`Appointment ${id} approved!`);
      setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: 'Approved' } : app));
    } catch (error) {
      console.error("Error approving appointment: ", error);
      alert("Failed to approve appointment.");
    }
  };

  const handleCancel = async (id) => {
    const db = getFirestore();
    const appointmentRef = doc(db, 'appointments', id);
    
    try {
      await updateDoc(appointmentRef, { status: 'Canceled' });
      alert(`Appointment ${id} canceled!`);
      setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: 'Canceled' } : app));
    } catch (error) {
      console.error("Error canceling appointment: ", error);
      alert("Failed to cancel appointment.");
    }
  };

  return (
    <div className="appointments-container">
      <h1 className="appointments-title">Approve/Cancel Appointments</h1>
      <div className="appointments-list">
        {appointments.map(appointment => (
          <div className="single-appointment" key={appointment.id}>
            <div className="appointments-info">
              <span className="appointments-date-info">{appointment.date}</span>
              <span className="appointments-time-info">{appointment.time}</span>
            </div>
            <div className="appointments-details-info">
              <p><strong>With:</strong> {appointment.teacher}</p>
              <p><strong>Booked By:</strong> {appointment.student}</p>
              <p className="appointments-status">{appointment.status}</p>
            </div>
            <div className="button-container">
              <button className="btn-approve" onClick={() => handleApprove(appointment.id)}>Approve</button>
              <button className="btn-cancel" onClick={() => handleCancel(appointment.id)}>Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApproveCancelAppointment;
