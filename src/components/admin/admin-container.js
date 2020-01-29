import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getZone, updateZone } from '../../services/zone-service';

const Home = React.lazy(() => import('./home/home'));
const Options = React.lazy(() => import('./options/options'));

/**
 * Admin component
 */
export default class AdminContainer extends React.Component {
  /**
   * Creates a new instance of an Admin
   *
   * @param {Object} props The properties
   */
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      zoneFile: null,
    };

    this.updateRecords = this.updateRecords.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
  }

  /**
   * Component Did Mount lifecycle hook
   */
  componentDidMount() {
    this.props.isAuthenticated && getZone()
        .then((r) => {
          this.setState({
            zoneFile: r,
            isLoading: false,
          });

          return r;
        })
        .catch((e) => {
          this.setState({
            isLoading: false,
          });

          this.props.displaySnackbarError();
          this.props.logout();
        });
  }

  /**
   * Updates records
   *
   * @param {Record} records The records to update
   * @return {Promise} A promise containing the api request
   */
  updateRecords(records) {
    return this.updateZone({ ...this.state.zoneFile, records });
  }

  /**
   * Updates options
   *
   * @param {Object} options The options to update
   * @return {Promise} A promise containing the api request
   */
  updateOptions(options) {
    const zoneToUpdate = { ...this.state.zoneFile };
    zoneToUpdate.defaultTTL = options.defaultTTL;
    zoneToUpdate.soa = {
      mname: options.mname,
      rname: options.rname,
      refresh: options.refresh,
      retry: options.retry,
      expire: options.expire,
      ttl: options.ttl,
    };

    return this.updateZone(zoneToUpdate);
  }

  /**
   * Updates a zone
   *
   * @param {Zone} zone The zone to update
   * @return {Promise} A promise containing the api request
   */
  updateZone(zone) {
    return updateZone(zone)
        .then((r) => {
          this.props
              .displaySnackbarSuccess('Options were updated successfully');
          this.setState((state) => {
            state.zoneFile = r;
          });
        })
        .catch((e) => {
          this.props.displaySnackbarError();
          throw e;
        });
  }

  /**
   * Renders the app component
   *
   * @return {JSX} The app component
   */
  render() {
    const defaultTTL = this.state.zoneFile && this.state.zoneFile.defaultTTL;
    const records = this.state.zoneFile ? this.state.zoneFile.records : [];
    const soa = this.state.zoneFile ? this.state.zoneFile.soa : {};

    if (!this.props.isAuthenticated) {
      return <Redirect to="/login"></Redirect>;
    }

    if (this.state.isLoading) {
      return <CircularProgress />;
    }

    return (
      <div>
        <React.Suspense fallback={<CircularProgress />}>
          <Switch>
            <Route exact path="/">
              <Home
                defaultTTL={defaultTTL}
                records={records}
                updateRecords={this.updateRecords} />
            </Route>
            <Route path="/options">
              <Options
                {...soa}
                defaultTTL={defaultTTL}
                updateOptions={this.updateOptions} />
            </Route>
            <Route path="*">
              <h1>404 Not Found</h1>
            </Route>
          </Switch>
        </React.Suspense>
      </div>
    );
  }
}

AdminContainer.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  displaySnackbarError: PropTypes.func.isRequired,
  displaySnackbarSuccess: PropTypes.func.isRequired,
};
