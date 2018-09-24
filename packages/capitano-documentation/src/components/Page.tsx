import * as React from "react";
import styled from "react-emotion";

import { dimensions } from "../styles/variables";

interface Props {
  readonly className?: string;
}

const StyledPage = styled("div")({
  display: "block",
  flex: 1,
  position: "relative",
  padding: `${dimensions.containerPadding}rem`,
  marginBottom: `3rem`,
});

export const Page: React.SFC<Props> = ({ children, className }) => (
  <StyledPage className={className}>{children}</StyledPage>
);
