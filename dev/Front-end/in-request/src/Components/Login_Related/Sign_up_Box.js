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
class Sign_up_Box extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      Email:"",
      Password:"",
      Nickname:"",

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
    }else if (name =="Nickname") {
      this.setState(state => ({
        Nickname:value
      }))
    }
    console.log(name)

  }

  render() {

    return (
      <Grommet theme={grommet}>
        <Box fullWidth fill align="center" pad="large" width="large" background="#f0dde2">
          <Form>
            <FormFieldLabel name="email" label="E-mail" onChange={this.on_Change} required />
            <FormFieldLabel name="Nickname" label="Nickname" onChange={this.on_Change} required />
            <FormFieldLabel name="password" label="Password" onChange={this.on_Change} required />
            <Button type="submit" color="#f5edef" label="Submit" primary />
            <Text margin={{ left: "small" }} size="small" color="status-critical">
              * Required Field
            </Text>
          </Form>
        </Box>
      </Grommet>
  );
  }
}


storiesOf("Form", module).add("Required Label", () => <Sign_up_Box />);
export {Sign_up_Box};
