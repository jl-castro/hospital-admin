import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProfileI} from "../models/profile.interface";
import {HospitalI} from "../models/hospital.interface";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  getProfileById(id: string): Observable<ProfileI> {
    return this.http.get<ProfileI>(`${environment.url}/profiles/${id}`);
  }

  postProfile(profile: any): Observable<any> {
    return this.http.post<ProfileI>(`${environment.url}/profiles`, profile, {
      params: profile.multipartFile
    });
  }
}
