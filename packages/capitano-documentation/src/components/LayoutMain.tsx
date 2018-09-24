import * as React from "react";
import styled from "react-emotion";

interface Props {
  readonly className?: string;
}

const StyledLayoutMain = styled("main")({
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

export const LayoutMain: React.SFC<Props> = ({ children, className }) => (
  <StyledLayoutMain className={className}>{children}</StyledLayoutMain>
);
