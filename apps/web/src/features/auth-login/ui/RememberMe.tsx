import { AuthLoginDto } from "@cloud/shared";
import { UseFormRegister } from "react-hook-form";

interface RememberMeProps {
    register: UseFormRegister<AuthLoginDto>;
}

export function RememberMe({ register }: RememberMeProps) {
    return (
        <span className="flex items-center gap-2">
            <input {...register("remember")} type="checkbox" className="cursor-pointer" />
            Remember me
        </span>
    );
}
