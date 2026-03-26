export type MedStatus = "active" | "taken" | "due" | "low";

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  dosesRemaining: number;
  totalDoses: number;
  status: MedStatus;
  statusLabel: string;
  scheduledTime: string;
  takenToday: boolean;
  sensorConnected: boolean;
  refillThreshold: number;
}

export interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  availability: "Available" | "Unavailable" | "112";
}

export interface PharmacyAlert {
  id: string;
  medication: string;
  message: string;
  severity: "warning" | "info";
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  connected: boolean;
  autoRefill: boolean;
}

export interface ScheduleItem {
  time: string;
  period: "Morning" | "Afternoon" | "Evening" | "Night";
  medications: string[];
  taken: boolean;
}

export interface PatientProfile {
  name: string;
  age: string;
  bloodType: string;
  allergies: string;
  conditions: string;
  notes: string;
}
