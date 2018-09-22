// @flow
import * as React from "react";
import { CapitanoTheme } from "./index";
import { object } from "prop-types";

export const emotionContextChannel = "__EMOTION_THEMING__";
export const emotionContextTypes = {
  [emotionContextChannel]: object.isRequired,
};

type Props = {
  children?: (theme: CapitanoTheme) => React.ReactNode;
};

type EmotionSubscribe = (callback: (theme: CapitanoTheme) => void) => number;
type EmotionContext = {
  subscribe: EmotionSubscribe;
  unsubscribe: (subId: number) => void;
};

export class EmotionThemeConsumer extends React.Component {
  static contextTypes = emotionContextTypes;
  unsubscribeId: number = -1;

  context!: { [emotionContextChannel]: EmotionContext | undefined };

  state: { theme?: CapitanoTheme } = {};

  props!: Props;

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
  }

  componentWillUnmount() {
    const themeContext = this.context[emotionContextChannel];

    if (this.unsubscribeId !== -1 && themeContext) {
      themeContext.unsubscribe(this.unsubscribeId);
    }
  }

  render() {
    const { children } = this.props;
    const { theme } = this.state;

    if (children && theme) {
      return children(theme);
    } else {
      return null;
    }
  }
}
