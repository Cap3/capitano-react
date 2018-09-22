import {
  CapitanoTheme,
  spacingAbsolute,
  styled,
  ThemeProvider,
} from "@cap3/capitano-theme";
import {
  defaultLightTheme,
  defaultDarkTheme,
} from "@cap3/capitano-theme/lib/defaultTheme";
import { Select } from "@cap3/capitano-components";
import { injectGlobal } from "emotion";
import * as React from "react";
import { mq } from "./themeConfig";
import { ThemeGeneratorComponent } from "@cap3/capitano-theme-generator";
import { Chapter } from "./Chapter";

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased,
  }
  [data-x-out-of-boundaries] {
    display: none
  }
`;

const Root = styled("div")(({ theme }) => ({
  color: theme.colors.textOnBackground,
  backgroundColor: theme.colors.layout.base,
  display: "grid",
  gridTemplateColumns: "200px 5fr",
  gridTemplateAreas: `"nav content"`,
  height: "100vh",
}));

const SideBar = styled("aside")(({ theme }) => ({
  backgroundColor: theme.colors.layout.M90,
  color: theme.colors.textOnBackground,
  borderColor: theme.colors.layout.M70,
  borderStyle: "solid",
  borderWidth: "0 1px 0 0",
  gridArea: "nav",
  boxSizing: "border-box",
  overflow: "auto",
  "-webkit-overflow-scrolling": "touch",
  [mq.small]: {
    position: "static",
    width: "auto",
    borderWidth: "1px 0 0 0",
    paddingBottom: spacingAbsolute.spx4,
  },
}));

const MainWrapper = styled("div")({
  height: "100vh",
  width: "100%",
  gridArea: "content",
  overflow: "auto",
});

const ComponentShowcase = styled("main")(({ theme }) => ({
  maxWidth: "1000px",
  padding: "15px 30px",
  margin: "50px auto",
  [mq.small]: {
    padding: 15,
  },
  display: "flex",
  backgroundColor: theme.colors.layout.M90,
  flexDirection: "column",
  width: "100%",
  borderRadius: "20px",
  outline: "none",
  flexShrink: 0,
}));

enum ActiveTheme {
  light,
  dark,
  custom,
}

type ThemeOption = { label: string; value: ActiveTheme };
const themeOptions: ThemeOption[] = [
  { label: "Light", value: ActiveTheme.light },
  { label: "Dark", value: ActiveTheme.dark },
  { label: "Customized", value: ActiveTheme.custom },
];

const ThemeSelectWrapper = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: 20,
});

export class StyleGuideRenderer extends React.Component {
  state: {
    theme: CapitanoTheme;
    customizedTheme: CapitanoTheme;
    activeTheme: ThemeOption;
  } = {
    theme: defaultLightTheme,
    customizedTheme: defaultLightTheme,
    activeTheme: themeOptions[0],
  };

  props!: {
    title: string;
    homepageUrl: string;
    hasSideBar: boolean;
    toc: React.ReactNode;
    children?: React.ReactNode;
  };

  onThemeUpdate = (theme: CapitanoTheme) => {
    this.setState({
      theme,
      customizedTheme: theme,
      activeTheme: ActiveTheme.custom,
    });
  };

  selectTheme = (activeTheme: ThemeOption) => {
    const { customizedTheme } = this.state;
    this.setState({
      activeTheme,
      theme:
        activeTheme.value === ActiveTheme.custom
          ? customizedTheme
          : activeTheme.value === ActiveTheme.light
            ? defaultLightTheme
            : defaultDarkTheme,
    });
  };

  render() {
    const { children, toc } = this.props;
    const { theme, activeTheme } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Root>
          <SideBar>{toc}</SideBar>
          <MainWrapper>
            <ComponentShowcase>
              <Chapter title="Theme Data">
                <ThemeSelectWrapper>
                  <Select<ThemeOption>
                    textInput
                    fixed
                    outlined
                    itemToString={i => (i ? i.label : "")}
                    selectedItem={activeTheme}
                    onValueSelected={this.selectTheme}
                    items={themeOptions}
                  />
                </ThemeSelectWrapper>
                <ThemeGeneratorComponent
                  theme={theme}
                  onThemeUpdate={this.onThemeUpdate}
                />
              </Chapter>
              {children}
            </ComponentShowcase>
          </MainWrapper>
        </Root>
      </ThemeProvider>
    );
  }
}

export default StyleGuideRenderer;
