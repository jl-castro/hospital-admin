import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {HistoryNotesI} from "../../integration/models/history.interface";
import {ModalInteractionService} from "../../integration/services/modal-interaction.service";
import {HistoryService} from "../../integration/services/history.service";
import {DoctorService} from "../../integration/services/doctor.service";
import {PatientService} from "../../integration/services/patient.service";
import {take} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.scss']
})
export class HistoryModalComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public histories: HistoryNotesI[] = [];
  public user: any;
  public userRole = '';

  constructor(private el: ElementRef, private modalInteraction: ModalInteractionService,
              private historyService: HistoryService,
              private doctorService: DoctorService,
              private patientService: PatientService) {
    this.subscription = this.modalInteraction.getUpdatedData().subscribe(res => {
      this.user = {...res};
      this.historyService.getHistories().pipe(take(1)).subscribe(histories => {
          if (this.user.userType === 'doctor') {
            this.userRole = 'doctor';
            this.histories = [...histories.filter(history => history.doctorId === this.user.doctorId)];
            this.setPatient();

          } else {
            this.userRole = 'patient';
            this.histories = [...histories.filter(history => history.patientId === this.user.patientId)];
            this.setDoctor();
          }
        }
      );
    });
  }

  ngOnInit(): void {
    this.el.nativeElement.addEventListener('click', () => {
      this.close();
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setPatient(): void {
    this.histories.forEach(history => {
      this.patientService.getPatientById(history.patientId.toString()).pipe(take(1)).subscribe(hist => history.userName = hist.name + ' ' + hist.lastName);
    });
  }

  setDoctor(): void {
    this.histories.forEach(history => {
      this.doctorService.getDoctorById(history.doctorId.toString()).pipe(take(1)).subscribe(hist => history.userName = hist.name + ' ' + hist.lastName);
    });
  }

  close() {
    this.el.nativeElement.classList.remove('show');
    this.el.nativeElement.classList.add('hidden');
  }
}
