import React from "react";
import { storiesOf } from "@storybook/react";
import {auth} from "../../firebase";
import { grommet, Box, FormField, Form, Text, Button, Grommet, Layer,
  TextArea,
  TextInput } from "grommet";
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
      Password1:"",
      Password2:"",
      Open:false,

    }
    this.on_Change_email=this.on_Change_email.bind(this)
    this.on_Change_pw=this.on_Change_pw.bind(this)
    this.on_Change = this.on_Change.bind(this)
    this.on_Submit=this.on_Submit.bind(this)
    this.onOpen =this.onOpen.bind(this)
    this.on_Reset=this.on_Reset.bind(this)
    this.onClose=this.onClose.bind(this)
  }


  on_Change_email=event =>{
    const value = event.target.value
    this.setState(state => ({
      Email:value
    }))
    //console.log(value)
    this.props.P_update_email(value)

  }
  on_Change=event=>{
    const value = event.target.value
    //console.log(value)
    this.setState(state => ({
      Email:value
    }))
  }
  on_Change_pw=event=>{
    const value = event.target.value
    this.props.P_update_pw(value)
  }


  on_Submit=event=>{
    //console.log("submit click")
      this.props.P_Submit_func()


  }
  onOpen=event=>{
    this.setState({
      Open:true
    })
  }
  on_Reset=event=>{
    const email = this.state.Email
    console.log(this.state.Email)
    auth.sendPasswordResetEmail(this.state.Email).then(function() {
  // Email sent.
    console.log("email sent")
    }).catch(function(error) {
      // An error happened.
      console.log(error)
    });
    this.setState({
      Open:false
    })
  }
  onClose=event=>{
    this.setState({
      Open:false
    })
  }
  render() {

    return (
      <Grommet theme={grommet}>
        <Box fullWidth fill align="center" pad="large" width="large" background="#f0dde2">
          <Form>
            <FormFieldLabel name="Email" label="E-mail" onChange={this.on_Change_email} required />
            <FormFieldLabel name="Password" type="password" label="Password" onChange={this.on_Change_pw} required />
            <Grommet>
              <Button left type="submit" color="#f5edef" label="Log In" primary onClick={this.on_Submit}/>
              <Button plain size="xsmall" color="#8a6e79" label="forget password?" hoverIndicator="true"
                    onClick={this.onOpen}/>

              {this.state.Open && (
              <Layer
                position="center"

                modal
                onClickOutside={this.onClose}
                onEsc={this.onClose}
              >
                <Box
                  as="form"
                  fill="vertical"
                  overflow="auto"
                  width="medium"
                  pad="medium"
                  onSubmit={this.onClose}
                >

                  <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
                    <FormField label="Please enter Email:" onChange={this.on_Change}>

                    </FormField>
                  </Box>
                  <Box flex={false} as="footer" align="start">
                    <Button
                      type="submit"
                      label="Send"
                      onClick={this.on_Reset}
                      primary
                    />
                  </Box>
                </Box>
              </Layer>
            )}
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
