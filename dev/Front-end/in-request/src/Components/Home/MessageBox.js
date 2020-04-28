import React from 'react';
import Button from '@material-ui/core/Button';
import {fdb,auth,storage} from "../../firebase";
import IconButton from '@material-ui/core/IconButton';
import { withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
/* --- THIS FILE DISPLAY USER'S MESSAGES --- */
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

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msgList:[],
    };
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
  }

  componentDidMount() {
    let userMsgCollection = fdb.collection('users').doc(this.props.curUser).collection('msgBox').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const item = doc.data();
          const new_item = item;
          new_item['id'] = doc.id
          this.setState({
            msgList:[...this.state.msgList, new_item],
          });
        });
      }).catch(err => {
        console.log("Error getting messages", err);
      });
  }
  handleAccept(msgId, postId){
    var userMsg = fdb.collection('users').doc(this.props.curUser).collection('msgBox').doc(msgId);
    userMsg.update({
      needConfirm: false,
      isAccepted: "accepted",
    });
    console.log(postId)
    let reqRef = fdb.collection('requests').doc(postId);
    let updateGuarantor = reqRef.update({guarantor: this.props.curUser});
  }
  handleDecline(msgId, postId){
    var userMsg = fdb.collection('users').doc(this.props.curUser).collection('msgBox').doc(msgId);
    userMsg.update({
      needConfirm: false,
      isAccepted: "declined",
    });
  }
  render() {
    const {msgList} = this.state;
    return (
      <div>
        <Grid container xs={12} spacing={3}>
          {msgList.map(msg=>
            <Grid item xs={6}>
              <Card background={"#ffaa1d"}>
                <CardContent>
                  <Typography variant="h6" component="h6">
                    {msg.fromWho}
                  </Typography>
                  <Typography variant= "h5" spacing={2}>
                    {msg.msgContent}
                  </Typography>
                {msg.needConfirm
                  ?
                  <CardActions>
                  <Button size="small" color="primary"
                    onClick={()=>this.handleAccept(msg.id,msg.postId)}
                  >
                    Accept
                  </Button>
                  <Button size="small" color="primary"
                    onClick={()=>this.handleDecline(msg.id, msg.postId)}
                  >
                    Decline
                  </Button>
                  </CardActions>
                  :
                  [
                    (msg.isAccepted == "accepted"
                      ?
                      <Typography variant = "h6">
                        Accepted
                      </Typography>
                      :
                      <Typography variant = "h6">
                        Declined
                      </Typography>
                      :
                      null
                    ),
                  ]
                }
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme:true})(MessageBox);
