import React from "react";

import Logo from "../components/common/Logo";

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, State> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen w-full items-center justify-center text-xl bold bg-gray-800">
          <div>
            <div className="flex justify-center mb-10">
              <Logo />
            </div>
            <div className="text-gray-600">
              Unfortunately something went wrong.{" "}
              <span role="img" aria-label="sad and embarrassed face">
                😓
              </span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
