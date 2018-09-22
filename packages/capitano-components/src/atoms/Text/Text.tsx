import { styled } from "@cap3/capitano-theme";
import * as React from "react";
import { HTMLAttributes } from "react";

export const Text = styled("span")(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.base,
  fontSize: theme.typography.fontSize.medium,
}));
export const MonoText = styled("span")(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.monospace,
  fontSize: theme.typography.fontSize.medium,
}));

const EllipsisTextBlock = styled(Text)(({}) => ({
  textOverflow: "ellipsis",
  width: "100%",
  overflow: "hidden",
  whiteSpace: "nowrap",
  display: "inline-block",
}));

export const EllipsisText: React.SFC<HTMLAttributes<HTMLSpanElement>> = ({
  children,
  ...rest
}) => {
  return (
    <EllipsisTextBlock title={children as any} {...rest}>
      {children}
    </EllipsisTextBlock>
  );
};
