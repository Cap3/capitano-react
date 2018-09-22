import * as React from "react";

type Props = {
  children: React.ReactNode;
  onError: (e: any) => void;
};

export default class Wrapper extends React.Component<Props> {
  componentDidCatch(error: any) {
    this.props.onError(error);
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
