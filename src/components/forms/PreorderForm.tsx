// src/components/forms/PreorderForm.tsx
'use client';

import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
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

// Validation schema
const preorderSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  phone: z.string().trim().optional(),
  quantity: z.coerce.number().min(1, "Minimum quantity is 1").max(50, "Maximum quantity is 50"),
  format: z.enum(["hardcopy", "softcopy"], {
    required_error: "Select a format",
  }),
  deliveryLocation: z.string().trim().optional(),
}).refine(
  (data) => data.format !== "hardcopy" || !!data.deliveryLocation,
  {
    message: "Delivery address is required for hardcopy",
    path: ["deliveryLocation"],
  }
);

type PreorderFormValues = z.infer<typeof preorderSchema>;

export default function PreorderForm() {
  const [loading, setLoading] = React.useState(false);

  const form = useForm<PreorderFormValues>({
    resolver: zodResolver(preorderSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      quantity: 1,
      format: undefined,
      deliveryLocation: "",
    } as Partial<PreorderFormValues>,
  });

  // Ensure Paystack script is loaded
  const ensurePaystackLoaded = () => {
    if (!window['PaystackPop']) {
      const s = document.createElement("script");
      s.src = "https://js.paystack.co/v1/inline.js";
      s.async = true;
      document.head.appendChild(s);
    }
  };

  React.useEffect(() => {
    ensurePaystackLoaded();
  }, []);

  const onSubmit = async (data: PreorderFormValues) => {
    if (data.format === "softcopy") {
      // simple redirect to Selar - open in new tab
      window.open("https://selar.com/6764470664", "_blank", "noopener,noreferrer");
      return;
    }

    // Hardcopy flow: initialize payment via server
    setLoading(true);
    try {
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.success && json.authorization_url) {
        window.location.href = json.authorization_url;
      } else {
        const message =
          typeof json?.error === "string"
            ? json.error
            : json?.details?.message ?? "Payment initialization failed. Please try again.";
        console.error("Initialize failed", json);
        toast.error(message);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred initializing payment.");
    } finally {
      setLoading(false);
    }
  };
  const selectedFormat = form.watch("format");


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
              <FormLabel>Phone Number (optional)</FormLabel>
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
                <Input type="number" min={1} max={50} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="format"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Format *</FormLabel>
              <FormControl>
                <select
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(event) => field.onChange(event.target.value)}
                >
                  <option value="" disabled>
                    Select a format
                  </option>
                  <option value="hardcopy">Hardcopy (Printed Book)</option>
                  <option value="softcopy">Softcopy (PDF)</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedFormat === "hardcopy" && (
          <FormField
            control={form.control}
            name="deliveryLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Address *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter delivery address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}


        <div className="pt-4">
          <Button
            type="submit"
            size="lg"
            className="w-full gradient-primary shadow-elegant"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : form.getValues("format") === "softcopy"
                ? "Proceed to Selar"
                : "Proceed to Payment"}
          </Button>
        </div>
      </form>
    </Form>
  );
}