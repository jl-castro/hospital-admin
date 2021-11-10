import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SpecialityI} from "../models/doctor.interface";


@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(private http: HttpClient) {
  }

  getSpecialities(): Observable<SpecialityI[]> {
    return this.http.get<SpecialityI[]>(`${environment.url}/specialities`);
  }

  deleteSpeciality(specialityId: number): Observable<SpecialityI> {
    return this.http.delete<SpecialityI>(`${environment.url}/specialities/${specialityId}`);
  }
}
