import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import './Managestudent.css';

function Managestudent() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({});
  const db = getFirestore();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentCollection = collection(db, 'users');
        const studentSnapshot = await getDocs(studentCollection);
        const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Filter to include only students
        const filteredStudents = studentList.filter(student => student.role === 'student');
        setStudents(filteredStudents);
      } catch (error) {
        console.error("Error fetching students: ", error);
      }
    };

    fetchStudents();
  }, [db]);

  const handleEditClick = (student) => {
    setEditingStudent(student.id);
    setFormData({ name: student.name, email: student.email, course: student.course, phone: student.phone });
  };

  const handleDeleteClick = async (id) => {
    const studentDoc = doc(db, 'users', id);
    await deleteDoc(studentDoc);
    setStudents(students.filter(student => student.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleUpdateSubmit = async (id) => {
    const studentDoc = doc(db, 'users', id);
    await updateDoc(studentDoc, formData);

    const updatedStudents = students.map(student => 
      student.id === id ? { ...student, ...formData } : student
    );

    setStudents(updatedStudents);
    setEditingStudent(null);
    setFormData({});
  };

  return (
    <div className="manage-student-container">
      <div className="table-wrapper">
        <table className="student-table">
          <thead style={{ position: "sticky", top: "0" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>
                  {editingStudent === student.id ? (
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td>
                  {editingStudent === student.id ? (
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                    />
                  ) : (
                    student.email
                  )}
                </td>
                <td>
                  {editingStudent === student.id ? (
                    <input 
                      type="text" 
                      name="course" 
                      value={formData.course} 
                      onChange={handleChange} 
                      required 
                    />
                  ) : (
                    student.course
                  )}
                </td>
                <td>
                  {editingStudent === student.id ? (
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      required 
                    />
                  ) : (
                    student.phone
                  )}
                </td>
                <td>
                  <div className="button-group">
                    {editingStudent === student.id ? (
                      <button className="update-button" onClick={() => handleUpdateSubmit(student.id)}>Update</button>
                    ) : (
                      <button className="edit-button" onClick={() => handleEditClick(student)}>Edit</button>
                    )}
                    <button className="delete-button" onClick={() => handleDeleteClick(student.id)}>Delete</button>
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

export default Managestudent;
