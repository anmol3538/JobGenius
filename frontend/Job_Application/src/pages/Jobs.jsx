import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Jobs = () => {
  const cities = [
    "All",
    "Una",
    "Shimla",
    "Manali",
    "Dharamshala",
    "Solan",
    "Kullu",
    "Mandi",
    "Chamba",
    "Bilaspur",
    "Una",
    "Kangra",
    "Hamirpur",
    "Kinnaur",
    "Lahaul & Spiti",
    "Sirmaur",
  ];

  const nichesArray = [
    "All",
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  return (
    <section className="jobs">
      <div className="search-tab-wrapper">
        <input type="text" placeholder="Search for jobs..." />
        <button>Find Job</button>
        <FaSearch />
      </div>
      <div className="wrapper">
        <div className="filter-bar">
          <div className="cities">
            <h2>Filter Job By City</h2>
            {cities.map((city, index) => (
              <div key={index}>
                <input type="radio" id={city} name="city" value={city} />
                <label htmlFor={city}>{city}</label>
              </div>
            ))}
          </div>
          <div className="cities">
            <h2>Filter Job By Niche</h2>
            {nichesArray.map((niche, index) => (
              <div key={index}>
                <input type="radio" id={niche} name="niche" value={niche} />
                <label htmlFor={niche}>{niche}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="mobile-filter">
            <select>
              <option value="">Filter By City</option>
              {cities.map((city, index) => (
                <option value={city} key={index}>
                  {city}
                </option>
              ))}
            </select>
            <select>
              <option value="">Filter By Niche</option>
              {nichesArray.map((niche, index) => (
                <option value={niche} key={index}>
                  {niche}
                </option>
              ))}
            </select>
          </div>
          <div className="jobs_container">
            <div className="card">
              <p className="hiring">Hiring</p>
              <p className="title">Software Engineer</p>
              <p className="company">Tech Innovators Pvt. Ltd.</p>
              <p className="location">Shimla</p>
              <p className="salary">
                <span>Salary:</span> Rs. 80,000
              </p>
              <p className="posted">
                <span>Posted On:</span> 2025-02-28
              </p>
              <div className="btn-wrapper">
                <Link className="btn" to="#">
                  Apply Now
                </Link>
              </div>
            </div>
            <div className="card">
              <p className="hiring-multiple">Hiring Multiple Candidates</p>
              <p className="title">Web Developer</p>
              <p className="company">Himalayan Tech Solutions</p>
              <p className="location">Manali</p>
              <p className="salary">
                <span>Salary:</span> Rs. 60,000
              </p>
              <p className="posted">
                <span>Posted On:</span> 2025-02-25
              </p>
              <div className="btn-wrapper">
                <Link className="btn" to="#">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
