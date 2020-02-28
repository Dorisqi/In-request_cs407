import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles'
import { storiesOf } from "@storybook/react";
import { CircleInformation,FormClose, StatusGood } from "grommet-icons";
import { Box,Form,CheckBox,RangeInput,Select,FormField,Layer,TextInput,
  TextArea,Button,MaskedInput,RadioButtonGroup, Grommet,Grid,Stack, Tab, Tabs, Text } from "grommet";
import { grommet } from "grommet/themes";
import { Attraction, Car, TreeOption } from "grommet-icons";
import TextField from '@material-ui/core/TextField';
import {Log_in_Box} from "./Log_in_Box.js"
import {Sign_up_Box} from "./Sign_up_Box.js"
import { deepMerge } from "grommet/utils";
import {tryBox} from "./tryBox.js"
import { css } from "styled-components";
import "firebase/auth"
import {auth} from "../../firebase";
import {fdb} from "../../firebase";
import {storage} from '../../firebase';
import { Redirect } from 'react-router';
import {withRouter,BrowserRouter, Switch, Route } from "react-router-dom";


//import {Server} from "./server.js"
const customFormFieldTheme ={
  global: {
    font: {
      size: "16px"
    },
    input: {
      weight: 400
    }
  },
  formField: {
    label: {
      color: "dark-3",
      size: "large",
      margin: "xsmall",
      weight: 600
    },
    border: {
      position: "outer",
      side: "all"
    },
    disabled: {
      background: {
        color: "light-3",
        opacity: true
      }
    },

    content: {
      pad: "small"
    },
    error: {
      background: {
        color: "status-critical",
        opacity: "weak"
      }
    },
    margin: 30
  },
  tab: {
    active: {
      background: "dark-1",
      color: "accent-1"
    },

    border: undefined,
    color: "white",
    hover: {
      background: "dark-1"
    },
    margin: undefined,
    pad: {
      bottom: undefined,
      horizontal: "small"
    },
    extend: ({ theme }) => css`
      border-radius: ${theme.global.control.border.radius};
      box-shadow: ${theme.global.elevation.light.small};
    `
  }
};
// const RichTabTitle = ({ icon, label }) => (
//   <Box direction="row" align="center" gap="xsmall" margin="xsmall">
//     {icon}
//     <Text size="small">
//       <strong>{label}</strong>
//     </Text>
//   </Box>
// );





