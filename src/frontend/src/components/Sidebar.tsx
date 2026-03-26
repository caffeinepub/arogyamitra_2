import { cn } from "@/lib/utils";
import {
  Bell,
  Building2,
  Calendar,
  Heart,
  LayoutDashboard,
  Phone,
  Pill,
  UserCircle,
} from "lucide-react";
import type { Page } from "../App";
import { useLanguage } from "../context/LanguageContext";

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  alertCount: number;
}

export default function Sidebar({
  activePage,
  onNavigate,
  alertCount,
}: SidebarProps) {
  const { t } = useLanguage();

  const navItems: { id: Page; label: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: t.nav.dashboard, icon: LayoutDashboard },
    { id: "medications", label: t.nav.medications, icon: Pill },
    { id: "schedule", label: t.nav.schedule, icon: Calendar },
    { id: "pharmacy", label: t.nav.pharmacy, icon: Building2 },
    { id: "contacts", label: t.nav.contacts, icon: Phone },
    { id: "profile", label: t.nav.profile, icon: UserCircle },
    { id: "alerts", label: t.nav.alerts, icon: Bell },
  ];

  return (
    <aside className="w-60 flex-shrink-0 bg-card border-r border-border flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Heart className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <span className="text-lg font-bold text-foreground tracking-tight">
              ArogyaMitra
            </span>
            <p className="text-[10px] text-muted-foreground leading-none mt-0.5">
              {t.appSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              type="button"
              key={item.id}
              data-ocid={`nav.${item.id}.link`}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative",
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 flex-shrink-0",
                  isActive && "text-primary",
                )}
              />
              <span>{item.label}</span>
              {item.id === "alerts" && alertCount > 0 && (
                <span className="ml-auto text-xs bg-destructive text-destructive-foreground rounded-full px-1.5 py-0.5 leading-none">
                  {alertCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Built with ♥ caffeine.ai
          </a>
        </p>
      </div>
    </aside>
  );
}
