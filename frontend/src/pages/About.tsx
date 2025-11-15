import { motion } from "framer-motion";
import { Shield, Lock, Zap, Globe, CheckCircle, ArrowRight, Building2, Scale, Users2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Foundation",
      description: "Aptos-powered ledgers deliver indisputable audit trails for every mandate",
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description:
        "Military-grade encryption ensures privileged matter information stays in chamber",
    },
    {
      icon: Zap,
      title: "Real-Time Analysis",
      description:
        "Instant conflict detection across firmwide databases, conflicts libraries, and watchlists",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description:
        "Cross-reference conflicts across jurisdictions and partner offices worldwide",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Submit Case Details",
      description: "Enter lawyer, client, and opponent information through our secure form",
    },
    {
      step: "2",
      title: "Blockchain Verification",
      description: "Data is encrypted and checked against all existing records on Aptos",
    },
    {
      step: "3",
      title: "Instant Results",
      description: "Receive immediate alerts if any conflicts of interest are detected",
    },
    {
      step: "4",
      title: "Secure Storage",
      description: "All case data is permanently stored on blockchain for future reference",
    },
  ];

  const stats = [
    { value: "520+", label: "Firms Equipped" },
    { value: "18K+", label: "Matters Screened" },
    { value: "99.97%", label: "Accuracy Rating" },
    { value: "<900ms", label: "Insight Delivery" },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-20"
        >
          {/* Hero */}
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-hero shadow-glow mb-6">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              LexGuard, Built for Conflict Governance Excellence
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              LexGuard elevates law firm risk management with an Aptos-secured backbone, orchestrating global conflict checks, sealed analytics, and firmwide compliance intelligence.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why LexGuard</h2>
              <p className="text-lg text-muted-foreground">
                Enterprise-grade controls paired with practitioner-first workflows
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="gradient-card border border-border/50 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mb-4 shadow-glow">
                        <feature.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How LexGuard Operates</h2>
              <p className="text-lg text-muted-foreground">
                A lightweight journey for your intake teams, a fortified process for compliance leads
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <Card className="gradient-card border border-border/50 h-full hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 rounded-full gradient-hero mx-auto mb-4 flex items-center justify-center shadow-glow text-xl font-bold text-primary-foreground">
                        {item.step}
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                  {i < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6">
                      <ArrowRight className="w-6 h-6 text-accent" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Executive Alignment */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                <Building2 className="w-4 h-4" />
                Partnership-Ready
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Aligned with Managing Partners & Risk Officers</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Deploy LexGuard as the shared operating picture for partners, intake desks, and compliance leaders. From governance policy to ethical walls, our platform centralizes the controls your firm depends on.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {["Partner Dashboards", "Instant Escalations", "Policy Automation", "Audit Trail Extracts"].map((item) => (
                  <div key={item} className="glass-effect px-4 py-3 rounded-xl border border-border/50 text-sm text-foreground/85">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="gradient-card border border-border/60 shadow-lg">
                <CardHeader className="space-y-2">
                  <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center text-primary-foreground shadow-glow">
                    <Scale className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl">Conflict Governance Council</CardTitle>
                  <CardDescription>
                    Quarterly reviews mapped to regulatory updates and firm mandates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-accent mt-1" />
                      Regional policy packs for SEC, FCA, SFC, MAS, and DFSA
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-accent mt-1" />
                      Automated independence attestations for new matters
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-accent mt-1" />
                      Consolidated partner approval workflows with audit-grade logging
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Blockchain Benefits */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 gradient-hero opacity-95" />
            <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20">
              <div className="max-w-3xl mx-auto space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground text-center">
                  The Aptos Advantage
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Immutable audit trails",
                    "Decentralized verification",
                    "Zero data tampering",
                    "Complete transparency",
                    "Lightning-fast transactions",
                    "Enterprise-grade security",
                  ].map((benefit, i) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-primary-foreground"
                    >
                      <CheckCircle className="w-5 h-5 shrink-0" />
                      <span className="text-lg">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Leadership CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Bring LexGuard to Your Partnership</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of global firms automating conflict governance with a single, trustworthy system of record.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="hero" size="lg">
                <Link to="/add-case">
                  Arrange Private Onboarding
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg">
                <Link to="/dashboard">Explore Executive Console</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
