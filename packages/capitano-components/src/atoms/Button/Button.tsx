import { styled, CapitanoTheme, spacingAbsolute } from "@cap3/capitano-theme";
import { focusEffect, hoverEffect, activeEffect } from "./mouseEffects";
import assertNever from "../../utils/assertNever";
import {
  FormElementRadius,
  FormElementSize,
  getFormElementBorderRadius,
} from "../basics/formElementHelpers";

export enum ButtonType {
  primary = "primary",
  secondary = "secondary",
  success = "success",
  danger = "danger",
}

type Props = {
  fixed?: boolean;
  type?: ButtonType;
  radius?: FormElementRadius;
  size?: FormElementSize;
  square?: boolean;
  outline?: boolean;
  disabled?: boolean;
};

const getColor = (
  type: ButtonType = ButtonType.primary,
  theme: CapitanoTheme,
): string => {
  switch (type) {
    case ButtonType.primary:
      return theme.colors.primary["500"];
    case ButtonType.secondary:
      return theme.colors.secondary["500"];
    case ButtonType.success:
      return theme.colors.success["500"];
    case ButtonType.danger:
      return theme.colors.danger["500"];
    default:
      return assertNever(type);
  }
};

const getTextColor = (
  type: ButtonType = ButtonType.primary,
  theme: CapitanoTheme,
): string => {
  switch (type) {
    case ButtonType.primary:
      return theme.colors.textOnPrimary;
    case ButtonType.secondary:
      return theme.colors.textOnSecondary;
    case ButtonType.success:
      return theme.colors.textOnSuccess;
    case ButtonType.danger:
      return theme.colors.textOnDanger;
    default:
      return assertNever(type);
  }
};

export const Button = styled("button")<Props>(
  {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    outline: "none",
    overflow: "hidden",
    padding: `0 ${spacingAbsolute.spx8}px`,
  },
  // colors for different types and states
  ({ theme, type, disabled = false, outline = false }) => {
    const backgroundColor = disabled
      ? theme.colors.disabled.base
      : getColor(type, theme);

    const color = disabled
      ? theme.colors.textOnDisabled
      : getTextColor(type, theme);
    const effectArgs = {
      disabled,
      swapped: outline,
      outline,
      baseColor: backgroundColor,
      theme,
    };
    const focus = focusEffect(effectArgs);
    const hover = hoverEffect(effectArgs);
    const active = activeEffect(effectArgs);

    if (outline) {
      return {
        borderWidth: "2px",
        borderColor: backgroundColor,
        borderStyle: "solid",
        backgroundColor: "transparent",
        color: backgroundColor,
        ...focus,
        ...hover,
        ...active,
      };
    } else {
      return {
        backgroundColor,
        color,
        ...focus,
        ...hover,
        ...active,
      };
    }
  },
  // text styles
  ({ theme }) => ({
    fontSize: theme.typography.fontSize.large,
    fontFamily: theme.typography.fontFamily.base,
  }),
  // cursor style
  ({ disabled }) => ({
    cursor: disabled ? "default" : "pointer",
  }),
  // button dimensions
  ({ radius, size, fixed, theme, square }) => {
    const height =
      theme.spacing.formElementFactor[size || "medium"] *
      theme.spacing.baseUnit;
    const borderRadius = getFormElementBorderRadius(radius, height, theme);

    const width = square ? height : fixed ? 120 : "auto";
    return { borderRadius, height, width };
  },
);
