import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Compass, Shield } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-24 overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-10" aria-hidden="true" />
      <div className="absolute inset-0 legal-grid opacity-60" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl w-full">
        <Card className="glass-effect border border-border/60 shadow-lg">
          <CardContent className="px-8 py-14 text-center space-y-8">
            <div className="mx-auto w-20 h-20 rounded-2xl gradient-hero flex items-center justify-center shadow-glow">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
            <div className="space-y-3">
              <p className="uppercase text-xs tracking-[0.5em] text-muted-foreground">Code 404</p>
              <h1 className="text-3xl md:text-4xl font-semibold">We couldn't locate that docket.</h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
                The requested route isn't registered in the LexGuard console. Choose a destination below to continue your conflict governance journey.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Button asChild variant="hero" size="lg" className="group">
                <Link to="/">
                  <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg" className="flex items-center justify-center">
                <Link to="/dashboard">
                  Explore Dashboard
                  <Compass className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
