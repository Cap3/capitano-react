import * as React from "react";
import styled from "react-emotion";

import { widths } from "../styles/variables";
import { getEmSize } from "../styles/mixins";

interface Props {
  readonly className?: string;
}

const StyledContainer = styled("div")({
  position: "relative",
  marginLeft: "auto",
  marginRight: "auto",
  width: "auto",
  maxWidth: `${getEmSize(widths.lg)}em`,
});

export const Container: React.SFC<Props> = ({ children, className }) => (
  <StyledContainer className={className}>{children}</StyledContainer>
);
