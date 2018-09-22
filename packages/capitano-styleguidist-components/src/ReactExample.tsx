import {
  emotionContextTypes,
  emotionContextChannel,
} from "@cap3/capitano-theme/lib/EmotionThemeConsumer";
//@ts-ignore
import { transform } from "buble";
import * as PropTypes from "prop-types";
import * as React from "react";
import { Component } from "react";
import splitExampleCode from "./splitExampleCode";
import Wrapper from "./Wrapper";

/* eslint-disable no-invalid-this, react/no-multi-comp */

const FragmentTag = React.Fragment ? "React.Fragment" : "div";

const compileCode = (code: string, config: any) => transform(code, config).code;
const wrapCodeInFragment = (code: string) =>
  `<${FragmentTag}>${code}</${FragmentTag}>;`;

// Wrap everything in a React component to leverage the state management
// of this component

type StateHolderProps = {
  component: (
    state: StateHolderState,
    setState: Component<StateHolderProps, StateHolderState>["setState"],
  ) => React.ReactNode;
  initialState: StateHolderState;
};
type StateHolderState = any;
class StateHolder extends Component<StateHolderProps, StateHolderState> {
  static propTypes = {
    component: PropTypes.func.isRequired,
    initialState: PropTypes.object.isRequired,
  };

  state = this.props.initialState;
  setStateBinded = this.setState.bind(this);

  render() {
    return this.props.component(this.state, this.setStateBinded);
  }
}

type Props = {
  code: string;
  evalInContext: (code: string) => () => any;
  onError: (e: Error) => void;
  compilerConfig: any;
};

type State = {};
export default class ReactExample extends Component<Props, State> {
  static propTypes = {
    code: PropTypes.string.isRequired,
    evalInContext: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    compilerConfig: PropTypes.object,
  };
  static contextTypes = {
    [emotionContextChannel]: emotionContextTypes[emotionContextChannel],
  };

  shouldComponentUpdate(nextProps: Props) {
    return this.props.code !== nextProps.code;
  }

  // Eval the code to extract the value of the initial state
  getExampleInitialState(compiledCode: string) {
    if (compiledCode.indexOf("initialState") === -1) {
      return {};
    }

    return this.props.evalInContext(`
			var state = {}, initialState = {};
			try {
				${compiledCode};
			} catch (err) {}
			return initialState;
		`)();
  }

  // Run example code and return the last top-level expression
  getExampleComponent(compiledCode: string) {
    return this.props.evalInContext(`
			var initialState = {};
			${compiledCode}
		`);
  }

  compileCode(code: string) {
    try {
      const wrappedCode = code.trim().match(/^</)
        ? wrapCodeInFragment(code)
        : code;
      return compileCode(wrappedCode, this.props.compilerConfig);
    } catch (err) {
      if (this.props.onError) {
        this.props.onError(err);
      }
    }
    return false;
  }

  render() {
    const compiledCode = this.compileCode(this.props.code);
    if (!compiledCode) {
      return null;
    }

    const { head, example } = splitExampleCode(compiledCode);
    const initialState = this.getExampleInitialState(head);
    const exampleComponent = this.getExampleComponent(example);
    const wrappedComponent = (
      <Wrapper onError={this.props.onError}>
        <StateHolder component={exampleComponent} initialState={initialState} />
      </Wrapper>
    );
    return wrappedComponent;
  }
}
