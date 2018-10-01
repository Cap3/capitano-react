import { rgba } from "polished";
const topShadowOffsets = [1.5, 3, 10, 14, 19];
const topShadowOpacities = [0.12, 0.16, 0.19, 0.25, 0.3];

const bottomShadowOffsets = [1.5, 3, 6, 10, 15];
const bottomShadowOpacities = [0.24, 0.23, 0.23, 0.22, 0.22];

const generateShadowString = (
  elevation: number,
  shadowOffsets: number[],
  shadowOpacities: number[],
) => {
  const elevationIndex = Math.min(
    Math.max(elevation, 0),
    shadowOffsets.length - 1,
  );
  const primaryOffset = shadowOffsets[elevationIndex];

  const blur = primaryOffset * 4;
  const color = rgba("#000000", shadowOpacities[elevationIndex]);

  return `0 ${primaryOffset}px ${blur}px ${color}`;
};

export const topShadow = (elevation: number) => {
  return generateShadowString(elevation, topShadowOffsets, topShadowOpacities);
};

export const bottomShadow = (elevation: number) => {
  return generateShadowString(
    elevation,
    bottomShadowOffsets,
    bottomShadowOpacities,
  );
};
