"use client";

import { useAddresses } from "@/hooks/useAccount";
import { MapPin, Plus, Trash2, Edit2, ShieldCheck } from "lucide-react";
import { AccountEmptyState } from "@/components/account/account-empty-state";
import { motion } from "framer-motion";

export default function AddressesPage() {
  const { data: addresses, isLoading } = useAddresses();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/50 pb-6">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-serif tracking-tight flex items-center gap-3">
            Address Book
          </h2>
          <p className="text-muted-foreground">Manage your shipping destinations for a faster checkout.</p>
        </div>
        <button className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-brand-gold text-brand-black hover:bg-brand-gold/90 transition-colors font-medium text-sm shadow-premium whitespace-nowrap">
          <Plus className="h-4 w-4 mr-2" /> Add New Address
        </button>
      </div>

      {!addresses || addresses.length === 0 ? (
        <AccountEmptyState
          icon={<MapPin className="h-10 w-10 opacity-50" />}
          title="No Addresses Saved"
          message="Add a shipping address to enjoy a seamless, one-click checkout experience."
          actionLabel="Add Address"
          onAction={() => alert('Open add address modal')}
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {addresses.map((address: any, i: number) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={address.id} 
              className="bg-card border border-border/50 rounded-3xl p-6 md:p-8 flex flex-col group hover:border-brand-gold/50 hover:shadow-premium transition-all duration-300 relative overflow-hidden"
            >
              {address.is_default && (
                <div className="absolute top-0 right-0 bg-brand-gold/10 text-brand-gold text-xs font-semibold px-4 py-1.5 rounded-bl-xl flex items-center gap-1.5">
                  <ShieldCheck className="h-3 w-3" /> Default
                </div>
              )}
              
              <div className="mb-6 pt-2">
                <span className="font-serif text-xl tracking-tight block mb-1">{address.full_name}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Delivery Contact</span>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-1.5 mb-8 flex-1 leading-relaxed">
                <p>{address.address_line_1}</p>
                {address.address_line_2 && <p>{address.address_line_2}</p>}
                <p>{address.city}, {address.state} {address.pincode}</p>
                <p className="pt-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/50"></span>
                  {address.phone}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-5 border-t border-border/50 mt-auto">
                <button className="flex-1 h-10 inline-flex items-center justify-center gap-2 rounded-full border border-border/50 bg-muted/20 hover:bg-muted text-sm font-medium transition-colors">
                  <Edit2 className="h-3.5 w-3.5" /> Edit
                </button>
                <button className="h-10 px-4 inline-flex items-center justify-center gap-2 rounded-full text-destructive hover:bg-destructive/10 text-sm font-medium transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
