import styled, { keyframes } from "react-emotion";
import * as React from "react";

const spin = keyframes`
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
`;

const Wrapper = styled("div")({
  width: 40,
  height: 40,
  animation: `${spin} 1s linear infinite`,
});

export const Spinner: React.SFC = ({ children }) => (
  <Wrapper>{children}</Wrapper>
);
