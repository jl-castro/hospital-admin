import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalInteractionService {
  private updateNotification: Subject<any>;

  constructor() {
    this.updateNotification = new Subject<any>();
  }

  getUpdatedData(): Observable<any> {
    return this.updateNotification.asObservable();
  }

  setUpdatedData(data: any): void {
    this.updateNotification.next(data);
  }
}
