import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
class FiltersJobComponent extends Component {
  state = {userProfileDetails: [], typeOfemployment: [], salaryrange: []}
  componentDidMount() {
    this.getUserDetails()
  }
  getUserDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const userData = await response.json()
    const {profile_details} = userData
    const newUserData = {
      name: profile_details.name,
      profileImageUrl: profile_details.profile_image_url,
      shortBio: profile_details.short_bio,
    }

    this.setState({userProfileDetails: newUserData})
  }
  onEmploymentType = event => {
    const {typeOfemployment} = this.state
    const {onChangeEmployment} = this.props
    let index = typeOfemployment.indexOf(event.target.value)

    if (index > -1) {
      // Remove the element at the found index
      typeOfemployment.splice(index, 1)
    } else {
      typeOfemployment.push(event.target.value)
    }
    console.log(typeOfemployment)
    onChangeEmployment(typeOfemployment.join())
  }
  getSalaryRange = event => {
    const {onChangePackage} = this.props
    onChangePackage(event)
  }
  render() {
    const {userProfileDetails} = this.state
    const {name, profileImageUrl, shortBio} = userProfileDetails
    return (
      <div className="sidebar">
        <div className="profile-card">
          <div className="profile-pic">
            <img src={profileImageUrl} alt="profile" />
          </div>
          <div className="profile-info">
            <h1>{name}</h1>
            <p>{shortBio}</p>
          </div>
        </div>

        <div className="filter-section">
          <h4>Type of Employment</h4>
          <ul className="checkbox-group">
            {employmentTypesList.map(each => (
              <li key={each.employmentTypeId}>
                <input
                  type="checkbox"
                  id={each.employmentTypeId}
                  value={each.employmentTypeId}
                  onChange={this.onEmploymentType}
                />
                <label htmlFor={each.employmentTypeId}>{each.label}</label>
              </li>
            ))}
          </ul>
        </div>

        <div className="filter-section">
          <h4>Salary Range</h4>
          <ul className="radio-group">
            {salaryRangesList.map(each => (
              <li key={each.salaryRangeId}>
                <input
                  type="radio"
                  name="salary"
                  id={each.salaryRangeId}
                  onChange={() => this.getSalaryRange(each.salaryRangeId)}
                />
                <label htmlFor={each.salaryRangeId}>{each.label}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default FiltersJobComponent
