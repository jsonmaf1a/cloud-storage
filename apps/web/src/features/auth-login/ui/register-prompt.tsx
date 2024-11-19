import { Link } from "@tanstack/react-router";

export function RegisterPropmt() {
    return (
        <span className="text-center mt-2">
            Not a member?{" "}
            <Link
                className="bg-yellow-400 text-ltgray px-1 hover:underline"
                to="/auth/register"
            >
                Register
            </Link>
        </span>
    );
}
