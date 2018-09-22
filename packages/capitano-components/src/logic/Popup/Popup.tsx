import * as React from "react";
import { createPortal } from "react-dom";
import { Placement, Modifiers } from "popper.js";
import { Manager, Popper, Reference } from "react-popper";

type TargetProps = {
  ref: (ref: HTMLElement | null) => void;
  toggle: () => void;
  visible: boolean;
};

type PopupProps = {
  ref: (ref: HTMLElement | null) => void;
  style: React.CSSProperties;
  ["data-placement"]: Placement;
  toggle: () => void;
  visible: boolean;
};
type Props = {
  placement?: Placement;
  modifiers?: Modifiers;
  target: (props: TargetProps) => React.ReactNode;
  popup: (props: PopupProps) => React.ReactNode;
  portalNode?: HTMLElement;
  disabled?: boolean;
  hideOnInsideClick?: boolean;
};
export class Popup extends React.Component<Props> {
  state: {
    visible: boolean;
  } = { visible: false };

  popupRef: HTMLElement | null = null;
  targetRef: HTMLElement | null = null;

  componentWillUnmount() {
    this.removeOutsideClickListener();
  }

  render() {
    const { target } = this.props;
    const { visible } = this.state;

    return (
      <Manager>
        <Reference>
          {({ ref }) => {
            const refSetter = (elem: HTMLElement | null) => {
              if (elem && elem !== this.targetRef) {
                this.targetRef = elem;
                ref(elem);
              }
            };
            return target({ ref: refSetter, toggle: this.toggle, visible });
          }}
        </Reference>
        {visible && this.renderPopper()}
      </Manager>
    );
  }

  renderPopper = () => {
    const {
      popup,
      placement = "bottom-start",
      modifiers,
      portalNode,
    } = this.props;
    const { visible } = this.state;

    return (
      <Popper
        modifiers={{
          preventOverflow: { enabled: true },
          flip: { enabled: true },
        }}
        {...{ placement, modifiers }}
      >
        {({ ref, style, placement }) => {
          const refSetter = (elem: HTMLElement | null) => {
            if (elem && elem !== this.popupRef) {
              this.popupRef = elem;
              ref(elem);
            }
          };
          const content = popup({
            "data-placement": placement,
            ref: refSetter,
            style: { ...style, zIndex: 10 },
            visible,
            toggle: this.toggle,
          });
          if (portalNode) {
            return createPortal(content, portalNode);
          } else {
            return content;
          }
        }}
      </Popper>
    );
  };

  toggle = () => {
    if (!this.props.disabled) {
      this.state.visible ? this.hide() : this.show();
    }
  };

  show = () => {
    this.setState({ visible: true }, () => {
      document.addEventListener("click", this.outsideClickListener);
    });
  };

  hide = () => {
    this.setState({ visible: false });
    this.removeOutsideClickListener();
  };

  removeOutsideClickListener = () => {
    document.removeEventListener("click", this.outsideClickListener);
  };

  outsideClickListener = (event: MouseEvent) => {
    const { visible } = this.state;
    if (this.props.hideOnInsideClick) {
      this.hide();
    } else if (visible && this.popupRef) {
      const rect = this.popupRef.getBoundingClientRect();
      const x = event.clientX;
      const y = event.clientY;

      if (isPointOutsideRect({ x, y }, rect)) {
        this.hide();
      }
    }
  };
}

const isPointOutsideRect = (
  { x, y }: { x: number; y: number },
  { left, right, bottom, top }: ClientRect,
) => {
  return x < left || x > right || y < top || y > bottom;
};
