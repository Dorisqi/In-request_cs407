import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react";
import { CircleInformation, Currency } from "grommet-icons";
import { Box,Form,CheckBox,RangeInput,Select,FormField,
  TextArea,Button,MaskedInput,RadioButtonGroup, Grommet,Grid,Stack, Tab, Tabs, Text, TextInput } from "grommet";
import { grommet } from "grommet/themes";
import { Attraction, Car, TreeOption } from "grommet-icons";
import TextField from '@material-ui/core/TextField';
import { deepMerge } from "grommet/utils";
// import {Log_in_Box} from "./Log_in_Box.js";
// import {Sign_up_Box} from "./Sign_up_Box.js";

import { css } from "styled-components";


class FormFieldLabel extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      value:"",


    }

    this.onChange=this.onChange.bind(this)
  }

  onChange=event=>{
    const value= event.target.value
    this.propTypes.P_update_value(value)
  }

  render(){
    const { required, label, ...rest } = this.props;
    return (

      <FormField
        label={
          required ? (
            <Box direction="row">
              <Text>{label}</Text>
              <Text color="status-critical">*</Text>
            </Box>
          ) : (
            label
          )
        }
        onChange={this.onChange}
        required={required}
        {...rest}
      />

    );

  }


}

export  {FormFieldLabel};
