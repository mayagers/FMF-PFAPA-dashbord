
import React, { useState } from 'react';
import DiagnosisCalculator from './components/DiagnosisCalculator';
import PatientTracker from './components/PatientTracker';
import ComparisonTable from './components/ComparisonTable';
import AddEpisodeForm from './components/AddEpisodeForm';
import { Icons, STEROID_RULES, MONOGENIC_MIMICS } from './constants';
import { FeverEpisode } from './types';

const INITIAL_MOCK_EPISODES: FeverEpisode[] = [
  { id: '1', date: '2023-11-01', durationDays: 4, maxTemp: 39.8, symptoms: ['Pharyngitis', 'Adenitis'] },
  { id: '2', date: '2023-11-28', durationDays: 3, maxTemp: 40.2, symptoms: ['Pharyngitis', 'Aphthous Ulcers'] },
  { id: '3', date: '2023-12-25', durationDays: 4, maxTemp: 39.5, symptoms: ['Adenitis'] },
  { id: '4', date: '2024-01-22', durationDays: 3, maxTemp: 40.5, symptoms: ['Pharyngitis', 'Aphthous Ulcers', 'Adenitis'] },
];

const CLINICAL_PITFALLS = [
  "יכול להופיע בכל גיל - לא רק בילדים קטנים.",
  "חפש תפליטים על השקדים - עשויים להופיע רק ביום ה-3-4 להתקף.",
  "סטרואידים משבשים את המחזוריות ועלולים לגרום לציפוף התקפים (P-fever).",
  "טיפול מונע אפשרי: קולכיצין בנשאים, ויטמין D, פרוביוטיקה.",
  "מוטציה של MEFV בחולה PFAPA לא אומרת שיש פה FMF.",
  "היצמד לקליניקה (The Duck) ולא לגנטיקה.",
  "בדוק תמיד את מינון הסטרואידים (0.3 מ\"ג לק\"ג).",
  "PFAPA אצל נשאי סטרפטוקוק: קודם בטנזול, ורק אם אין תגובה - משטח.",
  "ייתכן שילוב: ישנם ילדים הסובלים גם מ-PFAPA וגם מ-FMF.",
  "טונסילקטומיה: PFAPA יכול לחזור גם אחריה; מומלץ רק למקרי קיצון."
];

