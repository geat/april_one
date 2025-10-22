"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Settings, Save } from "lucide-react";

interface SettingField {
  key: string;
  label: string;
  description: string;
  type: "text" | "email" | "tel" | "url" | "textarea";
  placeholder?: string;
}

const settingFields: SettingField[] = [
  {
    key: "site_name",
    label: "Site Name",
    description: "The name of your website",
    type: "text",
    placeholder: "ShopName",
  },
  {
    key: "contact_email",
    label: "Contact Email",
    description: "Primary contact email address",
    type: "email",
    placeholder: "contact@example.com",
  },
  {
    key: "contact_phone",
    label: "Contact Phone",
    description: "Primary contact phone number",
    type: "tel",
    placeholder: "+1 (555) 123-4567",
  },
  {
    key: "address",
    label: "Address",
    description: "Physical business address",
    type: "textarea",
    placeholder: "123 Main Street, City, State ZIP",
  },
  {
    key: "facebook_url",
    label: "Facebook URL",
    description: "Link to your Facebook page",
    type: "url",
    placeholder: "https://facebook.com/yourpage",
  },
  {
    key: "twitter_url",
    label: "Twitter URL",
    description: "Link to your Twitter profile",
    type: "url",
    placeholder: "https://twitter.com/yourhandle",
  },
  {
    key: "instagram_url",
    label: "Instagram URL",
    description: "Link to your Instagram profile",
    type: "url",
    placeholder: "https://instagram.com/yourhandle",
  },
  {
    key: "youtube_url",
    label: "YouTube URL",
    description: "Link to your YouTube channel",
    type: "url",
    placeholder: "https://youtube.com/yourchannel",
  },
];

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/website/settings");
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      // Save all settings
      const promises = Object.entries(settings).map(([key, value]) =>
        fetch(`/api/website/settings/${key}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            value,
            description: settingFields.find((f) => f.key === key)?.description,
          }),
        })
      );

      await Promise.all(promises);
      toast.success("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="h-6 w-6" />
            Website Settings
          </h2>
          <p className="text-muted-foreground">
            Configure global website settings and contact information
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle>General Information</CardTitle>
          <CardDescription>
            Basic information about your website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {settingFields.slice(0, 4).map((field) => (
            <div key={field.key}>
              <Label htmlFor={field.key}>{field.label}</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {field.description}
              </p>
              {field.type === "textarea" ? (
                <Textarea
                  id={field.key}
                  value={settings[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                />
              ) : (
                <Input
                  id={field.key}
                  type={field.type}
                  value={settings[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>
            Links to your social media profiles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {settingFields.slice(4).map((field) => (
            <div key={field.key}>
              <Label htmlFor={field.key}>{field.label}</Label>
              <p className="text-xs text-muted-foreground mb-2">
                {field.description}
              </p>
              <Input
                id={field.key}
                type={field.type}
                value={settings[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Save Button (Bottom) */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
}
