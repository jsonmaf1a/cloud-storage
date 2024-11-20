import { FallbackProps } from "react-error-boundary";
import { Button } from "./ui/Button.tsx";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <div role="alert">
            <h2>Something went wrong</h2>
            <pre>{error.message}</pre>
            <Button onClick={resetErrorBoundary}>Try again</Button>
        </div>
    );
}
