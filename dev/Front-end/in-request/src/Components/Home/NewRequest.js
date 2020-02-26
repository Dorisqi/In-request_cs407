import React, { Fragment, useState , Component} from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from "@material-ui/core/styles";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
});
class NewRequest extends Component {
  constructor(props) {
      super(props)
      this.state = {
        itemName: "",
        description: "",
        estimateVal: "",
        returnDate: new Date(),
      };
      // This binding is necessary to make `this` work in the callback
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleDescription = this.handleDescription.bind(this);
      this.handleValue = this.handleValue.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
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
  /*--- Still need a submit function---*/
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Typography variant="h4" gutterBottom>
          Make A Request
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} >
            <TextField
              required
              id="item_Name"
              name="itemName"
              label="Item"
              fullWidth
              value = {this.state.itemName}
              onChange = {this.handleNameChange}
            / >
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <br />
        </Grid>
        <br />
        <form onSubmit={ this.onFormSubmit }>
            <div className="form-group">
              <DatePicker
                  selected={ this.state.returnDate }
                  onChange={ this.handleDateChange }
                  name="startDate"
                  dateFormat="MM/dd/yyyy"
              />
            </div>
        </form>
      </Fragment>
    );
  }
}
export default withStyles(styles, {withTheme: true})(NewRequest);
