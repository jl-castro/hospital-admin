import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HospitalNotifierService {
  private updateNotification: Subject<string>;

  constructor() {
    this.updateNotification = new Subject<string>();
  }

  getUpdatedData(): Observable<string> {
    return this.updateNotification.asObservable();
  }

  setUpdatedData(data: string): void {
    this.updateNotification.next(data);
  }
}
