import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DoctorI} from "../models/doctor.interface";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) {
  }

  getDoctors(): Observable<DoctorI[]> {
    return this.http.get<DoctorI[]>(`${environment.url}/doctors`);
  }

  getDoctorById(doctorId: string): Observable<DoctorI> {
    return this.http.get<DoctorI>(`${environment.url}/doctors/${doctorId}`);
  }

  postDoctor(doctor: DoctorI, hospitalId: any): Observable<DoctorI> {
    return this.http.post<DoctorI>(`${environment.url}/doctors`, doctor, {
      headers: {
        'User-ID': '1',
        'hospitalId': hospitalId
      }
    });
  }

  updateDoctor(doctorId: any, doctor: DoctorI, hospitalId: any): Observable<DoctorI> {
    return this.http.put<DoctorI>(`${environment.url}/doctors/${doctorId}`, doctor, {
      headers: {
        'User-ID': '1',
        'hospitalId': hospitalId
      }
    });
  }

  deleteDoctor(doctorId: number): Observable<DoctorI> {
    return this.http.delete<DoctorI>(`${environment.url}/doctors/${doctorId}`);
  }
}
