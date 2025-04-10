

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobslice";
import Spinner from "../components/Spinner";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [city, setCity] = useState("");
  const [niche, setNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const handleCityChange = (city) => {
    setCity(city === "All" ? "" : city); // Reset if "All"
  };

  const handleNicheChange = (niche) => {
    setNiche(niche === "All" ? "" : niche); // Reset if "All"
  };

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  };

  useEffect(() => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  }, [dispatch, city, niche, searchKeyword]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
  }, [error, dispatch]);

  const cities = [
    "All", "Shimla", "Dharamshala", "Manali", "Mandi", "Solan", "Kullu",
    "Bilaspur", "Hamirpur", "Una", "Chamba", "Kangra", "Nahan", "Palampur",
    "Keylong", "Reckong Peo", "Sirmaur", "Paonta Sahib", "Sundernagar"
  ];

  const nichesArray = [
    "All", "Software Development", "Web Development", "Cybersecurity", "Data Science",
    "Artificial Intelligence", "Cloud Computing", "DevOps", "Mobile App Development",
    "Blockchain", "Database Administration", "Network Administration", "UI/UX Design",
    "Game Development", "IoT (Internet of Things)", "Big Data", "Machine Learning",
    "IT Project Management", "IT Support and Helpdesk", "Systems Administration", "IT Consulting"
  ];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">
          <div className="search-tab-wrapper">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search by job title"
            />
            <button onClick={handleSearch}>Find Job</button>
            <FaSearch />
          </div>

          <div className="wrapper">
            <div className="filter-bar">
              <div className="cities">
                <h2>Filter Job By City</h2>
                {cities.map((city, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={city}
                      name="city"
                      value={city}
                      checked={city === city}
                      onChange={() => handleCityChange(city)}
                    />
                    <label htmlFor={city}>{city}</label>
                  </div>
                ))}
              </div>

              <div className="cities">
                <h2>Filter Job By Niche</h2>
                {nichesArray.map((niche, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={niche}
                      name="niche"
                      value={niche}
                      checked={niche === niche}
                      onChange={() => handleNicheChange(niche)}
                    />
                    <label htmlFor={niche}>{niche}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="container">
              <div className="mobile-filter">
                <select value={city} onChange={(e) => handleCityChange(e.target.value)}>
                  <option value="">Filter By City</option>
                  {cities.map((city, index) => (
                    <option value={city} key={index}>{city}</option>
                  ))}
                </select>

                <select value={niche} onChange={(e) => handleNicheChange(e.target.value)}>
                  <option value="">Filter By Niche</option>
                  {nichesArray.map((niche, index) => (
                    <option value={niche} key={index}>{niche}</option>
                  ))}
                </select>
              </div>

              <div className="jobs_container">
                {jobs && jobs.length > 0 ? (
                  jobs.map((element) => (
                    <div className="card" key={element._id}>
                      <p className={element.hiringMultipleCandidates === "Yes" ? "hiring-multiple" : "hiring"}>
                        {element.hiringMultipleCandidates === "Yes" ? "Hiring Multiple Candidates" : "Hiring"}
                      </p>
                      <p className="title">{element.title}</p>
                      <p className="company">{element.companyName}</p>
                      <p className="location">{element.location}</p>
                      <p className="salary"><span>Salary:</span> Rs. {element.salary}</p>
                      <p className="posted"><span>Posted On:</span> {element.jobPostedOn?.substring(0, 10)}</p>
                      <div className="btn-wrapper">
                        <Link className="btn" to={`/post/application/${element._id}`}>Apply Now</Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <img src="./notfound.png" alt="job-not-found" style={{ width: "100%" }} />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;

