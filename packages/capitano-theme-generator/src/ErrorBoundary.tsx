import * as React from "react";
import { Component, ComponentType } from "react";
import ErrorBoundaryFallbackComponent, {
  ErrorBoundaryFallbackProps,
} from "./ErrorBoundaryFallbackComponent";

type Props = {
  children?: any;
  FallbackComponent: ComponentType<ErrorBoundaryFallbackProps>;
  onError?: (error: Error, componentStack: string) => void;
};

type ErrorInfo = {
  componentStack: string;
};

type State = {
  error: Error | null;
  info: ErrorInfo | null;
};

export class ErrorBoundary extends Component<Props, State> {
  static defaultProps = {
    FallbackComponent: ErrorBoundaryFallbackComponent,
  };

  state: State = {
    error: null,
    info: null,
  };

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const { onError } = this.props;

    if (typeof onError === "function") {
      try {
        onError.call(this, error, info ? info.componentStack : "");
      } catch (ignoredError) {
        console.error(ignoredError);
      }
    }

    this.setState({ error, info });
  }

  render() {
    const { children, FallbackComponent } = this.props;
    const { error, info } = this.state;

    if (error !== null) {
      return (
        <FallbackComponent
          componentStack={info ? info.componentStack : ""}
          error={error}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
