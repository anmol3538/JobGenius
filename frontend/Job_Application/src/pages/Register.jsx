import React from "react";
import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Register = () => {
  return (
    <section className="authPage">
      <div className="container">
        <div className="header">
          <h3>Create a new account</h3>
        </div>
        <form>
          <div className="wrapper">
            <div className="inputTag">
              <label>Register As</label>
              <div>
                <select>
                  <option value="">Select Role</option>
                  <option value="Employer">Register as an Employer</option>
                  <option value="Job Seeker">Register as a Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Name</label>
              <div>
                <input type="text" placeholder="Your Name" />
                <FaPencilAlt />
              </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input type="email" placeholder="youremail@gmail.com" />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input type="number" placeholder="111-222-333" />
                <FaPhoneFlip />
              </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="inputTag">
              <label>Address</label>
              <div>
                <input type="text" placeholder="Your Address" />
                <FaAddressBook />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input type="password" placeholder="Your Password" />
                <RiLock2Fill />
              </div>
            </div>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
