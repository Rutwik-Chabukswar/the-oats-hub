"use client";

import { useAddresses } from "@/hooks/useAccount";
import { EmptyState } from "@/components/ui/error-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Trash2, Edit2 } from "lucide-react";

export default function AddressesPage() {
  const { data: addresses, isLoading } = useAddresses();

  if (isLoading) {
    return <div className="flex justify-center p-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-gold border-t-transparent" /></div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MapPin className="h-6 w-6 text-brand-gold" /> 
          Saved Addresses
        </h2>
        <Button className="bg-brand-gold text-brand-black hover:bg-brand-gold/90 rounded-full gap-2">
          <Plus className="h-4 w-4" /> Add New Address
        </Button>
      </div>

      {!addresses || addresses.length === 0 ? (
        <EmptyState
          title="No addresses found"
          message="You haven't saved any delivery addresses yet."
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div key={address.id} className="border border-border rounded-xl p-6 flex flex-col hover:border-brand-gold/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{address.full_name}</span>
                  {address.is_default && <Badge className="bg-brand-gold text-brand-black">Default</Badge>}
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-1 mb-6 flex-1">
                <p>{address.address_line_1}</p>
                {address.address_line_2 && <p>{address.address_line_2}</p>}
                <p>{address.city}, {address.state} {address.pincode}</p>
                <p className="pt-2">Phone: {address.phone}</p>
              </div>

              <div className="flex items-center gap-3 border-t border-border pt-4 mt-auto">
                <Button variant="outline" size="sm" className="gap-1 flex-1 rounded-full">
                  <Edit2 className="h-3 w-3" /> Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 gap-1 rounded-full">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
