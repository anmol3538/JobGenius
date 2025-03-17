import React from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Login = () => {
  return (
    <>
      <section className="authPage">
        <div className="container login-container">
          <div className="header">
            <h3>Login to your account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select>
                  <option value="">Select Role</option>
                  <option value="Employer">Login as an Employer</option>
                  <option value="Job Seeker">Login as a Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email</label>
              <div>
                <input type="email" placeholder="youremail@gmail.com" />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input type="password" placeholder="Your Password" />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit">Login</button>
            <Link to="/register">Register Now</Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
