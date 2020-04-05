import React, { Fragment, useState , Component} from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import subDays from "date-fns/subDays";
import TitleIcon from '@material-ui/icons/Title';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import DescriptionIcon from '@material-ui/icons/Description';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TodayIcon from '@material-ui/icons/Today';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import Button from '@material-ui/core/Button';
import './NewRequest.css'
import {fdb} from "../../firebase";
import AppsIcon from '@material-ui/icons/Apps';
import TimerIcon from '@material-ui/icons/Timer';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  root: {
		width: 600,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
});
class NewRequest extends Component {
  constructor(props) {
      super(props)
      this.state = {
        itemName: "",
        description: "",
        estimateVal: "",
        returnDate: new Date(),
        durationTime: new Date(),
        tagList: [],
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
      };
      // This binding is necessary to make `this` work in the callback
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleDescription = this.handleDescription.bind(this);
      this.handleValue = this.handleValue.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handleDurationChange = this.handleDurationChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
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
      this.onSubmitRequest = this.onSubmitRequest.bind(this);
  }
  handleNameChange = event => {
    const name_val = event.target.value;
    this.setState(state => ({
      itemName: name_val
    }));
  }

  handleDescription = event => {
    const description_val = event.target.value;
    if (description_val.length == 280){
      alert("Description cannot be longer than 280")
    }
    this.setState(state =>({
      description: description_val
    }));

  }

  handleValue = event => {
    const estimate_val = event.target.value;
    if (!Number(estimate_val) && estimate_val.length > 0) {
      alert("Numbers Only");
      return;
    }
    this.setState(state => ({
      estimateVal: estimate_val
    }));
  }
  handleDateChange(date) {
     this.setState({
       returnDate: date
     })
  }
  handleDurationChange(date) {
    this.setState({
      durationTime: date
    })
  }
  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.returnDate)
  }
  onSubmitRequest = event => {
    //console.log(this.state.Email)
    const ref = fdb.collection('users').doc(this.props.Email);
      ref.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          if (doc.data().photostate === false) {
            alert("Please upload ID photo first!")
            return;
          }
          //console.log(old.comments)
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
      }).catch(function(error) {
      console.log("Error getting document:", error);
      });

    const itemName = this.state.itemName
    const description = this.state.description
    const estimateVal = this.state.estimateVal
    const returnDate = this.state.returnDate
    const durationTime = this.state.durationTime
    if (this.state.color1 == 1) {
      this.state.tagList.push("HICKS")
    }
    if (this.state.color2 == 1) {
      this.state.tagList.push("LWSN")
    }
    if (this.state.color3 == 1) {
      this.state.tagList.push("PMU")
    }
    if (this.state.color4 == 1) {
      this.state.tagList.push("ECE")
    }
    if(this.state.color5 == 1) {
      this.state.tagList.push("LEVEL1")
    }
    if(this.state.color6 == 1) {
      this.state.tagList.push("LEVEL2")
    }
    if(this.state.color7 == 1) {
      this.state.tagList.push("LEVEL3")
    }
    if(this.state.color8 == 1) {
      this.state.tagList.push("Stationery")
    }
    if(this.state.color9 == 1) {
      this.state.tagList.push("Commute")
    }
    if(this.state.color11 == 1) {
      this.state.tagList.push("Living Essentials")
    }
    if(this.state.color12 == 1) {
      this.state.tagList.push("Sports")
    }
    if(estimateVal > 50) {
      alert("Currently unable to borrow property more than 50 dollars");
      return;
    }
    const listoftags = this.state.tagList
    let addDoc = fdb.collection('requests').add({
      title: itemName,
      content: description,
      price: estimateVal,
      estReturn: returnDate,
      drTime: durationTime,
      taglist: listoftags,
      borrower: this.props.Email,
      comments:[],
      msnone:true,
      msoffered:false,
      msaccepted: false,
      msstarted: false,
      msfinished: false,
      startb: false,
      startl:false,
      endb:false,
      endl:false,
      lender:"",
      status:"active"
    }).then(ref =>{
      console.log('Added document with ID: ', ref.id);
      alert("Add new request successful")
    }).catch(err => {
      // An error happened.
      console.log('Error making a request', err);
    });
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

    const value = this.state.color4 ==1? 0:1
    this.setState({ color4: value})
  }
  handleClick5=event=>{

    const value = this.state.color5==1? 0:1
    this.setState({
      color5: value,
      color6: 0,
      color7: 0,
    })
  }
  handleClick6=event=>{
    const value = this.state.color6 ==1? 0:1
    this.setState({
      color6: value,
      color5: 0,
      color7:0,

    })
  }
  handleClick7=event=>{
    const value = this.state.color7 ==1? 0:1
    this.setState({
      color7: value,
      color5: 0,
      color6: 0,
    })
  }
  handleClick8=event=>{
    const value = this.state.color8==1?0:1
    this.setState({color8: value})
  }
  handleClick9=event=>{
    const value = this.state.color9==1?0:1
    this.setState({color9: value})
  }
  handleClick11=event=>{
    const value = this.state.color11==1?0:1
    this.setState({color11: value})
  }
  handleClick12=event=>{
    const value = this.state.color12==1?0:1
    this.setState({color12: value})
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <Container>
          <Typography variant="h2" gutterBottom color="textPrimary">
            Make A Request
          </Typography>
        </Container>
        <CssBaseline />
        <Container>
          <br />
          <br />
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
            <Grid item>
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
          <br />
          <br />
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <TitleIcon />
            </Grid>
             <Grid item>
             <TextField
               required
               id="item_Name"
               name="itemName"
               label="Title"
               fullWidth
               value = {this.state.itemName}
               onChange = {this.handleNameChange}
               />
              </Grid>
          </Grid>
          <br />
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <DescriptionIcon />
            </Grid>
            <Grid item xs={10}>
              <TextField
                required
                id="description"
                name="description"
                label="Description"
                multiline
                rows={2}
                rowsMax={12}
                fullWidth
                value = {this.state.description}
                onChange = {this.handleDescription}
                inputProps={{ maxLength: 280 }}
              />
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <AttachMoneyIcon />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                id="estimate_Val"
                name="estimateVal"
                label="Estimate Value"
                value = {this.state.estimateVal}
                onChange = {this.handleValue}
                rows={1}
              />
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <TodayIcon/>
            </Grid>
            <Grid item xs={2}>
                  <DatePicker
                      selected={ this.state.returnDate }
                      onChange={ this.handleDateChange }
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={30}
                      timeCaption="time"
                      name="startDate"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      placeholderText="Click to select a date"
                      minDate={subDays(new Date(), 0)}
                  />
            </Grid>
            <Grid item>
              <p>
                Please select your execpted return time
              </p>
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <TimerIcon />
            </Grid>
            <Grid item xs={2}>
                  <DatePicker
                      selected={ this.state.durationTime }
                      onChange={ this.handleDurationChange }
                      name="durationDate"
                      dateFormat="MMMM d, yyyy"
                      placeholderText="Click to select a date"
                      minDate={subDays(new Date(), 0)}
                  />
            </Grid>
            <Grid item xs={8}>
              <p>
                Please select duration time of your post
              </p>
            </Grid>
            <Grid item>
              <Button variant="contained"
                onClick={this.onSubmitRequest}
                disabled={!this.state.itemName || !this.state.description || !this.state.estimateVal}
              >
                SUBMIT!
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}
export default withStyles(styles, {withTheme: true})(NewRequest);
