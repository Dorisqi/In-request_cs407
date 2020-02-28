import React, { Component } from 'react';
import {fdb} from "../../firebase";
import { withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

/* ---  THIS FILE CONTAINS ALL THE POSTS --- */
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
});

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post_list: [],
      fdb: this.fdb
    }
  }
  componentDidMount() {
    let requests_collection = fdb.collection('requests');
    let all_requests = requests_collection.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const item = doc.data();
          this.setState({
               post_list: [...this.state.post_list, item],
          });
        });
      }).catch(err => {
        console.log('Error getting documents', err);
      });
  }
  render() {
    const{classes} = this.props
    const {post_list} = this.state
    return (

    <div>
      {post_list.map(post=>
        <Card className={classes.root}>
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
                Guranrtor: {post.guarantor}
                <br />
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Lend</Button>
            </CardActions>
        </Card>
      )}
    </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Posts);;
