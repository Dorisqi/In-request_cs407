import React, { Fragment, useState , Component} from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from "@material-ui/core/styles";

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
      super(props);
      this.state={ date : new Date()};
  }
  handleChange(e, date) {
   this.setState({date: date})
  }
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
              id="itemName"
              name="itemName"
              label="Item"
              fullWidth
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="estimateVal"
              name="estimateVal"
              label="Estimate Value"
              rows={1}
            />
          </Grid>
          <br />
          <form className={classes.container} noValidate>
            <TextField
              id="returnTime"
              label="Estimated Return Time"
              type="returnTime"
              defaultValue={this.state.date}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </Grid>
      </Fragment>
      );
  }
}
export default withStyles(styles, {withTheme: true})(NewRequest);
