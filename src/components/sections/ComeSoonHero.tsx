"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ComeSoonHero() {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const { toast } = useToast();

    async function joinWaitlist(e: React.FormEvent) {
        e.preventDefault();
        if (!email || !name) {
            toast({ title: "Missing fields", description: "Please provide your name and email." });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/waitlist/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName: name, email }),
            });
            const data = await res.json();

            if (res.ok) {
                toast({ title: "You're on the list ✅", description: "We'll notify you when C.O.A.P launches." });
                setName("");
                setEmail("");
            } else {
                toast({ title: "Error", description: data?.error || "Something went wrong." });
            }
        } catch (err) {
            toast({ title: "Network error", description: "Could not reach the server." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="py-16 sm:py-24">
            <div className="max-w-4xl mx-auto">
                <div className="rounded-2xl p-10 md:p-16 text-center">
                    <div className="mb-6 text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight font-serif text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-500 to-rose-500">
                        C.O.A.P 
                        {/* <span className="ml-3 drop-shadow-lg">📖✨</span> */}
                    </div>

                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                        Chronicles Of A Prince
                        <span className="ml-3 drop-shadow-lg">is Coming Soon✨</span>
                    </h2>
                    <p className="mt-4 text-lg text-foreground">Weekly essays, reflections and exclusive pieces — arrive first by joining the waitlist.</p>

                    <form onSubmit={joinWaitlist} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Input
                            aria-label="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="w-full sm:w-64"
                        />
                        <Input
                            aria-label="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            className="w-full sm:w-72"
                        />
                        <Button type="submit" className="whitespace-nowrap" disabled={loading}>
                            {loading ? "Joining..." : "Notify Me ✉️"}
                        </Button>
                    </form>

                    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">No spam — unsubscribe anytime 🚫</p>
                </div>
            </div>
        </section>
    );
}
