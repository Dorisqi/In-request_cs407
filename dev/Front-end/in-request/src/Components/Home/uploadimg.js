import React, {Component} from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from  "@material-ui/core/Button";
import {storage} from '../../firebase';
import PersonIcon from '@material-ui/icons/Person';
import PublishIcon from '@material-ui/icons/Publish';
import Avatar from "@material-ui/core/Avatar";
import { makeStyles,withStyles } from '@material-ui/core/styles';
<<<<<<< HEAD
import Tooltip from '@material-ui/core/Tooltip';
=======
import {fdb} from '../../firebase';

>>>>>>> Logout

// const largeAvatar = withStyles(theme => ({
//   root: {
//     width: 200,
//     height: 150,
//     border: `2px solid ${theme.palette.background.paper}`,
//   },
// }))(Avatar);


class Upload extends Component{
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            url: this.props.url,
            imgName:this.props.email
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }


    handleChange = e => {
        if(e.target.files[0]){
            const image = e.target.files[0];
            this.setState(()=>({image}));
            //image = this.state.image;
            const name = 'images/'+ this.props.Email
            console.log(name)
            const uploadtask = storage.ref(name).put(image);
            uploadtask.on('state_changed', (snapshot) => {
                console.log("intheresomewhere")//progress
            },
            (error) => {
              console.log(error);
              alert(error)
            },
            () => {
                //complete

                storage.ref('images').child(this.props.Email).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({url});
                })
                const ref = fdb.collection('users').doc(this.props.Email);
                  ref.set({
                  photostate: true
                  });

            });
        }

    }
    handleUpdate = e => {
        // const {image} = this.state;
        // const uploadtask = storage.ref(`images/${image.name}`).put(image);
        // uploadtask.on('state_changed', (snapshot) => {
        //     console.log("intheresomewhere")//progress
        // }, (error) => {console.log()}, () => {
        //     //complete
        //     storage.ref('images').child(image.name).getDownloadURL().then(url => {
        //         console.log(url);
        //         this.setState({url});
        //     })
        // });
    }

componentWillMount() {
  console.log(this.props.url)
  this.setState({
    url:this.props.url
  })
}

    render(){
        const style = {
            height: '100vh,',
            display: 'flex ',
            flexDirection: 'column',
            alignItems: 'center'
        };
        return (
            <div style={style}>
                <input id="myInput" type="file" ref={(ref) => this.myInput = ref} style = {{display : 'none'}}  onChange={this.handleChange}/>
              <Tooltip title = 'Upload .jpg or .png file'>
                <IconButton onClick={(e) => this.myInput.click() }  >
                    <Avatar src={this.state.url}  />
                </IconButton>
                <label fontSize={30}>{this.props.Nickname}</label>
                </Tooltip>



            </div>
        )
    }
}
export default Upload;
