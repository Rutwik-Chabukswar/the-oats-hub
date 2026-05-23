"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Shield, KeyRound, Mail, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

import { useAuth } from "@/providers/AuthProvider";
import { useUpdateProfile } from "@/hooks/useAccount";

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
        // We could use a toast here for a premium feel
        alert("Profile updated successfully!");
      }
    });
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="space-y-2 border-b border-border/50 pb-6">
        <h2 className="text-2xl md:text-3xl font-serif tracking-tight">
          Personal Information
        </h2>
        <p className="text-muted-foreground">Manage your account details and security preferences.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border/50 rounded-3xl p-6 md:p-8 shadow-sm"
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="full_name" className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-muted-foreground/50" />
                  </div>
                  <input 
                    id="full_name" 
                    {...form.register("full_name")} 
                    className="flex h-12 w-full rounded-xl border border-border/50 bg-background px-4 py-2 pl-12 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all hover:border-border"
                  />
                </div>
                {form.formState.errors.full_name && (
                  <p className="text-xs text-destructive flex items-center mt-1.5 gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5" /> {form.formState.errors.full_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground/50" />
                  </div>
                  <input 
                    id="email" 
                    {...form.register("email")} 
                    type="email" 
                    disabled 
                    className="flex h-12 w-full rounded-xl border border-border/50 bg-muted/30 px-4 py-2 pl-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">For security reasons, email addresses cannot be modified directly.</p>
              </div>

              <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center gap-4">
                <button 
                  type="submit" 
                  disabled={updateProfile.isPending || !form.formState.isDirty}
                  className="w-full sm:w-auto h-12 px-8 rounded-full bg-brand-gold text-brand-black hover:bg-brand-gold/90 transition-colors font-medium text-sm shadow-premium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updateProfile.isPending ? "Saving Changes..." : "Save Changes"}
                </button>
                {form.formState.isDirty && (
                  <button 
                    type="button" 
                    onClick={() => form.reset()} 
                    className="w-full sm:w-auto h-12 px-6 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground font-medium text-sm transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm space-y-4"
          >
            <h3 className="font-semibold text-base flex items-center gap-2">
              <Shield className="h-5 w-5 text-brand-gold" /> Account Security
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your account is protected by industry-standard encryption. Ensure you use a strong, unique password.
            </p>
            <button className="text-sm font-medium text-brand-gold hover:underline flex items-center gap-1">
              <KeyRound className="h-4 w-4" /> Change Password
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
