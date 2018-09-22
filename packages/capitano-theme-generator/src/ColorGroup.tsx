import {
  MaterialSwatch,
  MonochromeSwatch,
  styled,
  ThemeColor,
} from "@cap3/capitano-theme";
import * as React from "react";
import { Heading } from "@cap3/capitano-components";
import { ThemeColorField } from "./ThemeColorField";

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const ColorsRow = styled("div")({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
});

const ColorPickerWrapper = styled("div")({
  padding: "10px",
});

type Props = {
  label: string;
  colors: {
    id: string;
    label: string;
    value: ThemeColor;
    baseSwatch?: MaterialSwatch | MonochromeSwatch;
  }[];
  onColorChanged: (id: string, value: ThemeColor) => any;
};
export const ColorGroup = ({ label, colors, onColorChanged }: Props) => (
  <Wrapper>
    <Heading level={5}>{label.toUpperCase()}</Heading>
    <ColorsRow>
      {colors.map(({ id, label: colorName, value, baseSwatch }) => {
        const colorChangeCallback = onColorChanged.bind(null, id);
        return (
          <ColorPickerWrapper key={id}>
            <ThemeColorField
              color={value}
              key={id}
              label={colorName}
              baseSwatch={baseSwatch}
              onColorChanged={colorChangeCallback}
            />
          </ColorPickerWrapper>
        );
      })}
    </ColorsRow>
  </Wrapper>
);
