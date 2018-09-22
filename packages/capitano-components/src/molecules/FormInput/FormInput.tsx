import * as React from "react";
import { styled, spacingAbsolute } from "@cap3/capitano-theme";
import { formElementHeight } from "../../atoms/basics/formElementHelpers";
import { Input, EllipsisText, Icons } from "../../atoms";
import { Label } from "../../atoms/Label/Label";
import {
  ValidationMessage,
  ValidationMessageProps,
} from "../../atoms/ValidationMessage/ValidationMessage";
import { InputProps } from "../../atoms/Input/Input";
import { css } from "emotion";

export type LabelPositionProp = {
  labelPosition?: "top" | "left";
};

type ValidatedProp = { validated?: boolean };
export type FormInputProps = ValidatedProp &
  InputProps &
  ValidationMessageProps &
  LabelPositionProp & {
    labelProps?: React.HtmlHTMLAttributes<HTMLLabelElement>;
    inputRef?: JSX.IntrinsicElements["input"]["ref"];
    label?: string;
    validationIcon?: boolean;
    validationMessage?: string;
  };

const iconClass = css({
  width: spacingAbsolute.spx16,
  height: spacingAbsolute.spx16,
  position: "absolute",
  right: spacingAbsolute.spx8,
  boxSizing: "border-box",
  gridArea: "input",
  color: "currentcolor",
});

const StyledLabel = styled(Label)<
  { hasLabel: boolean } & ValidatedProp &
    LabelPositionProp &
    ValidationMessageProps
>(({ labelPosition, invalid, theme, validated, hasLabel }) => {
  const leftLabel = labelPosition === "left";
  const gridTemplateAreas = leftLabel
    ? '"label input" ". message"'
    : '"label" "input" "message"';

  const validationColor =
    validated &&
    (invalid ? theme.colors.danger["500"] : theme.colors.success["500"]);

  return {
    color: validationColor || undefined,
    height: "auto",
    textAlign: leftLabel ? "right" : "left",
    display: "grid",
    gridTemplateAreas,
    gridColumnGap: hasLabel ? spacingAbsolute.spx8 : 0,
    gridTemplateColumns: leftLabel ? `${hasLabel ? 76 : 0}px 1fr` : "1fr",
    alignItems: "center",
    gridTemplateRows: leftLabel
      ? `${formElementHeight("medium", theme)}px 14px`
      : `18px ${formElementHeight("medium", theme)}px 14px`,
  };
});

const StyledInput = styled(Input)({
  gridArea: "input",
  color: "currentcolor",
});

const LabelText = styled(EllipsisText)(({ theme }) => ({
  gridArea: "label",
  color: theme.colors.layout.M60,
}));

const StyledValidationMessage = styled(ValidationMessage)({
  gridArea: "message",
  textAlign: "right",
});

export const FormInput: React.SFC<FormInputProps> = ({
  invalid,
  validationMessage,
  label,
  labelPosition = "left",
  labelProps,
  inputRef,
  validationIcon,
  validated,
  ...props
}) => {
  const validDefined = invalid !== undefined;
  const showValidationMessage = validDefined && validationMessage !== undefined;

  const showValidationIcon = validationIcon && validDefined;

  const ValidationIcon = invalid ? Icons.Close : Icons.Check;

  return (
    <StyledLabel
      hasLabel={!!label}
      invalid={invalid}
      validated={validated}
      labelPosition={labelPosition}
      {...labelProps}
    >
      {label !== undefined && <LabelText>{label}</LabelText>}
      <StyledInput {...props} innerRef={inputRef} />
      {showValidationIcon && <ValidationIcon className={iconClass} />}
      {showValidationMessage && (
        <StyledValidationMessage invalid={invalid}>
          {validationMessage}
        </StyledValidationMessage>
      )}
    </StyledLabel>
  );
};
