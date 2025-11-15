import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AddCase = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { authFetch } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    lawyerName: "",
    clientName: "",
    opponentName: "",
    caseDescription: "",
    caseNumber: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await authFetch("/api/v1/cases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: data.data.case.conflictDetected ? "⚠️ Conflict Detected!" : "✅ Case Added Successfully",
          description: data.data.case.conflictDetected
            ? "A potential conflict of interest has been identified. Please review the details."
            : "Case has been securely recorded on the Aptos blockchain.",
          variant: data.data.case.conflictDetected ? "destructive" : "default",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to add case",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-hero shadow-glow mb-4">
              <Plus className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Add New Case</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter case details to check for conflicts of interest on the blockchain
            </p>
          </div>

          <Card className="gradient-card border border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                Case Information
              </CardTitle>
              <CardDescription>
                All information will be securely stored on the Aptos blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="caseNumber">Case Number</Label>
                    <Input
                      id="caseNumber"
                      name="caseNumber"
                      placeholder="e.g., 2024-CV-00123"
                      value={formData.caseNumber}
                      onChange={handleChange}
                      required
                      className="glass-effect"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lawyerName">Lawyer Name</Label>
                    <Input
                      id="lawyerName"
                      name="lawyerName"
                      placeholder="John Doe"
                      value={formData.lawyerName}
                      onChange={handleChange}
                      required
                      className="glass-effect"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      id="clientName"
                      name="clientName"
                      placeholder="ABC Corporation"
                      value={formData.clientName}
                      onChange={handleChange}
                      required
                      className="glass-effect"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="opponentName">Opponent Name</Label>
                    <Input
                      id="opponentName"
                      name="opponentName"
                      placeholder="XYZ Company"
                      value={formData.opponentName}
                      onChange={handleChange}
                      required
                      className="glass-effect"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="caseDescription">Case Description</Label>
                  <Textarea
                    id="caseDescription"
                    name="caseDescription"
                    placeholder="Brief description of the case..."
                    value={formData.caseDescription}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="glass-effect resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-pulse">Checking Blockchain...</span>
                      </>
                    ) : (
                      "Submit Case"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="glass"
                    size="lg"
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-accent/50 bg-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 animate-pulse" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Blockchain Verification</p>
                  <p className="text-sm text-muted-foreground">
                    Your case will be cross-referenced with existing records on the Aptos blockchain
                    to detect any potential conflicts of interest automatically.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AddCase;
