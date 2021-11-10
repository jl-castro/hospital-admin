import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HospitalI} from "../models/hospital.interface";

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) {
  }

  getHospitals(): Observable<HospitalI[]> {
    return this.http.get<HospitalI[]>(`${environment.url}/hospitals`);
  }

  postHospital(hospital: HospitalI): Observable<HospitalI> {
    return this.http.post<HospitalI>(`${environment.url}/hospitals`, hospital, {headers: {'User-ID': '1'}});
  }

  updateHospital(hospitalId: number | undefined, hospital: HospitalI): Observable<HospitalI> {
    return this.http.put<HospitalI>(`${environment.url}/hospitals/${hospitalId}`, hospital, {headers: {'User-ID': '1'}});
  }

  deleteHospital(hospitalId: number): Observable<HospitalI> {
    return this.http.delete<HospitalI>(`${environment.url}/hospitals/${hospitalId}`);
  }
}
