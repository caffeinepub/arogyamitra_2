import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Activity, CheckCircle2, Clock, Wifi, WifiOff } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import type { Medication } from "../types";

interface MedicationCardProps {
  medication: Medication;
  onLogDose: (id: string) => void;
  index: number;
}

const statusConfig = {
  taken: {
    bg: "bg-teal-50",
    text: "text-teal-700",
    icon: CheckCircle2,
  },
  due: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    icon: Clock,
  },
  active: {
    bg: "bg-green-50",
    text: "text-green-700",
    icon: Activity,
  },
  low: {
    bg: "bg-red-50",
    text: "text-red-700",
    icon: Activity,
  },
};

export default function MedicationCard({
  medication,
  onLogDose,
  index,
}: MedicationCardProps) {
  const { t } = useLanguage();
  const config = statusConfig[medication.status];
  const StatusIcon = config.icon;
  const pct = Math.round(
    (medication.dosesRemaining / medication.totalDoses) * 100,
  );
  const isLow = medication.dosesRemaining <= medication.refillThreshold;

  return (
    <div
      data-ocid={`med.card.${index}`}
      className="bg-card border border-border rounded-xl p-5 shadow-card flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-foreground text-base">
            {medication.name}
          </h3>
          <p className="text-sm text-muted-foreground">{medication.dosage}</p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full",
            config.bg,
            config.text,
          )}
        >
          <StatusIcon className="w-3 h-3" />
          {medication.statusLabel}
        </span>
      </div>

      {/* Sensor */}
      <div className="flex items-center gap-1.5 text-xs">
        {medication.sensorConnected ? (
          <>
            <Wifi className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary font-medium">
              SmartSensor connected
            </span>
          </>
        ) : (
          <>
            <WifiOff className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">No sensor paired</span>
          </>
        )}
      </div>

      {/* Doses */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted-foreground">Doses remaining</span>
          <span
            className={cn(
              "text-xs font-semibold",
              isLow ? "text-destructive" : "text-foreground",
            )}
          >
            {medication.dosesRemaining}/{medication.totalDoses}
          </span>
        </div>
        <Progress
          value={pct}
          className={cn("h-1.5", isLow && "[&>div]:bg-destructive")}
        />
        {isLow && (
          <p className="text-xs text-destructive mt-1 font-medium">
            ⚠ Low — refill soon
          </p>
        )}
      </div>

      {/* Button */}
      <Button
        data-ocid={`med.log_dose.${index}`}
        size="sm"
        className="w-full"
        onClick={() => onLogDose(medication.id)}
        disabled={medication.takenToday}
        variant={medication.takenToday ? "secondary" : "default"}
      >
        {medication.takenToday ? `✓ ${t.doseLogged}` : t.logDose}
      </Button>
    </div>
  );
}
