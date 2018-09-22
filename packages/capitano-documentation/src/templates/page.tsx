import * as React from 'react';
import { graphql } from 'gatsby';
import { Page } from '../components/Page';
import { Container } from '../components/Container';
import { IndexLayout } from '../layouts';

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
      }
    }
  }
`;

interface Props {
  readonly data: {
    readonly site: {
      readonly siteMetadata: {
        readonly title: string;
        readonly description: string;
        readonly author: {
          readonly name: string;
          readonly url: string;
        };
      };
    };
    readonly markdownRemark: {
      readonly html: string;
      readonly excerpt: string;
      readonly frontmatter: {
        readonly title: string;
      };
    };
  };
}

const PageTemplate: React.SFC<Props> = ({ data }) => (
  <IndexLayout>
    <Page>
      <Container>
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </Container>
    </Page>
  </IndexLayout>
);

export default PageTemplate;
