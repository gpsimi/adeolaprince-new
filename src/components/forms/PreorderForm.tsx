import React from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



// Preorder form schema
const preorderSchema = z.object({
    fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
    email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
    phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20, "Phone number too long"),
    quantity: z.coerce.number().min(1, "Minimum quantity is 1").max(50, "Maximum quantity is 50"),
});

type PreorderFormValues = z.infer<typeof preorderSchema>;

// Paystack types
interface PaystackResponse {
    reference: string;
    status: string;
    trans: string;
    message: string;
}

interface PaystackSetup {
    key: string;
    email: string;
    amount: number;
    currency: string;
    ref: string;
    metadata?: {
        custom_fields: Array<{
            display_name: string;
            variable_name: string;
            value: string;
        }>;
    };
    callback: (response: PaystackResponse) => void;
    onClose: () => void;
}

export const PreorderForm = () => {

    const router = useRouter();

    const form = useForm<PreorderFormValues>({
        resolver: zodResolver(preorderSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            quantity: 1,
        },
    });



    const onSubmit = (data: PreorderFormValues) => {
        // Paystack configuration
        const paystackKey = "pk_test_xxxxxxxxxxxx"; // Replace with actual Paystack public key
        const pricePerBook = 2500; // Price in smallest currency unit (kobo for NGN)
        const totalAmount = pricePerBook * data.quantity;

        // Initialize Paystack
        const handler = (window as typeof window & { PaystackPop: { setup: (config: PaystackSetup) => { openIframe: () => void } } }).PaystackPop.setup({
            key: paystackKey,
            email: data.email,
            amount: totalAmount,
            currency: "NGN",
            ref: `BOOK-${Date.now()}`,
            metadata: {
                custom_fields: [
                    {
                        display_name: "Full Name",
                        variable_name: "full_name",
                        value: data.fullName,
                    },
                    {
                        display_name: "Phone",
                        variable_name: "phone",
                        value: data.phone,
                    },
                    {
                        display_name: "Quantity",
                        variable_name: "quantity",
                        value: data.quantity.toString(),
                    },
                ],
            },
            callback: (response: PaystackResponse) => {
                toast.success("Payment successful!", {
                    description: `Reference: ${response.reference}`,
                });
                router.push("/success");
            },
            onClose: () => {
                toast.error("Payment cancelled", {
                    description: "You can try again when ready.",
                });
            },
        });

        handler.openIframe();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                                <Input placeholder="+234 800 000 0000" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity *</FormLabel>
                            <FormControl>
                                <Input type="number" min="1" max="50" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="pt-4">
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full gradient-primary shadow-elegant"
                    >
                        Proceed to Payment
                    </Button>
                </div>
            </form>
        </Form>
    )
}