class Login extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      Email:"",
      Password:"",
      Nickname:"",
      auth: this.auth,
      fdb: this.fdb,
      name:"",
      index:0,
      tab_f:0,
      success_open:false,
      url:"",
      hasPhoto:false



    }

    this.on_Login=this.on_Login.bind(this)
    this.on_Signup=this.on_Signup.bind(this)
    this.update_Pw=this.update_Pw.bind(this)
    this.update_Email=this.update_Email.bind(this)
    this.update_Nickname=this.update_Nickname.bind(this)
    this.onActive=this.onActive.bind(this)
    this.onClose=this.onClose.bind(this)
  }


  on_Login=event =>{
    //console.log(this.state.Email)
    const email = this.state.Email
    const ps = this.state.Password
    auth.signInWithEmailAndPassword(email, ps).then(error => {
  // log-in successful.
    const ref = fdb.collection('users').doc(email);
    ref.get().then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        if(auth.currentUser.emailVerified){
          ref.update({
            LoginState: true
          }).then(() => {
            console.log('login successful');
            // console.log(this.props.history)
            //get user image
            storage.ref('images').child(this.state.Email).getDownloadURL().then(url => {
                //console.log(url);
                this.setState({url:url});
                if(url.length != 0){
                  this.setState({
                    hasPhoto: true
                  })
                }
                const data = doc.data()

                this.props.history.push({
                  pathname:"/posts",
                  state:{
                    Email:this.state.Email,
                    Nickname:data.nickname,
                    auth:this.auth,
                    url:url,
                    hasPhoto:data.photostate

                  }
                });

            }).catch(error =>{
              const data = doc.data()

              this.props.history.push({
                pathname:"/posts",
                state:{
                  Email:this.state.Email,
                  Nickname:data.nickname,
                  auth:this.auth,
                  url:"",
                  hasPhoto:data.photostate

                }
              });

            });
            //console.log(this.state.url);
            // this.props.history.push({
            //   pathname:"/posts",
            //   state:{
            //     Email:this.state.Email,
            //     Nickname:this.state.Nickname,
            //     auth:this.auth,
            //     url:this.state.url
            //
            //   }
            // });
          });
        }else{
          alert("Email is not verified")
        }
        // console.log(auth.currentUser.emailVerified)

      }
    }).catch(error => {
      // An error happened.
      alert(error)
      console.log('Error logging in', error);
      //console.log(error)
      // alert(error)
      // this.setState(state => ({
      //   success_open:true
      // }))
      // console.log(error.message)
      //this.props.history.push("/login");
    });
  }).catch(err => {
    // An error happened.
    alert(err)
    console.log('Error logging in', err);
  });
  }

  on_Signup=event =>{
    //console.log(this.state.Email)
    const email = this.state.Email
    const ps = this.state.Password
    const nickname=this.state.Nickname
    console.log("in signuup")

    auth.createUserWithEmailAndPassword(email, ps).then(error => {
  // log-in successful.
    const ref = fdb.collection('users').doc(email);
      ref.set({
        nickname: nickname, email: email,
        LoginState: true, photostate: false
      });
      var user = auth.currentUser;
      user.sendEmailVerification().then(function() {
        // Email sent.
        //console.log("varification")
      }).catch(function(error) {
        // An error happened.
        console.log(error)
        alert(error)
        //alert(console.error())
      });
      ref.get().then(doc => {
        const data = doc.data()
        this.setState({
          Nickname:data.nickname
        })
      }).catch(error => {
        // An error happened.
        alert(error)
        console.log('Error sign up', error);

      });


      this.props.history.push({
        pathname:"/posts",
        state:{
          Email:this.state.Email,
          Nickname:this.state.Nickname,
          auth:this.auth,
          url:"",
          hasPhoto:false

        }
      });
      console.log('signup successful');
    }).catch(err => {
      // An error happened.
      alert(err)
      console.log('Error sign up', err);
    });



  }

  update_Email(value){


      this.setState(state => ({
        Email:value
      }))

  }
  update_Pw(value){
      this.setState(state => ({
        Password:value
      }))
    //console.log(value)
  }
  update_Nickname(value){
      this.setState(state => ({
        Nickname:value
      }))
    //console.log(value)
  }

  onActive=event=>{

    //console.log(nextIndex)
    const value = this.state.index == 0? 1:0
    this.setState({ index: value })
  }
onClose=event=>{
  this.setState({ success_open: true })
}



  render() {
    return (
      <Grommet theme={deepMerge(grommet, customFormFieldTheme)}>


        <Box
          direction="column"
          pad="fill"
        >
            <Box right pad="380px" background="#d1bec3">
              <Box right width="90%" height="80%" pad="{{ left: 'large', right: 'large' }}" >


              <Tabs color="#d1bec3" activeIndex={this.state.index} onActive={this.onActive}>
              <Tab
                title={
                  <Box direction="row" align="center" gap="xsmall" margin="xsmall">
                    <Text size="small">
                      <strong>LOG IN</strong>
                    </Text>
                  </Box>
                }
              >
                <Log_in_Box
                P_update_pw={this.update_Pw}
                P_update_email={this.update_Email}
                P_Submit_func={this.on_Login}
                auth={this.auth}/>
                {this.state.success_open && (
                <Layer
                  position="bottom"
                  modal={false}
                  margin={{ vertical: "medium", horizontal: "small" }}
                  onEsc={this.onClose}
                  responsive={false}
                  plain
                >
                  <Box
                    align="center"
                    direction="row"
                    gap="small"
                    justify="between"
                    round="medium"
                    elevation="medium"
                    pad={{ vertical: "xsmall", horizontal: "small" }}
                    background="#bfdbbf"
                  >
                    <Box align="center" direction="row" gap="xsmall">
                      <StatusGood />
                      <Text>Login Successful</Text>
                    </Box>
                    <Button icon={<FormClose />} onClick={this.onClose} plain />
                  </Box>
                </Layer>
              )}
              </Tab>
              <Tab
                title={
                  <Box direction="row" align="center" gap="xsmall" margin="xsmall">
                    <Text size="small">
                      <strong>SIGN UP</strong>
                    </Text>
                  </Box>
                }
              >
                <Sign_up_Box
                P_update_pw={this.update_Pw}
                P_update_email={this.update_Email}
                P_Submit_func={this.on_Signup}
                P_update_nickname={this.update_Nickname}/>
              </Tab>
              </Tabs>
            </Box>
          </Box>
        </Box>
      </Grommet >
  );
  }
}

export default withRouter(Login);
