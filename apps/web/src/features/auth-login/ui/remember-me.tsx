import { UseFormRegister } from "react-hook-form";
import { LoginFormData } from "../model/types";

interface RememberMeProps {
    register: UseFormRegister<LoginFormData>;
}

export function RememberMe({ register }: RememberMeProps) {
    return (
        <span className="flex items-center gap-2">
            <input
                {...register("remember")}
                type="checkbox"
                className="cursor-pointer"
            />
            Remember me
        </span>
    );
}
