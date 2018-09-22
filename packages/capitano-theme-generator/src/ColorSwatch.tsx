import {
  isMaterialSwatch,
  MaterialSwatch,
  MonochromeSwatch,
  styled,
} from "@cap3/capitano-theme";
import { getColorObject } from "@cap3/capitano-theme/lib/colorTools";
import { TinyColor } from "@ctrl/tinycolor";
import * as React from "react";
import { ColorRect } from "./ColorRect";

type Props = {
  swatch: MaterialSwatch | MonochromeSwatch;
  textColor?: string;
  shadow?: boolean;
};

const SwatchWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  height: 100,
  width: 150,
  flexShrink: 0,
});

const materialKeys: Array<keyof MaterialSwatch> = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "A100",
  "A200",
  "A400",
  "A700",
];
const monochromeKeys: Array<keyof MonochromeSwatch> = [
  "M0",
  "M10",
  "M20",
  "M30",
  "M40",
  "M50",
  "M60",
  "M70",
  "M80",
  "M90",
  "base",
];
export const ColorSwatch: React.SFC<Props> = ({
  swatch,
  textColor,
  shadow,
}) => {
  let colors: Array<ReturnType<typeof getColorObject>>;

  if (isMaterialSwatch(swatch)) {
    colors = materialKeys.map(key =>
      getColorObject(new TinyColor(swatch[key]), key),
    );
  } else {
    colors = monochromeKeys.map(key =>
      getColorObject(new TinyColor(swatch[key]), key),
    );
  }

  return (
    <SwatchWrapper>
      {colors.map(({ hex, name, darkContrast }) => (
        <ColorRect
          color={hex}
          textColor={textColor}
          shadow={shadow}
          key={name}
          isLight={darkContrast}
        >
          {name}
        </ColorRect>
      ))}
    </SwatchWrapper>
  );
};
