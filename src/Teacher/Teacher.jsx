import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Sidebar from "../Admin/Sidebar";
import Mainpage from "../Admin/Mainpage";
import "./Teacher.css";

function Teacher() {
    const location = useLocation();
    const userName = location.state?.name || 'Teacher';

    const [selectedOption, setSelectedOption] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(false); 

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
            <div className={`main_page ${isCollapsed ? 'collapsed' : ''}`}>
                <div className={`left ${isCollapsed ? 'collapsed' : ''}`}>
                    <Sidebar onSelectOption={handleSelectOption} isCollapsed={isCollapsed} isTeacher={true} userName={userName} />
                </div>
                <div className="right">
                    <Mainpage selectedOption={selectedOption} toggleSidebar={toggleSidebar} />
                </div>
            </div>
        </>
    );
}

export default Teacher;
