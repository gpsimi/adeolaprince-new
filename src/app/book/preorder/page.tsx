'use client'

import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

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

const Preorder = () => {
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
    <div className="min-h-screen pt-20">
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-12">
              <ShoppingCart className="h-16 w-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Preorder Your Copy</h1>
              <p className="text-lg text-muted-foreground">
                Secure your copy of "The Path of Becoming" today. Be among the first to
                embark on this transformative journey.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-elegant">
              <div className="mb-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="font-semibold text-lg mb-2">Book Details</h3>
                <p className="text-muted-foreground mb-3">
                  The Path of Becoming by Prince Adeola
                </p>
                <p className="text-2xl font-bold text-primary">₦2,500 per copy</p>
              </div>

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

              <div className="mt-8 text-sm text-muted-foreground text-center">
                <p>Secure payment powered by Paystack</p>
                <p className="mt-2">
                  By proceeding, you agree to receive order updates via email and SMS
                </p>
              </div>
            </div>

            {/* Integration Note */}
            <div className="mt-12 p-6 bg-muted/50 rounded-lg border border-border">
              <h3 className="font-semibold mb-2">Payment Integration Note</h3>
              <p className="text-sm text-muted-foreground mb-2">
                To complete the Paystack integration:
              </p>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Add Paystack inline script to index.html: 
                  <code className="block mt-1 p-2 bg-background rounded text-xs">
                    {`<script src="https://js.paystack.co/v1/inline.js"></script>`}
                  </code>
                </li>
                <li>Replace "pk_test_xxxxxxxxxxxx" with your actual Paystack public key</li>
                <li>Configure webhook in your backend to handle payment verification</li>
                <li>Store preorder details in your database after successful payment</li>
              </ol>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Preorder;
