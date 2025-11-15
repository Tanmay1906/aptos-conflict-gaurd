import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Calendar, User, Building } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CaseCardProps {
  id: string;
  lawyerName: string;
  clientName: string;
  opponentName: string;
  hasConflict: boolean;
  date: string;
  index?: number;
}

export const CaseCard = ({
  lawyerName,
  clientName,
  opponentName,
  hasConflict,
  date,
  index = 0,
}: CaseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="h-full"
    >
      <Card className="gradient-card border border-border/50 hover:shadow-lg transition-all duration-300 h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <Badge
              variant={hasConflict ? "destructive" : "default"}
              className={hasConflict ? "shadow-glow" : "bg-success"}
            >
              {hasConflict ? (
                <>
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Conflict Detected
                </>
              ) : (
                <>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  No Conflict
                </>
              )}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 mt-0.5 text-accent shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Lawyer</p>
                <p className="text-sm font-medium truncate">{lawyerName}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Building className="w-4 h-4 mt-0.5 text-accent shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Client</p>
                <p className="text-sm font-medium truncate">{clientName}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Building className="w-4 h-4 mt-0.5 text-destructive shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Opponent</p>
                <p className="text-sm font-medium truncate">{opponentName}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
