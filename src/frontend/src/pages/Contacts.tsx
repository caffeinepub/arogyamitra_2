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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronUp,
  Phone,
  Pill,
  Plus,
  Trash2,
  UserCircle2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { EmergencyContact, Medication } from "../types";

interface ContactsProps {
  contacts: EmergencyContact[];
  onUpdate: (contacts: EmergencyContact[]) => void;
  medications: Medication[];
}

export default function Contacts({
  contacts,
  onUpdate,
  medications,
}: ContactsProps) {
  const [open, setOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    phone: "",
    availability: "Available" as "Available" | "Unavailable" | "112",
  });

  const handleAdd = () => {
    if (!form.name.trim() || !form.phone.trim()) return;
    const newContact: EmergencyContact = {
      id: `con-${Date.now()}`,
      name: form.name.trim(),
      role: form.role.trim() || "Contact",
      phone: form.phone.trim(),
      availability: form.availability,
    };
    onUpdate([...contacts, newContact]);
    setForm({ name: "", role: "", phone: "", availability: "Available" });
    setOpen(false);
    toast.success(`${newContact.name} added to emergency contacts.`);
  };

  const handleDelete = (id: string) => {
    const c = contacts.find((x) => x.id === id);
    onUpdate(contacts.filter((x) => x.id !== id));
    toast.success(`${c?.name} removed.`);
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Emergency Contacts
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage people to be notified in an emergency.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              data-ocid="contacts.open_modal_button"
              size="sm"
              className="gap-2"
            >
              <Plus className="w-4 h-4" /> Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent data-ocid="contacts.dialog">
            <DialogHeader>
              <DialogTitle>Add New Emergency Contact</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="con-name">Full Name</Label>
                <Input
                  id="con-name"
                  data-ocid="contacts.name.input"
                  placeholder="e.g. Dr. Priya Sharma"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="con-role">Relation / Role</Label>
                <Input
                  id="con-role"
                  data-ocid="contacts.role.input"
                  placeholder="e.g. Doctor, Family, Friend"
                  value={form.role}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, role: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="con-phone">Mobile Number</Label>
                <Input
                  id="con-phone"
                  data-ocid="contacts.phone.input"
                  placeholder="e.g. +91 98765 43210"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Availability</Label>
                <Select
                  value={form.availability}
                  onValueChange={(v) =>
                    setForm((f) => ({
                      ...f,
                      availability: v as "Available" | "Unavailable" | "112",
                    }))
                  }
                >
                  <SelectTrigger data-ocid="contacts.availability.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Unavailable">Unavailable</SelectItem>
                    <SelectItem value="112">112 (Emergency)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                data-ocid="contacts.cancel_button"
              >
                Cancel
              </Button>
              <Button onClick={handleAdd} data-ocid="contacts.submit_button">
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {contacts.length === 0 ? (
        <div
          data-ocid="contacts.empty_state"
          className="text-center py-16 text-muted-foreground"
        >
          <UserCircle2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-lg font-medium">No contacts added yet.</p>
        </div>
      ) : (
        <ul className="space-y-3" data-ocid="contacts.list">
          <AnimatePresence>
            {contacts.map((c, i) => (
              <motion.li
                key={c.id}
                data-ocid={`contacts.item.${i + 1}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
                className="bg-card border border-border rounded-xl shadow-card overflow-hidden"
              >
                <div className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <UserCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">
                      {c.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{c.role}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Phone className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {c.phone}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs flex-shrink-0",
                      c.availability === "Available" &&
                        "border-green-200 text-green-700 bg-green-50",
                      c.availability === "Unavailable" &&
                        "border-gray-200 text-gray-600 bg-gray-50",
                      c.availability === "112" &&
                        "border-red-200 text-red-700 bg-red-50",
                    )}
                  >
                    {c.availability}
                  </Badge>
                  {c.availability !== "112" && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        data-ocid={`contacts.toggle.${i + 1}`}
                        className="w-8 h-8 text-muted-foreground hover:text-primary flex-shrink-0"
                        onClick={() => toggleExpand(c.id)}
                        title="View Dosages"
                      >
                        {expandedId === c.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        data-ocid={`contacts.delete_button.${i + 1}`}
                        className="w-8 h-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                        onClick={() => handleDelete(c.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
                <AnimatePresence>
                  {expandedId === c.id && c.availability !== "112" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-0 border-t border-border bg-accent/30">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mt-3 mb-2 flex items-center gap-1.5">
                          <Pill className="w-3 h-3" /> Medication Dosages
                        </p>
                        {medications.length === 0 ? (
                          <p className="text-xs text-muted-foreground">
                            No medications being tracked.
                          </p>
                        ) : (
                          <ul className="space-y-1.5">
                            {medications.map((med) => (
                              <li
                                key={med.id}
                                className="flex items-center justify-between text-sm"
                              >
                                <span className="text-foreground font-medium">
                                  {med.name}
                                </span>
                                <span className="text-muted-foreground text-xs bg-accent px-2 py-0.5 rounded-full">
                                  {med.dosage}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
