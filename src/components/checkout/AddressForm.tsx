"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AddressFormProps {
  title: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  onChange: (field: string, value: string) => void;
}

export function AddressForm({ title, address, onChange }: AddressFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor={`${title}-street`}>Street Address</Label>
          <Textarea
            id={`${title}-street`}
            placeholder="Enter your street address"
            value={address.street}
            onChange={(e) => onChange("street", e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`${title}-city`}>City</Label>
            <Input
              id={`${title}-city`}
              placeholder="City"
              value={address.city}
              onChange={(e) => onChange("city", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor={`${title}-postal`}>Postal Code</Label>
            <Input
              id={`${title}-postal`}
              placeholder="Postal code"
              value={address.postalCode}
              onChange={(e) => onChange("postalCode", e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor={`${title}-phone`}>Phone Number</Label>
          <Input
            id={`${title}-phone`}
            type="tel"
            placeholder="Phone number"
            value={address.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            required
          />
        </div>
      </CardContent>
    </Card>
  );
}
