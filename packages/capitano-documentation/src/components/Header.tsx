import * as React from 'react';
import styled from 'react-emotion';
import { transparentize } from 'polished';
import { Link } from 'gatsby';
import { heights, dimensions, colors, spacing } from '../styles/variables';
import { Container } from './Container';
import { textOverflow } from '../styles/mixins';
import { LogoComponent } from './logo-component/logo-component';

interface Props {
  readonly title: string;
}

const StyledHeader = styled('header')({
  height: heights.header,
  padding: `0 ${dimensions.containerPadding}rem`,
  backgroundColor: colors.blue,
  color: transparentize(0.5, colors.white),
});

const HeaderInner = styled(Container)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '100%',
});

const HomepageLink = styled(Link)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  maxHeight: '100%',
  color: colors.white,
  fontSize: '1.5rem',
  fontWeight: 600,
  '&:hover, &:focus': {
    textDecoration: 'none',
  },
});

const StyledLogo = styled(LogoComponent)({
  height: 35,
  width: 35,
  marginRight: spacing.large,
});

const StyledLabel = styled('label')(textOverflow);

export const Header: React.SFC<Props> = ({ title }) => (
  <StyledHeader>
    <HeaderInner>
      <HomepageLink to="/">
        <StyledLogo />
        <StyledLabel>{title}</StyledLabel>
      </HomepageLink>
    </HeaderInner>
  </StyledHeader>
);
