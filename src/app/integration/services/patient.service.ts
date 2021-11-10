import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {PatientI} from "../models/patient.interface";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) {
  }

  getPatients(): Observable<PatientI[]> {
    return this.http.get<PatientI[]>(`${environment.url}/patients`);
  }

  getPatientById(patientId: string): Observable<PatientI> {
    return this.http.get<PatientI>(`${environment.url}/patients/${patientId}`);
  }

  postPatient(patient: PatientI, hospitalId: any): Observable<PatientI> {
    return this.http.post<PatientI>(`${environment.url}/patients`, patient, {
      headers: {
        'User-ID': '1',
        'hospitalId': hospitalId
      }
    });
  }

  deletePatient(patientId: number): Observable<PatientI> {
    return this.http.delete<PatientI>(`${environment.url}/patients/${patientId}`);
  }
}
