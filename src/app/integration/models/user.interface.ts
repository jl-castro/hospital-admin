export interface UserI {
  id: number;
  name: string;
  lastName: string;
  birthday: string;
  address: string;
  hospitalId: number;
  role: ROLE;
  profile: ProfileI;
}

enum ROLE {
  ADMIN = 'ADMIN',
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR'
}

export interface ProfileI {
  id: number;
  file: string;
}

