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
const RichTabTitle = ({ icon, label }) => (
  <Box direction="row" align="center" gap="xsmall" margin="xsmall">
    {icon}
    <Text size="small">
      <strong>{label}</strong>
    </Text>
  </Box>
);

const ControlledTabs = () => {
  const [index, setIndex] = React.useState();

  const onActive = nextIndex => setIndex(nextIndex);

  return (
    <Grommet theme={deepMerge(grommet, customFormFieldTheme)}>
      <Tabs color="#d1bec3" activeIndex={index} onActive={onActive}>
      <Tab
        title={
          <RichTabTitle

            label="LOG IN"
          />
        }
      >
        <Log_in_Box/>
      </Tab>
      <Tab
        title={
          <RichTabTitle

            label="SIGN UP"
          />
        }
      >
        <Sign_up_Box/>
      </Tab>
      </Tabs>
    </Grommet>
  );
};

storiesOf("Tabs", module).add("Controlled", () => <ControlledTabs />);
RichTabTitle.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired
};

class Login extends React.Component {
  render() {
    return (
      <Grommet theme={deepMerge(grommet, customFormFieldTheme)}>


        <Box
          direction="column"
          pad="fill"
        >
            <Box right pad="380px" background="#d1bec3">
              <Box right width="90%" height="80%" pad="{{ left: 'large', right: 'large' }}" >
                <ControlledTabs/>


            </Box>
          </Box>
        </Box>
      </Grommet >
  );
  }
}

export default Login;
