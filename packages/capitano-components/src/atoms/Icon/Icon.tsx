import * as React from "react";
import { styled } from "@cap3/capitano-theme";

type IconContainerProps = {
  size?: string;
  color?: string;
} & React.SVGAttributes<SVGElement>;

const IconContainer = styled("svg")<IconContainerProps>(({ color }) => ({
  color,
}));

export type IconProps = {
  iconId: string;
} & IconContainerProps;

/**
 * Icon component for custom Icons provided as svg sprite with an id
 * coloring should be done via currentcolor
 */
export const Icon: React.SFC<IconProps> = ({
  name,
  size = "20",
  iconId,
  ...props
}) => {
  return (
    <IconContainer height={size} width={size} {...props}>
      <use xlinkHref={`#${iconId}`} />
    </IconContainer>
  );
};
