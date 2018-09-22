import * as React from "react";
import { CapitanoTheme, styled } from "@cap3/capitano-theme";
import { CSSObject } from "create-emotion";

type Props = {
  level: HeadingLevel;
};

export const Heading: React.SFC<
  Props & React.HTMLAttributes<HTMLHeadingElement>
> = ({ children, level, ...rest }) => {
  const Tag = headings[level - 1];

  return <Tag {...rest}>{children}</Tag>;
};

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
const headerBaseStyle = ({ theme }: { theme: CapitanoTheme }): CSSObject => ({
  margin: 0,
  color: theme.colors.textOnBackground,
  fontFamily: theme.typography.fontFamily.base,
  fontWeight: "normal",
});

export const H1 = styled("h1")(
  props => headerBaseStyle(props),
  ({ theme }) => ({
    fontSize: theme.typography.fontSize.h1,
  }),
);

export const H2 = styled("h2")(
  props => headerBaseStyle(props),
  ({ theme }) => ({
    fontSize: theme.typography.fontSize.h2,
  }),
);

export const H3 = styled("h3")(
  props => headerBaseStyle(props),
  ({ theme }) => ({
    fontSize: theme.typography.fontSize.h3,
  }),
);

export const H4 = styled("h4")(
  props => headerBaseStyle(props),
  ({ theme }) => ({
    fontSize: theme.typography.fontSize.h4,
  }),
);

export const H5 = styled("h5")(
  props => headerBaseStyle(props),
  ({ theme }) => ({
    fontSize: theme.typography.fontSize.h5,
  }),
);

export const H6 = styled("h6")(
  props => headerBaseStyle(props),
  ({ theme }) => ({
    fontSize: theme.typography.fontSize.h6,
  }),
);

const headings = [H1, H2, H3, H4, H5, H6];
