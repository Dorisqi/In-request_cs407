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
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar'
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import Profile from '../Home/profile';
import Posts from '../Home/Posts.js';
import NewRequest from '../Home/NewRequest';
import Upload from '../Home/uploadimg';
import Button from '@material-ui/core/Button';
import { withStyles, useTheme } from '@material-ui/core/styles';
import {auth} from "../../firebase";
import {fdb} from "../../firebase";
import { useLocation } from "react-router-dom";
import {withRouter } from "react-router-dom";
import ActiveTransaction from "../Home/ActiveTransaction"
import Archived from "../Home/Archived"

const drawerWidth = 240;
const styles = theme => ({
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
  listItemText:{
    fontSize:'1.8em',
  }
});
class SideBar extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      Email:"",
      Password:"",
      Nickname:"",
      auth: this.auth,
      fdb: this.fdb,
      name:"",




    }
    // this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
    this.Logout= this.Logout.bind(this)
  }
  // handleDrawerToggle = () => {
  //   const value = this.state.
  //   this.setState({
  //     mobileOpen:
  //   })
  //   setMobileOpen(!this.mobileOpen);
  // }

  Logout=event=>{
    //const loc = useLocation();
    //console.log(this.props.location.state.Email)
    // console.log(prevProps.Email)
    const email = this.props.location.state.Email
    const history = this.props.history
    auth.signOut().then(function() {
  // log-out successful.
      //const email = this.props.location.state.Email
      const ref = fdb.collection('users').doc(email);
      ref.update({
        LoginState: false
      }).then(() => {
        console.log('logout successful');
        history.push("/login");
      });
    }).catch(err => {
      // An error happened.
      console.log('Error logging out', err);
    });
  }
  render(){
    const {classes} = this.props;
    const theme = useTheme;
    return(

        <div className={classes.root}>
        <CssBaseline />
        <BrowserRouter>
          <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: styles.drawerPaper,
                }}
                variant="permanent"
                open
              >
              <div>
                <div className={classes.toolbar} />
                <Grid container justify = "center">

                  <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                    </IconButton>
                  </label>

                  <Upload url={this.props.location.state.url} Email={this.props.location.state.Email} Nickname={this.props.location.state.Nickname}/>
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
                      <ListItemText classes={{primary:classes.listItemText}} primary={text} />
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <List>
                  {['Profile', 'Log Out'].map((text, index) => (
                    <ListItem button onClick={this.Logout} key={text} component={Link} to={"/" + text.replace(/\s/g,'')}>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText classes={{primary:classes.listItemText}} primary={text} />
                    </ListItem>
                  ))}
                </List>
                </div>
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/posts">
                <Posts Email={this.props.location.state.Email} Nickname={this.props.location.state.Nickname}/>
              </Route>
              <Route path="/profile">

              </Route>
              <Route path="/NewRequest">
                <NewRequest hasPhoto={this.props.location.state.hasPhoto} Email={this.props.location.state.Email}/>
              </Route>
              <Route path="/ActiveTransaction">
                <ActiveTransaction curUser = {this.props.location.state.Email}/>
              </Route>
              <Route path="/Archived">
                <Archived curUser = {this.props.location.state.Email} />
              </Route>
            </Switch>
          </main>
        </BrowserRouter>
      </div>
    );
  }


}
//
// function SideBar(props) {
//   const { container,location } = props;
//   const classes = useStyles();
//   const theme = useTheme();
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//
//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };
//   const Logout=()=>{
//     auth.signOut().then(function() {
//   // log-out successful.
//       console.log(auth.currentUser)
//       const ref = fdb.collection('users').doc(props.location.state.Email);
//       ref.update({
//         LoginState: false
//       }).then(() => {
//         console.log('logout successful');
//         this.props.history.push("/login");
//       });
//     }).catch(err => {
//       // An error happened.
//       console.log('Error logging out', err);
//     });
//   }
//
//   const drawer = (
//     <div>
//       <div className={classes.toolbar} />
//       <Grid container justify = "center">
//
//         {/* --- TODO: clickable IconButton --- */}
//         <label htmlFor="icon-button-file">
//           <IconButton color="primary" aria-label="upload picture" component="span">
//             {/* --- TODO: display user's profile picture -- */}
//           </IconButton>
//         </label>
//
//         {/* --- TODO: clickable image --- */}
//
//         {/* --- TODO: display user's rating -- */}
//         <Upload/>
//       </Grid>
//       <br />
//       <br />
//       <Divider />
//       <List>
//         {['Posts', 'New Request', 'Active Transaction', 'Archived'].map((text, index) => (
//           <ListItem button key={text} component={Link} to={"/" + text.replace(/\s/g,'')}>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['Profile', 'Log Out'].map((text, index) => (
//           <ListItem button onClick={Logout} key={text} component={Link} to={"/" + text.replace(/\s/g,'')}>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
//
//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <BrowserRouter>
//         <nav className={classes.drawer} aria-label="mailbox folders">
//           {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//           <Hidden xsDown implementation="css">
//             <Drawer
//               classes={{
//                 paper: classes.drawerPaper,
//               }}
//               variant="permanent"
//               open
//             >
//               {drawer}
//             </Drawer>
//           </Hidden>
//         </nav>
//         {/*--- Add remaing components to each Route  ---*/}
//         <main className={classes.content}>
//           <div className={classes.toolbar} />
//           <Switch>
//             <Route exact path="/posts">
//               <Posts />
//             </Route>
//             <Route path="/profile">
//               <Profile />
//             </Route>
//             <Route path="/NewRequest">
//               <NewRequest />
//             </Route>
//           </Switch>
//         </main>
//       </BrowserRouter>
//     </div>
//   );
// }
//
SideBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
   container: PropTypes.instanceOf(
     typeof Element === "undefined" ? Object : Element
 ),
    Email:PropTypes.string,
    // auth:PropTypes.object
};

export default withRouter(withStyles(styles, {withTheme: true})(SideBar));
