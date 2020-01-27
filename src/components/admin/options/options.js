import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import classes from './options.module.css';

/**
 * Options component
 */
export default class Options extends React.Component {
  /**
   * Creates a new instance of an options component
   *
   * @param {Object} props The props object
   */
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);

    this.state = {
      optionsForm: {
        defaultTTL: 0,
        mname: '',
        rname: '',
        refresh: 0,
        retry: 0,
        expire: 0,
        ttl: 0,
      },
    };
  }

  /**
   * Component Did Mount lifecycle hook
   */
  componentDidMount() {
    this.reset();
  }

  /**
   * Copies the props to the options state
   */
  reset() {
    this.setState({
      optionsForm: {
        defaultTTL: this.props.defaultTTL,
        mname: this.props.mname,
        rname: this.props.rname,
        refresh: this.props.refresh,
        retry: this.props.retry,
        expire: this.props.expire,
        ttl: this.props.ttl,
      },
    });
  }

  /**
   * Handles the change event
   *
   * @param {Event} event The change event
   */
  handleChange(event) {
    this.setState({
      optionsForm: {
        ...this.state.optionsForm,
        [event.target.name]: event.target.value,
      },
    });
  }

  /**
   * Handles the submit event
   *
   * @param {Event} event The submit event
   */
  handleSubmit(event) {
    event.preventDefault();

    this.props.updateOptions(this.state.optionsForm)
        .catch((e) => this.reset());
  }

  /**
   * Renders an options component
   *
   * @return {JSX} Options component
   */
  render() {
    const form = this.state.optionsForm;
    return (
      <div>
        <h1>Options</h1>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}>
          <TextField
            type="number"
            id="defaultTTL"
            name="defaultTTL"
            label="Default TTL"
            helperText="The default TTL for records"
            value={form.defaultTTL}
            fullWidth
            margin="dense"
            required />
          <TextField
            type="text"
            label="mname"
            id="mname"
            name="mname"
            helperText="The master name server"
            value={form.mname}
            fullWidth
            margin="dense"
            required />
          <TextField
            type="email"
            id="rname"
            name="rname"
            label="rname"
            helperText="The email address of the administrator"
            value={form.rname}
            fullWidth
            margin="dense"
            required />
          <TextField
            type="number"
            id="refresh"
            name="refresh"
            label="refresh"
            helperText="The number of seconds that the secondary
            name servers should wait before they query the master
            name server for the SOA record"
            value={form.refresh}
            fullWidth
            margin="dense"
            required />
          <TextField
            type="number"
            id="retry"
            name="retry"
            label="retry"
            helperText="The number of seconds that the secondary
            name servers should wait before retrying to request
            the serial number from the master name server"
            value={form.retry}
            fullWidth
            margin="dense"
            required />
          <TextField
            type="number"
            id="expire"
            name="expire"
            label="expire"
            helperText="The number of seconds after the name server
            should stop answering request if the master name server
            does not respond"
            value={form.expire}
            fullWidth
            margin="dense"
            required />
          <TextField
            type="number"
            id="ttl"
            name="ttl"
            label="ttl"
            helperText="The negative caching time to live"
            value={form.ttl}
            fullWidth
            margin="dense"
            required />
          <div className={classes['button-container']}>
            <Button
              type="submit"
              variant="contained"
              color="primary">
              Save
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={this.reset}>
              Reset
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

Options.propTypes = {
  defaultTTL: PropTypes.number.isRequired,
  mname: PropTypes.string.isRequired,
  rname: PropTypes.string.isRequired,
  refresh: PropTypes.number.isRequired,
  retry: PropTypes.number.isRequired,
  expire: PropTypes.number.isRequired,
  ttl: PropTypes.number.isRequired,
  updateOptions: PropTypes.func.isRequired,
};
