import { CapitanoTheme, ThemeProvider } from "@cap3/capitano-theme";
import {
  emotionContextChannel,
  emotionContextTypes,
} from "@cap3/capitano-theme/lib/EmotionThemeConsumer";
import * as PropTypes from "prop-types";
import * as React from "react";
import * as ReactDOM from "react-dom";
//@ts-ignore
import PlaygroundError from "rsg-components/PlaygroundError";
import ReactExample from "./ReactExample";

/* eslint-disable no-invalid-this */

const Fragment = React.Fragment ? React.Fragment : "div";

type EmotionSubscribe = (callback: (theme: CapitanoTheme) => void) => number;

type EmotionContext = {
  subscribe: EmotionSubscribe;
  unsubscribe: (subId: number) => void;
};

type Props = {
  code: string;
  evalInContext: (code: string) => () => any;
};
type State = {
  theme: CapitanoTheme | null;
  error: string | null;
};
export default class Preview extends React.Component<Props, State> {
  static propTypes = {
    code: PropTypes.string.isRequired,
    evalInContext: PropTypes.func.isRequired,
  };
  static contextTypes = {
    config: PropTypes.object.isRequired,
    codeRevision: PropTypes.number.isRequired,
    [emotionContextChannel]: emotionContextTypes[emotionContextChannel],
  };

  context!: {
    codeRevision: number;
    config: any;
    [emotionContextChannel]: EmotionContext | undefined;
  };

  state = {
    error: null,
    theme: null,
  };
  unsubscribeId = -1;

  mountNode = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const themeContext = this.context[emotionContextChannel];

    if (themeContext === undefined) {
      // eslint-disable-next-line no-console
      console.error(
        "[withTheme] Please use ThemeProvider to be able to use withTheme",
      );
      return;
    }
    this.unsubscribeId = themeContext.subscribe(theme => {
      this.setState({ theme });
    });

    // Clear console after hot reload, do not clear on the first load
    // to keep any warnings
    if (this.context.codeRevision > 0) {
      // eslint-disable-next-line no-console
      console.clear();
    }

    this.executeCode();
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return (
      this.state.error !== nextState.error ||
      this.props.code !== nextProps.code ||
      this.state.theme !== nextState.theme
    );
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      this.props.code !== prevProps.code ||
      this.state.theme !== prevState.theme
    ) {
      this.executeCode();
    }
  }

  componentWillUnmount() {
    this.unmountPreview();

    const themeContext = this.context[emotionContextChannel];

    if (this.unsubscribeId !== -1 && themeContext) {
      themeContext.unsubscribe(this.unsubscribeId);
    }
  }

  unmountPreview() {
    if (this.mountNode.current) {
      ReactDOM.unmountComponentAtNode(this.mountNode.current);
    }
  }

  executeCode() {
    this.setState({
      error: null,
    });

    const { code } = this.props;
    const { theme } = this.state;
    if (!code || !theme) {
      return;
    }

    const wrappedComponent = (
      <ThemeProvider theme={theme}>
        <ReactExample
          code={code}
          evalInContext={this.props.evalInContext}
          onError={this.handleError}
          compilerConfig={this.context.config.compilerConfig}
        />
      </ThemeProvider>
    );

    window.requestAnimationFrame(() => {
      this.unmountPreview();
      try {
        ReactDOM.render(wrappedComponent, this.mountNode.current);
      } catch (err) {
        this.handleError(err);
      }
    });
  }

  handleError = (err: Error) => {
    this.unmountPreview();

    this.setState({
      error: err.toString(),
    });

    console.error(err); // eslint-disable-line no-console
  };

  render() {
    const { error } = this.state;
    return (
      <Fragment>
        <div ref={this.mountNode} />
        {error && <PlaygroundError message={error} />}
      </Fragment>
    );
  }
}
