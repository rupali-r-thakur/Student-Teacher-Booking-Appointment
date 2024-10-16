import React, { useEffect, useState } from 'react';
import { db } from '../../Auth/firebase'; // Ensure the correct path to your firebase.js
import { collection, getDocs } from 'firebase/firestore';
import './Dashboard.css';

function Dashboard() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      
      const teachersList = [];
      const studentsList = [];

      userSnapshot.docs.forEach(doc => {
        const userData = { id: doc.id, ...doc.data() };
        if (userData.role === 'teacher') {
          teachersList.push(userData);
        } else if (userData.role === 'student') {
          studentsList.push(userData);
        }
      });

      setTeachers(teachersList);
      setStudents(studentsList);
      setTotalTeachers(teachersList.length);
      setTotalStudents(studentsList.length);
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="cards-container">
        <div className="card">
          <h2>Total Teachers</h2>
          <p>{totalTeachers}</p>
        </div>
        <div className="card">
          <h2>Total Students</h2>
          <p>{totalStudents}</p>
        </div>
      </div>

      <div className="info-section">
        <h2>Teachers</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(teacher => (
                <tr key={teacher.id}>
                  <td>{teacher.id}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.phone}</td>
                  <td>{teacher.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Students</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
