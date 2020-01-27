import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { login } from '../../services/auth-service';
import Login from './login';

/**
 * The login page
 */
export default class LoginContainer extends React.Component {
  /**
   * Creates an instance of a Login Page
   *
   * @param {Object} props The component's properties
   */
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  /**
   * Handles the login event
   *
   * @param {Object} loginData The login data event
   */
  handleLogin(loginData) {
    login(loginData).then((r) => {
      this.props.login();
    }).catch((e) => {
      if (e.status === 401) {
        this.props.displaySnackbarError('Invalid username or password');
      } else {
        this.props.displaySnackbarError();
      }
    });
  }

  /**
   * Renders the component
   * @return {JSX} The component
   */
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/"></Redirect>;
    }

    return <Login onLogin={this.handleLogin} />;
  }
}

LoginContainer.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  displaySnackbarError: PropTypes.func.isRequired,
};
