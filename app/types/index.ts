export type VisaType = 'O-1' | 'EB-1A' | 'EB-2 NIW' | "I don't know";

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  visas: VisaType[];
  resumeUrl: string;
  notes: string;
  status: 'PENDING' | 'REACHED_OUT';
  createdAt: string;
  country: string;
}

export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  visas: VisaType[];
  resume: File | null;
  notes: string;
  country: string;
}