import { Input } from "@/shared/components/ui/input";
import { LoginPrompt } from "./login-prompt";
import { useRegisterMutation } from "../../hooks/useRegisterMutation";
import { useRegisterForm } from "../../hooks/useRegisterForm";

export function RegisterForm() {
    const { register, handleSubmit, errors } = useRegisterForm();
    const { handleRegister, isPending } = useRegisterMutation();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const result = await handleRegister({
                email: data.email,
                password: data.password,
                lastName: data.lastName,
                firstName: data.firstName,
            });
            if (!result.success) {
                console.error("Register failed:", result.error);
                return;
            }
            console.log("Register successful:", result.data);
        } catch (error) {
            console.error("Unexpected error during register:", error);
        }
    });

    return (
        <form className="flex flex-col gap-3 w-2/4" onSubmit={onSubmit}>
            <h1 className="font-bold text-3xl">Register</h1>
            <Input
                {...register("firstName", { required: true })}
                placeholder="First name"
            />
            <Input
                {...register("lastName", { required: true })}
                placeholder="Last name"
            />
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
            <input
                type="submit"
                value={isPending ? "Registration..." : "Register"}
                className="px-2 py-4 rounded-md bg-yellow-400 text-ltgray font-bold cursor-pointer hover:underline hover:bg-yellow-300 transition-all duration-100"
                disabled={isPending}
            />

            <LoginPrompt />
        </form>
    );
}
