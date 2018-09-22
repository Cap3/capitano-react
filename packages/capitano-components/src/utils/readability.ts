import { readability, mostReadable, ColorInput } from "@ctrl/tinycolor";

export const mostReadableWithPreference = (
  background: ColorInput,
  preferredColor: string,
  fallbackColors: string[],
  bwFallback = false,
) => {
  const contrast = readability(background, preferredColor);

  if (contrast >= 3) {
    return preferredColor;
  } else {
    const chosenColor = mostReadable(background, fallbackColors, {
      includeFallbackColors: bwFallback,
      level: "AA",
      size: "large",
    });
    return chosenColor ? chosenColor.toRgbString() : preferredColor;
  }
};
