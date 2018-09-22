import * as React from 'react';
import styled from 'react-emotion';

interface Props {
  className?: string;
}

const StyledLayoutRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  fontFamily: 'Roboto',
});

export const LayoutRoot: React.SFC<Props> = ({ children, className }) => (
  <StyledLayoutRoot className={className}>{children}</StyledLayoutRoot>
);
