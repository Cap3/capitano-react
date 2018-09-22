import { CapitanoTheme, isColorEffect } from '@cap3/capitano-theme';
import { ColorInput, TinyColor } from '@ctrl/tinycolor';
import { CSSProperties } from 'react';
import { topShadow, bottomShadow } from '../basics/shadows';

type EffectColorArgs = {
  baseColor: ColorInput;
  swapped: boolean;
  outline: boolean;
  disabled?: boolean;
  theme: CapitanoTheme;
};

const effectColorStyle = (
  disabled: boolean,
  swapped: boolean,
  color: string,
  effect: 'hover' | 'focus' | 'active' | 'focus-within' | 'visited',
  custom?: CSSProperties,
) => {
  return {
    [`&:${effect}`]: {
      backgroundColor: disabled || swapped ? undefined : color,
      color: disabled || !swapped ? undefined : color,
      borderColor: disabled || !swapped ? undefined : color,
      ...custom,
    },
  };
};

export const focusEffect = ({
  disabled = false,
  theme,
  baseColor,
  swapped,
  outline,
}: EffectColorArgs) => {
  const base = new TinyColor(baseColor);

  let background: string;

  if (isColorEffect(theme.statusEffects.focus)) {
    background = base[theme.statusEffects.focus.effect](
      theme.statusEffects.focus.factor,
    ).toRgbString();
  } else {
    background = base
      .mix(theme.statusEffects.focus.second, theme.statusEffects.focus.factor)
      .toRgbString();
  }

  return effectColorStyle(
    disabled,
    swapped,
    background,
    'focus',
    outline
      ? {
          backgroundColor: 'transparent',
        }
      : undefined,
  );
};

export const activeEffect = ({
  disabled = false,
  theme,
  baseColor,
  swapped,
  outline,
}: EffectColorArgs) => {
  const base = new TinyColor(baseColor);
  let background: string;

  if (isColorEffect(theme.statusEffects.pressed)) {
    background = base[theme.statusEffects.pressed.effect](
      theme.statusEffects.pressed.factor,
    ).toRgbString();
  } else {
    background = base
      .mix(theme.statusEffects.pressed.second, theme.statusEffects.pressed.factor)
      .toRgbString();
  }

  return effectColorStyle(
    disabled,
    swapped,
    background,
    'active',
    outline
      ? {
          backgroundColor: 'transparent',
        }
      : undefined,
  );
};

export const hoverEffect = ({
  disabled = false,
  theme,
  baseColor,
  swapped,
  outline,
}: EffectColorArgs) => {
  const base = new TinyColor(baseColor);
  let background: string;

  if (isColorEffect(theme.statusEffects.hover)) {
    background = base[theme.statusEffects.hover.effect](
      theme.statusEffects.hover.factor,
    ).toRgbString();
  } else {
    background = base
      .mix(theme.statusEffects.hover.second, theme.statusEffects.hover.factor)
      .toRgbString();
  }

  return effectColorStyle(disabled, swapped, background, 'hover', {
    boxShadow: disabled ? undefined : `${topShadow(0)}, ${bottomShadow(0)}`,
    ...(outline ? { backgroundColor: 'transparent' } : undefined),
  });
};
