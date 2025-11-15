import { Link } from "react-router-dom";
import { Scale, Mail, MapPin, Phone, Clock, ChevronRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 lg:px-8 py-14">
        <div className="grid gap-10 lg:gap-12 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl border border-border/60 bg-background/80 flex items-center justify-center shadow-glow">
                <Scale className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-primary">LexGuard</p>
                <p className="text-xs tracking-[0.35em] uppercase text-muted-foreground">Legal AI Suite</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              LexGuard delivers blockchain-backed conflict intelligence tailored for elite law firms, ensuring every engagement is compliant and conflict-free.
            </p>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">Practice Focus</h3>
            <ul className="space-y-3 text-sm text-foreground/80">
              {[
                "Cross-Border Compliance",
                "Investment & M&A",
                "Corporate Governance",
                "Private Equity",
                "Litigation Intelligence",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Office Hours */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">Engagement Hours</h3>
            <ul className="space-y-3 text-sm text-foreground/80">
              {[
                { day: "Mon - Thu", hours: "08:00 - 20:00 EST" },
                { day: "Friday", hours: "08:00 - 18:00 EST" },
                { day: "Weekend", hours: "By appointment" },
              ].map((slot) => (
                <li key={slot.day} className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-accent" />
                  <div>
                    <p className="font-medium">{slot.day}</p>
                    <p className="text-xs text-muted-foreground">{slot.hours}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">Global Offices</h3>
            <ul className="space-y-4 text-sm text-foreground/80">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-accent" />
                <span>consult@lexguard.legal</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-accent" />
                <span>+1 (555) 214-7820</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-accent" />
                <div>
                  <p>New York • London • Singapore</p>
                  <p className="text-xs text-muted-foreground">Global conflict intelligence coverage</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/60 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} LexGuard Legal Intelligence. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors">Security</a>
            <a href="#" className="hover:text-accent transition-colors">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
