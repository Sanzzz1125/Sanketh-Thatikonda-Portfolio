import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    state: State = { error: null };

    static getDerivedStateFromError(error: Error): State {
        return { error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        // eslint-disable-next-line no-console
        console.error("Portfolio crashed:", error, info.componentStack);
    }

    render() {
        const { error } = this.state;
        if (!error) return this.props.children;

        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#030304",
                    color: "#fff",
                    fontFamily:
                        "'Space Mono', ui-monospace, SFMono-Regular, monospace",
                    padding: "2.5rem 1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <h1 style={{ fontSize: "1.25rem", margin: 0 }}>
                    Something broke while rendering the page.
                </h1>
                <p style={{ color: "rgba(255,255,255,0.5)", margin: 0 }}>
                    Open the browser console for the full trace. The error
                    message is below.
                </p>
                <pre
                    style={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        color: "#ff9b9b",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        padding: "1rem",
                        borderRadius: "4px",
                        overflow: "auto",
                        fontSize: "0.85rem",
                    }}
                >
                    {error.message}
                    {"\n\n"}
                    {error.stack}
                </pre>
                <button
                    onClick={() => window.location.reload()}
                    style={{
                        alignSelf: "flex-start",
                        padding: "0.75rem 1.5rem",
                        border: "1px solid #fff",
                        background: "transparent",
                        color: "#fff",
                        cursor: "pointer",
                        fontFamily: "inherit",
                    }}
                >
                    Reload
                </button>
            </div>
        );
    }
}
