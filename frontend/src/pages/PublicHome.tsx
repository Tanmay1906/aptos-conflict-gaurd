import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Shield, Zap, Lock, TrendingUp, Scale, Building2, Gavel, Globe2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const PublicHome = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: Shield,
      title: "Blockchain Foundation",
      description: "Secure, immutable ledgers built on Aptos safeguard every conflict check",
    },
    {
      icon: Zap,
      title: "Instant Detection",
      description: "AI-powered screening across firmwide matters delivers answers in milliseconds",
    },
    {
      icon: Lock,
      title: "Zero Leakage",
      description: "Military-grade encryption keeps client dispositions protected end-to-end",
    },
    {
      icon: TrendingUp,
      title: "Executive Analytics",
      description: "Surface engagement trends, compliance posture, and ESG alignment instantly",
    },
  ];

  const pillars = [
    {
      icon: Scale,
      title: "Aligned Governance",
      description: "Codify firm-wide policies with configurable review matrices and approvals.",
    },
    {
      icon: Building2,
      title: "Matter Intelligence",
      description: "Correlate active engagements, past relationships, and sensitive insights automatically.",
    },
    {
      icon: Gavel,
      title: "Regulatory Ready",
      description: "Generate audit-ready compliance packs for SEC, FCA, and MAS in one click.",
    },
    {
      icon: Globe2,
      title: "Cross-Jurisdiction",
      description: "Harmonize conflict rules across jurisdictions with multilingual insights and routing.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full glass-effect text-sm font-medium">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse-slow" />
                Conflict Intelligence Engine • Aptos Secured
              </div>
              <div className="space-y-4">
                <p className="uppercase text-xs tracking-[0.6em] text-muted-foreground">LexGuard Legal AI Suite</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                  Safeguard Every Mandate with
                  <span className="block text-primary">Institutional Conflict Defense.</span>
                </h1>
              </div>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Automate conflict checks, orchestrate approvals, and surface real-time risk intelligence across your global practice. Built for elite firms where every engagement matters.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="hero" size="lg" className="group shadow-glow">
                  <Link to="/register">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="glass" size="lg">
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-accent/30 blur-3xl rounded-full" />
              <div className="relative w-full h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Shield className="w-16 h-16 text-primary mx-auto" />
                  <h3 className="text-xl font-semibold">Secure Legal Intelligence</h3>
                  <p className="text-muted-foreground">Blockchain-powered conflict detection</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <p className="uppercase text-xs tracking-[0.4em] text-muted-foreground">Core Pillars</p>
            <h2 className="section-title">Engineered for Tier-One Law Firms</h2>
            <p className="section-subtitle">
              A unified conflict ecosystem combining regulatory precision with intuitive matter intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border border-border/60 glass-effect hover:shadow-lg transition-all duration-300">
                  <CardHeader className="space-y-4">
                    <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center text-primary-foreground shadow-glow">
                      <pillar.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 gradient-hero" />
            <div className="relative z-10 px-8 py-16 lg:px-20 lg:py-24 text-center space-y-6 text-primary-foreground">
              <p className="uppercase text-xs tracking-[0.5em]">Conflict Defense Suite</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                Ready to Operationalize Zero-Compromise Engagements?
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Deploy LexGuard across your global practice and empower teams with instant, compliant conflict checks—anywhere, anytime.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="glass" size="lg" className="bg-background/15 hover:bg-background/25">
                  <Link to="/register">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="text-primary-foreground">
                  <Link to="/login">Sign In to Dashboard</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PublicHome;
