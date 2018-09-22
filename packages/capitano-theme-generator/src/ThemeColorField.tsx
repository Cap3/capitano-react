import {
  isMaterialSwatch,
  MaterialSwatch,
  MonochromeSwatch,
  styled,
  ThemeColor,
} from "@cap3/capitano-theme";
import {
  materialThemeSwatch,
  monochromeThemeSwatch,
} from "@cap3/capitano-theme/lib/colorTools";
import { mostReadable, TinyColor } from "@ctrl/tinycolor";
import * as React from "react";
import { ChromePicker, ColorResult, RGBColor } from "react-color";
import { ColorSwatch } from "./ColorSwatch";
import { Popup } from "@cap3/capitano-components";
import { bottomShadow } from "./shadows";

type Props = {
  color: ThemeColor;
  label: string;
  onColorChanged: (color: ThemeColor) => void;
  baseSwatch?: MaterialSwatch | MonochromeSwatch;
};

const ComponentContainer = styled("div")({
  position: "relative",
  display: "flex",
});

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  borderRadius: "3px",
  width: "90px",
  overflow: "hidden",
  boxShadow: bottomShadow(1),
});

const Label = styled("div")(
  {
    height: "20px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: "11px",
    padding: "3px",
  },
  ({ theme }) => ({
    backgroundColor: theme.colors.layout.M90,
    color: theme.colors.textOnBackground,
  }),
);

const ColorField = styled("div")({
  width: "90px",
  height: "80px",
  cursor: "pointer",
  fontSize: "10px",
  fontFamily: '"Lucida Console", Monaco, monospace',
  boxSizing: "border-box",
  padding: "4px",
  "-webkit-font-smoothing": "antialiased",
});

const createColorString = ({ r, g, b, a }: RGBColor) =>
  `rgba(${r},${g},${b},${typeof a === "number" ? a : 1})`;

const getBaseColor = (color: ThemeColor) => {
  if (typeof color === "string") {
    return color;
  } else if (isMaterialSwatch(color)) {
    return color["500"];
  } else {
    return color.base;
  }
};

export class ThemeColorField extends React.Component<Props> {
  readonly updateColor: ((color: ColorResult) => void) = ({ rgb, hex }) => {
    const { onColorChanged, color: propsColor } = this.props;
    const nextColorString =
      typeof rgb.a === "number" && rgb.a !== 1 ? createColorString(rgb) : hex;

    if (typeof propsColor === "string") {
      onColorChanged(nextColorString);
    } else if (isMaterialSwatch(propsColor)) {
      onColorChanged(materialThemeSwatch(nextColorString));
    } else {
      onColorChanged(monochromeThemeSwatch(nextColorString));
    }
  };

  render() {
    const { color, label, baseSwatch } = this.props;

    const base = getBaseColor(color);

    const textColor = (
      mostReadable(base, ["#fff", "#000"]) || new TinyColor("#000")
    ).toRgbString();

    return (
      <ComponentContainer>
        <Popup
          target={({ ref, toggle }) => (
            <Wrapper
              innerRef={elem => {
                if (elem) {
                  ref(elem);
                }
              }}
              onClick={toggle}
            >
              <ColorField
                color={base}
                style={{ backgroundColor: base, color: textColor }}
              >
                {base}
              </ColorField>
              <Label>{label}</Label>
            </Wrapper>
          )}
          popup={({ visible, ...rest }) => (
            <div {...rest}>
              <ChromePicker color={base} onChangeComplete={this.updateColor} />
            </div>
          )}
        />
        {typeof color !== "string" && <ColorSwatch shadow swatch={color} />}
        {baseSwatch && (
          <ColorSwatch shadow swatch={baseSwatch} textColor={base} />
        )}
      </ComponentContainer>
    );
  }
}
