
import React, { useState } from 'react';
import { FeverEpisode } from '../types';

interface AddEpisodeFormProps {
  onAdd: (episode: FeverEpisode) => void;
  onCancel: () => void;
}

const COMMON_SYMPTOMS = [
  "Pharyngitis",
  "Cervical Adenitis",
  "Aphthous Ulcers",
  "Abdominal Pain",
  "Chest Pain (Pleuritis)",
  "Headache",
  "Joint Pain",
  "Skin Rash"
];

const AddEpisodeForm: React.FC<AddEpisodeFormProps> = ({ onAdd, onCancel }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [maxTemp, setMaxTemp] = useState(39.0);
  const [duration, setDuration] = useState(3);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom) 
        : [...prev, symptom]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEpisode: FeverEpisode = {
      id: Math.random().toString(36).substr(2, 9),
      date,
      maxTemp,
      durationDays: duration,
      symptoms: selectedSymptoms,
      notes
    };
    onAdd(newEpisode);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
      <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
        <span className="p-2 bg-blue-600 rounded-lg text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </span>
        Log New Fever Attack
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Start Date</label>
            <input 
              type="date" 
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Max Temp (°C)</label>
            <input 
              type="number" 
              step="0.1"
              required
              value={maxTemp}
              onChange={(e) => setMaxTemp(parseFloat(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Duration (Days)</label>
            <input 
              type="number" 
              required
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Associated Symptoms</label>
          <div className="flex flex-wrap gap-2">
            {COMMON_SYMPTOMS.map(symptom => (
              <button
                key={symptom}
                type="button"
                onClick={() => toggleSymptom(symptom)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  selectedSymptoms.includes(symptom)
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Clinical Notes</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., Response to Betnesol trial, Steroid timing..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm h-24 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button 
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg transition-all active:scale-95"
          >
            Add to Diary
          </button>
          <button 
            type="button"
            onClick={onCancel}
            className="px-8 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEpisodeForm;
