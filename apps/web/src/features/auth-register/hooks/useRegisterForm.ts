import { useForm } from "react-hook-form";
import { RegisterFormData } from "../model/types";

export const useRegisterForm = () => {
    const form = useForm<RegisterFormData>({
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
        },
    });

    return {
        form,
        register: form.register,
        handleSubmit: form.handleSubmit,
        errors: form.formState.errors,
    };
};
