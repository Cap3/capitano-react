import { CapitanoTheme, spacingAbsolute, ThemeProp } from '@cap3/capitano-theme';
import assertNever from '../../utils/assertNever';
import { CSSObject } from 'create-emotion';

export type FormElementRadius = 'sharp' | 'small' | 'medium' | 'round';
export type FormElementSize = 'large' | 'medium' | 'small';

const defaultSize: FormElementSize = 'medium';

export type FormElementBorderProps = {
  outlined?: boolean;
  radius?: FormElementRadius;
};
export type FormElementDimensionsProps = {
  size?: FormElementSize;
} & FormElementWidthProps;

export const getFormElementBorderRadius = (
  radius: FormElementRadius = 'medium',
  height: number,
  theme: CapitanoTheme,
) => {
  switch (radius) {
    case 'round':
      return height / 2;
    case 'sharp':
    case 'small':
    case 'medium':
      return theme.spacing.borderRadiusFactor[radius] * theme.spacing.baseUnit;
    default:
      return assertNever(radius);
  }
};
export type FormElementWidthProps = { fixed?: boolean };
export const formElementWidth = ({ fixed }: FormElementWidthProps): CSSObject => {
  const width = fixed ? 120 : 'auto'; // TODO fixed form element size as theme constant
  return { width };
};
export const formElementBaseStyle = ({
  radius,
  size,
  outlined,
  fixed,
  theme,
}: ThemeProp & FormElementDimensionsProps & FormElementBorderProps): CSSObject => {
  const height = formElementHeight(size, theme);
  const borderRadius = outlined ? getFormElementBorderRadius(radius, height, theme) : 0;

  return { borderRadius, height, ...formElementWidth({ fixed }) };
};

export const formElementHeight = (size: FormElementSize = defaultSize, theme: CapitanoTheme) =>
  theme.spacing.formElementFactor[size || 'medium'] * theme.spacing.baseUnit;

export const fontSizeForElementSize = (
  size: FormElementSize = defaultSize,
  theme: CapitanoTheme,
) => {
  return theme.typography.fontSize[size];
};

export const formElementInputBaseStyle = ({
  theme,
  size = defaultSize,
}: { theme: CapitanoTheme } & FormElementDimensionsProps): CSSObject => ({
  boxSizing: 'border-box',
  minWidth: '65px', // TODO: get this value from the theme file?
  paddingLeft: spacingAbsolute.spx8,
  paddingRight: spacingAbsolute.spx8,
  height: theme.spacing.formElementFactor[size] * theme.spacing.baseUnit,
  fontSize: fontSizeForElementSize(size, theme),
  color: theme.colors.textOnBackground,
  backgroundColor: theme.colors.layout.base, // TODO: correct color from theme?
  fontFamily: theme.typography.fontFamily.base, // TODO: put Archivo font into theme file.
  outline: 'none',
});

export const formElementBorderStyle = ({
  outlined = false,
  theme,
}: FormElementBorderProps & ThemeProp): CSSObject => {
  const base = {
    borderColor: theme.colors.layout.M30,
    borderWidth: 1,
  };
  return outlined
    ? {
        ...base,
        borderStyle: 'solid',
      }
    : {
        ...base,
        borderStyle: 'none',
        borderBottomStyle: 'solid',
        borderWidth: 1,
      };
};
