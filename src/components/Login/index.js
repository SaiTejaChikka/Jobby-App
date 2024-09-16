import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  handleSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  handleChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  handleChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, errorMsg, showSubmitError} = this.state

    return (
      <div className="bg-container-login-page">
        <div className="login-from-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-with-login"
          />
          <form onSubmit={this.handleSubmit}>
            <label className="username-style" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              className="input-element"
              id="username"
              placeholder="username"
              onChange={this.handleChangeUsername}
              value={username}
            />
            <br />
            <label className="username-style" htmlFor="Password">
              PASSWORD
            </label>
            <br />
            <input
              className="input-element"
              id="Password"
              placeholder="Password"
              onChange={this.handleChangePassword}
              value={password}
              type="password"
            />
            <br />
            <button className="login-page-btn" type="submit">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
