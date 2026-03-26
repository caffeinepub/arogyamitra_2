import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import { type Language, useLanguage } from "../context/LanguageContext";

const LANG_OPTIONS: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हिं" },
  { code: "te", label: "తె" },
];

export default function Header() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="h-14 border-b border-border bg-card px-6 flex items-center justify-end gap-3 flex-shrink-0">
      {/* Language switcher */}
      <div className="flex items-center gap-1 border border-border rounded-lg p-0.5 bg-muted/40">
        {LANG_OPTIONS.map((opt) => (
          <button
            key={opt.code}
            type="button"
            onClick={() => setLanguage(opt.code)}
            className={cn(
              "px-2.5 py-1 text-xs font-semibold rounded-md transition-colors",
              language === opt.code
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-accent",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="relative"
        data-ocid="header.notifications.button"
      >
        <Bell className="w-4 h-4" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
      </Button>
      <div className="flex items-center gap-2.5">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
            AM
          </AvatarFallback>
        </Avatar>
        <div className="leading-none">
          <p className="text-sm font-semibold text-foreground">ArogyaMitra</p>
          <p className="text-xs text-muted-foreground">Healthcare App</p>
        </div>
      </div>
    </header>
  );
}
