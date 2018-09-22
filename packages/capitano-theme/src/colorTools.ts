import { TinyColor } from "@ctrl/tinycolor";
import { EasingFunctions } from "./easing";
import {
  ColorModification,
  isColorEffect,
  MaterialSwatch,
  MonochromeSwatch,
} from "./index";

export const calcColor = (base: TinyColor, modification: ColorModification) => {
  return isColorEffect(modification)
    ? base[modification.effect](modification.factor)
    : base.mix(modification.second, modification.factor);
};

export const multiply = (rgb1: TinyColor, rgb2: TinyColor) => {
  const r = Math.floor((rgb1.r * rgb2.r) / 255);
  const g = Math.floor((rgb1.g * rgb2.g) / 255);
  const b = Math.floor((rgb1.b * rgb2.b) / 255);
  return new TinyColor(`rgb(${r}, ${g}, ${b})`);
};

export const getColorObject = (color: TinyColor, name: string) => {
  return {
    name,
    hex: color.toHexString(),
    darkContrast: color.isLight(),
    luminance: color.getLuminance(),
  };
};

export const monochromeThemeSwatch = (base: string) => {
  const rawSwatch = monochromeColorSwatch(new TinyColor(base));
  // tslint:disable-next-line:no-object-literal-type-assertion
  const result = {} as MonochromeSwatch;
  return rawSwatch.reduce((swatch, color) => {
    swatch[color.name as keyof MonochromeSwatch] = color.hex;
    return swatch;
  }, result);

  return result;
};

export const materialThemeSwatch = (base: string) => {
  const rawSwatch = calcMaterialSwatch(new TinyColor(base));
  // tslint:disable-next-line:no-object-literal-type-assertion
  const result = {} as MaterialSwatch;
  return rawSwatch.reduce((swatch, color) => {
    swatch[color.name as keyof MaterialSwatch] = color.hex;
    return swatch;
  }, result);

  return result;
};
export const monochromeColorSwatch = (base: TinyColor) => {
  const lightStep =
    (base.isDark() ? 1 - base.toHsl().l : base.toHsl().l * -1) * 10;

  const easeFunction = EasingFunctions.easeOutQuint;

  if (base.isDark()) {
    return [
      getColorObject(base.lighten(10 * lightStep * easeFunction(1)), "M0"),
      getColorObject(base.lighten(9.6 * lightStep * easeFunction(0.96)), "M10"),
      getColorObject(base.lighten(9.2 * lightStep * easeFunction(0.92)), "M20"),
      getColorObject(base.lighten(8.4 * lightStep * easeFunction(0.84)), "M30"),
      getColorObject(base.lighten(7.5 * lightStep * easeFunction(0.75)), "M40"),
      getColorObject(base.lighten(6.6 * lightStep * easeFunction(0.66)), "M50"),
      getColorObject(base.lighten(5.6 * lightStep * easeFunction(0.56)), "M60"),
      getColorObject(base.lighten(4.6 * lightStep * easeFunction(0.46)), "M70"),
      getColorObject(base.lighten(3.5 * lightStep * easeFunction(0.35)), "M80"),
      getColorObject(base.lighten(2 * lightStep * easeFunction(0.2)), "M90"),
      getColorObject(base, "base"),
    ];
  } else {
    return [
      getColorObject(base.lighten(10 * lightStep * easeFunction(1)), "M0"),
      getColorObject(base.lighten(8 * lightStep * easeFunction(0.8)), "M10"),
      getColorObject(base.lighten(6.5 * lightStep * easeFunction(0.65)), "M20"),
      getColorObject(base.lighten(5.4 * lightStep * easeFunction(0.54)), "M30"),
      getColorObject(base.lighten(4.4 * lightStep * easeFunction(0.44)), "M40"),
      getColorObject(base.lighten(3.4 * lightStep * easeFunction(0.34)), "M50"),
      getColorObject(base.lighten(2.5 * lightStep * easeFunction(0.25)), "M60"),
      getColorObject(base.lighten(1.6 * lightStep * easeFunction(0.16)), "M70"),
      getColorObject(base.lighten(0.8 * lightStep * easeFunction(0.08)), "M80"),
      getColorObject(base.lighten(0.4 * lightStep * easeFunction(0.04)), "M90"),
      getColorObject(base, "base"),
    ];
  }
};

export const calcMaterialSwatch = (hex: TinyColor) => {
  const baseLight = new TinyColor("#ffffff");
  const baseDark = multiply(hex, hex);
  const baseTriad = hex.tetrad();

  return [
    getColorObject(baseLight.mix(hex, 12), "50"),
    getColorObject(baseLight.mix(hex, 30), "100"),
    getColorObject(baseLight.mix(hex, 50), "200"),
    getColorObject(baseLight.mix(hex, 70), "300"),
    getColorObject(baseLight.mix(hex, 85), "400"),
    getColorObject(baseLight.mix(hex, 100), "500"),
    getColorObject(baseDark.mix(hex, 87), "600"),
    getColorObject(baseDark.mix(hex, 70), "700"),
    getColorObject(baseDark.mix(hex, 54), "800"),
    getColorObject(baseDark.mix(hex, 25), "900"),
    getColorObject(
      baseDark
        .mix(baseTriad[4], 15)
        .saturate(80)
        .lighten(65),
      "A100",
    ),
    getColorObject(
      baseDark
        .mix(baseTriad[4], 15)
        .saturate(80)
        .lighten(55),
      "A200",
    ),
    getColorObject(
      baseDark
        .mix(baseTriad[4], 15)
        .saturate(100)
        .lighten(45),
      "A400",
    ),
    getColorObject(
      baseDark
        .mix(baseTriad[4], 15)
        .saturate(100)
        .lighten(40),
      "A700",
    ),
  ];
};
