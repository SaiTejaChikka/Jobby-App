import './index.css'
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import Cookie from 'js-cookie'

class Header extends Component {
  onClickLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }
  render() {
    return (
      <nav className="bg-container-nav-bar">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="img-logo"
        />
        <ul className="list-home-jobs">
          <Link to="/" className="link-text">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="link-text">
            <li>Jobs</li>
          </Link>
        </ul>
        <button className="logout-button" onClick={this.onClickLogout}>
          logout
        </button>
      </nav>
    )
  }
}
export default withRouter(Header)
