import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './Manageteacher.css';

function Manageteacher() {
  const [teachers, setTeachers] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [updatedData, setUpdatedData] = useState({ name: '', email: '', subject: '', phone: '' });

  useEffect(() => {
    const fetchTeachers = async () => {
      const db = getFirestore();
      const teachersCollection = collection(db, 'users'); 
      const teacherSnapshot = await getDocs(teachersCollection);
      const teacherList = teacherSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filteredTeachers = teacherList.filter(teacher => teacher.role === 'teacher');
      setTeachers(filteredTeachers);
    };

    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    const db = getFirestore();
    await deleteDoc(doc(db, 'users', id)); 
    setTeachers(teachers.filter(teacher => teacher.id !== id));
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher.id);
    setUpdatedData({ name: teacher.name, email: teacher.email, subject: teacher.subject, phone: teacher.phone });
  };

  const handleUpdate = async () => {
    const db = getFirestore();
    const teacherRef = doc(db, 'users', editingTeacher); 
    await updateDoc(teacherRef, updatedData);
    setTeachers(teachers.map(teacher => (teacher.id === editingTeacher ? { ...teacher, ...updatedData } : teacher)));
    setEditingTeacher(null);
    setUpdatedData({ name: '', email: '', subject: '', phone: '' });
  };

  return (
    <div className="manage-teacher-container">
      <div className="table-wrapper">
        <table className="teacher-table">
          <thead style={{ position: "sticky", top: "0" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(teacher => (
              <tr key={teacher.id}>
                <td>{teacher.id}</td>
                <td>
                  {editingTeacher === teacher.id ? (
                    <input type="text" value={updatedData.name} onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })} />
                  ) : (
                    teacher.name
                  )}
                </td>
                <td>
                  {editingTeacher === teacher.id ? (
                    <input type="email" value={updatedData.email} onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })} />
                  ) : (
                    teacher.email
                  )}
                </td>
                <td>
                  {editingTeacher === teacher.id ? (
                    <input type="text" value={updatedData.subject} onChange={(e) => setUpdatedData({ ...updatedData, subject: e.target.value })} />
                  ) : (
                    teacher.subject
                  )}
                </td>
                <td>
                  {editingTeacher === teacher.id ? (
                    <input type="text" value={updatedData.phone} onChange={(e) => setUpdatedData({ ...updatedData, phone: e.target.value })} />
                  ) : (
                    teacher.phone
                  )}
                </td>
                <td>
                  <div className="button-group">
                    {editingTeacher === teacher.id ? (
                      <button className="save-button" onClick={handleUpdate}>Save</button>
                    ) : (
                      <button className="edit-button" onClick={() => handleEdit(teacher)}>Edit</button>
                    )}
                    <button className="delete-button" onClick={() => handleDelete(teacher.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Manageteacher;
