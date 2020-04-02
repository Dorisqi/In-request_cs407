import React, { Component } from 'react';
import {fdb,auth,storage} from "../../firebase";
import { withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import Container from '@material-ui/core/Container';
import AppsIcon from '@material-ui/icons/Apps';
import { grommet,Grommet,FormField,TextInput,InfiniteScroll,Box,Text} from "grommet";
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from "@material-ui/core/Avatar";



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
  label_size:{
    fontSize:8,
  }
});

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterList:[],
      post_list: [],
      comment_list:{},
      storage:storage,
      color1:0,
      color2:0,
      color3:0,
      color4:0,
      color5:0,
      color6:0,
      color7:0,
      color8:0,
      color9:0,
      color11:0,
      color12:0,
      open:false,
      url:"",
      add_cmt:0
    };
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
    this.handleClick4 = this.handleClick4.bind(this);
    this.handleClick5 = this.handleClick5.bind(this);
    this.handleClick6 = this.handleClick6.bind(this);
    this.handleClick7 = this.handleClick7.bind(this);
    this.handleClick8 = this.handleClick8.bind(this);
    this.handleClick9 = this.handleClick9.bind(this);
    this.handleClick11 = this.handleClick11.bind(this);
    this.handleClick12 = this.handleClick12.bind(this);
    this.onClick_Open = this.onClick_Open.bind(this);
    this.get_url=this.get_url.bind(this)
    this.add_Comment=this.add_Comment.bind(this)
    this.on_Submit=this.on_Submit.bind(this)
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

  onClick_Open=event=>{
    const status = this.state.open == 0? 1:0
    this.setState({open:status})


  }
  on_Submit=event=>{
    ////ADD TO SPECIFIC REQUEST NICKNMAE,EMAIL. CONTENT
  }

  add_Comment=event=>{
    const status = this.state.add_cmt == 0? 1:0
    this.setState({add_cmt:status})

  }
  handleClick1 = event =>{
    const value = (this.state.color1 ==1 )? 0:1
    this.setState({color1: value})
  }
  handleClick2=event=>{
    const value = (this.state.color2 ==1)? 0:1
    this.setState({ color2: value})
  }
  handleClick3=event=>{

    const value = (this.state.color3 ==1)? 0:1
    this.setState({ color3: value})
  }
  handleClick4=event=>{

    const value = (this.state.color4 ==1)? 0:1
    this.setState({ color4: value})
  }
  handleClick5=event=>{

    const value = (this.state.color5==1)? 0:1
    this.setState({
      color5: value,
      color6: 0,
      color7: 0,
    })
  }
  handleClick6=event=>{
    const value = (this.state.color6 ==1)? 0:1
    this.setState({
      color6: value,
      color5: 0,
      color7:0,
    })
  }
  handleClick7=event=>{
    const value = (this.state.color7 ==1)? 0:1
    this.setState({
      color7: value,
      color5: 0,
      color6: 0,
    })
  }
  handleClick8=event=>{
    const value = (this.state.color8 ==1)?0:1
    this.setState({ color8: value})
  }
  handleClick9=event=>{
    const value = (this.state.color9 ==1)?0:1
    this.setState({ color9: value})
  }
  handleClick11=event=>{
    const value = (this.state.color11 ==1)?0:1
    this.setState({ color11: value})
  }
  handleClick12=event=>{
    const value = (this.state.color12 ==1)?0:1
    this.setState({ color12: value})
  }

  get_url(email){

    //console.log(email)
    storage.ref('images').child(email).getDownloadURL().then(url => {
        this.setState({url:url})
        return true
    }).catch(err => {
      this.setState({url:""})
      console.log('Error getting image', err);
      return true
    });
    // console.log(url_)

  }

  render() {
    const{classes} = this.props
    const {post_list, color1,color2,color3,color4,color5,color6,color7,color8,color9,color11,color12} = this.state

    let buffer = []
    let filtered = []
    if (color1) {
      const result = post_list.filter(obj =>(obj.taglist.includes("HICKS")));
      buffer.push.apply(buffer, result)
    }
    if (color2) {
      const result = post_list.filter(obj =>(obj.taglist.includes("PMU")));
      buffer.push.apply(buffer, result)
    }
    if (color3) {
      const result = post_list.filter(obj =>(obj.taglist.includes("LWSN")));
      buffer.push.apply(buffer, result)
    }
    if (color4) {
      const result = post_list.filter(obj =>(obj.taglist.includes("ECE")));
      buffer.push.apply(buffer, result)
    }
    if (color5) {
      const result = post_list.filter(obj =>(obj.taglist.includes("LEVEL1")));
      buffer.push.apply(buffer, result)
    }
    if (color6) {
      const result = post_list.filter(obj =>(obj.taglist.includes("LEVEL2")));
      buffer.push.apply(buffer, result)
    }
    if (color7) {
      const result = post_list.filter(obj =>(obj.taglist.includes("LEVEL3")));
      buffer.push.apply(buffer, result)
    }
    if (color8) {
      const result = post_list.filter(obj =>(obj.taglist.includes("Stationery")));
      buffer.push.apply(buffer, result)
    }
    if (color9) {
      const result = post_list.filter(obj =>(obj.taglist.includes("Commute")));
      buffer.push.apply(buffer, result)
    }
    if (color11) {
      const result = post_list.filter(obj =>(obj.taglist.includes("Living Essentials")));
      buffer.push.apply(buffer, result)
    }
    if (color12) {
      const result = post_list.filter(obj =>(obj.taglist.includes("Sports")));
      buffer.push.apply(buffer, result)
    }
    if (buffer.length == 0) {
      filtered = post_list
    }else{
      filtered = [...new Set(buffer)]
    }
    return (
      <div>
        <Container>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <LocationOnIcon />
            </Grid>
            <Grid item>
              <Chip variant="outlined" size="small" label="HICKS" color = {this.state.color1==0? "default":"primary" } onClick={this.handleClick1}/>
            </Grid>
            <Grid item >
              <Chip variant="outlined" size="small" label="LWSN" color = {this.state.color2==0? "default":"primary" } onClick={this.handleClick2} />
            </Grid>
            <Grid item >
              <Chip variant="outlined" size="small" label="PMU" color = {this.state.color3==0? "default":"primary" } onClick={this.handleClick3} />
            </Grid >
            <Grid item>
              <Chip variant="outlined" size="small" label="ECE" color = {this.state.color4==0? "default":"primary" } onClick={this.handleClick4}/>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <FlashOnIcon/>
            </Grid>
            <Grid item>
              <Chip variant="outlined" size="small" label="Level 1" color = {this.state.color5==0? "default":"primary" } onClick={this.handleClick5}/>
            </Grid>
            <Grid item>
              <Chip variant="outlined" size="small" label="Level 2" color = {this.state.color6==0? "default":"primary" } onClick={this.handleClick6}/>
            </Grid>
            <Grid item xs={6}>
              <Chip variant="outlined" size="small" label="Level 3" color = {this.state.color7==0? "default":"primary" } onClick={this.handleClick7}/>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AppsIcon/>
            </Grid>
            <Grid item>
              <Chip variant="outlined" size="small" label="Stationery" color = {this.state.color8==0? "default":"primary" } onClick={this.handleClick8}/>
            </Grid>
            <Grid item>
              <Chip variant="outlined" size="small" label="Commute" color = {this.state.color9==0? "default":"primary" } onClick={this.handleClick9}/>
            </Grid>
            <Grid item>
              <Chip variant="outlined" size="small" label="Living Essentials" color = {this.state.color11==0? "default":"primary" } onClick={this.handleClick11}/>
            </Grid>
            <Grid item xs={6}>
              <Chip variant="outlined" size="small" label="Sports" color = {this.state.color12==0? "default":"primary" } onClick={this.handleClick12}/>
            </Grid>
          </Grid>
        </Container>
        <br />
        <Grid container xs={12} spacing={3}>
        {filtered.map(post=>
          <Grid item xs={4}>
            <Card>
                <CardContent>
                  <Typography variant="h4" component="h2">
                    {post.title}
                  </Typography>
                  <Typography variant= "h5" >
                    {post.content}
                  </Typography>
                  <Typography variant="h6" component="p" color="textSecondary">
                    Borrower: {post.borrower}
                    <br />
                  </Typography>
                  <Typography variant="body1" component="p" color="textSecondary">
                    Estimated Value: {post.price} $
                    <br />
                  </Typography>
                  <Typography variant="h6" component="p" color="textSecondary">
                    Guranrtor: {post.guarantor}
                    <br />
                  </Typography>
                  {this.state.open && (<Box height="auto" overflow="auto">
                      <Text>Comments:</Text>
                    <InfiniteScroll items={post.comments}>

                      {(item) => (
                        <Box
                          flex={false}
                          pad="small"
                          background={"#f5edf1"}
                        >

                        <Tooltip title = {item.nickname}>
                          {this.get_url(item.email) &&  <Avatar size="small" src={this.state.url}  /> }
                        </Tooltip>

                        <Typography variant="h6" component="p" color="textSecondary">
                          {item.nickname} : {item.content}
                          <br />
                        </Typography>
                        <Button size="small" right>Lend from {item.nickname}</Button>
                        </Box>
                      )}
                    </InfiniteScroll>
                  </Box>
                )}
                {this.state.add_cmt && (<Grommet theme={grommet}>
                <FormField >
                  <TextInput placeholder="Enter here:" />
                </FormField>
                <Button size="small" onClick={this.onSubmit}>Submit</Button>
                </Grommet>)}
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={this.onClick_Close}>Lend</Button>
                  <Button size="small" onClick={this.onClick_Open}>Comments</Button>
                  <Button size="small" onClick={this.add_Comment}>Add Comments</Button>
                </CardActions>
            </Card>
          </Grid>
        )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Posts);;