const CLALIT_LOGO_URL = "https://upload.wikimedia.org/wikipedia/he/thumb/4/4b/Clalit_Health_Services_logo.svg/1200px-Clalit_Health_Services_logo.svg.png";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tracker' | 'calculator' | 'comparison'>('tracker');
  const [episodes, setEpisodes] = useState<FeverEpisode[]>(INITIAL_MOCK_EPISODES);
  const [isAdding, setIsAdding] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleAddEpisode = (newEpisode: FeverEpisode) => {
    const updated = [...episodes, newEpisode].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setEpisodes(updated);
    setIsAdding(false);
  };

  const confirmClearDiary = () => {
    setEpisodes([]);
    setShowClearConfirm(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const calculateStats = () => {
    if (episodes.length < 2) return { avgInterval: 'N/A', maxTemp: episodes.length === 1 ? `${episodes[0].maxTemp}°C` : 'N/A' };
    
    let totalGap = 0;
    for (let i = 1; i < episodes.length; i++) {
      const d1 = new Date(episodes[i-1].date).getTime();
      const d2 = new Date(episodes[i].date).getTime();
      totalGap += (d2 - d1) / (1000 * 60 * 60 * 24);
    }
    
    const avg = (totalGap / (episodes.length - 1)).toFixed(1);
    const max = Math.max(...episodes.map(e => e.maxTemp));
    
    return { avgInterval: `${avg} Days`, maxTemp: `${max}°C` };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50" dir="rtl">
      {/* Sidebar Navigation - Hidden on Print */}
      <nav className="w-full md:w-80 bg-slate-900 text-white flex flex-col shrink-0 print:hidden overflow-y-auto border-l border-slate-800">
        <div className="p-8 border-b border-slate-800 text-right">
          <div className="mb-6 flex flex-col items-center">
             <img 
               src={CLALIT_LOGO_URL} 
               alt="Clalit Logo" 
               className="h-16 w-auto mb-4 bg-white p-3 rounded-xl shadow-inner object-contain"
             />
             <div className="text-center">
                <h1 className="text-xl font-black tracking-tight text-white mb-1">ד"ר מיה גרשטין</h1>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">מומחית לראומטולוגיית ילדים</p>
             </div>
          </div>
          <div className="flex items-center gap-3 justify-end mt-4">
            <h2 className="text-sm font-bold text-slate-400">דשבורד PFAPA & FMF</h2>
            <div className="p-1.5 bg-green-600 rounded shadow-lg">
              <Icons.Stethoscope />
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-2">
          <button 
            type="button"
            onClick={() => setActiveTab('tracker')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group justify-end ${activeTab === 'tracker' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <span className="font-bold text-sm">יומן התקפים</span>
            <Icons.History />
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('calculator')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group justify-end ${activeTab === 'calculator' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <span className="font-bold text-sm">קריטריונים לאבחנה</span>
            <Icons.Calculator />
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('comparison')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group justify-end ${activeTab === 'comparison' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <span className="font-bold text-sm">אבחנה מבדלת</span>
            <Icons.Info />
          </button>
        </div>

        <div className="p-8 border-t border-slate-800 text-[10px] text-slate-500 font-medium text-right">
          מרפאת ראומטולוגיה, כללית<br/>
          עודכן: פברואר 2026
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto print:p-0 print:overflow-visible">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 print:mb-4">
          <div className="print:text-center print:w-full">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight text-right">
              {activeTab === 'tracker' && 'מעקב התקפי חום - יומן מטופל'}
              {activeTab === 'calculator' && 'חישוב מדדי אבחנה'}
              {activeTab === 'comparison' && 'השוואה קלינית ומימיקות'}
            </h2>
            <p className="text-slate-500 mt-1 font-medium print:text-xs text-right">
              {activeTab === 'tracker' && 'ויזואליזציה של דפוסי חום ומרווחים דלקתיים.'}
              {activeTab === 'calculator' && 'סיווג לפי Eurofever/PRINTO 2019.'}
              {activeTab === 'comparison' && 'הבנת ההבדלים בין PFAPA לתסמונות מונוגניות.'}
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 print:hidden">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900 leading-tight">ד"ר מיה גרשטין</p>
              <p className="text-xs text-green-600 font-bold">כללית שירותי בריאות</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm p-1">
               <img src={CLALIT_LOGO_URL} alt="Clalit" className="h-full w-auto object-contain" />
            </div>
          </div>
        </header>

        {activeTab === 'tracker' && (
          <div className="max-w-6xl space-y-8 print:space-y-4">
            {/* Action Bar for Clinical Workflow */}
            <div className="flex flex-wrap gap-3 print:hidden justify-end relative">
              
              {showClearConfirm ? (
                <div className="flex items-center gap-2 bg-red-100 p-2 rounded-xl animate-in fade-in zoom-in duration-200">
                  <span className="text-xs font-bold text-red-800 px-2">בטוח?</span>
                  <button 
                    type="button"
                    onClick={confirmClearDiary}
                    className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg font-black"
                  >
                    כן, מחק
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowClearConfirm(false)}
                    className="bg-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-lg font-bold"
                  >
                    ביטול
                  </button>
                </div>
              ) : (
                <button 
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-bold hover:bg-red-100 transition-all active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                  ניקוי יומן
                </button>
              )}

              <button 
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-2 bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-200 transition-all active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                הדפס יומן
              </button>
              
              <button 
                type="button"
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-green-700 transition-all active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                הוסף התקף
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:grid-cols-2">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm print:p-4 print:border text-right">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">מרווח ממוצע</p>
                <h3 className="text-4xl font-black mt-2 text-green-600 print:text-2xl">{stats.avgInterval}</h3>
                <p className="text-slate-500 text-xs mt-4 flex items-center gap-2 justify-end">
                  {stats.avgInterval !== 'N/A' ? 'דפוס מחזורי (מרמז על PFAPA)' : 'נדרשים נתונים נוספים'}
                  <span className={`w-2 h-2 rounded-full animate-pulse ${stats.avgInterval !== 'N/A' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm print:p-4 print:border text-right">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">חום מקסימלי</p>
                <h3 className="text-4xl font-black mt-2 text-red-600 print:text-2xl">{stats.maxTemp}</h3>
                <p className="text-slate-500 text-xs mt-4">מתועד בהתקפים האחרונים</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-1 print:hidden text-right">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">סטטוס מטופל</p>
                <h3 className="text-4xl font-black mt-2 text-slate-900">{episodes.length} התקפים</h3>
                <p className="text-slate-500 text-xs mt-4 italic">מידע זמני למפגש זה בלבד</p>
              </div>
            </div>

            {isAdding && (
              <div className="print:hidden">
                <AddEpisodeForm 
                  onAdd={handleAddEpisode} 
                  onCancel={() => setIsAdding(false)} 
                />
              </div>
            )}

            <PatientTracker episodes={episodes} />

            {/* Print Only Disclaimer */}
            <div className="hidden print:block text-[10px] text-slate-400 mt-10 text-center border-t pt-4 italic">
              מסמך זה הופק באמצעות כלי תומך החלטה קלינית. המידע הינו לצורך מעקב רפואי בלבד ואינו מהווה אבחנה סופית.
              <br/>
              נכתב על בסיס הנחיות ד\"ר מיה גרשטין - כללית שירותי בריאות.
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="max-w-7xl space-y-10">
            <DiagnosisCalculator />
            <section className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
              <div className="flex items-center gap-3 mb-6 justify-end">
                <h3 className="text-xl font-bold">כללי אצבע: תגובה לסטרואידים</h3>
                <Icons.Warning />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STEROID_RULES.map((rule, idx) => (
                  <div key={idx} className="bg-slate-800 p-5 rounded-2xl border border-slate-700 text-right">
                    <p className="text-green-400 font-black text-xs uppercase mb-2">תרחיש {idx + 1}</p>
                    <p className="font-bold text-sm mb-2 leading-tight">{rule.rule}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{rule.interpretation}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="max-w-6xl space-y-10">
            <ComparisonTable />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
               <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg order-2 lg:order-1">
                  <h3 className="text-2xl font-black mb-6 text-slate-900 flex items-center gap-3 justify-end">
                    שלילת מימיקות מונוגניות
                    <span className="text-green-600"><Icons.Info /></span>
                  </h3>
                  <div className="space-y-6">
                    {MONOGENIC_MIMICS.map((mimic, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-right">
                        <p className="text-green-700 font-black text-sm uppercase mb-1">{mimic.name}</p>
                        <p className="text-slate-600 text-xs mb-3 font-medium leading-relaxed">{mimic.key_diff}</p>
                        <div className="flex items-center gap-2 text-[10px] font-black bg-white px-3 py-1.5 rounded-lg border border-slate-100 w-fit mr-auto">
                          <span className="text-slate-400 uppercase">בדיקה:</span>
                          <span className="text-slate-800">{mimic.test}</span>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="bg-slate-800 text-white p-8 rounded-3xl shadow-xl flex flex-col text-right order-1 lg:order-2">
                  <h3 className="text-2xl font-black mb-6 tracking-tight flex items-center gap-2 justify-end">
                    מלכודות קליניות
                    <Icons.Warning />
                  </h3>
                  <ul className="space-y-4 text-sm opacity-90">
                    {CLINICAL_PITFALLS.map((pitfall, i) => (
                      <li key={i} className="flex gap-4 justify-end items-start group">
                        <span className="leading-snug flex-1 group-hover:text-green-200 transition-colors">{pitfall}</span>
                        <span className="font-black text-green-400 shrink-0 text-xs mt-1">{(i + 1).toString().padStart(2, '0')}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-8 border-t border-slate-700 italic text-center">
                    <p className="text-xs text-slate-400">"If it looks like a duck, walks like a duck... IT'S A DUCK!"</p>
                  </div>
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
