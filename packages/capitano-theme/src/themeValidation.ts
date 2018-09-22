import {
  Decoder,
  number,
  object,
  oneOf,
  string,
} from "@mojotech/json-type-validation";
import {
  CapitanoTheme,
  ColorEffect,
  ColorFunction,
  ColorMix,
  ColorModification,
  MaterialSwatch,
  MonochromeSwatch,
  ThemeColorName,
} from "./index";

const colorFunctionDecoder = oneOf<ColorFunction>(
  Decoder.constant<ColorFunction>("lighten"),
  Decoder.constant<ColorFunction>("brighten"),
  Decoder.constant<ColorFunction>("darken"),
  Decoder.constant<ColorFunction>("tint"),
  Decoder.constant<ColorFunction>("shade"),
  Decoder.constant<ColorFunction>("desaturate"),
  Decoder.constant<ColorFunction>("saturate"),
);

const colorEffectDecoder = object<ColorEffect>({
  effect: colorFunctionDecoder,
  factor: number(),
});

const materialSwatchDecoder = object<MaterialSwatch>({
  "50": string(),
  "100": string(),
  "200": string(),
  "300": string(),
  "400": string(),
  "500": string(),
  "600": string(),
  "700": string(),
  "800": string(),
  "900": string(),
  A100: string(),
  A200: string(),
  A400: string(),
  A700: string(),
});

const monochromeSwatchDecoder = object<MonochromeSwatch>({
  M0: string(),
  M10: string(),
  M20: string(),
  M30: string(),
  M40: string(),
  M50: string(),
  M60: string(),
  M70: string(),
  M80: string(),
  M90: string(),
  base: string(),
});

const themeColorDecoder = oneOf<ThemeColorName>(
  Decoder.constant<ThemeColorName>("layout"),
  Decoder.constant<ThemeColorName>("textOnBackground"),
  Decoder.constant<ThemeColorName>("textOnBackgroundInverse"),
  Decoder.constant<ThemeColorName>("primary"),
  Decoder.constant<ThemeColorName>("textOnPrimary"),
  Decoder.constant<ThemeColorName>("secondary"),
  Decoder.constant<ThemeColorName>("textOnSecondary"),
  Decoder.constant<ThemeColorName>("success"),
  Decoder.constant<ThemeColorName>("textOnSuccess"),
  Decoder.constant<ThemeColorName>("warning"),
  Decoder.constant<ThemeColorName>("danger"),
  Decoder.constant<ThemeColorName>("textOnDanger"),
  Decoder.constant<ThemeColorName>("disabled"),
  Decoder.constant<ThemeColorName>("textOnDisabled"),
);

const clorMixDecoder = object<ColorMix>({
  second: themeColorDecoder,
  factor: number(),
});

const colorModificationDecoder = oneOf<ColorModification>(
  colorEffectDecoder,
  clorMixDecoder,
);

export const capitanoThemeDecoder: Decoder<CapitanoTheme> = object<
  CapitanoTheme
>({
  spacing: object<CapitanoTheme["spacing"]>({
    baseUnit: number(),
    formElementFactor: object<CapitanoTheme["spacing"]["formElementFactor"]>({
      large: number(),
      medium: number(),
      small: number(),
    }),
    borderRadiusFactor: object<CapitanoTheme["spacing"]["borderRadiusFactor"]>({
      sharp: number(),
      small: number(),
      medium: number(),
    }),
  }),
  colors: object<CapitanoTheme["colors"]>({
    layout: monochromeSwatchDecoder,
    textOnBackground: string(),
    textOnBackgroundInverse: string(),
    primary: materialSwatchDecoder,
    textOnPrimary: string(),
    secondary: materialSwatchDecoder,
    textOnSecondary: string(),
    success: materialSwatchDecoder,
    textOnSuccess: string(),
    warning: materialSwatchDecoder,
    danger: materialSwatchDecoder,
    textOnDanger: string(),
    disabled: monochromeSwatchDecoder,
    textOnDisabled: string(),
  }),
  statusEffects: object<CapitanoTheme["statusEffects"]>({
    hover: colorModificationDecoder,
    pressed: colorModificationDecoder,
    focus: colorModificationDecoder,
  }),
  typography: object<CapitanoTheme["typography"]>({
    fontFamily: object<CapitanoTheme["typography"]["fontFamily"]>({
      base: string(),
      monospace: string(),
    }),
    fontSize: object<CapitanoTheme["typography"]["fontSize"]>({
      medium: number(),
      large: number(),
      small: number(),
      h1: number(),
      h2: number(),
      h3: number(),
      h4: number(),
      h5: number(),
      h6: number(),
    }),
  }),
});
