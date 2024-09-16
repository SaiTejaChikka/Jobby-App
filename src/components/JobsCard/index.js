import React from 'react'
import './index.css'
import {Link} from 'react-router-dom'
import {FaMapMarkerAlt, FaBriefcase} from 'react-icons/fa'
import {AiFillStar} from 'react-icons/ai'

const JobsCard = props => {
  const {each} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    rating,
    location,
    packagePerAnnum,
    title,
  } = each

  return (
    <Link to={`/jobs/${id}`} className="text-item">
      <li>
        <div className="job-card">
          <div className="header">
            <div className="logo">
              <img src={companyLogoUrl} alt="company logo" />
            </div>
            <div className="job-title">
              <h3>{title}</h3>
              <div>
                <AiFillStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="details">
            <div className="location">
              <FaMapMarkerAlt className="icon" />
              <p>{location}</p>
            </div>
            <div className="type">
              <FaBriefcase className="icon" />
              <p>{employmentType}</p>
            </div>
            <div className="salary">
              <span>{packagePerAnnum}</span>
            </div>
          </div>
          <div className="description">
            <h4>Description</h4>
            <p>{jobDescription}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default JobsCard
