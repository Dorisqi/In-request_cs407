import React from 'react';
import { withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {fdb} from "../../firebase";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar'
import CircularProgress from '@material-ui/core/CircularProgress';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
/* --- THIS FILE DISPLAY USER'S PERSONAL INFO --- */
const styles = theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
})

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brating: 0,
      lrating: 0,
    };
  }
  componentDidMount() {
    let userCollection = fdb.collection('users').doc(this.props.curUser);
    let getDoc = userCollection.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        }else{
          const item = doc.data();
          this.setState({
            brating: ((item.good_brw / item.total_brw_rating).toFixed(2)) * 100,
            lrating: ((item.good_ldr / item.total_ldr_rating).toFixed(2)) * 100,
          });
        }
      }).catch(err => {
        console.log("Error getting document", err);
      });
  }
  render() {
    const {brating, lrating} = this.state;
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '15vh' }}>
          <Grid item xs={3}>
            <Avatar size="small" src={this.props.url}/>
          </Grid>
          <br />
          <Grid item xs = {6}>
            <Button style={{color: '#e07e77'}}>
                            <ThumbUpAltOutlinedIcon fontSize="small"/>
                              Lender Rating: {lrating}
            </Button>
            <Button style={{color: '#95e077'}}>
                              <ThumbUpAltOutlinedIcon fontSize="small"/>
                              Borrower Rating:{brating}
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme:true})(Profile);
