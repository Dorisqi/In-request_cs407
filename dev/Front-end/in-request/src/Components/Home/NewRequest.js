import React, { Fragment, useState , Component} from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
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
        color1:"default",
      };
      // This binding is necessary to make `this` work in the callback
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleDescription = this.handleDescription.bind(this);
      this.handleValue = this.handleValue.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.handleClick = this.handleClick.bind(this);
  }
  handleNameChange = event => {
    const name_val = event.target.value;
    this.setState(state => ({
      itemName: name_val
    }));
  }

  handleDescription = event => {
    const description_val = event.target.value;
    this.setState(state =>({
      description: description_val
    }));

  }

  handleValue = event => {
    const estimate_val = event.target.value;
    if (!Number(estimate_val)) {
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
  onFormSubmit(e) {
    e.preventDefault();
    console.log(this.state.returnDate)
  }
  handleClick = (event) => {
    const color1_val  = this.state.color1 == "default" ? "primary" : "default"
    this.setState({ color: color1_val })
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
              <Chip variant="outlined" size="small" label="HICKS" color = {this.state.color1} onClick={(event) => this.handleClick(event)}>hicks </Chip>
            </Grid>
            <Grid item >
              <Chip variant="outlined" size="small" label="LWSN" color = {this.state.color2} onClick={(event) => this.handleClick(event)} />
            </Grid>
            <Grid item >
              <Chip variant="outlined" size="small" label="PMU" color = {this.state.color3} onClick={(event) => this.handleClick(event)} />
            </Grid >
            <Grid item>
              <Chip variant="outlined" size="small" label="ECE" color = {this.state.color4} onClick={(event) => this.handleClick(event)}/>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <FlashOnIcon/>
            </Grid>
            <Grid item>
              <Chip variant="outlined" size="small" label="Level 1" color = {this.state.color5} onClick={(event) => this.handleClick(event)} />
            </Grid>
            <Grid item>
              <Chip variant="outlined" size="small" label="Level 2" color = {this.state.color6} onClick={(event) => this.handleClick(event)}/>
            </Grid>
            <Grid item>
              <Chip variant="outlined" size="small" label="Level 3" color = {this.state.color7} onClick={(event) => this.handleClick(event)}/>
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
               / >
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
            <Grid item xs={1}>
              <TodayIcon/>
            </Grid>
            <Grid item xs={6}>
              <form onSubmit={ this.onFormSubmit }>
                  <DatePicker
                      selected={ this.state.returnDate }
                      onChange={ this.handleDateChange }
                      name="startDate"
                      dateFormat="MM/dd/yyyy"
                      placeholderText="Click to select a date"
                      minDate={subDays(new Date(), 0)}
                  />
              </form>
            </Grid>
            <Grid item>
              <Button variant="contained">SUBMIT!</Button>
            </Grid>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}
export default withStyles(styles, {withTheme: true})(NewRequest);
