import { useForm } from "react-hook-form";
import { LoginFormData } from "../model/types";

export const useLoginForm = () => {
    const form = useForm<LoginFormData>({
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
