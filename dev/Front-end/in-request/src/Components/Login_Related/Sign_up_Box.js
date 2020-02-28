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
    this.on_Change_email=this.on_Change_email.bind(this)
    this.on_Change_nickname=this.on_Change_nickname.bind(this)
    this.on_Change_pw1=this.on_Change_pw1.bind(this)
    this.on_Change_pw2=this.on_Change_pw2.bind(this)
    this.on_Submit=this.on_Submit.bind(this)
  }

  on_Change_email=event =>{
    const value = event.target.value
    console.log(value)
    this.props.P_update_email(value)

  }

  on_Change_pw1=event =>{
    const value = event.target.value
    const compare=this.state.Password2
    this.setState({
      Password1:value
    })
    this.props.P_update_pw(value)

  }
  on_Change_pw2=event =>{
    const value = event.target.value
    this.setState({
      Password1:value
    })
  }
  on_Change_nickname=event =>{
    const value = event.target.value
    this.props.P_update_nickname(value)

  }

  on_Submit=event=>{
    //console.log("submit click")
    if(this.state.Password1 == this.state.Password2){
      this.props.P_Submit_func()

    }else{
      alert("password not match")
    }
  }

  render() {

    return (
      <Grommet theme={grommet}>
        <Box fullWidth fill align="center" pad="large" width="large" background="#f0dde2">
          <Form>
            <FormFieldLabel name="email" label="E-mail" onChange={this.on_Change_email} required />
            <FormFieldLabel name="nickname" label="Nickname" onChange={this.on_Change_nickname} required />
            <FormFieldLabel type="password" name="password" label="Password" onChange={this.on_Change_pw1} required />
            <FormFieldLabel name="Password" type="password" label="Password" onChange={this.on_Change_pw2} required />
            <Button type="submit" color="#f5edef" label="Sign Up" primary onClick={this.on_Submit}/>
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
