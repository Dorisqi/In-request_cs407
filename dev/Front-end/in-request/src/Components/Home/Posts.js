import React, { Fragment, Component } from 'react';
import {fdb,auth,storage} from "../../firebase";
import { withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
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
import { grommet,RadioButtonGroup,Grommet,FormField,TextInput,InfiniteScroll,Box,Text} from "grommet";
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from "@material-ui/core/Avatar";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


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
      curPost:"",
      open: false,
      guarantor: "",
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
      add_cmt:0,
      content:"",
      photo_map:[],
      user_email:this.props.Email,
      user_nickname:this.props.Nickname,
      visibility:'public'
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
    this.onClick_Open_Comment = this.onClick_Open_Comment.bind(this);
    this.get_url=this.get_url.bind(this)
    this.onClick_Open_Addcmt=this.onClick_Open_Addcmt.bind(this)
    this.on_Submit=this.on_Submit.bind(this)
    this.on_Change_content=this.on_Change_content.bind(this)
    this.delete_Comment=this.delete_Comment.bind(this)
    this.onclickLend=this.onclickLend.bind(this)
    this.print_data=this.print_data.bind(this)
    this.handleGuarantor = this.handleGuarantor.bind(this);
    this.onSubmitGuarantor = this.onSubmitGuarantor.bind(this)
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.set_Visibility=this.set_Visibility.bind(this)
  }
  componentDidMount() {
    let requests_collection = fdb.collection('requests');
    let all_requests = requests_collection.where('status', '==', 'active').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const item = doc.data();
          const new_item = item
          new_item['id']=doc.id
          //console.log(new_item)
          new_item['comment_flag']=false
          new_item['addcmt_flag']=false
          new_item['is_public'] = true
          this.setState({
              post_list: [...this.state.post_list, new_item],
          });
        });
      }).catch(err => {
        console.log('Error getting documents', err);
      });

      //store all image info:
      let photo_dic={}
      let user_collection = fdb.collection('users');
      fdb.collection('users').where('photostate','==',true).get().then(snapshot => {
          snapshot.forEach(doc => {
            const item = doc.data();
            const email = item.email
            //get url from firebase storage by user email
            storage.ref('images').child(email).getDownloadURL().then(url => {
                photo_dic[email]=url
                this.setState({photo_map:photo_dic})
            }).catch(err => {
              console.log('Error getting image', err);
              photo_dic[email]=""
            });

            ////////geting url finish

          });
        }).catch(err => {
          console.log('Error getting documents', err);
        });


  }

  onClick_Open_Comment(postid){
    const post = this.state.post_list.filter(obj =>(obj.id.includes(postid)))[0]
    const status = post.comment_flag==true ? false:true
    this.setState({post_list:this.state.post_list.map(el => (el.id === postid ? {...el, comment_flag:status} : el))})
  }
  onClick_Open_Addcmt(postid){
    const post = this.state.post_list.filter(obj =>(obj.id.includes(postid)))[0]
    const status = post.addcmt_flag==true ? false:true
    this.setState({post_list:this.state.post_list.map(el => (el.id === postid ? {...el, addcmt_flag:status} : el))})
  }
  handleClose = event => {
    this.setState({open: false})
  }
  handleClickOpen(postId){
    this.setState({
      open: true,
      curPost: postId,
    })

  }
  handleGuarantor = event => {
    const guarantor_email = event.target.value;
    this.setState(state => ({
      guarantor: guarantor_email
    }));
  }
  onSubmitGuarantor = event => {
    if (this.state.guarantor== this.props.Email) {
      alert("Cannot add yourself as guarantor.")
      return;
    }
      const postid = this.state.curPost;
      console.log("180: " + postid)
      const fromP = this.props.Email;
      const ref  = fdb.collection('users').doc(this.state.guarantor);
        ref.get().then(function(doc) {
          if(doc.exists) {
            //send invitaiton to this user
            let msgRef = ref.collection('msgBox').add({
                postId: postid,
                fromWho: fromP,
                isRead: false,
                msgContent: fromP + " would like to invite you as a guarantor",
                needConfirm: true,
                isAccepted: false,
            }).then(ref =>{
              console.log("added document with id: " + ref.id);
              alert("Successfully sent invitation!")
            }).catch(err => {
              // An error happened.
              console.log('Error send invitation', err);
            });
          }else{
            alert("No such user exists!");
          }
        })
  }

  print_data=event=>{
    console.log(this.state.post_list)
  }

  onclickLend(post, item){
  var user = auth.currentUser;
  var upd = fdb.collection("requests").doc(post.id);
  upd.update({
    msaccepted:true,
    lender: item.email,
  })
}

  // update_post(ref){
  //   console.log("update_post id",ref.id);
  //   console.log("commenis:",this.state.temp_comments)
  //
  //   const new_post=this.state.post_list.map(ele => (ele.id === ref.id ? {comments:this.state.temp_comments} : ele))
  //   // this.setState({
  //   //     post_list: this.state.post_list.map(el => (el.id === ref.id ? {...el, comments} : el))
  //   //   });
  //
  //   console.log("after setstate:",this.state.post_list)
  //   return this.setState({
  //     post_list:new_post
  //   });
  //
  // }

  delete_Comment(content,email,postid){
    let new_comment_list=[];
    const post = this.state.post_list.filter(obj =>(obj.id.includes(postid)));
    const old_comments=post[0].comments;

    let new_comments=[];
    let i = 0
    while(i < old_comments.length){
      if((old_comments[i].content ===content)&&(old_comments[i].email === email)){
      }else{
        new_comments.push(old_comments[i])
      }
      i=i+1;
    }

    console.log("delete post info",new_comments)
          //new_cmts=doc.data().comments
    this.setState({
        post_list: this.state.post_list.map(el => (el.id === postid ? {...el, comments:new_comments} : el))
      });

    fdb.collection('requests').doc(postid).update({
        comments:new_comments
      });



  }
  on_Submit(ref){
    //console.log(ref)
    //let document =
    let old=""
    const converted_visibility= ref.is_public
    let new_comment={
      email:this.props.Email,
      nickname:this.props.Nickname,
      content:this.state.content,
      is_public:converted_visibility
    }
    let new_cmts=[]
    //const component = this
    fdb.collection('requests').doc(ref.id).get().then(doc=> {

          console.log("Document data:", doc.data());
          old = doc.data()
          //new_cmts=doc.data().comments

          if( doc.data().comments==null  || doc.data().comments.length==0){
            new_cmts=[new_comment]
          }else{

            new_cmts = doc.data().comments.concat(new_comment)
          }
          console.log("new comment:",new_cmts)

          this.setState({
              post_list: this.state.post_list.map(el => (el.id === ref.id ? {...el, comments:new_cmts} : el))
            });
          console.log(new_cmts);
          fdb.collection('requests').doc(ref.id).update({
              comments:new_cmts,
              //msoffered: true
          });
          var useremail = auth.currentUser.email;
          fdb.collection('requests').doc(ref.id).get().then(function(doc) {
            if (doc.exists) {
              if(doc.data().borrower != useremail){
                fdb.collection('requests').doc(ref.id).update({
                  msoffered: 1,
                });
              }
            }
          });


    }).catch(function(error) {
      console.log("Error getting document:", error);
    });

    return
  }

  on_Change_content=event=>{
    const value= event.target.value
    console.log(value)
    this.setState({content:value})
  }

  set_Visibility(postid,newvalue){
    const new_value=newvalue =='public'? true : false
    console.log(new_value);
    this.setState({
        post_list: this.state.post_list.map(el => (el.id === postid ? {...el, is_public:new_value} : el))
      });
    this.setState({visibility:new_value})

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
    let url_=""
    //console.log(storage.ref('images').child(email).getDownloadURL())
    storage.ref('images').child(email).getDownloadURL().then(url => {
        console.log(url)
        url_=url
        console.log(url)
        return url
    }).catch(err => {
      this.setState({url:""})
      console.log('Error getting image', err);

    });
    // console.log(url_)
    return url_
  }

  render() {
    const{classes} = this.props
    const {post_list, color1,color2,color3,color4,color5,color6,color7,color8,color9,color11,color12} = this.state
    const Email=this.props.Email
    const Nickname=this.props.Nickname
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
          <Fragment>
            <Grid item xs={4}>
              <Card background={"#f5edf1"}>
                  <CardHeader
                    title={post.title}
                    subheader={post.borrower}
                    action={
                      post.guarantor
                      ?
                      <Icon fontSize="large">
                        <VerifiedUserIcon style={{fill: "green", fontSize: 25}}/>
                      </Icon>
                      :
                      null
                    }
                  />
                  <CardContent>
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
                    <Box height="auto" overflow="auto">

                    {(post.comment_flag) && (<InfiniteScroll items={post.comments}>

                        {item => (

                           (item.is_public ||
                             (!item.is_public && (item.email==post.borrower||item.email==Email)))
                             ?
                             (<Box
                            flex={false}
                            pad="small"
                            background={"#f5edf1"}
                          >

                          <Tooltip title = {item.nickname}>
                            <Avatar size="small" src={this.state.photo_map[item.email]}/>
                          </Tooltip>

                          <Typography variant="h6" component="p" color="textSecondary">
                            {item.nickname} : {item.content}
                            <br />
                          </Typography>
                          {(this.props.Email == post.borrower) && (this.props.Email!=item.email)&&
                             (<Button size="small" onClick={()=>this.onclickLend(post, item)}>Borrow from {item.nickname}</Button>
                           )}

                           {(this.props.Email==item.email)&&
                              (<Button size="small" onClick={()=>this.delete_Comment(item.content,item.email,post.id)} >Delete above comment</Button>
                            )}

                             </Box>):(<Box/>)
                        )}

                      </InfiniteScroll>)}
                    </Box>

                  {(post.addcmt_flag)&&(<Grommet theme={grommet}>

                  <FormField >
                    <TextInput onChange={this.on_Change_content} placeholder="Add Comments here:" />
                  </FormField>

                  <FormControl component="fieldset">
                    <RadioGroup row aria-label="visibility" name="visibility" value={post.is_public==true ? 'public':'private' } onChange={(event) => this.set_Visibility(post.id,event.target.value)}>
                      <FormControlLabel value="public" control={<Radio />} label="Public" />
                      <FormControlLabel value="private" control={<Radio />} label="Private" />
                    </RadioGroup>
                  </FormControl>
                  <Button size="small" onClick={()=>this.on_Submit(post)}>Submit</Button>

                  </Grommet>)}
                  </CardContent>
                  <CardActions>

                    <Button size="small" onClick={()=>this.onClick_Open_Comment(post.id)}>Open/Close Comments</Button>
                    <Button size="small" onClick={()=>this.onClick_Open_Addcmt(post.id)}>Add Comments</Button>
                    {(this.props.Email == post.borrower) && (!post.guarantor)
                      ?
                      <Button size="small" onClick={()=>this.handleClickOpen(post.id)}> Add guarantor</Button>
                      :
                      null
                    }
                  </CardActions>
              </Card>
            </Grid>
            <Dialog open={this.state.open} onClose={this.handleClose}>
              <DialogTitle id="form-dialog-title">Guarantor</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  You do not have any guarantors at this point. To add one, please fill out a valid user email below.
                </DialogContentText>
                <Grid container alignItems="flex-end">
                  <Grid item xs={1}>
                    <AccountCircle/>
                  </Grid>
                  <Grid item xs={true}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="guarantor_email"
                      name="guarantor"
                      label="Add guarantor..."
                      fullWidth
                      value = {this.state.guarantor}
                      onChange = {this.handleGuarantor}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.onSubmitGuarantor} color="primary">
                  Add
                </Button>
              </DialogActions>
          </Dialog>
          </Fragment>
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Posts);;
