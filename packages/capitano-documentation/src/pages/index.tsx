import * as React from 'react';
import { Link } from 'gatsby';
import { Page } from '../components/Page';
import { Container } from '../components/Container';
import { IndexLayout } from '../layouts';
import styled from 'react-emotion';
import { colors, spacing } from '../styles/variables';
import { LogoComponent } from '../components/logo-component/logo-component';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const H1 = styled('h1')({
  marginTop: spacing.huge,
  color: colors.blue,
});

const H4 = styled('h4')({
  marginTop: spacing.large,
  color: colors.blue,
});

const StyledLink = styled(Link)({
  marginTop: spacing.large,
});

const IndexPage = () => (
  <IndexLayout>
    <Page>
      <StyledContainer>
        <LogoComponent />
        <H1>Capitano</H1>
        <H4>Pardon Me, Do You Have Any React Components?</H4>
        <StyledLink to="/page-2/">Go to page 2</StyledLink>
      </StyledContainer>
    </Page>
  </IndexLayout>
);

export default IndexPage;
