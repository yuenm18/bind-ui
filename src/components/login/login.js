import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classes from './login.module.css';
/**
 * The login page
 */
export default class Login extends React.Component {
  /**
   * Creates an instance of a Login Page
   *
   * @param {Object} props The component's properties
   */
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Handles the change event
   *
   * @param {Event} event The change event
   */
  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  }

  /**
   * Handles the submit event
   *
   * @param {Event} event The submit event
   */
  handleSubmit(event) {
    event.preventDefault();

    this.props.onLogin(this.state);
  }

  /**
   * Renders the component
   * @return {JSX} The component
   */
  render() {
    return (
      <form
        className={classes.form}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}>
        <TextField
          id="username"
          type="text"
          name="username"
          label="Username"
          margin="dense"
          autoComplete="username"
          required />
        <TextField
          id="password"
          type="password"
          name="password"
          label="Password"
          margin="dense"
          autoComplete="current-password"
          required />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          margin="dense">
          Log In
        </Button>
      </form>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
