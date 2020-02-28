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
import {Log_in_Box} from "./Log_in_Box.js"
import {Sign_up_Box} from "./Sign_up_Box.js"
import { css } from "styled-components";
import {FormFieldLabel} from "./FormFieldLabel.js"


const customFormFieldTheme = {
  global: {
    font: {
      size: "16px"
    },
    input: {
      weight: 400
    }
  },
  formField: {
    label: {
      color: "dark-3",
      size: "large",
      margin: "xsmall",
      weight: 600
    },
    border: {
      position: "outer",
      side: "all"
    },
    disabled: {
      background: {
        color: "light-3",
        opacity: true
      }
    },

    content: {
      pad: "small"
    },
    error: {
      background: {
        color: "status-critical",
        opacity: "weak"
      }
    },
    margin: 30
  },
  tab: {
    active: {
      background: "dark-1",
      color: "accent-1"
    },

    border: undefined,
    color: "white",
    hover: {
      background: "dark-1"
    },
    margin: undefined,
    pad: {
      bottom: undefined,
      horizontal: "small"
    },
    extend: ({ theme }) => css`
      border-radius: ${theme.global.control.border.radius};
      box-shadow: ${theme.global.elevation.light.small};
    `
  }
};

// const FormFieldLabel = props => {
//   const { required, label,on_Change, ...rest } = props;
//   return (
//     <FormField
//       label={
//         required ? (
//           <Box direction="row">
//             <Text>{label}</Text>
//             <Text color="status-critical">*</Text>
//           </Box>
//         ) : (
//           label
//         )
//       }
//       onChange={on_Change}
//       required={required}
//       {...rest}
//     />
//   );
// };

class tryBox extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      Email:"",
      Pw:"",
      Nickname:"",
      index:"0",
      setIndex:"1",
      //onActive:nextIndex => setIndex(nextIndex);


    }


  }
  // on_Change_email
  //
  // on_Change_pw
  //
  on_Change_email(value){
     //const value=event.target.value
     this.setState(
       {Email:value}
     )
   }

   on_Change_pw(value){
      //const value=event.target.value
      this.setState(
        {Pw:value}
      )
    }

  render(){
    return (
      <p>sdfs</p>
    );

  }


}

// const ControlledTabs = (on_Change_email,on_Change_pw) => {
//   const [index, setIndex] = React.useState();
//
//   const onActive = nextIndex => setIndex(nextIndex);
//
//   // on_Change_email(value){
//   //   //const value=event.target.value
//   //   this.props.P_update_Email(value)
//   // }
//   // on_Change_pw = event=>{
//   //   const value=event.target.value
//   //   this.props.P_update_Pw(value)
//   // }
//
//   return (
//     <Grommet theme={deepMerge(grommet, customFormFieldTheme)}>
//       <Tabs color="#d1bec3" activeIndex={index} onActive={onActive}>
//       <Tab
//         title={
//           <Box direction="row" align="center" gap="xsmall" margin="xsmall">
//             <Text size="small">
//               <strong>"LOG IN"</strong>
//             </Text>
//           </Box>
//         }
//       >
//         <Box fullWidth fill align="center" pad="large" width="large" background="#f0dde2">
//           <Form>
//             <FormFieldLabel name="Email" label="E-mail" P_update_value={this.on_Change_email} required />
//             <FormFieldLabel name="Password" label="Password" P_update_value={this.on_Change_pw} required />
//
//             <Grommet>
//               <Button left type="submit" color="#f5edef" label="Submit" primary onClick={this.on_Submit}/>
//               <Button plain size="xsmall" color="#8a6e79" label="forget password?" hoverIndicator="true"/>
//             </Grommet>
//             <Text margin={{ left: "small" }} size="small" color="status-critical">
//               * Required Field
//             </Text>
//           </Form>
//         </Box>
//       </Tab>
//       <Tab
//         title={
//           <Box direction="row" align="center" gap="xsmall" margin="xsmall">
//             <Text size="small">
//               <strong>"SIGN UP"</strong>
//             </Text>
//           </Box>
//         }
//       >
//         <Box fullWidth fill align="center" pad="large" width="large" background="#f0dde2">
//           <Form>
//             <FormFieldLabel name="email" label="E-mail" required />
//             <FormFieldLabel name="Nickname" label="Nickname" required />
//             <FormFieldLabel name="password" label="Password" required />
//             <Button type="submit" color="#f5edef" label="Submit" primary />
//             <Text margin={{ left: "small" }} size="small" color="status-critical">
//               * Required Field
//             </Text>
//           </Form>
//         </Box>
//       </Tab>
//       </Tabs>
//     </Grommet>
//   );
// };
//

// storiesOf("Tabs", module).add("Controlled", () => <RichTabTitle />);
// RichTabTitle.propTypes = {
//   icon: PropTypes.node.isRequired,
//   label: PropTypes.string.isRequired
// };
storiesOf("Form", module).add("Required Label", () => <tryBox />);
export default tryBox;
