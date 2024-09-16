import './index.css'
import Header from '../Header'

const Home = props => {
  const onFindJobs = () => {
    const {history} = props
    history.push('/jobs')
  }
  return (
    <div>
      <Header />
      <div className="bg-container-home-page">
        <h1 className="main-heading-home-page">
         Find The Job That Fits Your Life
        </h1>
        <p className="decription-of-home-page">
          Millions of people are searching for jobs
        </p>
        <button className="home-page-to-jobs-btn" onClick={onFindJobs}>
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default Home
