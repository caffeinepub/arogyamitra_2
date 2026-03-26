import type {
  EmergencyContact,
  Medication,
  Pharmacy,
  PharmacyAlert,
  ScheduleItem,
} from "../types";

export const initialMedications: Medication[] = [
  {
    id: "med-1",
    name: "Metformin",
    dosage: "500mg",
    dosesRemaining: 22,
    totalDoses: 30,
    status: "taken",
    statusLabel: "Taken 8:00 AM",
    scheduledTime: "8:00 AM",
    takenToday: true,
    sensorConnected: true,
    refillThreshold: 7,
  },
  {
    id: "med-2",
    name: "Amlodipine",
    dosage: "5mg",
    dosesRemaining: 8,
    totalDoses: 30,
    status: "due",
    statusLabel: "Due 2:00 PM",
    scheduledTime: "2:00 PM",
    takenToday: false,
    sensorConnected: true,
    refillThreshold: 7,
  },
  {
    id: "med-3",
    name: "Atorvastatin",
    dosage: "10mg",
    dosesRemaining: 25,
    totalDoses: 30,
    status: "active",
    statusLabel: "Active",
    scheduledTime: "9:00 PM",
    takenToday: false,
    sensorConnected: false,
    refillThreshold: 7,
  },
];

export const initialContacts: EmergencyContact[] = [
  {
    id: "con-1",
    name: "Dr. Priya Sharma",
    role: "Primary Physician",
    phone: "+91 98204 56789",
    availability: "Available",
  },
  {
    id: "con-2",
    name: "Rahul Mehta",
    role: "Family",
    phone: "+91 97312 34567",
    availability: "Available",
  },
  {
    id: "con-3",
    name: "Emergency Services",
    role: "Emergency",
    phone: "112",
    availability: "112",
  },
];

export const initialPharmacyAlerts: PharmacyAlert[] = [
  {
    id: "alert-1",
    medication: "Amlodipine 5mg",
    message: "Refill due in 2 days — only 8 doses remaining.",
    severity: "warning",
  },
  {
    id: "alert-2",
    medication: "Metformin 500mg",
    message: "Auto-refill scheduled for Friday, 28 Mar.",
    severity: "info",
  },
];

export const initialPharmacies: Pharmacy[] = [
  {
    id: "ph-1",
    name: "Apollo Pharmacy",
    address: "12 MG Road, Bengaluru, Karnataka",
    phone: "+91 80 4567 8901",
    connected: true,
    autoRefill: true,
  },
  {
    id: "ph-2",
    name: "MedPlus Health",
    address: "45 Anna Salai, Chennai, Tamil Nadu",
    phone: "+91 44 2345 6789",
    connected: true,
    autoRefill: false,
  },
  {
    id: "ph-3",
    name: "Netmeds Pharmacy",
    address: "78 FC Road, Pune, Maharashtra",
    phone: "+91 20 6789 0123",
    connected: false,
    autoRefill: false,
  },
];

export const scheduleItems: ScheduleItem[] = [
  {
    time: "8:00 AM",
    period: "Morning",
    medications: ["Metformin 500mg"],
    taken: true,
  },
  {
    time: "2:00 PM",
    period: "Afternoon",
    medications: ["Amlodipine 5mg"],
    taken: false,
  },
  {
    time: "9:00 PM",
    period: "Evening",
    medications: ["Atorvastatin 10mg"],
    taken: false,
  },
];
