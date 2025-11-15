import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Building, Phone, MapPin, Shield, Bell, Moon, Sun, Lock, CheckCircle, Users2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [isDark, setIsDark] = useState(false);
  const [notifications, setNotifications] = useState({
    conflicts: true,
    updates: true,
    newsletter: false,
  });

  const [profile, setProfile] = useState({
    name: "Alexandra Price",
    email: "a.price@lexguardfirm.com",
    firm: "Sterling & Co. International",
    phone: "+1 (212) 555-2740",
    location: "New York • London",
  });

  const handleSave = () => {
    toast({
      title: "✅ Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleThemeToggle = (checked: boolean) => {
    setIsDark(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <Avatar className="w-24 h-24 mx-auto ring-4 ring-accent/20">
              <AvatarImage src="" />
              <AvatarFallback className="text-2xl gradient-hero text-primary-foreground">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
                LexGuard Partner Console
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{profile.name}</h1>
              <p className="text-lg text-muted-foreground">{profile.firm}</p>
            </div>
          </div>

          {/* Profile Information */}
          <Card className="gradient-card border border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-accent" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your partner profile and firm credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="glass-effect"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="glass-effect"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firm" className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-accent" />
                    Law Firm
                  </Label>
                  <Input
                    id="firm"
                    value={profile.firm}
                    onChange={(e) => setProfile({ ...profile, firm: e.target.value })}
                    className="glass-effect"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-accent" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="glass-effect"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="glass-effect"
                />
              </div>

              <Button onClick={handleSave} variant="hero" size="lg" className="w-full md:w-auto">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="gradient-card border border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Preferences & Settings
              </CardTitle>
              <CardDescription>Customize your LexGuard experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isDark ? (
                    <Moon className="w-5 h-5 text-accent" />
                  ) : (
                    <Sun className="w-5 h-5 text-accent" />
                  )}
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Switch to dark mode for a more focused experience</p>
                  </div>
                </div>
                <Switch checked={isDark} onCheckedChange={handleThemeToggle} />
              </div>

              <Separator />

              {/* Notifications */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold">Notifications</h3>
                </div>

                <div className="space-y-4 ml-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Conflict Alerts</p>
                      <p className="text-sm text-muted-foreground">Get notified when conflicts are detected</p>
                    </div>
                    <Switch
                      checked={notifications.conflicts}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, conflicts: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System Updates</p>
                      <p className="text-sm text-muted-foreground">Stay informed about new features</p>
                    </div>
                    <Switch
                      checked={notifications.updates}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, updates: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Newsletter</p>
                      <p className="text-sm text-muted-foreground">Receive legal tech insights</p>
                    </div>
                    <Switch
                      checked={notifications.newsletter}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, newsletter: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Info */}
          <Card className="border border-border/60 bg-background/70">
            <CardContent className="pt-6 space-y-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-accent mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">LexGuard Security</p>
                    <p className="text-base font-semibold">Blockchain Secured Identity</p>
                    <p className="text-sm text-muted-foreground">
                      Your profile and matter entitlements are anchored on the Aptos ledger. Every change is notarized with immutable timestamps and approval metadata.
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-accent" />
                    Multi-factor authentication enforced
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    SOC 2 Type II certified infrastructure
                  </div>
                  <div className="flex items-center gap-2">
                    <Users2 className="w-4 h-4 text-accent" />
                    Ethical wall governance for sensitive matters
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
