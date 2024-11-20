import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/shared/lib/utils";

const inputVariants = cva(
    "inline-flex items-center justify-center rounded-md p-3",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary/90",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, ...props }, ref) => {
        return (
            <input
                className={cn(inputVariants({ variant, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);

Input.displayName = "Input";

export { Input };
