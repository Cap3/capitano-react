import { styled } from "@cap3/capitano-theme";

export type ValidationMessageProps = {
  invalid?: boolean;
};

export const ValidationMessage = styled("div")<ValidationMessageProps>(
  ({ theme, invalid }) => ({
    color: invalid ? theme.colors.danger["500"] : theme.colors.success["500"],
    fontFamily: theme.typography.fontFamily.base,
    fontSize: theme.typography.fontSize.small, // TODO: put even smaller font size vor error messages in theme
    lineHeight: theme.typography.fontSize.small + 2,
  }),
);
