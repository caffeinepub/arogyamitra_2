import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Phone,
  RefreshCw,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { Pharmacy, PharmacyAlert } from "../types";

interface PharmacyPageProps {
  pharmacies: Pharmacy[];
  alerts: PharmacyAlert[];
  onUpdate: (pharmacies: Pharmacy[]) => void;
}

export default function PharmacyPage({
  pharmacies,
  alerts,
  onUpdate,
}: PharmacyPageProps) {
  const toggleConnect = (id: string) => {
    onUpdate(
      pharmacies.map((p) =>
        p.id === id ? { ...p, connected: !p.connected } : p,
      ),
    );
  };

  const toggleAutoRefill = (id: string) => {
    const ph = pharmacies.find((p) => p.id === id);
    onUpdate(
      pharmacies.map((p) =>
        p.id === id ? { ...p, autoRefill: !p.autoRefill } : p,
      ),
    );
    toast.success(
      `Auto-refill ${ph?.autoRefill ? "disabled" : "enabled"} for ${ph?.name}.`,
    );
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl font-bold text-foreground">Pharmacy</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Connected pharmacies and refill alerts.
        </p>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-foreground mb-3">
            Active Alerts
          </h2>
          <ul className="space-y-2.5" data-ocid="pharmacy.alerts.list">
            {alerts.map((alert, i) => (
              <motion.li
                key={alert.id}
                data-ocid={`pharmacy.alert.item.${i + 1}`}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "flex items-start gap-3 p-4 rounded-xl border shadow-card",
                  alert.severity === "warning"
                    ? "bg-red-50 border-red-100"
                    : "bg-orange-50 border-orange-100",
                )}
              >
                <AlertTriangle
                  className={cn(
                    "w-4 h-4 flex-shrink-0 mt-0.5",
                    alert.severity === "warning"
                      ? "text-red-500"
                      : "text-primary",
                  )}
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {alert.medication}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {alert.message}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-auto flex-shrink-0 gap-1.5 text-xs h-7"
                  data-ocid={`pharmacy.refill.${i + 1}`}
                  onClick={() =>
                    toast.success(
                      `Refill request sent for ${alert.medication}.`,
                    )
                  }
                >
                  <RefreshCw className="w-3 h-3" /> Request Refill
                </Button>
              </motion.li>
            ))}
          </ul>
        </section>
      )}

      {/* Pharmacies */}
      <section>
        <h2 className="text-sm font-semibold text-foreground mb-3">
          Connected Pharmacies
        </h2>
        <ul className="space-y-3" data-ocid="pharmacy.list">
          {pharmacies.map((ph, i) => (
            <motion.li
              key={ph.id}
              data-ocid={`pharmacy.item.${i + 1}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-5 shadow-card"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground text-sm">
                      {ph.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        ph.connected
                          ? "border-green-200 text-green-700 bg-green-50"
                          : "border-gray-200 text-gray-500 bg-gray-50",
                      )}
                    >
                      {ph.connected ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Connected
                        </>
                      ) : (
                        "Not Connected"
                      )}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {ph.address}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {ph.phone}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 items-end flex-shrink-0">
                  <Button
                    variant={ph.connected ? "outline" : "default"}
                    size="sm"
                    className="text-xs h-7"
                    data-ocid={`pharmacy.connect.${i + 1}`}
                    onClick={() => toggleConnect(ph.id)}
                  >
                    {ph.connected ? "Disconnect" : "Connect"}
                  </Button>
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor={`refill-${ph.id}`}
                      className="text-xs text-muted-foreground cursor-pointer"
                    >
                      Auto-refill
                    </Label>
                    <Switch
                      id={`refill-${ph.id}`}
                      data-ocid={`pharmacy.autorefill.${i + 1}`}
                      checked={ph.autoRefill}
                      onCheckedChange={() => toggleAutoRefill(ph.id)}
                      disabled={!ph.connected}
                    />
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>
    </div>
  );
}
