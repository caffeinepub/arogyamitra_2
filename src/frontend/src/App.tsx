import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { LanguageProvider } from "./context/LanguageContext";
import {
  initialContacts,
  initialMedications,
  initialPharmacies,
  initialPharmacyAlerts,
} from "./data/mockData";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/Dashboard";
import Medications from "./pages/Medications";
import PharmacyPage from "./pages/Pharmacy";
import Profile from "./pages/Profile";
import Schedule from "./pages/Schedule";
import type {
  EmergencyContact,
  Medication,
  PatientProfile,
  Pharmacy,
  PharmacyAlert,
} from "./types";

export type Page =
  | "dashboard"
  | "medications"
  | "contacts"
  | "pharmacy"
  | "schedule"
  | "alerts"
  | "profile";

export default function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [medications, setMedications] =
    useState<Medication[]>(initialMedications);
  const [contacts, setContacts] = useState<EmergencyContact[]>(initialContacts);
  const [pharmacyAlerts] = useState<PharmacyAlert[]>(initialPharmacyAlerts);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>(initialPharmacies);
  const [profile, setProfile] = useState<PatientProfile>({
    name: "",
    age: "",
    bloodType: "",
    allergies: "",
    conditions: "",
    notes: "",
  });

  const alertCount = pharmacyAlerts.filter(
    (a) => a.severity === "warning",
  ).length;

  return (
    <LanguageProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
          alertCount={alertCount}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            {activePage === "dashboard" && (
              <Dashboard
                medications={medications}
                contacts={contacts}
                pharmacyAlerts={pharmacyAlerts}
                onLogDose={(id) =>
                  setMedications((prev) =>
                    prev.map((m) =>
                      m.id === id
                        ? {
                            ...m,
                            takenToday: true,
                            status: "taken",
                            statusLabel: `Taken ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
                          }
                        : m,
                    ),
                  )
                }
                onNavigate={setActivePage}
              />
            )}
            {activePage === "medications" && (
              <Medications
                medications={medications}
                onUpdate={setMedications}
              />
            )}
            {activePage === "contacts" && (
              <Contacts
                contacts={contacts}
                onUpdate={setContacts}
                medications={medications}
              />
            )}
            {activePage === "pharmacy" && (
              <PharmacyPage
                pharmacies={pharmacies}
                alerts={pharmacyAlerts}
                onUpdate={setPharmacies}
              />
            )}
            {activePage === "schedule" && (
              <Schedule medications={medications} />
            )}
            {activePage === "alerts" && (
              <PharmacyPage
                pharmacies={pharmacies}
                alerts={pharmacyAlerts}
                onUpdate={setPharmacies}
              />
            )}
            {activePage === "profile" && (
              <Profile profile={profile} onUpdate={setProfile} />
            )}
          </main>
        </div>
        <Toaster richColors />
      </div>
    </LanguageProvider>
  );
}
