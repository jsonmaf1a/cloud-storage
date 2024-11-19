import { AuthRegisterDto } from "@cloud/shared";
import { useForm } from "react-hook-form";

export const useRegisterForm = () => {
    const form = useForm<AuthRegisterDto>({
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
