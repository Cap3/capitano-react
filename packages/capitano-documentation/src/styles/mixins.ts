import { dimensions } from './variables';
import { CSSObject } from 'create-emotion';

export const getEmSize = (size: number) => size / dimensions.fontSize.regular;

export const textOverflow: CSSObject = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};
