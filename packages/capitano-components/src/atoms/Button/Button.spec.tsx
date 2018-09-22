import * as React from "react";
import { ThemeProvider } from "emotion-theming";
import { Button } from "./Button";
import { render } from "react-testing-library";
import { defaultLightTheme } from "@cap3/capitano-theme/lib/defaultTheme";

describe("DummyComponent", () => {
  test("render dummy snapshot with react-testing-library", () => {
    const wrapper = render(
      <ThemeProvider theme={defaultLightTheme}>
        <Button>basic button</Button>
      </ThemeProvider>,
    );
    expect(wrapper.container.firstChild).toMatchSnapshot();
  });
});
