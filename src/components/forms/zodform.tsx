import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;


export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: FormData) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email")}
                type="email"
                placeholder="Email"
            />
            {errors.email && <p>{errors.email.message}</p>}

            <input {...register("password")} 
                type="password" 
                placeholder="Password" 
            />
            {errors.password && <p>{errors.password.message}</p>}

            <button type="submit">
                Login
            </button>
        </form>
    );
}