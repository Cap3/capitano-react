import { ThemeProvider as ThemeProviderRaw } from "emotion-theming";
import styledRaw, { CreateStyled } from "react-emotion";

export const spacingFactor = {
  spx1: 0.125,
  spx4: 0.5,
  spx8: 1,
  spx12: 1.5,
  spx16: 2,
  spx20: 2.5,
  spx24: 3,
  spx28: 3.5,
  spx32: 4,
  spx36: 4.5,
  spx40: 5,
  spx44: 5.5,
  spx48: 6,
  spx52: 6.5,
  spx56: 7,
  spx60: 7.5,
  spx65: 8.125,
  spx68: 8.5,
  spx80: 10,
  spx120: 15,
};

export const spacingAbsolute = {
  spx1: 1,
  spx2: 2,
  spx4: 4,
  spx8: 8,
  spx12: 12,
  spx16: 16,
  spx20: 20,
  spx24: 24,
  spx28: 28,
  spx32: 32,
  spx36: 36,
  spx40: 40,
  spx44: 44,
  spx48: 48,
  spx52: 52,
  spx56: 56,
  spx60: 60,
  spx65: 65,
  spx68: 68,
  spx80: 80,
  spx120: 120,
};
export type MaterialSwatch = {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
};
export type MonochromeSwatch = {
  M0: string;
  M10: string;
  M20: string;
  M30: string;
  M40: string;
  M50: string;
  M60: string;
  M70: string;
  M80: string;
  M90: string;
  base: string;
};
export type ThemeColorName = keyof CapitanoTheme["colors"];
export type ThemeColor = string | MaterialSwatch | MonochromeSwatch;
export const isMaterialSwatch = (
  val: MaterialSwatch | MonochromeSwatch,
): val is MaterialSwatch => val.hasOwnProperty("500");
export type ColorMix = {
  second: ThemeColorName;
  /**
   * 0 to 100
   */
  factor: number;
};

export type ColorFunctionLight = "lighten" | "brighten" | "tint";
export type ColorFunctionDark = "darken" | "shade";

export type ColorFunction =
  | ColorFunctionLight
  | ColorFunctionDark
  | "desaturate"
  | "saturate";

export type ColorEffect = {
  effect: ColorFunction;
  /**
   * 0 to 100
   */
  factor: number;
};

export type ColorModification = ColorEffect | ColorMix;

export const isColorEffect = (val: ColorModification): val is ColorEffect =>
  (val as ColorEffect).effect !== undefined;
export const isColorMix = (val: ColorModification): val is ColorMix =>
  (val as ColorMix).second !== undefined;

export type CapitanoTheme = {
  spacing: {
    baseUnit: number;
    formElementFactor: {
      large: number;
      medium: number;
      small: number;
    };
    borderRadiusFactor: {
      sharp: number;
      small: number;
      medium: number;
    };
  };
  colors: {
    layout: MonochromeSwatch;
    primary: MaterialSwatch;
    secondary: MaterialSwatch;
    success: MaterialSwatch;
    warning: MaterialSwatch;
    danger: MaterialSwatch;
    disabled: MonochromeSwatch;
    textOnBackground: string;
    textOnBackgroundInverse: string;
    textOnPrimary: string;
    textOnSecondary: string;
    textOnSuccess: string;
    textOnDanger: string;
    textOnDisabled: string;
  };
  statusEffects: {
    hover: ColorModification;
    pressed: ColorModification;
    focus: ColorModification;
  };
  typography: {
    fontFamily: {
      primary: string;
      secondary: string;
      monospace: string;
    };
    fontSize: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
      xxxl: number;
    };
  };
};

export type ThemeProp = { theme: CapitanoTheme };
export const styled: CreateStyled<CapitanoTheme> = styledRaw;

// prettier-ignore
export type CapitanoThemeProviderComponent = import('emotion-theming/types/index').ThemeProviderComponent<CapitanoTheme>;

export const ThemeProvider: CapitanoThemeProviderComponent = ThemeProviderRaw as any;

export { defaultLightTheme, defaultDarkTheme } from "./defaultTheme";
