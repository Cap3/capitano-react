import * as React from "react";
import { styled } from "@cap3/capitano-theme";
import {
  formElementBorderStyle,
  FormElementBorderProps,
  formElementInputBaseStyle,
  formElementBaseStyle,
  FormElementDimensionsProps,
} from "../../atoms/basics/formElementHelpers";
import { placeholder } from "polished";
import { ValidationMessageProps } from "../ValidationMessage/ValidationMessage";
import { CSSObject } from "create-emotion";

export type InputProps = FormElementBorderProps &
  FormElementDimensionsProps &
  ValidationMessageProps &
  React.InputHTMLAttributes<HTMLInputElement>;

export const Input = styled("input")<InputProps>(
  formElementBaseStyle,
  formElementInputBaseStyle,
  formElementBorderStyle,
  ({ theme }) => {
    const placeHolderStyle = {
      opacity: 0.5,
      color: theme.colors.textOnBackground,
    };
    return placeholder(placeHolderStyle) as CSSObject;
  },
  ({ theme, invalid }) => {
    const validationVisible = invalid !== undefined;
    if (validationVisible) {
      const validatedColor = invalid
        ? theme.colors.success["500"]
        : theme.colors.danger["500"];

      return {
        borderColor: validatedColor,
        color: validatedColor,
      };
    } else {
      return {};
    }
  },
);
