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
    this.on_Change_pw=this.on_Change_pw.bind(this)
    this.on_Submit=this.on_Submit.bind(this)
  }

  on_Change_email=event =>{
    const value = event.target.value
    console.log(value)
    this.props.P_update_email(value)

  }
  on_Change_pw=event =>{
    const value = event.target.value
    this.props.P_update_pw(value)

  }
  on_Change_nickname=event =>{
    const value = event.target.value
    this.props.P_update_nickname(value)

  }


  // on_Change=event =>{
  //   const value = event.target.value
  //   const name = event.target.name
  //   console.log( name)
  //   if(name == "email"){
  //     this.setState(state => ({
  //       Email:value
  //     }))
  //     this.props.P_update_email(value)
  //   }else if(name =="password"){
  //     this.setState(state => ({
  //       Password:value
  //     }))
  //     this.props.P_update_pw(value)
  //   }else if (name =="nickname") {
  //     this.setState(state => ({
  //       Nickname:value
  //     }))
  //   }
  //   this.props.P_update_nickname(value)
  //   //console.log(name)
  // }
  on_Submit=event=>{
    //console.log("submit click")
    this.props.P_Submit_func()
  }

  render() {

    return (
      <Grommet theme={grommet}>
        <Box fullWidth fill align="center" pad="large" width="large" background="#f0dde2">
          <Form>
            <FormFieldLabel name="email" label="E-mail" onChange={this.on_Change_email} required />
            <FormFieldLabel name="nickname" label="Nickname" onChange={this.on_Change_nickname} required />
            <FormFieldLabel type="password" name="password" label="Password" onChange={this.on_Change_pw} required />
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
