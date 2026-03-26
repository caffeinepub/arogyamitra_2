import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, Moon, Sun, Sunset } from "lucide-react";
import { motion } from "motion/react";
import { scheduleItems } from "../data/mockData";
import type { Medication } from "../types";

interface ScheduleProps {
  medications: Medication[];
}

const periodIcon = {
  Morning: Sun,
  Afternoon: Sunset,
  Evening: Moon,
  Night: Moon,
};

const periodColor = {
  Morning: "text-amber-500 bg-amber-50",
  Afternoon: "text-orange-500 bg-orange-50",
  Evening: "text-indigo-500 bg-indigo-50",
  Night: "text-slate-600 bg-slate-100",
};

const periodHindi: Record<string, string> = {
  Morning: "Subah",
  Afternoon: "Dopahar",
  Evening: "Shaam",
  Night: "Raat",
};

export default function Schedule({ medications }: ScheduleProps) {
  const schedule = scheduleItems.map((item) => ({
    ...item,
    taken:
      medications.find((m) => m.scheduledTime === item.time)?.takenToday ??
      item.taken,
  }));

  const takenCount = schedule.filter((s) => s.taken).length;
  const totalCount = schedule.length;
  const adherencePct = Math.round((takenCount / totalCount) * 100);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-foreground">Schedule</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Aaj ka aapka dawai lene ka samay-suchi.
        </p>
      </div>

      {/* Summary */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">
            Aaj ki Niyamitata
          </h2>
          <span className="text-2xl font-bold text-primary">
            {adherencePct}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${adherencePct}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {takenCount} mein se {totalCount} doses aaj li gayi
        </p>
      </div>

      {/* Timeline */}
      <ul className="space-y-3" data-ocid="schedule.list">
        {schedule.map((item, i) => {
          const Icon = periodIcon[item.period];
          return (
            <motion.li
              key={item.time}
              data-ocid={`schedule.item.${i + 1}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-5 shadow-card"
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    periodColor[item.period],
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {item.time}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {periodHindi[item.period] || item.period}
                      </p>
                    </div>
                    {item.taken ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Li Gayi
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                        <Clock className="w-3 h-3" /> Baki
                      </span>
                    )}
                  </div>
                  <ul className="mt-2 space-y-1">
                    {item.medications.map((name) => (
                      <li
                        key={name}
                        className="text-sm text-foreground flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>

      {/* Weekly adherence */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-card">
        <h2 className="text-sm font-semibold text-foreground mb-4">
          Saaptahik Niyamitata
        </h2>
        <div className="flex items-end gap-2 h-24">
          {[
            { day: "Som", pct: 85, label: "85%" },
            { day: "Man", pct: 90, label: "90%" },
            { day: "Bud", pct: 88, label: "88%" },
            { day: "Brh", pct: 95, label: "95%" },
            { day: "Sha", pct: 100, label: "100%" },
            { day: "San", pct: 95, label: "95%" },
            { day: "Rav", pct: adherencePct, label: `${adherencePct}%` },
          ].map((d, idx) => (
            <div
              key={d.day}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <span className="text-[10px] text-muted-foreground">
                {d.label}
              </span>
              <motion.div
                className="w-full rounded-t bg-primary"
                initial={{ height: 0 }}
                animate={{ height: `${(d.pct / 100) * 72}px` }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
              />
              <span className="text-[10px] text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
