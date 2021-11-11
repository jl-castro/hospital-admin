import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PatientI} from "../../integration/models/patient.interface";
import {DoctorI} from "../../integration/models/doctor.interface";
import {PatientService} from "../../integration/services/patient.service";
import {DoctorService} from "../../integration/services/doctor.service";
import {take} from "rxjs/operators";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {HistoryService} from "../../integration/services/history.service";
import {HistoryNotesI} from "../../integration/models/history.interface";

@Component({
  selector: 'app-history-create-form',
  templateUrl: './history-create-form.component.html',
  styleUrls: ['./history-create-form.component.scss']
})
export class HistoryCreateFormComponent implements OnInit {
  @Input() hospitalId: any;
  @Output() cancel: EventEmitter<boolean>;
  public patientList: PatientI[] = [];
  public doctorList: DoctorI[] = [];
  public description = '';
  public patient = '';
  public doctor = '';
  public okIcon = faCheckCircle;
  public cancelIcon = faTimesCircle;

  constructor(private patientService: PatientService,
              private doctorService: DoctorService,
              private historyService: HistoryService) {
    this.cancel = new EventEmitter<boolean>();
    this.getDoctorList();
    this.getPatientList();
  }

  getDoctorList(): void {
    this.doctorService.getDoctors().pipe(take(1)).subscribe(doctors =>
      this.doctorList = [...doctors.filter(doctor => doctor.hospitalId === this.hospitalId)]
    );
  }

  getPatientList(): void {
    this.patientService.getPatients().pipe(take(1)).subscribe(patients =>
      this.patientList = [...patients.filter(patient => patient.hospitalId === this.hospitalId)]
    );
  }

  ngOnInit(): void {
  }

  createHistory(): void {
    const history: HistoryNotesI = {
        doctorId: Number(this.doctor),
        patientId: Number(this.patient),
        description: this.description,
        date: (new Date()).toString()
      }
    ;
    this.historyService.postHistory(history).subscribe(res => {
      if (res) {
        this.cancel.emit(false);
      }
    })
  }

}
