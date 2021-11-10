export interface PatientI {
  patientId: number;
  name: string;
  lastName: string;
  address: string;
  birthday: string;
  hospitalId: number;
  profileId?: string;
  urlImage?: any;
  isVisible: boolean;
}
