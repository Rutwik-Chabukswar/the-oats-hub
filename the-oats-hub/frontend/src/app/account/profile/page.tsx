"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User } from "lucide-react";

import { useAuth } from "@/providers/AuthProvider";
import { useUpdateProfile } from "@/hooks/useAccount";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const profileSchema = z.object({
  full_name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user } = useAuth();
  const updateProfile = useUpdateProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: user?.full_name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    updateProfile.mutate(data, {
      onSuccess: () => {
        alert("Profile updated successfully!");
      }
    });
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <User className="h-6 w-6 text-brand-gold" /> 
        Personal Information
      </h2>

      <div className="border border-border rounded-xl p-6 md:p-8">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input id="full_name" {...form.register("full_name")} />
            {form.formState.errors.full_name && (
              <span className="text-xs text-destructive">{form.formState.errors.full_name.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" {...form.register("email")} type="email" disabled />
            <p className="text-xs text-muted-foreground mt-1">Email address cannot be changed currently.</p>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Button 
              type="submit" 
              className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 rounded-full px-8"
              disabled={updateProfile.isPending || !form.formState.isDirty}
            >
              {updateProfile.isPending ? "Saving..." : "Save Changes"}
            </Button>
            {form.formState.isDirty && (
              <Button type="button" variant="ghost" onClick={() => form.reset()} className="rounded-full">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
