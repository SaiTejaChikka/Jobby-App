import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import JobsCard from '../JobsCard'
import Header from '../Header'
import Loader from 'react-loader-spinner';

import FiltersJobComponent from '../FiltersJobComponent'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobList: [],
    employmentType: '',
    minimumPackage: '',
    search: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  onChangePackage = minimumPackage => {
    this.setState({minimumPackage}, this.getData)
  }

  onChangeEmployment = employmentType => {
    this.setState({employmentType}, this.getData)
  }

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  searchValue = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {minimumPackage, employmentType, search} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${search}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data

      if (jobs.length === 0) {
        this.setState({jobList: [], apiStatus: apiStatusConstants.success})
      } else {
        const newjobslist = jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          location: each.location,
          jobDescription: each.job_description,
          
          packagePerAnnum: each.package_per_annum,
          rating: each.rating,
          title: each.title,
        }))
        this.setState({
          jobList: newjobslist,
          apiStatus: apiStatusConstants.success,
        })
      }
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsList = () => {
    const {jobList} = this.state

    if (jobList.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-image"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-description">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )
    }

    return (
      <ul className="job-list-bg-container">
        {jobList.map(each => (
          <Link to={`/jobs/${each.id}`} className="job-link" key={each.id}>
            <JobsCard each={each} key={each.id} />
          </Link>
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="jobs-api-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-api-failure-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={this.getData}>
        Retry
      </button>
    </div>
  )

  renderJobsPageContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return (
          <div className="jobs-loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="bg-container-jobs">
          <FiltersJobComponent
            onChangePackage={this.onChangePackage}
            onChangeEmployment={this.onChangeEmployment}
          />
          <div className="bg-jobs">
            <div className="search-bar">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.onChangeSearch}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.searchValue}
                className="search-btn"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsPageContent()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
