import { Input } from "@/shared/components/ui/input";
import { Link } from "@tanstack/react-router";
import { RememberMe } from "./remember-me";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { useLoginForm } from "../hooks/useLoginForm";
import { RegisterPropmt } from "./register-prompt";

export function LoginForm() {
    const { register, handleSubmit, errors } = useLoginForm();
    const { handleLogin, isPending } = useLoginMutation();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const result = await handleLogin({
                email: data.email,
                password: data.password,
            });
            if (!result.success) {
                console.error("Login failed:", result.error);
                return;
            }
            console.log("Login successful:", result.data);
        } catch (error) {
            console.error("Unexpected error during login:", error);
        }
    });

    return (
        <form className="flex flex-col gap-3 w-2/4" onSubmit={onSubmit}>
            <h1 className="font-bold text-3xl">Login</h1>
            <Input
                {...register("email", { required: true })}
                placeholder="Email"
                type="email"
            />
            <Input
                {...register("password", { required: true })}
                placeholder="Password"
                type="password"
            />

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
