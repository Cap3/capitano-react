import { styled } from "@cap3/capitano-theme";
import * as React from "react";

type Props = {
  isLight: boolean;
  shadow?: boolean;
  color: string;
  textColor?: string;
};
const ColorRectBackground = styled("div")<Props>(
  ({ isLight, shadow, theme }) => ({
    width: 50,
    height: 20,
    fontSize: theme.typography.fontSize.small,
    fontFamily: theme.typography.fontFamily.monospace,
    color: isLight ? "#000" : "#fff",
    boxShadow: shadow ? `0 3px 12px rgba(0,0,0,0.23)` : undefined,
    boxSizing: "border-box",
    padding: "2px 4px",
  }),
);

export const ColorRect: React.SFC<Props> = props => {
  return (
    <ColorRectBackground
      {...props}
      style={{ backgroundColor: props.color, color: props.textColor }}
    />
  );
};
