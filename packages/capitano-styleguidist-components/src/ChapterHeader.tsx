import { styled } from "@cap3/capitano-theme";
import * as React from "react";
import StyleguideHeading from "./Heading";

const ChapterSideMarker = styled("div")(
  {
    height: "10px",
    width: "13px",
    position: "absolute",
    left: -30,
    borderTopRightRadius: "5px",
    borderBottomRightRadius: "5px",
  },
  ({ theme }) => ({
    backgroundColor: theme.colors.secondary["500"],
  }),
);
const HeaderWrapper = styled("div")({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  marginBottom: "20px",
  flexShrink: 0,
});
const TitleLabel = styled("div")({
  fontWeight: 600,
});
const HeaderLine = styled("div")(
  {
    height: "2px",
    flex: 1,
    marginLeft: "20px",
    marginBottom: "2px",
    marginRight: `70px`,
    width: "100%",
    alignSelf: "flex-end",
  },
  ({ theme }) => ({
    backgroundColor: theme.colors.layout.base,
  }),
);

export type ChapterHeaderProps = {
  title: string;
};

export const ChapterHeader: React.SFC<ChapterHeaderProps> = ({
  title,
}: ChapterHeaderProps) => {
  return (
    <HeaderWrapper>
      <ChapterSideMarker />
      <StyleguideHeading level={2}>{title.toUpperCase()}</StyleguideHeading>
      <HeaderLine />
    </HeaderWrapper>
  );
};

export const ComponentHeader: React.SFC = ({ children }) => {
  return (
    <HeaderWrapper>
      <ChapterSideMarker />
      <TitleLabel>{children}</TitleLabel>
      <HeaderLine />
    </HeaderWrapper>
  );
};
