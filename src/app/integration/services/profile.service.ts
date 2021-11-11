import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {ProfileI} from "../models/profile.interface";

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
    const formData: FormData = new FormData();
    formData.append('multipartFile', profile);
    const req = new HttpRequest('POST', `${environment.url}/profiles`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  putProfile(profileId: any, profile: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('multipartFile', profile);
    const req = new HttpRequest('PUT', `${environment.url}/profiles/${profileId}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
