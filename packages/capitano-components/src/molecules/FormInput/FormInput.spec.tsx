import * as React from "react";
import { ThemeProvider } from "emotion-theming";
import { FormInput } from "./FormInput";
import { render } from "react-testing-library";
import { defaultLightTheme } from "@cap3/capitano-theme/lib/defaultTheme";

describe("Input Component", () => {
  test("render dummy snapshot with react-testing-library", () => {
    const wrapper = render(
      <ThemeProvider theme={defaultLightTheme}>
        <FormInput
          placeholder="test"
          label="Adresse"
          invalid={false}
          validated
          validationIcon
          validationMessage="Adresse wurde gefunden."
          labelPosition="top"
          outlined={true}
        />
      </ThemeProvider>,
    );
    expect(wrapper.container.firstChild).toMatchSnapshot();
  });
});
