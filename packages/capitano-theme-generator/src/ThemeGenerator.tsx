import {
  CapitanoTheme,
  MaterialSwatch,
  MonochromeSwatch,
  spacingAbsolute,
  styled,
  ThemeColor,
  ThemeColorName,
} from "@cap3/capitano-theme";
import { capitanoThemeDecoder } from "@cap3/capitano-theme/lib/themeValidation";
import * as React from "react";
import { Button } from "@cap3/capitano-components";
import { ColorGroup } from "./ColorGroup";

function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

const Content = styled("div")(({}) => ({
  marginBottom: "20px",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "1000px",
  borderRadius: "20px",
  outline: "none",
  flexShrink: 0,
}));

const JsonTheme = styled("textarea")(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.monospace,
  backgroundColor: theme.colors.layout.M40,
  color: theme.colors.textOnBackgroundInverse,
  borderColor: theme.colors.layout.M70,
  borderStyle: "solid",
  borderWidth: 1,
  height: 320,
  outline: "none",
  overflow: "auto",
  padding: spacingAbsolute.spx8,
  marginTop: spacingAbsolute.spx8,
}));

type NamedColor = {
  id: string;
  value: ThemeColor;
  label: string;
  baseSwatch?: MaterialSwatch | MonochromeSwatch;
};

type CategorizedColors = { [key in ColorCategory]: NamedColor[] };

type State = {
  colors: CategorizedColors;
  showJson: boolean;
  themeString: string;
  error: ErrorState;
};

const ErrorMessage = styled("div")(({ theme }) => ({
  backgroundColor: theme.colors.danger["500"],
  color: theme.colors.textOnDanger,
  marginTop: spacingAbsolute.spx8,
}));

const initColors = (theme: CapitanoTheme): CategorizedColors => {
  const colorKeys = Object.keys(theme.colors) as ThemeColorName[];
  const grouped = groupBy(colorKeys);

  const createNamedColor = (key: ThemeColorName) => ({
    id: key,
    label: key,
    value: theme.colors[key],
    baseSwatch: getBaseSwatch(theme)(key),
  });

  return colorCategories.reduce(
    (acc, category) => {
      acc[category.key] = grouped[category.key].map(createNamedColor);
      return acc;
    },
    // tslint:disable-next-line:no-object-literal-type-assertion
    {} as { [key in ColorCategory]: NamedColor[] },
  );
};
enum ErrorState {
  fine,
  jsonParse,
  schema,
}

type ColorCategory = "ui" | "text" | "semantic" | "layout";
const colorCategories: { key: ColorCategory; label: string }[] = [
  { label: "Brand Colors", key: "ui" },
  { label: "Semantic Colors", key: "semantic" },
  { label: "Layout Colors", key: "layout" },
  { label: "Text Colors", key: "text" },
];

const getColorGroup = (color: ThemeColorName): ColorCategory => {
  switch (color) {
    case "textOnBackground":
    case "textOnBackgroundInverse":
    case "textOnPrimary":
    case "textOnSecondary":
    case "textOnSuccess":
    case "textOnDanger":
    case "textOnDisabled":
      return "text";
    case "primary":
    case "secondary":
      return "ui";
    case "success":
    case "warning":
    case "danger":
    case "disabled":
      return "semantic";
    case "layout":
      return "layout";
    default:
      return assertNever(color);
  }
};
const getBaseSwatch = (theme: CapitanoTheme) => (
  color: ThemeColorName,
): undefined | MaterialSwatch | MonochromeSwatch => {
  switch (color) {
    case "textOnBackground":
      return theme.colors.layout;
    case "textOnBackgroundInverse":
      return theme.colors.layout;
    case "textOnPrimary":
      return theme.colors.primary;
    case "textOnSecondary":
      return theme.colors.secondary;
    case "textOnSuccess":
      return theme.colors.success;
    case "textOnDanger":
      return theme.colors.danger;
    case "textOnDisabled":
      return theme.colors.disabled;
    case "primary":
    case "secondary":
    case "success":
    case "warning":
    case "danger":
    case "disabled":
    case "layout":
      return undefined;
    default:
      return assertNever(color);
  }
};

const groupBy = (colors: ThemeColorName[]) => {
  return colors.reduce(
    (acc, color) => {
      const group = getColorGroup(color);

      if (acc[group]) {
        acc[group].push(color);
      } else {
        acc[group] = [color];
      }
      return acc;
    },
    // tslint:disable-next-line:no-object-literal-type-assertion
    {} as { [key in ColorCategory]: ThemeColorName[] },
  );
};

type Props = {
  onThemeUpdate: (theme: CapitanoTheme) => void;
  theme: CapitanoTheme;
};

export class ThemeGeneratorComponent extends React.Component<Props, State> {
  static getDerivedStateFromProps = (nextProps: Props, prevState: State) => {
    const nextThemeString = JSON.stringify(nextProps.theme, null, 2);
    if (nextThemeString !== prevState.themeString) {
      return {
        colors: initColors(nextProps.theme),
        themeString: nextThemeString,
        showJson: false,
        error: ErrorState.fine,
      };
    }
    return null;
  };

  state = {
    colors: initColors(this.props.theme),
    themeString: JSON.stringify(this.props.theme, null, 2),
    showJson: false,
    error: ErrorState.fine,
  };

  handleColorChange = (id: string, value: ThemeColor) => {
    const { theme } = this.props;

    const nextTheme = { ...theme, colors: { ...theme.colors, [id]: value } };
    this.props.onThemeUpdate(nextTheme);
  };

  toggleJson = () => {
    this.setState(({ showJson }) => ({ showJson: !showJson }));
  };

  onJsonChanged = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const text = event.currentTarget.value;

    try {
      const parsedTheme = JSON.parse(text);
      try {
        const nextTheme = capitanoThemeDecoder.runWithException(parsedTheme);
        this.props.onThemeUpdate(nextTheme);
      } catch (schemaError) {
        console.error(schemaError);
        this.setState({ error: ErrorState.schema });
      }
    } catch (error) {
      console.error(error);
      this.setState({ error: ErrorState.jsonParse });
    }
    this.setState({ themeString: text });
  };

  render() {
    const { colors, showJson, themeString, error } = this.state;

    return (
      <Content>
        {colorCategories.map(({ label, key }) => (
          <ColorGroup
            key={key}
            colors={colors[key]}
            label={label}
            onColorChanged={this.handleColorChange}
          />
        ))}
        <Button fixed outline onClick={this.toggleJson}>
          {showJson ? "Hide" : "Show"} json
        </Button>
        {error === ErrorState.jsonParse && (
          <ErrorMessage>Invalid JSON input</ErrorMessage>
        )}
        {error === ErrorState.schema && (
          <ErrorMessage>Invalid theme schema</ErrorMessage>
        )}
        {showJson && (
          <JsonTheme onChange={this.onJsonChanged} value={themeString} />
        )}
      </Content>
    );
  }
}
