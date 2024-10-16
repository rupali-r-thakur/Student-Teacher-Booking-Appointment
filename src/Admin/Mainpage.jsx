import React from 'react';
import { IoMdMenu } from "react-icons/io";
import "./Mainpage.css";
import Addteacher from './Pages/Addteacher';
import Manageteacher from './Pages/Manageteacher';
import Managestudent from './Pages/Managestudent';
import Dashboard from './Pages/Dashboard';
import SearchTeacher from '../Student/Pages/SearchTeacher';
import BookAppointment from '../Student/Pages/BookAppointment';
import SendMessage from '../Student/Pages/SendMessage';
import ScheduleAppointment from '../Teacher/Pages/ScheduleAppointment';
import ApproveCancelAppointment from '../Teacher/Pages/ApproveCancelAppointment';
import ViewMessages from '../Teacher/Pages/ViewMessages';
import ViewAllAppointments from '../Teacher/Pages/ViewAllAppointments';

function Mainpage({ selectedOption, toggleSidebar }) {
    const renderContent = () => {
        switch (selectedOption) {
            case 'addteacher':
                return <Addteacher />;
            case 'manageTeacher':
                return <Manageteacher />;
            case 'manageStudent':
                return <Managestudent />;
                case 'searchTeacher':
                return <SearchTeacher />;
                case 'bookAppointment':
                return <BookAppointment />;
                case 'sendMessage':
                return <SendMessage />;
                case 'scheduleAppointment':
                return <ScheduleAppointment />;
                case 'approveCancelAppointment':
                return <ApproveCancelAppointment />;
                case 'viewMessages':
                return <ViewMessages />;
                case 'viewAllAppointments':
                return <ViewAllAppointments />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="main">
            <div className="toggle_button">
                <IoMdMenu  onClick={toggleSidebar}/>
            </div>
            <div className="manage_dashboard">
                {renderContent()}
            </div>
        </div>
    );
}

export default Mainpage;
