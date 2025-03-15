import React from "react";
import { LuMoveRight } from "react-icons/lu";

const Dashboard = () => {
  return (
    <section className="account">
      <div className="component_header">
        <p>Dashboard</p>
        <p>
          Welcome! <span>Username</span>
        </p>
      </div>
      <div className="container">
        <div className="sidebar">
          <ul className="sidebar_links">
            <h4>Manage Account</h4>
            <li>
              <button>My Profile</button>
            </li>
            <li>
              <button>Update Profile</button>
            </li>
            <li>
              <button>Update Password</button>
            </li>
            <li>
              <button>Post New Job</button>
            </li>
            <li>
              <button>My Jobs</button>
            </li>
            <li>
              <button>Applications</button>
            </li>
            <li>
              <button>My Applications</button>
            </li>
            <li>
              <button>Logout</button>
            </li>
          </ul>
        </div>
        <div className="banner">
          <div className="sidebar_icon move_left">
            <LuMoveRight className="right_arrow" />
          </div>
          <div className="content_area">
            <p>Selected Component Will Be Displayed Here</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
