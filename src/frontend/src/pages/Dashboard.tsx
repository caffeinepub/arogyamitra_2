import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, ChevronRight, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";
import type { Page } from "../App";
import MedicationCard from "../components/MedicationCard";
import { useLanguage } from "../context/LanguageContext";
import type { EmergencyContact, Medication, PharmacyAlert } from "../types";

interface DashboardProps {
  medications: Medication[];
  contacts: EmergencyContact[];
  pharmacyAlerts: PharmacyAlert[];
  onLogDose: (id: string) => void;
  onNavigate: (page: Page) => void;
}

const DAY_DATA = [
  { day: "Mon", val: 85 },
  { day: "Tue", val: 90 },
  { day: "Wed", val: 88 },
  { day: "Thu", val: 95 },
  { day: "Fri", val: 100 },
  { day: "Sat", val: 95 },
  { day: "Sun", val: 92 },
];

export default function Dashboard({
  medications,
  contacts,
  pharmacyAlerts,
  onLogDose,
  onNavigate,
}: DashboardProps) {
  const { t } = useLanguage();
  const adherencePct = 95;

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="text-2xl font-bold text-foreground">{t.greeting}</h1>
        <p className="text-muted-foreground mt-0.5">{t.greetingSubtext}</p>
      </motion.div>

      {/* Medications Section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground">
            {t.yourMedications}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary gap-1"
            data-ocid="dashboard.view_all_meds.button"
            onClick={() => onNavigate("medications")}
          >
            {t.viewAll} <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {medications.map((med, i) => (
            <MedicationCard
              key={med.id}
              medication={med}
              onLogDose={onLogDose}
              index={i + 1}
            />
          ))}
        </motion.div>
      </section>

      {/* Bottom Row */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Emergency Contacts */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                <Users className="w-3.5 h-3.5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">
                {t.emergencyContacts}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary gap-1 text-xs h-7 px-2"
              data-ocid="dashboard.view_contacts.button"
              onClick={() => onNavigate("contacts")}
            >
              {t.manage} <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
          <ul className="space-y-2.5" data-ocid="dashboard.contacts.list">
            {contacts.map((c, i) => (
              <li
                key={c.id}
                data-ocid={`dashboard.contact.item.${i + 1}`}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-foreground leading-none">
                    {c.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {c.phone}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    c.availability === "Available" &&
                      "border-green-200 text-green-700 bg-green-50",
                    c.availability === "112" &&
                      "border-red-200 text-red-700 bg-red-50",
                  )}
                >
                  {c.availability}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        {/* Pharmacy Alerts */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5 text-warning" />
            </div>
            <h3 className="font-semibold text-sm text-foreground">
              {t.medicineAlerts}
            </h3>
          </div>
          <ul className="space-y-3" data-ocid="dashboard.alerts.list">
            {pharmacyAlerts.map((alert, i) => (
              <li
                key={alert.id}
                data-ocid={`dashboard.alert.item.${i + 1}`}
                className={cn(
                  "flex gap-3 p-3 rounded-lg",
                  alert.severity === "warning" ? "bg-red-50" : "bg-orange-50",
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
                  <p className="text-xs font-semibold text-foreground">
                    {alert.medication}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {alert.message}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Schedule Overview */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">
                {t.todaysSummary}
              </h3>
            </div>
            <span className="text-sm font-bold text-primary">
              {adherencePct}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            {adherencePct}% {t.adherenceThisWeek}
          </p>
          {/* Bar chart */}
          <div className="flex items-end gap-1.5 h-20">
            {DAY_DATA.map((d) => (
              <div
                key={d.day}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  className="w-full rounded-sm bg-primary/80 transition-all"
                  style={{ height: `${(d.val / 100) * 64}px` }}
                />
                <span className="text-[9px] text-muted-foreground">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
