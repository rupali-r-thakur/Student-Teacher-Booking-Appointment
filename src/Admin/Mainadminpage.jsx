import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Mainpage from "./Mainpage";
import "./Mainadminpage.css";

function Mainadminpage() {
    const [selectedOption, setSelectedOption] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true); 
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
                    <Sidebar 
                        onSelectOption={handleSelectOption} 
                        isCollapsed={isCollapsed} 
                    />
                </div>
                <div className="right">
                    <Mainpage selectedOption={selectedOption} toggleSidebar={toggleSidebar} />
                </div>
            </div>
        </>
    );
}

export default Mainadminpage;