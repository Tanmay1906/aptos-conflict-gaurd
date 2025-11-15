import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Lock, TrendingUp, Scale, Building2, Gavel, Globe2, Quote, Plus, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      icon: Plus,
      title: "Add New Case",
      description: "Start a new conflict check",
      href: "/add-case",
      color: "text-accent",
    },
    {
      icon: BarChart3,
      title: "View Dashboard",
      description: "Monitor all cases and analytics",
      href: "/dashboard",
      color: "text-primary",
    },
    {
      icon: TrendingUp,
      title: "Case History",
      description: "Review past conflict checks",
      href: "/history",
      color: "text-success",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "All conflict data is secured on Aptos blockchain",
    },
    {
      icon: Zap,
      title: "Instant Detection",
      description: "AI-powered screening delivers results in milliseconds",
    },
    {
      icon: Lock,
      title: "Regulatory Compliance",
      description: "Built to meet SEC, FCA, and MAS requirements",
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
                Welcome back, {user?.name}
              </div>
              <div className="space-y-4">
                <p className="uppercase text-xs tracking-[0.6em] text-muted-foreground">Conflict Intelligence Engine</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                  Secure Every
                  <span className="block text-primary">Legal Mandate</span>
                </h1>
              </div>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Automate conflict checks, orchestrate approvals, and surface real-time risk intelligence for your law firm. Powered by Aptos blockchain.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild variant="hero" size="lg" className="group shadow-glow">
                  <Link to="/add-case">
                    Start New Conflict Check
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="glass" size="lg">
                  <Link to="/dashboard">View Dashboard</Link>
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
              <div className="relative grid grid-cols-2 gap-4">
                {quickActions.map((action, i) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <Card className="gradient-card border border-border/50 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                      <CardHeader className="pb-3">
                        <action.icon className={`w-8 h-8 ${action.color} group-hover:scale-110 transition-transform`} />
                      </CardHeader>
                      <CardContent>
                        <h3 className="font-semibold mb-1">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <p className="uppercase text-xs tracking-[0.4em] text-muted-foreground">Why Choose Us</p>
            <h2 className="section-title">Advanced Conflict Intelligence</h2>
            <p className="section-subtitle">
              Leveraging cutting-edge blockchain technology and AI to deliver unparalleled conflict detection and compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border border-border/60 glass-effect hover:shadow-lg transition-all duration-300">
                  <CardHeader className="space-y-4">
                    <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center text-primary-foreground shadow-glow">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
