import { Link } from "@tanstack/react-router";

export function LoginPrompt() {
    return (
        <span className="text-center mt-2">
            Already have account?{" "}
            <Link
                className="bg-yellow-400 text-ltgray px-1 hover:underline"
                to="/auth/login"
            >
                Login
            </Link>
        </span>
    );
}
