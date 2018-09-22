import { styled } from "@cap3/capitano-theme";
// @ts-ignore
import * as copy from "clipboard-copy";
import { css } from "emotion";
import * as React from "react";
import { MdContentCopy } from "react-icons/md";
import { ToolbarButton } from "./ToolbarButton";

const Root = styled("div")(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.monospace,
  fontSize: theme.typography.fontSize.small,
  color: theme.colors.textOnBackground,
  opacity: 0.7,
}));

export const PathLine: React.SFC<{ children: string }> = ({ children }) => {
  return (
    <Root>
      {children}
      <ToolbarButton
        small
        className={css({ marginLeft: 4 })}
        onClick={() => copy(children)}
        title="Copy to clipboard"
      >
        <MdContentCopy />
      </ToolbarButton>
    </Root>
  );
};

export default PathLine;
