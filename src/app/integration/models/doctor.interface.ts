export interface DoctorI {
  doctorId?: number;
  name: string;
  lastName: string;
  address: string;
  birthday: string;
  specialities: SpecialityI[];
  hospitalId: number;
  profileId?: string;
  urlImage?: any;
  isVisible: boolean;
}

export interface SpecialityI {
  specialityId: number;
  name: string;
  description: string;
  avatarId: number;
  hospitalId: number;
  isVisible: boolean;
}
