import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar'
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import Profile from '../Home/profile';
import Posts from '../Home/posts';
import NewRequest from '../Home/NewRequest';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function SideBar(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Grid container justify = "center">
<<<<<<< HEAD
        {/* --- TODO: clickable IconButton --- */}
        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            {/* --- TODO: display user's profile picture -- */}
            <Avatar>F</Avatar>
          </IconButton>
        </label>
=======
        {/* --- TODO: clickable image --- */}
>>>>>>> cd63c8d488aaa2b796720f07acd19857e9c1400b
        {/* --- TODO: display user's rating -- */}
        <Avatar>F</Avatar>
      </Grid>
      <br />
      <br />
      <Divider />
      <List>
        {['Posts', 'New Request', 'Active Transaction', 'Archived'].map((text, index) => (
          <ListItem button key={text} component={Link} to={"/" + text.replace(/\s/g,'')}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Profile', 'Log Out'].map((text, index) => (
          <ListItem button key={text} component={Link} to={"/" + text.replace(/\s/g,'')}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <BrowserRouter>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        {/*--- Add remaing components to each Route  ---*/}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/posts">
              <Posts />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/NewRequest">
              <NewRequest />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

SideBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
   container: PropTypes.instanceOf(
     typeof Element === "undefined" ? Object : Element
 )
};

export default SideBar;
