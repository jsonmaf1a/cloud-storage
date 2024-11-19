import { Input } from "@/shared/components/ui/input";
import { useCallback } from "react";
import { useRegister } from "../hooks/useRegister";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { LoginPrompt } from "./login-prompt";

export function RegisterForm() {
    const { register, handleSubmit, errors } = useRegisterForm();

    const { handleRegisterSubmit, isPending } = useRegister();

    const onSubmit = useCallback(
        handleSubmit((data) => handleRegisterSubmit(data)),
        [],
    );

    return (
        <form className="flex flex-col gap-3 w-2/4" onSubmit={onSubmit}>
            <h1 className="font-bold text-3xl">Register</h1>
            <Input {...register("firstName", { required: true })} placeholder="First name" />
            <Input {...register("lastName", { required: true })} placeholder="Last name" />
            <Input {...register("email", { required: true })} placeholder="Email" type="email" />
            <Input {...register("password", { required: true })} placeholder="Password" type="password" />
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
