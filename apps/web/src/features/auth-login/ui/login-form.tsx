import { Input } from "@/shared/components/ui/input";
import { Link } from "@tanstack/react-router";
import { useCallback } from "react";
import { useLogin } from "../hooks/useLogin";
import { useLoginForm } from "../hooks/useLoginForm";
import { RegisterPropmt } from "./register-prompt";
import { RememberMe } from "./remember-me";

export function LoginForm() {
    const { register, handleSubmit, errors } = useLoginForm();

    const { handleLoginSubmit, isPending } = useLogin();

    const onSubmit = useCallback(
        handleSubmit((data) => handleLoginSubmit(data)),
        [],
    );

    return (
        <form className="flex flex-col gap-3 w-2/4" onSubmit={onSubmit}>
            <h1 className="font-bold text-3xl">Login</h1>
            <Input {...register("email", { required: true })} placeholder="Email" type="email" />
            <Input {...register("password", { required: true })} placeholder="Password" type="password" />

            <div className="flex items-center justify-between text-sm mb-4">
                <RememberMe register={register} />
                <Link className="hover:text-yellow-400 hover:underline" to=".">
                    Forgot password?
                </Link>
            </div>

            <input
                type="submit"
                value={isPending ? "Logging in..." : "Login"}
                className="px-2 py-4 rounded-md bg-yellow-400 text-ltgray font-bold cursor-pointer hover:underline hover:bg-yellow-300 transition-all duration-100"
                disabled={isPending}
            />

            <RegisterPropmt />
        </form>
    );
}
