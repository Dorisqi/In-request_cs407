import React, { Component } from 'react';
import {fdb} from "../../firebase";
import { withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
  root: {
    minWidth: 275,
    margin: 10,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

class Archived extends Component {
  constructor(props){
    super(props);
    this.state = {
      archived_br_posts: [],
      archived_ld_posts: [],
    };
  }
  componentDidMount() {
    let request_collection = fdb.collection('requests')
    let query = request_collection.where('borrower', '==', this.props.curUser).where('status', '==', 'archived').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const item = doc.data();
          this.setState({
              archived_br_posts: [...this.state.archived_br_posts, item],
          });
        });
      }).catch(err => {
        console.log('Error getting documents', err);
      });
      let len_query = request_collection.where('lender', '==', this.props.curUser).where('status','==','archived').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const item = doc.data();
            this.setState({
                archived_ld_posts: [...this.state.archived_ld_posts, item],
            });
          });
        }).catch(err => {
          console.log('Error getting lending documents', err);
        });
  }
  render() {
    const{classes} = this.props
    const{archived_br_posts,archived_ld_posts} = this.state
    return (
      <div>
        <Typography variant="h4" gutterBottom color="textPrimary">
          Borrow History
        </Typography>
        <Grid container xs={12} spacing={3}>
        {archived_br_posts.map(post=>
          <Grid item xs={4}>
            <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <Typography variant= "subtitle1" >
                    {post.content}
                  </Typography>
                  <Typography variant="body2" component="p" color="textSecondary">
                    Lender: {post.lender}
                    <br />
                  </Typography>
                  <Typography variant="body2" component="p" color="textSecondary">
                    Estimated Return Date: {post.estReturn.toDate().toString()}
                    <br />
                  </Typography>
                </CardContent>
            </Card>
          </Grid>
        )}
        </Grid>
        <br />
        <Divider />
        <br />
        <Typography variant="h4" gutterBottom color="textPrimary">
          Lend History
        </Typography>
        {archived_ld_posts.map(post=>
          <Grid item xs={4}>
            <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {post.title}
                  </Typography>
                  <Typography variant= "subtitle1" >
                    {post.content}
                  </Typography>
                  <Typography variant="body2" component="p" color="textSecondary">
                    Borrower: {post.borrower}
                    <br />
                  </Typography>
                  <Typography variant="body2" component="p" color="textSecondary">
                    Estimated Return Date: {post.estReturn.toDate().toString()}
                    <br />
                  </Typography>
                </CardContent>
            </Card>
          </Grid>
        )}
      </div>
    );
  }
}
export default withStyles(styles,{withTheme: true})(Archived);
