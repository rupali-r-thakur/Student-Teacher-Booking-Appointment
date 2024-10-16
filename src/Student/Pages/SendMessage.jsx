import React, { useEffect, useState } from 'react';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import './SendMessage.css';

function SendMessage() {
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [message, setMessage] = useState('');
  const [teachers, setTeachers] = useState([]); // State for teachers

  useEffect(() => {
    const fetchTeachers = async () => {
      const db = getFirestore();
      const teachersCollection = collection(db, 'users'); // Assuming teachers are in 'users' collection
      const teachersSnapshot = await getDocs(teachersCollection);
      const teachersList = teachersSnapshot.docs
        .filter(doc => doc.data().role === 'teacher') // Filter to get only teachers
        .map(doc => ({
          id: doc.id,
          name: doc.data().name,
        }));
      setTeachers(teachersList);
    };

    fetchTeachers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedTeacher && message.trim()) {
      const db = getFirestore();

      try {
        await addDoc(collection(db, 'messages'), {
          sender: selectedTeacher,  
          content: message,
          timestamp: new Date().toLocaleString(),
        });
        alert('Message sent successfully!');
        setSelectedTeacher('');
        setMessage('');
      } catch (error) {
        console.error('Error sending message: ', error);
        alert('Failed to send message. Please try again.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="send-message-container">
      <h2>Send Message</h2>
      <form className="send-message-form" onSubmit={handleSubmit}>
        <select 
          value={selectedTeacher} 
          onChange={(e) => setSelectedTeacher(e.target.value)} 
          required
        >
          <option value="">Select Teacher</option>
          {teachers.map(teacher => (
            <option key={teacher.id} value={teacher.name}>
              {teacher.name}
            </option>
          ))}
        </select>
        <textarea 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..." 
          rows="5" 
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default SendMessage;
