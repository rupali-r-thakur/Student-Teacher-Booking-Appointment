import React, { useEffect, useState } from 'react';
import { db } from '../../Auth/firebase'; // Ensure the correct path to your firebase.js
import { collection, getDocs } from 'firebase/firestore';
import './SearchTeacher.css';

function SearchTeacher() {
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      
      const teachersList = [];
      userSnapshot.docs.forEach(doc => {
        const userData = { id: doc.id, ...doc.data() };
        if (userData.role === 'teacher') {
          teachersList.push(userData);
        }
      });

      setTeachers(teachersList);
    };

    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-teacher-container">
      <h1>Search for a Teacher</h1>
      <input 
        type="text" 
        className="search-input" 
        placeholder="Enter teacher's name" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <div className="teacher-list">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map(teacher => (
            <div className="teacher-card" key={teacher.id}>
              <h3 className="teacher-name">{teacher.name}</h3>
              <p className="teacher-subject"><strong>Subject:</strong> {teacher.subject}</p>
              <p className="teacher-email"><strong>Email:</strong> {teacher.email}</p>
              <p className="teacher-phone"><strong>Phone:</strong> {teacher.phone}</p>
            </div>
          ))
        ) : (
          <p className="no-teachers">No teachers found</p>
        )}
      </div>
    </div>
  );
}

export default SearchTeacher;
