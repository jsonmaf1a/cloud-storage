import { useForm } from "react-hook-form";
import { AuthLoginDto } from "@cloud/shared";

export const useLoginForm = () => {
    const form = useForm<AuthLoginDto>({
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    return {
        form,
        register: form.register,
        handleSubmit: form.handleSubmit,
        errors: form.formState.errors,
    };
};
