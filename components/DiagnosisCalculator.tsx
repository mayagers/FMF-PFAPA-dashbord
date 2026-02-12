
import React, { useState } from 'react';
import { 
  PFAPA_CRITERIA_MARSHALL, 
  EUROFEVER_PRINTO_PFAPA, 
  TEL_HASHOMER_FMF, 
  EUROFEVER_FMF,
  FMF_SUPPORTIVE
} from '../constants';

const DiagnosisCalculator: React.FC = () => {
  // PFAPA State
  const [pfapaType, setPfapaType] = useState<'marshall' | 'eurofever'>('eurofever');
  const [marshallChecks, setMarshallChecks] = useState<Record<string, boolean>>({});
  const [pfapaEurofeverChecks, setPfapaEurofeverChecks] = useState<Record<string, boolean>>({});
  const [hasRecurrentFever, setHasRecurrentFever] = useState(true); // Entry for EF

  // FMF State
  const [fmfSet, setFmfSet] = useState<'tel-hashomer' | 'ef-clinical' | 'ef-genetic'>('tel-hashomer');
  const [fmfChecks, setFmfChecks] = useState<Record<string, boolean>>({});
  const [isGeneticMutation, setIsGeneticMutation] = useState(false);

  // Handlers
  const togglePfapaEurofever = (id: string) => {
    setPfapaEurofeverChecks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMarshall = (id: string) => {
    setMarshallChecks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFmf = (id: string) => {
    setFmfChecks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Logic - PFAPA
  // Eurofever: Mandatory Fever + 7/8
  const pfapaEurofeverScore = EUROFEVER_PRINTO_PFAPA.filter(item => pfapaEurofeverChecks[item.id]).length;
  const isEfMet = hasRecurrentFever && pfapaEurofeverScore >= 7;

  // Marshall: Fever mandatory (id: m_fever) + total score >= 5
  const pfapaMarshallScore = PFAPA_CRITERIA_MARSHALL.filter(item => marshallChecks[item.id]).length;
  const isMarshallMet = !!marshallChecks['m_fever'] && pfapaMarshallScore >= 5;

  const isPfapaMet = pfapaType === 'eurofever' ? isEfMet : isMarshallMet;

  // Logic - FMF Diagnosis
  const getFmfStatus = () => {
    if (fmfSet === 'tel-hashomer') {
      const majorMet = TEL_HASHOMER_FMF.major.filter(i => fmfChecks[i.id]).length;
      const minorMet = TEL_HASHOMER_FMF.minor.filter(i => fmfChecks[i.id]).length;
      const isMet = (majorMet >= 1 && minorMet >= 1) || (minorMet >= 2);
      return { isMet, label: 'אבחנת תל-השומר' };
    } 
    
    const efMetCount = EUROFEVER_FMF.filter(i => fmfChecks[i.id]).length;
    
    if (fmfSet === 'ef-clinical') {
      return { isMet: efMetCount >= 3, label: 'Eurofever קליני' };
    }
    
    return { isMet: efMetCount >= 2 && isGeneticMutation, label: 'Eurofever משולב' };
  };

  const fmfStatus = getFmfStatus();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* PFAPA Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="text-right">
            <h3 className="text-xl font-black text-blue-900">זיהוי PFAPA</h3>
            <div className="flex gap-2 mt-2">
              <button 
                onClick={() => setPfapaType('eurofever')}
                className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase transition-all ${pfapaType === 'eurofever' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}
              >
                Checklist (Eurofever/PRINTO)
              </button>
              <button 
                onClick={() => setPfapaType('marshall')}
                className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase transition-all ${pfapaType === 'marshall' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}
              >
                Marshall (עדכני)
              </button>
            </div>
          </div>
          <div className="text-left">
            <span className={`text-2xl font-black ${isPfapaMet ? 'text-green-600' : 'text-gray-300'}`}>
              {pfapaType === 'eurofever' ? pfapaEurofeverScore : pfapaMarshallScore}
              <span className="text-sm text-gray-400 font-bold"> / 8</span>
            </span>
          </div>
        </div>

        <div className="space-y-1 flex-1">
          {pfapaType === 'eurofever' ? (
            <>
              {/* Mandatory Condition */}
              <label className="flex flex-col p-3 mb-2 bg-blue-50 rounded-xl border border-blue-200 text-right">
                <div className="flex items-center gap-3 justify-end">
                  <span className="text-sm text-blue-900 font-black">חובה: נוכחות של התקפי חום חוזרים</span>
                  <input type="checkbox" checked={hasRecurrentFever} onChange={() => setHasRecurrentFever(!hasRecurrentFever)} className="w-4 h-4 rounded text-blue-600" />
                </div>
              </label>

              <p className="text-[10px] font-black text-gray-400 uppercase text-right border-b pb-1 mb-2">קריטריונים קליניים (נדרש 7 מתוך 8)</p>
              
              {EUROFEVER_PRINTO_PFAPA.map((item) => (
                <label key={item.id} className={`flex flex-col p-3 rounded-xl transition-all border group cursor-pointer text-right ${pfapaEurofeverChecks[item.id] ? 'bg-blue-50 border-blue-200' : 'bg-white border-transparent hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3 justify-end">
                    <span className={`text-sm ${pfapaEurofeverChecks[item.id] ? 'text-blue-900 font-bold' : 'text-gray-600'}`}>{item.description}</span>
                    <input type="checkbox" checked={!!pfapaEurofeverChecks[item.id]} onChange={() => togglePfapaEurofever(item.id)} className="w-4 h-4 rounded text-blue-600" />
                  </div>
                </label>
              ))}
            </>
          ) : (
            <>
              <p className="text-[10px] font-black text-gray-400 uppercase text-right border-b pb-1 mb-2">קריטריוני Marshall (חובה חום + 4 נוספים)</p>
              {PFAPA_CRITERIA_MARSHALL.map((item) => (
                <label key={item.id} className={`flex flex-col p-3 rounded-xl transition-all border group cursor-pointer text-right ${marshallChecks[item.id] ? (item.id === 'm_fever' ? 'bg-blue-100 border-blue-300' : 'bg-blue-50 border-blue-200') : 'bg-white border-transparent hover:bg-gray-50'}`}>
                  <div className="flex items-center gap-3 justify-end">
                    <span className={`text-sm ${marshallChecks[item.id] ? 'text-blue-900 font-bold' : 'text-gray-600'} ${item.id === 'm_fever' ? 'underline decoration-blue-400 underline-offset-4' : ''}`}>
                      {item.description}
                      {item.id === 'm_fever' && " (חובה)"}
                    </span>
                    <input type="checkbox" checked={!!marshallChecks[item.id]} onChange={() => toggleMarshall(item.id)} className="w-4 h-4 rounded text-blue-600" />
                  </div>
                </label>
              ))}
            </>
          )}
        </div>

        {isPfapaMet && (
          <div className="mt-6 p-4 bg-blue-600 text-white rounded-xl shadow-md text-right">
            <p className="font-bold flex items-center gap-2 mb-1 text-sm justify-end">
              קריטריוני סיווג הושגו
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </p>
            <p className="text-[10px] opacity-90">
              החולה עומד בקריטריונים קליניים ל-PFAPA לפי {pfapaType === 'eurofever' ? 'PRINTO 2019' : 'Marshall'}.
            </p>
          </div>
        )}
      </div>

      {/* FMF Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
        <div className="mb-6">
          <h3 className="text-xl font-black text-red-900 text-right">סיווג FMF</h3>
          <div className="flex gap-2 mt-2 justify-end">
            <button onClick={() => setFmfSet('tel-hashomer')} className={`text-[10px] px-2 py-1 rounded-md font-bold transition-all ${fmfSet === 'tel-hashomer' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500'}`}>תל השומר</button>
            <button onClick={() => setFmfSet('ef-clinical')} className={`text-[10px] px-2 py-1 rounded-md font-bold transition-all ${fmfSet === 'ef-clinical' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500'}`}>EF קליני</button>
            <button onClick={() => setFmfSet('ef-genetic')} className={`text-[10px] px-2 py-1 rounded-md font-bold transition-all ${fmfSet === 'ef-genetic' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500'}`}>EF משולב</button>
          </div>
        </div>

        <div className="space-y-4 flex-1 overflow-y-auto pr-2">
          {fmfSet === 'tel-hashomer' ? (
            <>
              <p className="text-[10px] font-black text-gray-400 uppercase text-right border-b pb-1">מאפיינים מרכזיים</p>
              {TEL_HASHOMER_FMF.major.map(i => (
                <label key={i.id} className="flex items-center gap-3 justify-end cursor-pointer py-1">
                  <span className="text-sm text-gray-700">{i.label}</span>
                  <input type="checkbox" checked={!!fmfChecks[i.id]} onChange={() => toggleFmf(i.id)} className="w-4 h-4 text-red-600" />
                </label>
              ))}
              <p className="text-[10px] font-black text-gray-400 uppercase text-right border-b pb-1 mt-4">מאפיינים משניים</p>
              {TEL_HASHOMER_FMF.minor.map(i => (
                <label key={i.id} className="flex items-center gap-3 justify-end cursor-pointer py-1">
                  <span className="text-sm text-gray-700">{i.label}</span>
                  <input type="checkbox" checked={!!fmfChecks[i.id]} onChange={() => toggleFmf(i.id)} className="w-4 h-4 text-red-600" />
                </label>
              ))}
            </>
          ) : (
            <>
              <p className="text-[10px] font-black text-gray-400 uppercase text-right border-b pb-1">קריטריונים קליניים (EF)</p>
              {EUROFEVER_FMF.map(i => (
                <label key={i.id} className="flex items-center gap-3 justify-end cursor-pointer py-2">
                  <span className="text-sm text-gray-700">{i.label}</span>
                  <input type="checkbox" checked={!!fmfChecks[i.id]} onChange={() => toggleFmf(i.id)} className="w-4 h-4 text-red-600" />
                </label>
              ))}
              {fmfSet === 'ef-genetic' && (
                <div className="p-3 bg-red-50 rounded-xl border border-red-100 mt-4 text-right">
                  <p className="text-xs font-bold text-red-800 mb-2">בדיקה גנטית (Mandatory for Mixed)</p>
                  <label className="flex items-center gap-3 justify-end cursor-pointer">
                    <span className="text-xs text-red-900 font-medium">נשאות של מוטציה פתוגנית ב-MEFV (אקסון 10)</span>
                    <input type="checkbox" checked={isGeneticMutation} onChange={() => setIsGeneticMutation(!isGeneticMutation)} className="w-4 h-4 text-red-600" />
                  </label>
                </div>
              )}
            </>
          )}

          {/* Supportive Features Section */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase text-right mb-2">ממצאים תומכים (מהמצגת)</p>
            {FMF_SUPPORTIVE.map(i => (
              <label key={i.id} className="flex items-center gap-3 justify-end cursor-pointer py-1">
                <span className="text-xs text-slate-500 italic">{i.label}</span>
                <input type="checkbox" checked={!!fmfChecks[i.id]} onChange={() => toggleFmf(i.id)} className="w-3 h-3 text-slate-400" />
              </label>
            ))}
          </div>
        </div>

        {fmfStatus.isMet && (
          <div className="mt-6 p-4 bg-red-600 text-white rounded-xl shadow-md text-right animate-bounce">
            <p className="font-bold flex items-center gap-2 mb-1 text-sm justify-end">
              {fmfStatus.label} חיובית
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </p>
            <p className="text-[10px] opacity-90">החולה עומד בתנאים לאבחנת FMF לפי הסט הנבחר. מומלץ להתחיל קולכיצין.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosisCalculator;
