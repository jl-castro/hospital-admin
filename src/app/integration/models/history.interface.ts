export interface HistoryNotesI {
  id: number;
  description: string;
  date: string;
  patientId: number;
  doctorId: number;
  createdAt: string;
  userName?: string;
}
