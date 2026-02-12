
export enum Condition {
  PFAPA = 'PFAPA',
  FMF = 'FMF',
  OTHER = 'OTHER'
}

export interface FeverEpisode {
  id: string;
  date: string;
  durationDays: number;
  maxTemp: number;
  symptoms: string[];
  notes?: string;
}

export interface PatientProfile {
  id: string;
  ageOfOnset: number;
  episodes: FeverEpisode[];
  treatment?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
