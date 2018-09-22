import * as React from "react";
import Downshift from "downshift";
import { Manager, Popper, Reference } from "react-popper";
import { Input, InputProps } from "../../atoms/Input/Input";
import { bottomShadow } from "../../atoms/basics/shadows";
import { styled } from "@cap3/capitano-theme";
import {
  FormElementSize,
  formElementHeight,
  fontSizeForElementSize,
  getFormElementBorderRadius,
  FormElementRadius,
  formElementBorderStyle,
  formElementWidth,
} from "../../atoms/basics/formElementHelpers";
import { css, cx } from "emotion";
import { Icons } from "../../atoms";
import { mix, getLuminance } from "polished";

type Props<T> = InputProps & {
  items: T[];
  selectedItem?: T;
  itemToString: (item: T) => string;
  onValueSelected: (selection: T) => void;
  textInput?: boolean;
  renderItem?: (item: T) => React.ReactNode;
  inputClassName?: string;
  filterOnType?: boolean;
};

const SelectWrapper = styled("div")({
  position: "relative",
  display: "flex",
  alignItems: "center",
  flexShrink: 1,
  cursor: "pointer",
});
const FlexWrapper = styled("div")({ display: "flex" });

const PopupContainer = styled("div")<{
  outlined?: boolean;
  size?: FormElementSize;
  radius?: FormElementRadius;
}>(({ theme, size, radius }) => {
  const inputHeight = formElementHeight(size || "medium", theme);
  const borderRadius = getFormElementBorderRadius(radius, inputHeight, theme);
  const width = formElementWidth({ fixed: true });
  return {
    overflow: "hidden",
    boxShadow: bottomShadow(2),
    borderRadius,
    borderTop: "none",
    ...width,
  };
}, formElementBorderStyle);

const StyledInput = styled(Input)({
  cursor: "pointer",
});

const dropDownIconClass = css({
  position: "absolute",
  right: 8,
});

const { ArrowUp, ArrowDown } = Icons;

export type OptionProps = {
  selected: boolean;
  size: FormElementSize;
  highlighted: boolean;
  outline: boolean;
  odd: boolean;
};
const Option = styled("div")<OptionProps>(
  ({ theme, selected, highlighted, size, odd }) => {
    const oddColor =
      getLuminance(theme.colors.layout.M90) > 0.5
        ? mix(0.1, theme.colors.primary["900"], theme.colors.layout.M90)
        : mix(0.2, theme.colors.primary["50"], theme.colors.layout.M90);

    return {
      fontFamily: theme.typography.fontFamily.base,
      fontSize: fontSizeForElementSize(size, theme),
      fontWeight: selected ? 600 : 400,
      backgroundColor: highlighted
        ? theme.colors.primary["500"]
        : odd
          ? oddColor
          : theme.colors.layout.M90,
      color: highlighted
        ? theme.colors.textOnPrimary
        : theme.colors.textOnBackground,
      padding: `4px 8px`,
      height: formElementHeight(size, theme),
      display: "flex",
      alignItems: "center",
    };
  },
);

const bottomBorderRadiusCleared = css({
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
});

const topBorderRadiusCleared = css({
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
});

export class Select<T> extends React.Component<Props<T>> {
  render() {
    const {
      items,
      onValueSelected,
      itemToString,
      renderItem,
      className,
      inputClassName,
      textInput,
      value,
      selectedItem,
      filterOnType,
      ...inputProps
    } = this.props;

    const optionRenderer = renderItem || itemToString;

    return (
      <Manager>
        <Downshift
          selectedItem={selectedItem}
          onChange={onValueSelected}
          itemToString={itemToString}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
            getRootProps,
            getToggleButtonProps,
            closeMenu,
          }) => (
            <FlexWrapper
              {...getRootProps({ refKey: "innerRef" })}
              className={className}
            >
              <SelectWrapper {...getToggleButtonProps()}>
                <Reference>
                  {({ ref }) => {
                    return (
                      <StyledInput
                        labelProps={getLabelProps()}
                        {...inputProps}
                        {...getInputProps()}
                        className={
                          isOpen
                            ? cx(inputClassName, bottomBorderRadiusCleared)
                            : inputClassName
                        }
                        disabled={!textInput}
                        innerRef={ref}
                        onBlur={closeMenu}
                      />
                    );
                  }}
                </Reference>
                {isOpen ? (
                  <ArrowUp className={dropDownIconClass} size={24} />
                ) : (
                  <ArrowDown className={dropDownIconClass} size={24} />
                )}
                {isOpen ? (
                  <Popper
                    modifiers={{
                      flip: { enabled: false },
                      inner: { enabled: false },
                    }}
                  >
                    {({ ref, style, ...popperProps }) => {
                      return (
                        <PopupContainer
                          {...popperProps}
                          style={{ ...style, zIndex: 10 }}
                          innerRef={elem => {
                            if (elem) {
                              ref(elem);
                            }
                          }}
                          outlined={inputProps.outlined}
                          size={inputProps.size}
                          radius={inputProps.radius}
                          className={cx(topBorderRadiusCleared)}
                        >
                          {items
                            .filter(
                              item =>
                                !filterOnType ||
                                !inputValue ||
                                itemToString(item).includes(inputValue),
                            )
                            .map((item, index) => {
                              const itemProps = getItemProps({
                                key: itemToString(item),
                                index,
                                item,
                              });
                              return (
                                <Option
                                  key={index}
                                  odd={index % 2 === 1}
                                  size={inputProps.size}
                                  highlighted={highlightedIndex === index}
                                  selected={selectedItem === item}
                                  {...itemProps}
                                >
                                  {optionRenderer(item)}
                                </Option>
                              );
                            })}
                        </PopupContainer>
                      );
                    }}
                  </Popper>
                ) : null}
              </SelectWrapper>
            </FlexWrapper>
          )}
        </Downshift>
      </Manager>
    );
  }
}
