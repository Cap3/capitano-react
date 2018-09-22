import { spacingAbsolute, styled } from "@cap3/capitano-theme";
import * as PropTypes from "prop-types";
import * as React from "react";

const Root = styled("div")({
  marginBottom: spacingAbsolute.spx32,
});

const PreviewWrapper = styled("div")(({ theme }) => ({
  padding: spacingAbsolute.spx16,
  border: `1px solid ${theme.colors.layout.M30}`,
  backgroundColor: theme.colors.layout.base,
  borderRadius: theme.spacing.baseUnit * theme.spacing.borderRadiusFactor.sharp,
  // the next 2 lines are required to contain floated components
  width: "100%",
  display: "inline-block",
  boxSizing: "border-box",
}));

const ControlsWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
});

const ToolbarWrapper = styled("div")({
  marginLeft: "auto",
});

const TabsWrapper = styled("div")({});

const TabWrapper = styled("div")({});

export const PlaygroundRenderer: React.SFC<{
  name: string;
  preview: React.ReactNode;
  tabButtons: React.ReactNode;
  tabBody: React.ReactNode;
  toolbar: React.ReactNode;
  previewProps: any;
}> = ({ name, preview, tabButtons, tabBody, toolbar, previewProps }) => {
  const { className, ...props } = previewProps;
  return (
    <Root>
      <PreviewWrapper className={className} {...props} data-preview={name}>
        {preview}
      </PreviewWrapper>
      <ControlsWrapper>
        <TabsWrapper>{tabButtons}</TabsWrapper>
        <ToolbarWrapper>{toolbar}</ToolbarWrapper>
      </ControlsWrapper>
      <TabWrapper>{tabBody}</TabWrapper>
    </Root>
  );
};

PlaygroundRenderer.propTypes = {
  name: PropTypes.string.isRequired,
  preview: PropTypes.node.isRequired,
  previewProps: PropTypes.object.isRequired,
  tabButtons: PropTypes.node.isRequired,
  tabBody: PropTypes.node.isRequired,
  toolbar: PropTypes.node.isRequired,
};

export default PlaygroundRenderer;
