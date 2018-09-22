import { spacingAbsolute, styled } from "@cap3/capitano-theme";
import * as React from "react";
import { ComponentHeader } from "./ChapterHeader";
import { PathLine } from "./Pathline";

const Root = styled("div")({
  marginBottom: spacingAbsolute.spx48,
});
const Header = styled("div")({
  marginBottom: spacingAbsolute.spx24,
});
const Tabs = styled("div")({
  marginBottom: spacingAbsolute.spx24,
});
const TabButtons = styled("div")({
  marginBottom: spacingAbsolute.spx16,
});
const Docs = styled("div")(({ theme }) => ({
  color: theme.colors.textOnBackground,
  backgroundColor: theme.colors.layout.base,
  fontSize: theme.typography.fontSize.large,
}));

type Props = {
  name: string;
  heading: React.ReactNode;
  filepath?: string;
  pathLine?: string;
  tabButtons?: React.ReactNode;
  tabBody?: React.ReactNode;
  description?: React.ReactNode;
  docs?: React.ReactNode;
  examples?: React.ReactNode;
  isolated?: boolean;
};
export const ReactComponent = ({
  name,
  heading,
  pathLine,
  description,
  docs,
  examples,
  tabButtons,
  tabBody,
}: Props) => {
  return (
    <Root id={name + "-container"}>
      <Header>
        <ComponentHeader>{heading}</ComponentHeader>
        {pathLine && <PathLine>{pathLine}</PathLine>}
      </Header>
      {(description || docs) && (
        <Docs>
          {description}
          {docs}
        </Docs>
      )}
      {tabButtons && (
        <Tabs>
          <TabButtons>{tabButtons}</TabButtons>
          {tabBody}
        </Tabs>
      )}
      {examples}
    </Root>
  );
};

export default ReactComponent;
