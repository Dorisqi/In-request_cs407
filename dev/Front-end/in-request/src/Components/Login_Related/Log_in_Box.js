import React from "react";
import { storiesOf } from "@storybook/react";

import { grommet, Box, FormField, Form, Text, Button, Grommet } from "grommet";
const FormFieldLabel = props => {
  const { required, label, ...rest } = props;
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
      required={required}
      {...rest}
    />
  );
};
const coloredButton = {
  button: {

    color: { light: "#f5edef" },
    gap:"medium"
  }
};

class Log_in_Box extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      Email:"",
      Password:"",

    }
    this.on_Change_email=this.on_Change_email.bind(this)
    this.on_Change_pw=this.on_Change_pw.bind(this)

    this.on_Submit=this.on_Submit.bind(this)
  }


  on_Change_email=event =>{
    const value = event.target.value
  //const name = event.target.name
    console.log(value)
    this.props.P_update_email(value)

  }
  on_Change_pw=event =>{
    const value = event.target.value
  //const name = event.target.name
    console.log(value)
    this.props.P_update_pw(value)

  }
  on_Submit=event=>{
    console.log("submit click")
    this.props.P_Submit_func()
  }
  render() {

    return (
      <Grommet theme={grommet}>
        <Box fullWidth fill align="center" pad="large" width="large" background="#f0dde2">
          <Form>
            <FormFieldLabel name="Email" label="E-mail" onChange={this.on_Change_email} required />
            <FormFieldLabel name="Password" label="Password" onChange={this.on_Change_pw} required />

            <Grommet>
              <Button left type="submit" color="#f5edef" label="Submit" primary onClick={this.on_Submit}/>
              <Button plain size="xsmall" color="#8a6e79" label="forget password?" hoverIndicator="true"/>
            </Grommet>
            <Text margin={{ left: "small" }} size="small" color="status-critical">
              * Required Field
            </Text>
          </Form>
        </Box>
      </Grommet>
  );
  }
}


storiesOf("Form", module).add("Required Label", () => <Log_in_Box />);
export {Log_in_Box};
