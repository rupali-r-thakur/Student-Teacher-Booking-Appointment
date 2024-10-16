import React from "react";
import { MdDashboard, MdManageHistory } from "react-icons/md";
import { AiFillMessage, AiFillSchedule } from "react-icons/ai";
import {
  FaSearch,
  FaPaperPlane,
  FaCalendarAlt,
  FaUserPlus,
  FaUsersCog,
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar({
  onSelectOption,
  isCollapsed,
  isStudent,
  isTeacher,
  userName,
}) {
  return (
    <div className={`sidebar_main ${isCollapsed ? "collapsed" : ""}`}>
      <div className="admin_logo">
        <div className="user-initial">
          {userName ? userName.charAt(0).toUpperCase() : "A"}
        </div>
        {!isCollapsed && (
          <>
            <h1>
              {isStudent
                ? `${userName}`
                : isTeacher
                ? `${userName}`
                : "Admin Dashboard"}
            </h1>
          </>
        )}
      </div>
      <div className="list">
        <ul>
          {isStudent ? (
            <>
              <li onClick={() => onSelectOption("dashboard")}>
                <MdDashboard /> {!isCollapsed && "Dashboard"}
              </li>
              <li onClick={() => onSelectOption("searchTeacher")}>
                <FaSearch /> {!isCollapsed && "Search Teacher"}
              </li>
              <li onClick={() => onSelectOption("bookAppointment")}>
                <FaCalendarAlt /> {!isCollapsed && "Book Appointment"}
              </li>
              <li onClick={() => onSelectOption("sendMessage")}>
                <FaPaperPlane /> {!isCollapsed && "Send Message"}
              </li>
            </>
          ) : isTeacher ? (
            <>
              <li onClick={() => onSelectOption("dashboard")}>
                <MdDashboard /> {!isCollapsed && "Dashboard"}
              </li>
              <li onClick={() => onSelectOption("scheduleAppointment")}>
                <AiFillSchedule /> {!isCollapsed && "Schedule Appointment"}
              </li>
              <li onClick={() => onSelectOption("approveCancelAppointment")}>
                <MdManageHistory /> {!isCollapsed && "Appointment manage"}
              </li>
              <li onClick={() => onSelectOption("viewMessages")}>
                <AiFillMessage /> {!isCollapsed && "Messages"}
              </li>
              <li onClick={() => onSelectOption("viewAllAppointments")}>
                <AiFillSchedule /> {!isCollapsed && "Appointments"}
              </li>
            </>
          ) : (
            <>
              <li onClick={() => onSelectOption("dashboard")}>
                <MdDashboard /> {!isCollapsed && "Dashboard"}
              </li>
              <li onClick={() => onSelectOption("addteacher")}>
                <FaUserPlus /> {!isCollapsed && "Add Teacher"}
              </li>
              <li onClick={() => onSelectOption("manageTeacher")}>
                <FaUsersCog /> {!isCollapsed && "Manage Teacher"}
              </li>
              <li onClick={() => onSelectOption("manageStudent")}>
                <FaUserPlus /> {!isCollapsed && "Manage Student"}
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
