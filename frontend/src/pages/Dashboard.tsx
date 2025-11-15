import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Plus, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CaseCard } from "@/components/CaseCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Start with empty cases
  const cases = [];

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.lawyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.opponentName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "conflict" && c.hasConflict) ||
      (filterStatus === "clean" && !c.hasConflict);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Dashboard</h1>
              <p className="text-lg text-muted-foreground">
                Monitor and manage all conflict of interest cases
              </p>
            </div>
            <Button asChild variant="hero" size="lg">
              <Link to="/add-case">
                <Plus className="w-4 h-4 mr-2" />
                Add New Case
              </Link>
            </Button>
          </div>

          {/* Empty State */}
          <Card className="gradient-card border border-border/50">
            <CardContent className="py-12 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Welcome to Conflict Guard</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  No conflict cases have been added yet. Start by adding your first case to begin monitoring conflicts of interest.
                </p>
              </div>
              <Button asChild variant="hero" size="lg">
                <Link to="/add-case">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Case
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
