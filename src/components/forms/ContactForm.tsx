"use client"

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "sonner";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const contactSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  bookingType: z.enum(["Saxophonist", "Speaking", "Writing Collaboration"], {
    required_error: "Please select a booking type",
  }),
  message: z.string().min(10, "Please enter a longer message"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      bookingType: undefined,
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to submit");

      toast.success("Message sent!", { description: "Thank you — we will get back to you soon." });
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Submission failed", { description: "Please try again later." });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <FormItem>
          <FormLabel>Full name</FormLabel>
          <FormControl>
            <Input {...form.register("fullName")} placeholder="Your full name" />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input {...form.register("email")} type="email" placeholder="Email Address" />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Booking type</FormLabel>
          <FormControl>
            <select
              {...form.register("bookingType")}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="" disabled>Select Booking Type</option>
              <option value="Speaking">Speaking</option>
              <option value="Writing Collaboration">Writing</option>
              <option value="Saxophonist">Saxophone/Music</option>
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Message</FormLabel>
          <FormControl>
            <Textarea {...form.register("message")} placeholder="Tell us about your request" rows={6} />
          </FormControl>
          <FormMessage />
        </FormItem>

        <div>
          <Button type="submit" className="gradient-primary">Send message</Button>
        </div>
      </form>
    </Form>
  );
}
