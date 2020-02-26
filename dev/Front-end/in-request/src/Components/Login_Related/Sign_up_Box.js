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

const Sign_up_Box = () => (
  <Grommet theme={grommet}>
    <Box fullWidth fill align="center" pad="large" width="large" background="#f0dde2">
      <Form>
        <FormFieldLabel name="email" label="E-mail" required />
        <FormFieldLabel name="Nickname" label="Nickname" required />
        <FormFieldLabel name="password" label="Password" required />
        <Button type="submit" color="#f5edef" label="Submit" primary />
        <Text margin={{ left: "small" }} size="small" color="status-critical">
          * Required Field
        </Text>
      </Form>
    </Box>
  </Grommet>
);

storiesOf("Form", module).add("Required Label", () => <Sign_up_Box />);
export {Sign_up_Box};
