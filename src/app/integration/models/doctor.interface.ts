export interface DoctorI {
  id?: number;
  speciality: SpecialityI[];
}

export interface SpecialityI {
  id: number;
  name: string;
  description: string;
  avatarId: string;
}
