import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-6">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-playfair font-bold mb-4 text-red-500">System Malfunction</h2>
            <p className="text-zinc-400 mb-6">
              An unexpected error has occurred in the neural interface.
            </p>
            <div className="bg-black/30 p-4 rounded-md border border-white/10 mb-8 text-left overflow-auto max-h-40">
                <code className="text-xs font-mono text-red-400">
                    {this.state.error?.message || 'Unknown Error'}
                </code>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-zinc-200 transition-colors"
            >
              Reboot System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;