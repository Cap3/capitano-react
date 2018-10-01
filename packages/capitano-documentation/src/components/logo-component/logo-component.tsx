import * as React from "react";
// @ts-ignore
import Logo from "./assets/logo.svg";
import styled from "react-emotion";
import { colors } from "capitano-documentation/src/styles/variables";

interface Props {
  readonly className?: string;
}

const StyledLogo = styled(Logo)({
  width: "100%",
  height: "100%",
  fill: colors.green,
});

export const LogoComponent: React.SFC<Props> = ({ className }) => (
  <div className={className}>
    <StyledLogo />
  </div>
);
