import * as React from "react";
import { spacingAbsolute, styled } from "@cap3/capitano-theme";
import { color } from "./themeConfig";
import { CSSObject } from "create-emotion";

const Button = styled("button")<{ small?: boolean }>(
  ({ small }): CSSObject => ({
    padding: 2, // Increase clickable area a bit
    color: color.link,
    background: "transparent",
    transition: "color 750ms ease-out",
    cursor: "pointer",
    border: "none",
    outline: "none",
    "&:hover, &:focus": {
      isolate: false,
      color: color.linkHover,
      transition: "color 150ms ease-in",
    },
    "&:focus": {
      isolate: false,
      outline: [1, "dotted", color.linkHover],
    },
    "& + &": {
      isolate: false,
      marginLeft: spacingAbsolute.spx8,
    },
    // Style react-icons icon passed as children
    "& svg": {
      width: small ? 14 : spacingAbsolute.spx24,
      height: small ? 14 : spacingAbsolute.spx24,
      color: "currentColor",
      cursor: "inherit",
    },
  }),
);
type Props = {
  className?: string;
  href?: string;
  onClick?: () => void;
  title?: string;
  small?: boolean;
  children?: React.ReactNode;
};
export const ToolbarButton: React.SFC<Props> = ({
  className,
  onClick,
  title,
  small,
  children,
}) => {
  return (
    <Button
      small={small}
      type="button"
      onClick={onClick}
      title={title}
      className={className}
      aria-label={title}
    >
      {children}
    </Button>
  );
};

export default ToolbarButton;
