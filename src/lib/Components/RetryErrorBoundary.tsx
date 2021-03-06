import { captureMessage } from "@sentry/react-native"
import React from "react"
import { LoadFailureView } from "./LoadFailureView"

enum ErrorState {
  Okay,
  Error,
  Retry,
}

interface Props {
  render: (props: { isRetry: boolean }) => React.ReactNode
}

interface State {
  errorState: ErrorState
}

/// Catches any errors and shows a failure screen. The user can tap a button to retry the render, which is indicated to
/// the render prop with a parameter value of `true`.
export class RetryErrorBoundary extends React.Component<Props, State> {
  // @ts-expect-error STRICTNESS_MIGRATION --- 🚨 Unsafe legacy code 🚨 Please delete this and fix any type errors if you have time 🙏
  static getDerivedStateFromError(error) {
    console.error(error)
    captureMessage(error.stack)
    return { errorState: ErrorState.Error }
  }

  state = {
    errorState: ErrorState.Okay,
  }

  render() {
    const { render } = this.props
    const containers = {
      [ErrorState.Okay]: () => render({ isRetry: false }),
      [ErrorState.Error]: () => <LoadFailureView onRetry={() => this.setState({ errorState: ErrorState.Retry })} />,
      [ErrorState.Retry]: () => render({ isRetry: true }),
    }
    return containers[this.state.errorState]()
  }
}
