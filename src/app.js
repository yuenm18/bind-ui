import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Navbar from './components/navbar/navbar';

const LoginContainer = React.lazy(
    () => import('./components/login/login-container'));
const AdminContainer = React.lazy(
    () => import('./components/admin/admin-container'));

/**
 * App component
 *
 * @return {JSX} The App component
 */
export default class App extends React.Component {
  /**
   * Creates an instance of an app component
   *
   * @param {Object} props The props object
   */
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.displaySnackbarError = this.displaySnackbarError.bind(this);
    this.displaySnackbarSuccess = this.displaySnackbarSuccess.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);

    this.state = {
      isAuthenticated: document.cookie.split(';').some((c) => {
        const cookie = c.trim().split('=').map(decodeURIComponent);
        return cookie[0] === 'bind-ui' && JSON.parse(cookie[1]).isAuthenticated;
      }),
    };
  }

  /**
   * Displays a snackbar error
   *
   * @param {String} message The snackbar message
   */
  displaySnackbarError(message = 'An error has occurred') {
    this.setState({
      snackbarMessage: message,
      snackbarSeverity: 'error',
    });
  }

  /**
   * Displays a snackbar success
   *
   * @param {String} message The snackbar message
   */
  displaySnackbarSuccess(message = 'The operation was completed successfully') {
    this.setState({
      snackbarMessage: message,
      snackbarSeverity: 'success',
    });
  }

  /**
   * Handles the snackbar closing
   *
   * @param {Event} event The event
   * @param {Reason} reason The reason
   */
  handleSnackbarClose(event, reason) {
    this.setState({
      snackbarMessage: null,
    });
  }

  /**
   * Logs in
   */
  login() {
    this.setState({
      isAuthenticated: true,
    });
  }

  /**
   * Logs out
   */
  logout() {
    this.setState({
      isAuthenticated: false,
    });
  }

  /**
   * Renders App component
   *
   * @return {JSX} The App component
   */
  render() {
    const isAuthenticated = this.state.isAuthenticated;

    return (
      <Router>
        <Navbar
          isAuthenticated={isAuthenticated}
          logout={this.logout}
          displaySnackbarError={this.displaySnackbarError} />
        <Container maxWidth="md">
          <React.Suspense fallback={<CircularProgress />}>
            <Switch>
              <Route path="/login">
                <LoginContainer
                  isAuthenticated={isAuthenticated}
                  login={this.login}
                  displaySnackbarError={this.displaySnackbarError} />
              </Route>
              <Route path="*">
                <AdminContainer
                  isAuthenticated={isAuthenticated}
                  logout={this.logout}
                  displaySnackbarError={this.displaySnackbarError}
                  displaySnackbarSuccess={this.displaySnackbarSuccess} />
              </Route>
            </Switch>
          </React.Suspense>
        </Container>
        <Snackbar
          open={!!this.state.snackbarMessage}
          autoHideDuration={5000}
          onClose={this.handleSnackbarClose}>
          <Alert severity={this.state.snackbarSeverity}>
            {this.state.snackbarMessage}
          </Alert>
        </Snackbar>
      </Router>
    );
  }
}
