import React from "react";
import PropTypes from "prop-types";
import { storiesOf } from "@storybook/react";
import { CircleInformation, Currency } from "grommet-icons";
import { Box, Grommet, FormField, Tab, Tabs, Text, TextInput } from "grommet";
import { grommet } from "grommet/themes";
import {LabelFormField} from "./register_Box.js"

const RichTabs = () => (
  <Grommet theme={grommet}>
    <Tabs>
      <Tab
        title={
          <RichTabTitle

            label="Personal Data"
          />
        }
      >
        <LabelFormField/>
      </Tab>
      <Tab
        title={
          <RichTabTitle icon={<Currency color="neutral-2" />} label="Payment" />
        }
      >
        <FormField >
          <TextInput placeholder="Enter your card number..." />
        </FormField>
      </Tab>
    </Tabs>
  </Grommet>
);

const RichTabTitle = ({ icon, label }) => (
  <Box direction="row" align="center" gap="xsmall" margin="xsmall">
    {icon}
    <Text size="small">
      <strong>{label}</strong>
    </Text>
  </Box>
);

RichTabTitle.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired
};

storiesOf("Tabs", module).add("Rich", () => <RichTabs />);

export { RichTabTitle };
