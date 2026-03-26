import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2, UserCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../context/LanguageContext";
import type { PatientProfile } from "../types";

interface ProfileProps {
  profile: PatientProfile;
  onUpdate: (profile: PatientProfile) => void;
}

export default function Profile({ profile, onUpdate }: ProfileProps) {
  const [form, setForm] = useState<PatientProfile>({ ...profile });
  const { t } = useLanguage();

  const isProfileFilled = profile.name.trim() !== "";

  const handleSave = () => {
    onUpdate({ ...form });
    toast.success(t.profile.profileSaved);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-foreground">{t.profile.title}</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {t.profile.subtitle}
        </p>
      </div>

      {isProfileFilled && (
        <Card data-ocid="profile.card" className="bg-accent/40 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <UserCircle className="w-4 h-4 text-primary" />
              {t.profile.savedDetails}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">
                {t.profile.fullName}
              </p>
              <p className="font-medium text-foreground">{profile.name}</p>
            </div>
            {profile.age && (
              <div>
                <p className="text-xs text-muted-foreground">{t.profile.age}</p>
                <p className="font-medium text-foreground">{profile.age}</p>
              </div>
            )}
            {profile.bloodType && (
              <div>
                <p className="text-xs text-muted-foreground">
                  {t.profile.bloodGroup}
                </p>
                <p className="font-medium text-foreground">
                  {profile.bloodType}
                </p>
              </div>
            )}
            {profile.allergies && (
              <div className="col-span-2">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-orange-500" />{" "}
                  {t.profile.allergies}
                </p>
                <p className="font-medium text-foreground">
                  {profile.allergies}
                </p>
              </div>
            )}
            {profile.conditions && (
              <div className="col-span-2">
                <p className="text-xs text-muted-foreground">
                  {t.profile.conditions}
                </p>
                <p className="font-medium text-foreground">
                  {profile.conditions}
                </p>
              </div>
            )}
            {profile.notes && (
              <div className="col-span-2">
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-green-500" />{" "}
                  {t.profile.notes}
                </p>
                <p className="font-medium text-foreground">{profile.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card data-ocid="profile.panel">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">
            {t.profile.personalDetails}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="profile-name">{t.profile.fullName}</Label>
              <Input
                id="profile-name"
                data-ocid="profile.name.input"
                placeholder={t.profile.namePlaceholder}
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="profile-age">{t.profile.age}</Label>
              <Input
                id="profile-age"
                data-ocid="profile.age.input"
                placeholder={t.profile.agePlaceholder}
                value={form.age}
                onChange={(e) =>
                  setForm((f) => ({ ...f, age: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>{t.profile.bloodGroup}</Label>
            <Select
              value={form.bloodType}
              onValueChange={(v) => setForm((f) => ({ ...f, bloodType: v }))}
            >
              <SelectTrigger data-ocid="profile.bloodtype.select">
                <SelectValue placeholder={t.profile.selectBloodGroup} />
              </SelectTrigger>
              <SelectContent>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (bt) => (
                    <SelectItem key={bt} value={bt}>
                      {bt}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="profile-allergies">{t.profile.allergies}</Label>
            <Textarea
              id="profile-allergies"
              data-ocid="profile.allergies.textarea"
              placeholder={t.profile.allergiesPlaceholder}
              rows={2}
              value={form.allergies}
              onChange={(e) =>
                setForm((f) => ({ ...f, allergies: e.target.value }))
              }
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="profile-conditions">{t.profile.conditions}</Label>
            <Textarea
              id="profile-conditions"
              data-ocid="profile.conditions.textarea"
              placeholder={t.profile.conditionsPlaceholder}
              rows={2}
              value={form.conditions}
              onChange={(e) =>
                setForm((f) => ({ ...f, conditions: e.target.value }))
              }
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="profile-notes">{t.profile.notes}</Label>
            <Textarea
              id="profile-notes"
              data-ocid="profile.notes.textarea"
              placeholder={t.profile.notesPlaceholder}
              rows={3}
              value={form.notes}
              onChange={(e) =>
                setForm((f) => ({ ...f, notes: e.target.value }))
              }
            />
          </div>

          <Button
            className="w-full"
            data-ocid="profile.save_button"
            onClick={handleSave}
          >
            {t.profile.save}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
