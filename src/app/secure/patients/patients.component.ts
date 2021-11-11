import {Component, OnDestroy, OnInit} from '@angular/core';
import {PatientService} from "../../integration/services/patient.service";
import {PatientI} from "../../integration/models/patient.interface";
import {ProfileI} from "../../integration/models/profile.interface";
import {ProfileService} from "../../integration/services/profile.service";
import {HospitalNotifierService} from "../../integration/services/hospital-notifier.service";
import {Subscription} from "rxjs";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  public patientsList: PatientI[] = [];
  public editablePatient: PatientI = {} as PatientI;
  public searchOption = 'name';
  public createIsVisible = false;
  public hospitalId = '';
  public inputText = '';
  public addIcon = faPlus;

  constructor(private hospitalNotifierService: HospitalNotifierService,
              private patientService: PatientService, private profileService: ProfileService) {
    this.subscription = this.hospitalNotifierService.getUpdatedData().subscribe((id: string) => {
      this.hospitalId = id;
      this.getPatientsList(id);
    });
  }

  ngOnInit(): void {
    if (this.hospitalId === '') {
      this.hospitalId = <string>localStorage.getItem('hospitalId');
      this.getPatientsList(this.hospitalId);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getPatientsList(id: string): void {
    this.patientService.getPatients().pipe(take(1)).subscribe((patients: PatientI[]) => {
      this.patientsList = [...patients.filter(patient => patient.hospitalId === Number(id))];
      this.setProfiles(this.patientsList);
    });
  }

  setProfiles(patients: PatientI[]): void {
    patients.forEach(patient => {
      if (patient.profileId != null) {
        this.profileService.getProfileById(patient.profileId).pipe(take(1)).subscribe((img: ProfileI) => {
          patient.urlImage = 'data:image/png;base64,' + img.image;
        });
      }
    });
  }

  deletePatient(patient: PatientI) {
    this.patientService.deletePatient(Number(patient.patientId)).pipe(take(1)).subscribe(res => {
      this.getPatientsList(this.hospitalId);
    });
  }

  createPatient() {
    this.editablePatient = {} as PatientI;
    this.createIsVisible = true;
  }

  editPatient(event: any, patient: PatientI) {
    if (event) {
      this.editablePatient = {...patient};
      this.createIsVisible = true;
    }
  }
}
