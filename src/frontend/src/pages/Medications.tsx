import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Plus, Trash2, Wifi, WifiOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Medication } from "../types";

interface MedicationsProps {
  medications: Medication[];
  onUpdate: (meds: Medication[]) => void;
}

export default function Medications({
  medications,
  onUpdate,
}: MedicationsProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    dosage: "",
    total: "30",
    time: "8:00 AM",
  });

  const handleAdd = () => {
    if (!form.name.trim() || !form.dosage.trim()) return;
    const newMed: Medication = {
      id: `med-${Date.now()}`,
      name: form.name.trim(),
      dosage: form.dosage.trim(),
      dosesRemaining: Number(form.total),
      totalDoses: Number(form.total),
      status: "active",
      statusLabel: "Active",
      scheduledTime: form.time,
      takenToday: false,
      sensorConnected: false,
      refillThreshold: 7,
    };
    onUpdate([...medications, newMed]);
    setForm({ name: "", dosage: "", total: "30", time: "8:00 AM" });
    setOpen(false);
    toast.success(`${newMed.name} added to your medications.`);
  };

  const handleDelete = (id: string) => {
    const med = medications.find((m) => m.id === id);
    onUpdate(medications.filter((m) => m.id !== id));
    toast.success(`${med?.name} removed.`);
  };

  const toggleTaken = (id: string) => {
    onUpdate(
      medications.map((m) =>
        m.id === id
          ? {
              ...m,
              takenToday: !m.takenToday,
              status: !m.takenToday ? "taken" : "active",
              statusLabel: !m.takenToday
                ? `Taken ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                : "Active",
            }
          : m,
      ),
    );
  };

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Medications</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your medication schedule and doses.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              data-ocid="medications.add.button"
              size="sm"
              className="gap-2"
            >
              <Plus className="w-4 h-4" /> Add Medication
            </Button>
          </DialogTrigger>
          <DialogContent data-ocid="medications.add.dialog">
            <DialogHeader>
              <DialogTitle>Add New Medication</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="med-name">Medication Name</Label>
                <Input
                  id="med-name"
                  data-ocid="medications.name.input"
                  placeholder="e.g. Metformin, Paracetamol"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="med-dosage">Dosage</Label>
                <Input
                  id="med-dosage"
                  data-ocid="medications.dosage.input"
                  placeholder="e.g. 500mg, 10mg"
                  value={form.dosage}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, dosage: e.target.value }))
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="med-total">Total Doses</Label>
                  <Input
                    id="med-total"
                    data-ocid="medications.total.input"
                    type="number"
                    min="1"
                    value={form.total}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, total: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="med-time">Scheduled Time</Label>
                  <Input
                    id="med-time"
                    data-ocid="medications.time.input"
                    placeholder="e.g. 8:00 AM"
                    value={form.time}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, time: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                data-ocid="medications.cancel.button"
              >
                Cancel
              </Button>
              <Button onClick={handleAdd} data-ocid="medications.submit.button">
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* List */}
      {medications.length === 0 ? (
        <div
          data-ocid="medications.empty_state"
          className="text-center py-16 text-muted-foreground"
        >
          <p className="text-lg font-medium">No medications added yet.</p>
          <p className="text-sm mt-1">Click "Add Medication" to get started.</p>
        </div>
      ) : (
        <ul className="space-y-3" data-ocid="medications.list">
          <AnimatePresence>
            {medications.map((med, i) => {
              const pct = Math.round(
                (med.dosesRemaining / med.totalDoses) * 100,
              );
              const isLow = med.dosesRemaining <= med.refillThreshold;
              return (
                <motion.li
                  key={med.id}
                  data-ocid={`medications.item.${i + 1}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-card border border-border rounded-xl p-5 shadow-card"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-semibold text-foreground">
                          {med.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {med.dosage}
                        </Badge>
                        {isLow && (
                          <Badge variant="destructive" className="text-xs">
                            Low Stock
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Scheduled: {med.scheduledTime}
                      </p>
                      <div className="flex items-center gap-1.5 mt-2 text-xs">
                        {med.sensorConnected ? (
                          <>
                            <Wifi className="w-3 h-3 text-primary" />
                            <span className="text-primary">
                              Sensor connected
                            </span>
                          </>
                        ) : (
                          <>
                            <WifiOff className="w-3 h-3 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              No sensor
                            </span>
                          </>
                        )}
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Doses remaining</span>
                          <span
                            className={cn(
                              "font-semibold",
                              isLow ? "text-destructive" : "text-foreground",
                            )}
                          >
                            {med.dosesRemaining}/{med.totalDoses}
                          </span>
                        </div>
                        <Progress
                          value={pct}
                          className={cn(
                            "h-1.5",
                            isLow && "[&>div]:bg-destructive",
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        data-ocid={`medications.delete.${i + 1}`}
                        className="w-8 h-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(med.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor={`taken-${med.id}`}
                          className="text-xs text-muted-foreground cursor-pointer"
                        >
                          {med.takenToday ? "Taken" : "Mark taken"}
                        </Label>
                        <Switch
                          id={`taken-${med.id}`}
                          data-ocid={`medications.taken.${i + 1}`}
                          checked={med.takenToday}
                          onCheckedChange={() => toggleTaken(med.id)}
                        />
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
