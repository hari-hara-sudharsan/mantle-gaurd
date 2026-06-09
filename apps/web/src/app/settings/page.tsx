"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/shared/page-header"
import { SectionCard } from "@/components/shared/section-card"

const settingsSchema = z.object({
    username: z.string().min(2, "Enter a handle"),
    email: z.string().email("Enter a valid email"),
    alertThreshold: z.number().min(0).max(100),
    walletAddress: z.string().min(42, "Enter a valid wallet address"),
    notes: z.string().optional(),
})

type SettingsFormValues = z.infer<typeof settingsSchema>

const defaultValues: SettingsFormValues = {
    username: "mantle_guard",
    email: "hello@mantleguard.io",
    alertThreshold: 65,
    walletAddress: "0x0000000000000000000000000000000000000000",
    notes: "",
}

export default function SettingsPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsSchema),
        defaultValues,
    })

    const onSubmit = (data: SettingsFormValues) => {
        toast.success("Settings updated")
        console.log("settings saved", data)
    }

    return (
        <div className="min-h-screen">
            <PageHeader
                title="Settings"
                description="Configure your MantleGuard workspace, wallet connections, and alert preferences."
            />

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-[minmax(360px,400px)_1fr]">
                <SectionCard title="Profile" description="Personal and wallet settings">
                    <div className="space-y-5">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" {...register("username", { valueAsString: true })} />
                            {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input id="email" type="email" {...register("email", { valueAsString: true })} />
                            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="walletAddress">Connected wallet</Label>
                            <Input id="walletAddress" {...register("walletAddress", { valueAsString: true })} />
                            {errors.walletAddress && <p className="text-sm text-destructive">{errors.walletAddress.message}</p>}
                        </div>
                    </div>
                </SectionCard>

                <SectionCard title="Alerts" description="Monitoring and threshold control">
                    <div className="space-y-5">
                        <div className="grid gap-2">
                            <Label htmlFor="alertThreshold">Alert threshold</Label>
                            <Input id="alertThreshold" type="number" {...register("alertThreshold", { valueAsNumber: true })} />
                            {errors.alertThreshold && <p className="text-sm text-destructive">{errors.alertThreshold.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="notes">Notes</Label>
                            <textarea
                                id="notes"
                                {...register("notes")}
                                className="min-h-[120px] rounded-xl border border-input bg-transparent px-3 py-3 text-sm outline-none transition focus:border-ring focus:ring-4 focus:ring-ring/10"
                                placeholder="Add project notes, custom guardrails, or deployment reminders."
                            />
                            {errors.notes && <p className="text-sm text-destructive">{errors.notes.message}</p>}
                        </div>
                        <Button type="submit" disabled={isSubmitting} className="rounded-full px-8 py-3">
                            Save settings
                        </Button>
                    </div>
                </SectionCard>
            </form>
        </div>
    )
}
