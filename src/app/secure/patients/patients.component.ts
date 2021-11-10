import {Component, OnInit} from '@angular/core';
import {PatientService} from "../../integration/services/patient.service";
import {PatientI} from "../../integration/models/patient.interface";
import {ProfileI} from "../../integration/models/profile.interface";
import {ProfileService} from "../../integration/services/profile.service";
import {HospitalNotifierService} from "../../integration/services/hospital-notifier.service";
import {Subscription} from "rxjs";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  public patientsList: PatientI[] = [];
  public hospitalId = '';
  private subscription = new Subscription();
  public inputText = '';
  public searchOption = 'name';
  public addIcon = faPlus;
  public createIsVisible = false;

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

  getPatientsList(id: string): void {
    this.patientService.getPatients().subscribe((patients: PatientI[]) => {
      this.patientsList = [...patients.filter(patient => patient.hospitalId === Number(id))];
      this.setProfiles(this.patientsList);
    });
  }

  setProfiles(patients: PatientI[]): void {
    patients.forEach(patient => {
      if (patient.profileId != null) {
        this.profileService.getProfileById(patient.profileId).subscribe((img: ProfileI) => {
          patient.urlImage = 'data:image/png;base64,' + img.image;
        });
      }
    });
  }

  deletePatient(patient: PatientI) {
    this.patientService.deletePatient(Number(patient.patientId)).subscribe(res => {
      this.getPatientsList(this.hospitalId);
      console.log('se elimino');
    });
  }
}
