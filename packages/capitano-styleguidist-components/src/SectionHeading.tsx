import { spacingFactor, styled } from "@cap3/capitano-theme";
import { TinyColor } from "@ctrl/tinycolor";
import * as React from "react";
import Heading, { HeadingLevel } from "./Heading";

type Props = {
  toolbar?: React.ReactNode;
  id: string;
  href: string;
  depth: number;
  deprecated?: boolean;
};
const SectionHeading: React.SFC<Props> = ({
  deprecated,
  children,
  toolbar,
  id,
  depth,
}) => {
  const headingLevel = Math.min(6, depth) as HeadingLevel;

  return (
    <Wrapper>
      <Heading level={headingLevel} id={id}>
        <SectionName deprecated={deprecated}>{children}</SectionName>
      </Heading>
      <Toolbar>{toolbar}</Toolbar>
    </Wrapper>
  );
};

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: spacingFactor.spx8 * theme.spacing.baseUnit,
}));

const Toolbar = styled("div")({
  marginLeft: "auto",
});
const SectionName = styled("a")<{ deprecated?: boolean }>(
  ({ deprecated, theme }) => ({
    "&:hover, &:active": {
      isolate: false,
      textDecoration: "underline",
      cursor: "pointer",
    },
    textDecoration: deprecated ? "line-through" : "none",
    color: deprecated
      ? new TinyColor(theme.colors.textOnBackground).tint(20).toRgbString()
      : undefined,
  }),
);

export default SectionHeading;
