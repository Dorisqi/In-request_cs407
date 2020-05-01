import React, { Component } from 'react';
import {fdb} from "../../firebase";
import { withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button1 from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { grommet, Box,FormField, Form, Text, Button, Grommet, Layer,
  TextArea,
  TextInput } from "grommet";
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';

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
      Open:false,
      review:"",
      rating:"Good",
      postofRating:"",
      from_brw_history:true
    };

    this.onClose=this.onClose.bind(this)
    this.on_Rating_Submit=this.on_Rating_Submit.bind(this)
    this.on_Click_rating=this.on_Click_rating.bind(this)
    this.on_Change=this.on_Change.bind(this)
  }
  componentDidMount() {
    let request_collection = fdb.collection('requests')
    let query = request_collection.where('borrower', '==', this.props.curUser).where('status', '==', 'archived').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const item = doc.data();
          const new_item = item
          new_item['id']=doc.id

          this.setState({
              archived_br_posts: [...this.state.archived_br_posts, new_item],
          });
        });
      }).catch(err => {
        console.log('Error getting documents', err);
      });
      let len_query = request_collection.where('lender', '==', this.props.curUser).where('status','==','archived').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const item = doc.data();
            const new_item = item
            new_item['id']=doc.id
            this.setState({
                archived_ld_posts: [...this.state.archived_ld_posts, new_item],
            });
          });
        }).catch(err => {
          console.log('Error getting lending documents', err);
        });
  }
  onClose=event=>{
    this.setState({
      Open:false
    })
  }
  on_Rating_Submit=event=>{
    console.log("submit rate");
    console.log(this.state.postofRating.id);
    const ref=this.state.postofRating
    const review_info=this.state.review
    let old=""
    //const component = this
    let user_collection = fdb.collection('users');
    console.log(ref.borrower);
    // fdb.collection('requests').doc(ref.id).get().then(doc=> {
    // let user = user_collection.doc(ref.borrower).get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //       const item = doc.data();
    //
    //
    //
    //     });
    //   }).catch(err => {
    //     console.log('Error getting documents', err);
    //   });
  //  total_brw_rating/total_ldr_rating/good_brw/good_ldr

    if(this.state.from_brw_history){
      //update local data
      this.setState({
          archived_br_posts: this.state.archived_br_posts.map(el => (el.id === ref.id ? {...el, is_brwRated:true,brw_review:review_info} : el))
        });
      //update database
      fdb.collection('users').doc(ref.lender).get().then(doc=> {
            const item = doc.data();
            const new_total=item.total_ldr_rating+1
            const new_good_ldr=item.good_ldr
            if(this.state.rating=="Good"){
              new_good_ldr=new_good_ldr+1
            }

            fdb.collection('requests').doc(ref.id).update({
                is_brwRated:true,
                brw_review:review_info
            });

            console.log(new_total);
            fdb.collection('users').doc(ref.lender).update({
                total_ldr_rating:new_total,
                good_ldr:new_good_ldr
            });

        }).catch(err => {
          console.log('Error getting documents', err);
        });



    }else{

      this.setState({
          archived_ld_posts: this.state.archived_ld_posts.map(el => (el.id === ref.id ? {...el, is_ldrRated:true,ldr_review:review_info} : el))
        });

        fdb.collection('users').doc(ref.borrower).get().then(doc=> {
              const item = doc.data();
              const new_total=item.total_ldr_rating+1
              const new_good_brw=item.good_brw
              if(this.state.rating=="Good"){
                new_good_brw=new_good_brw+1
              }

              fdb.collection('requests').doc(ref.id).update({
                  is_ldrRated:true,
                  ldr_review:review_info
              });

              console.log(new_total);
              fdb.collection('users').doc(ref.borrower).update({
                  total_brw_rating:new_total,
                  good_brw:new_good_brw
              });

          }).catch(err => {
            console.log('Error getting documents', err);
          });



    }

    this.setState({
      Open:false,
      review:""

    })
    return
    // TODO: upload user comment and rating by email
    //1.change brw/ldr state,2.add rate to user, comment to post
  }
  on_Click_rating(post,status){
    console.log(status)
    this.setState({
      Open:true,
      postofRating:post,
      from_brw_history:status
    })
  }

  on_Change(value){
    //const value=event.target.value
    this.setState({
      review:value
    })
  }
  set_Rating(value){
    this.setState({
      rating:value
    })
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
                {((post.is_brwRated == false && post.lender!="")
                  ?
                    <CardActions>
                      <Button1 size="medium" color="textSecondary" onClick={()=>this.on_Click_rating(post,true)}>Rating/Review</Button1>
                    </CardActions>
                  :
                    <CardActions>
                      <Button1 size="medium" color="textSecondary" disabled>Rated</Button1>
                    </CardActions>
                )}
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
                  {((post.is_ldrRated == false)
                    ?

                      <CardActions>
                        <Button1 size="medium" color="textSecondary" onClick={()=>this.on_Click_rating(post,false)}>Rating\/Review</Button1>
                      </CardActions>

                    :

                      <CardActions>
                        <Button1 size="medium" color="textSecondary" disabled>Rated</Button1>
                      </CardActions>

                  )}
                </CardContent>
            </Card>
          </Grid>
        )}
        {this.state.Open && (
        <Layer
          position="center"
          modal
          onClickOutside={this.onClose}
          onEsc={this.onClose}
        >
          <Box
            as="form"
            fill="vertical"
            overflow="auto"
            width="medium"
            pad="medium"
            onSubmit={this.onClose}
          >
            <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>

              <Box flex={false} direction="row" align="stretch" >
              <Typography variant= "h6" >
                Rating to Lender:
              </Typography>
                <Button
                  icon={<ThumbUpAltOutlinedIcon/>}
                  label="Good" size="xsmall"
                  gap="xxsmall"
                  margin="xsmall"
                  onClick={() => {this.set_Rating("Good")}}
                  primary={this.state.rating=="Good"? true:false}
                  color="#e07e77"
                />
                <Button
                  icon={<ThumbDownAltOutlinedIcon/>}
                  label="Not Good" size="xsmall"
                  margin="xsmall"
                  gap="xsmall"
                  onClick={() => {this.set_Rating("Not Good")}}
                  primary={this.state.rating=="Good"? false:true}
                  color="#95e077"
                />
              </Box>
              <FormField >
              <TextArea
                  placeholder="Write comments:"
                  value={this.state.review}
                  onChange={event => this.on_Change(event.target.value)}
                />
              </FormField>
            </Box>
            <Box flex={false} as="footer" align="end">
              <Button
                type="submit"
                label="Submit"
                onClick={this.on_Rating_Submit}
                color="#f5edef"
                primary
              />
            </Box>
          </Box>
        </Layer>
      )}

      </div>
    );
  }
}
export default withStyles(styles,{withTheme: true})(Archived);
