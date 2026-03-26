import { createContext, useContext, useState } from "react";

export type Language = "en" | "hi" | "te";

export const translations = {
  en: {
    appSubtitle: "Your Health Companion",
    nav: {
      dashboard: "Dashboard",
      medications: "Medications",
      schedule: "Schedule",
      pharmacy: "Pharmacy",
      contacts: "Emergency Contacts",
      profile: "My Profile",
      alerts: "Alerts",
    },
    greeting: "🙏 Namaskar!",
    greetingSubtext: "Good Morning! Here's your medication overview for today.",
    yourMedications: "Your Medications",
    viewAll: "View All",
    emergencyContacts: "Emergency Contacts",
    manage: "Manage",
    medicineAlerts: "Medicine Alerts",
    todaysSummary: "Today's Summary",
    adherenceThisWeek: "adherence this week",
    profile: {
      title: "My Profile",
      subtitle:
        "Enter your personal and medical details. This information is visible to your emergency contacts.",
      savedDetails: "Saved Profile Details",
      fullName: "Full Name",
      age: "Age",
      bloodGroup: "Blood Group",
      allergies: "Allergies",
      conditions: "Medical Conditions",
      notes: "Emergency Notes",
      personalDetails: "Personal Details",
      save: "Save Profile",
      namePlaceholder: "e.g. Ramesh Kumar",
      agePlaceholder: "e.g. 45",
      selectBloodGroup: "Select blood group",
      allergiesPlaceholder: "e.g. Penicillin, Sulfa drugs, Dust",
      conditionsPlaceholder: "e.g. Type 2 Diabetes, Hypertension",
      notesPlaceholder:
        "Any important information for your primary physician...",
      profileSaved: "Profile saved successfully.",
    },
    logDose: "Log Dose",
    taken: "Taken",
    doseLogged: "Dose logged!",
  },
  hi: {
    appSubtitle: "आपका स्वास्थ्य साथी",
    nav: {
      dashboard: "डैशबोर्ड",
      medications: "दवाइयाँ",
      schedule: "समय-सारणी",
      pharmacy: "फार्मेसी",
      contacts: "आपातकालीन संपर्क",
      profile: "मेरी प्रोफ़ाइल",
      alerts: "अलर्ट",
    },
    greeting: "🙏 नमस्कार!",
    greetingSubtext: "सुप्रभात! आज की आपकी दवाइयों का विवरण यहाँ है।",
    yourMedications: "आपकी दवाइयाँ",
    viewAll: "सभी देखें",
    emergencyContacts: "आपातकालीन संपर्क",
    manage: "प्रबंधित करें",
    medicineAlerts: "दवा अलर्ट",
    todaysSummary: "आज का सारांश",
    adherenceThisWeek: "इस सप्ताह पालन",
    profile: {
      title: "मेरी प्रोफ़ाइल",
      subtitle:
        "अपनी व्यक्तिगत और चिकित्सा जानकारी दर्ज करें। यह जानकारी आपके आपातकालीन संपर्कों को दिखाई देती है।",
      savedDetails: "सहेजी गई प्रोफ़ाइल विवरण",
      fullName: "पूरा नाम",
      age: "आयु",
      bloodGroup: "रक्त समूह",
      allergies: "एलर्जी",
      conditions: "चिकित्सा स्थितियाँ",
      notes: "आपातकालीन नोट्स",
      personalDetails: "व्यक्तिगत विवरण",
      save: "प्रोफ़ाइल सहेजें",
      namePlaceholder: "जैसे रमेश कुमार",
      agePlaceholder: "जैसे 45",
      selectBloodGroup: "रक्त समूह चुनें",
      allergiesPlaceholder: "जैसे पेनिसिलिन, सल्फा दवाएं, धूल",
      conditionsPlaceholder: "जैसे टाइप 2 मधुमेह, उच्च रक्तचाप",
      notesPlaceholder: "आपके चिकित्सक के लिए कोई महत्वपूर्ण जानकारी...",
      profileSaved: "प्रोफ़ाइल सफलतापूर्वक सहेजी गई।",
    },
    logDose: "खुराक दर्ज करें",
    taken: "ली गई",
    doseLogged: "खुराक दर्ज हो गई!",
  },
  te: {
    appSubtitle: "మీ ఆరోగ్య సహచరుడు",
    nav: {
      dashboard: "డాష్‌బోర్డ్",
      medications: "మందులు",
      schedule: "సమయపట్టిక",
      pharmacy: "ఔషధాలయం",
      contacts: "అత్యవసర పరిచయాలు",
      profile: "నా ప్రొఫైల్",
      alerts: "హెచ్చరికలు",
    },
    greeting: "🙏 నమస్కారం!",
    greetingSubtext: "శుభోదయం! ఈరోజు మీ మందుల వివరాలు ఇక్కడ ఉన్నాయి.",
    yourMedications: "మీ మందులు",
    viewAll: "అన్నీ చూడండి",
    emergencyContacts: "అత్యవసర పరిచయాలు",
    manage: "నిర్వహించండి",
    medicineAlerts: "మందు హెచ్చరికలు",
    todaysSummary: "ఈరోజు సారాంశం",
    adherenceThisWeek: "ఈ వారం పాటింపు",
    profile: {
      title: "నా ప్రొఫైల్",
      subtitle:
        "మీ వ్యక్తిగత మరియు వైద్య వివరాలను నమోదు చేయండి. ఈ సమాచారం మీ అత్యవసర పరిచయాలకు కనిపిస్తుంది.",
      savedDetails: "సేవ్ చేసిన ప్రొఫైల్ వివరాలు",
      fullName: "పూర్తి పేరు",
      age: "వయసు",
      bloodGroup: "రక్త వర్గం",
      allergies: "అలెర్జీలు",
      conditions: "వైద్య పరిస్థితులు",
      notes: "అత్యవసర నోట్స్",
      personalDetails: "వ్యక్తిగత వివరాలు",
      save: "ప్రొఫైల్ సేవ్ చేయండి",
      namePlaceholder: "ఉదా. రమేశ్ కుమార్",
      agePlaceholder: "ఉదా. 45",
      selectBloodGroup: "రక్త వర్గం ఎంచుకోండి",
      allergiesPlaceholder: "ఉదా. పెన్సిలిన్, సల్ఫా మందులు, దుమ్ము",
      conditionsPlaceholder: "ఉదా. టైప్ 2 డయాబెటిస్, అధిక రక్తపోటు",
      notesPlaceholder: "మీ వైద్యుడికి ముఖ్యమైన సమాచారం...",
      profileSaved: "ప్రొఫైల్ విజయవంతంగా సేవ్ చేయబడింది.",
    },
    logDose: "మోతాదు నమోదు",
    taken: "తీసుకున్నారు",
    doseLogged: "మోతాదు నమోదైంది!",
  },
};

type Translations = typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const t = translations[language];
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
