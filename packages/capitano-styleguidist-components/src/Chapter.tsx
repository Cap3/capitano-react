import { styled } from "@cap3/capitano-theme";
import * as React from "react";
import { ChapterHeader, ChapterHeaderProps } from "./ChapterHeader";

const ChapterContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginTop: "40px",
});
export const ChapterContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: `0 70px`,
  boxSizing: "border-box",
});

type Props = {
  children?: React.ReactNode;
} & ChapterHeaderProps;
export const Chapter = ({ title, children }: Props) => (
  <ChapterContainer>
    <ChapterHeader title={title} />
    <ChapterContent>{children}</ChapterContent>
  </ChapterContainer>
);

export default Chapter;
