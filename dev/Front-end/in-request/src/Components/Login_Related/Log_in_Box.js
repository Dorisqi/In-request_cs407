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
    this.on_Change=this.on_Change.bind(this)
  }


  on_Change=event =>{
    const value = event.target.value
    const name = event.target.name
    if(name == "Email"){
      this.setState(state => ({
        Email:value
      }))
    }else if(name =="Password"){
      this.setState(state => ({
        Password:value
      }))
    }
    console.log(name)

  }
  render() {

    return (
      <Grommet theme={grommet}>
        <Box fullWidth fill align="center" pad="large" width="large" background="#f0dde2">
          <Form>
            <FormFieldLabel name="Email" label="E-mail" onChange={this.on_Change} required />
            <FormFieldLabel name="Password" label="Password" onChange={this.on_Change} required />

            <Grommet>
              <Button left type="submit" color="#f5edef" label="Submit" primary />
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
