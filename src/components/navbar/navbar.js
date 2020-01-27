import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import { logout } from '../../services/auth-service';

import classes from './navbar.module.css';

/**
 * The navbar component
 */
export default class Navbar extends React.Component {
  /**
   * Creates an instance of a navbar
   *
   * @param {Object} props The properties
   */
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      isOpened: false,
    };
  }

  /**
   * Logout
   */
  logout() {
    logout()
        .then((r) => this.props.logout())
        .catch((e) => this.props.displaySnackbarError());
  }

  /**
   * Handles the open event
   */
  handleOpen() {
    this.setState({
      isOpened: true,
    });
  }

  /**
   * Handles the close event
   */
  handleClose() {
    this.setState({
      isOpened: false,
    });
  }

  /**
   * Renders the navbar
   *
   * @return {JSX} The navbar
   */
  render() {
    const isAuthenticated = this.props.isAuthenticated;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            {isAuthenticated && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={this.handleOpen} >
                <MenuIcon />
              </IconButton>
            )}

            <Typography variant="h6" className={classes.title}>
              BIND Server
            </Typography>
            {
              isAuthenticated &&
              <Button
                color="inherit"
                onClick={this.logout}>
                Logout
              </Button>
            }
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={this.state.isOpened}
          onClose={this.handleClose}
          onClick={this.handleClose}
        >
          <div className={classes.drawer}>
            <List component="nav">
              <ListItem button component={Link} to="/">
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button component={Link} to="/options">
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="Options" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  displaySnackbarError: PropTypes.func.isRequired,
};
