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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Users, Calendar } from "lucide-react";

// Registration form schema
const registerSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20, "Phone number too long"),
  church: z.string().trim().max(200, "Church name too long").optional(),
  dietaryRequirements: z.string().trim().max(500, "Description too long").optional(),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      church: "",
      dietaryRequirements: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Registration successful!", {
        description: "You'll receive a confirmation email shortly.",
      });

      // Navigate to success page
      router.push("/success");
    } catch (error) {
      toast.error("Registration failed", {
        description: "Please try again later.",
      });
    }
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
              <Users className="h-16 w-16 text-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Register for Launch Event
              </h1>
              <p className="text-lg text-muted-foreground">
                Join us for an unforgettable celebration of "The Path of Becoming."
                Connect with the author and fellow believers on this journey of transformation.
              </p>
            </div>

            {/* Event Details */}
            <div className="mb-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-start space-x-4">
                <Calendar className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Event Details</h3>
                  <p className="text-muted-foreground mb-1">
                    <span className="font-medium">Date:</span> To be announced
                  </p>
                  <p className="text-muted-foreground mb-1">
                    <span className="font-medium">Time:</span> To be announced
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium">Location:</span> To be announced
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-elegant">
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
                    name="church"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Church/Ministry (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Your church name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dietaryRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dietary Requirements or Special Needs (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Let us know if you have any dietary restrictions or special requirements"
                            className="min-h-[100px]"
                            {...field}
                          />
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
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? "Registering..." : "Complete Registration"}
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="mt-6 text-sm text-muted-foreground text-center">
                <p>
                  By registering, you agree to receive event updates via email and SMS
                </p>
              </div>
            </div>

            {/* Backend Integration Note */}
            <div className="mt-12 p-6 bg-muted/50 rounded-lg border border-border">
              <h3 className="font-semibold mb-2">Backend Integration</h3>
              <p className="text-sm text-muted-foreground mb-2">
                To complete the event registration system:
              </p>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Create a database table to store registrations</li>
                <li>Set up an API endpoint to handle form submissions</li>
                <li>Configure email notifications for confirmations</li>
                <li>Optional: Integrate with an event management platform</li>
              </ol>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Register;
