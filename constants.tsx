
import React from 'react';

// Eurofever/PRINTO 2019 Clinical Classification Criteria for PFAPA
// Note: Diagnosis requires Recurrent Fever (Mandatory) + at least 7 of these 8 criteria.
export const EUROFEVER_PRINTO_PFAPA = [
  { id: 'aphthae', label: "Aphthous Tonsillitis/Pharyngitis", description: "טונסיליטיס/פרינגיטיס אפטית" },
  { id: 'duration', label: "Duration 3-6 Days", description: "משך התקף 3–6 ימים" },
  { id: 'adenitis', label: "Cervical Adenitis", description: "לימפאדניטיס צווארית" },
  { id: 'periodicity', label: "Periodicity", description: "מחזוריות של התקפים" },
  { id: 'asymptomatic', label: "Asymptomatic Between", description: "בריאות מלאה בין התקפים" },
  { id: 'no_abd', label: "No Abdominal Pain", description: "היעדר כאבי בטן" },
  { id: 'no_diarrhea', label: "No Diarrhea", description: "היעדר שלשול" },
  { id: 'no_chest', label: "No Chest Pain", description: "היעדר כאבי חזה" }
];

// Updated Marshall Criteria for Checklist format
export const PFAPA_CRITERIA_MARSHALL = [
  { id: 'm_fever', label: "Recurrent Periodic Fever", description: "חום חוזר מחזורי" },
  { id: 'm_aphthae', label: "Aphthous Stomatitis", description: "סטומטיטיס אפטית" },
  { id: 'm_pharyngitis', label: "Pharyngitis", description: "דלקת גרון" },
  { id: 'm_adenitis', label: "Cervical Adenitis", description: "לימפאדניטיס צווארית" },
  { id: 'm_age', label: "Onset < 5 years", description: "הופעה לפני גיל 5" },
  { id: 'm_healthy', label: "Completely Well Between", description: "בריאות מלאה בין התקפים" },
  { id: 'm_exclusion', label: "No Other Diseases", description: "היעדר מחלה זיהומית/אוטואינפלמטורית אחרת" },
  { id: 'm_growth', label: "Normal Growth", description: "גדילה והתפתחות תקינה" }
];

// FMF - Tel Hashomer Criteria
export const TEL_HASHOMER_FMF = {
  major: [
    { id: 'th_fever', label: "חום חוזר" },
    { id: 'th_abd', label: "כאב בטן משכיב/פריטוניטיס" },
    { id: 'th_chest', label: "פלאוריטיס" },
    { id: 'th_joint', label: "מונוארתריטיס (חם נפוח כואב, לעיתים אדום)" },
    { id: 'th_rash', label: "פריחה דמויית שושנה (erysipelas like erythrema)" }
  ],
  minor: [
    { id: 'th_esr', label: "שקיעת דם מוגברת (ESR)" },
    { id: 'th_leuko', label: "לויקוציטוזיס (ספירה לבנה גבוהה)" },
    { id: 'th_fib', label: "רמת פיברינוגן גבוהה" }
  ]
};

// FMF - Eurofever/PRINTO Criteria
export const EUROFEVER_FMF = [
  { id: 'ef_fever', label: "התקפים חוזרים של חום (≥3)" },
  { id: 'ef_sero', label: "התקפים חוזרים של סרוזיטיס (בטן, חזה או מפרק)" },
  { id: 'ef_dur', label: "משך התקף 12–72 שעות" },
  { id: 'ef_age', label: "התחלה מתחת לגיל 20" }
];

// FMF - Supportive Features (Updated based on user request)
export const FMF_SUPPORTIVE = [
  { id: 'sup_age', label: "גיל הופעה מתחת ל-20 שנה" },
  { id: 'sup_legs', label: "כאבי רגליים במאמצים בין ההתקפים" },
  { id: 'sup_healthy', label: "בריא לחלוטין בין ההתקפים" },
  { id: 'sup_markers', label: "מדדי דלקת תקינים בין ההתקפים" },
  { id: 'sup_irregular', label: "התקפים אינם פריודיים/סדירים" },
  { id: 'sup_fam', label: "היסטוריה משפחתית של FMF" },
  { id: 'sup_colch', label: "תגובה לקולכיצין" }
];

export const MONOGENIC_MIMICS = [
  { 
    name: "Cyclic Neutropenia", 
    key_diff: "מחזוריות קבועה (21 יום), אך מלווה בזיהומים קשים ונויטרופניה מתועדת.",
    test: "CBC פעמיים בשבוע למשך 6 שבועות"
  },
  { 
    name: "HIDS (Mevalonate Kinase)", 
    key_diff: "התקפים ארוכים יותר, הגדלת קשריות לימפה משמעותית, לעיתים טריגר של חיסון.",
    test: "Urinary Mevalonic acid / MVK genetics"
  },
  { 
    name: "TRAPS", 
    key_diff: "התקפים ארוכים מאוד (>7 ימים), בצקת פרי-אורביטלית, וכאבי שרירים נודדים. הפריחה אופיינית היא אריתמטוטית ונודדת (Migratory) המופיעה מעל אזורי כאב השרירים.",
    test: "TNFRSF1A genetics"
  },
  {
    name: "CAPS",
    key_diff: "התקפים קצרים יותר או מתמשכים. הפריחה היא דמוית סרפדת (Urticaria-like) אך בניגוד לסרפדת רגילה היא אינה מגרדת (Non-pruritic). סיכון לירידה בשמיעה.",
    test: "NLRP3 genetics"
  }
];

export const STEROID_RULES = [
  { rule: "חום חוזר תוך פחות מיום", interpretation: "לא PFAPA. שקול Strep או Adenovirus." },
  { rule: "חום חוזר תוך 2-6 ימים", interpretation: "המינון לא היה מספיק." },
  { rule: "חום חוזר אחרי שבוע+", interpretation: "התקף חדש, ללא קשר למנה הקודמת." }
];

export const COMPARISON_DATA = [
  { feature: "מחזוריות", pfapa: "צפויה (כמו שעון)", fmf: "לא צפויה" },
  { feature: "משך התקף", pfapa: "ארוך (3-7 ימים)", fmf: "קצר (12-72 שעות)" },
  { feature: "גנטיקה", pfapa: "חולף תוך 6-8 שנים", fmf: "גנטי, לכל החיים" },
  { feature: "סרוזיטיס", pfapa: "כאב בטן קל", fmf: "כאב עז, חוסר יכולת לזוז" },
  { feature: "תגובה לסטרואידים", pfapa: "דרמטית ומהירה", fmf: "מינורית או לא ברורה" },
  { feature: "טיפול בסיס", pfapa: "סטרואידים (בזמן התקף)", fmf: "קולכיצין (יומי)" }
];

export const Icons = {
  Stethoscope: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2a.3.3 0 0 0-.2.3Z"/><path d="M10 22v-2"/><path d="M7 15H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h3"/><path d="M9 17.5a2.5 2.5 0 0 0 5 0"/><path d="M9 8c0-3.4 2.8-6 6.2-6 2.1 0 3.9 1 5 2.6"/><path d="M12 8a6.3 6.3 0 0 1 7.8 1.9"/><path d="M3.2 13h1.9"/><path d="M10.2 8h1.9"/><path d="M10 2a4 4 0 0 1 4 4c0 3-4 5-4 5s-4-2-4-5a4 4 0 0 1 4-4Z"/></svg>
  ),
  History: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
  ),
  Brain: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z"/></svg>
  ),
  Calculator: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
  ),
  Info: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
  ),
  Warning: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  )
};
