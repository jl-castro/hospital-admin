import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HistoryNotesI} from "../models/history.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) {
  }

  getHistories(): Observable<HistoryNotesI[]> {
    return this.http.get<HistoryNotesI[]>(`${environment.url}/histories`);
  }

  postHistory(history: HistoryNotesI, historyId: any): Observable<HistoryNotesI> {
    return this.http.post<HistoryNotesI>(`${environment.url}/histories`, history, {
      headers: {
        'User-ID': '1',
        'historyId': historyId
      }
    });
  }

  deleteHistory(historyId: number): Observable<HistoryNotesI> {
    return this.http.delete<HistoryNotesI>(`${environment.url}/histories/${historyId}`);
  }
}
