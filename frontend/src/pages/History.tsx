import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

const History = () => {
  const { authFetch } = useAuth();
  const [timeline, setTimeline] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    conflicts: 0,
    clear: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await authFetch("/api/v1/cases");
        const data = await response.json();
        if (response.ok) {
          const cases = data.data.cases;
          setTimeline(cases);
          setStats({
            total: cases.length,
            conflicts: cases.filter(c => c.conflictDetected).length,
            clear: cases.filter(c => !c.conflictDetected).length,
          });
        }
      } catch (error) {
        console.error("Failed to fetch cases:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, [authFetch]);

  const statsArray = [
    { label: "Total Reviews", value: stats.total, icon: TrendingUp },
    { label: "Conflicts Found", value: stats.conflicts, icon: AlertCircle },
    { label: "Clean Cases", value: stats.clear, icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-hero shadow-glow mb-4">
              <Clock className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Case History</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete timeline of all conflict detection reviews
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {statsArray.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="gradient-card border border-border/50 text-center">
                  <CardContent className="pt-6">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-accent" />
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-transparent" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex items-start gap-8 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-accent shadow-glow z-10" />

                  {/* Content card */}
                  <div className="flex-1 ml-16 md:ml-0 md:w-1/2">
                    <Card
                      className={`gradient-card border ${
                        item.conflictDetected
                          ? "border-destructive/50"
                          : "border-success/50"
                      } hover:shadow-lg transition-all duration-300`}
                    >
                      <CardContent className="pt-6 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <Badge
                            variant={item.conflictDetected ? "destructive" : "default"}
                            className={item.conflictDetected ? "" : "bg-success"}
                          >
                            {item.conflictDetected ? (
                              <>
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Conflict
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Clear
                              </>
                            )}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString()}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <span className="text-xs text-muted-foreground">Lawyer:</span>
                            <p className="text-sm font-medium">{item.lawyerName}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-xs text-muted-foreground">Client:</span>
                              <p className="text-sm font-medium">{item.clientName}</p>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">Opponent:</span>
                              <p className="text-sm font-medium">{item.opponentName}</p>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground pt-2 border-t">
                          {item.conflictDetected ? "Potential conflict detected" : "No conflicts found"} - Case #{item.caseNumber}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default History;
