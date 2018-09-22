import { styled } from '@cap3/capitano-theme';

export const Grid = styled('div')<{ columnCount?: number; gap?: number }>(
  ({ columnCount = 4, gap = 20 }) => {
    const colWidth = 100 / columnCount;
    return {
      display: 'grid',
      gridColumnGap: gap,
      gridRowGap: gap,
      gridTemplateColumns: `repeat(${columnCount}, calc(${colWidth}% - ${gap}px))`,
    };
  },
);
