import { styled } from "@cap3/capitano-theme";
import {
  FormElementSize,
  formElementHeight,
  fontSizeForElementSize,
} from "../basics/formElementHelpers";

export type LabelProps = {
  size?: FormElementSize;
};

export const Label = styled("label")<LabelProps>(
  {
    display: "flex",
    position: "relative",
  },
  ({ theme, size }) => {
    const height = formElementHeight(size, theme);

    return {
      color: theme.colors.layout.M50, // TODO define color for label
      fontFamily: theme.typography.fontFamily.base,
      fontSize: fontSizeForElementSize(size, theme),
      height,
    };
  },
);
