import {Component, OnDestroy, OnInit} from '@angular/core';
import {HospitalNotifierService} from "../../integration/services/hospital-notifier.service";
import {Subscription} from "rxjs";
import {DoctorService} from "../../integration/services/doctor.service";
import {DoctorI} from "../../integration/models/doctor.interface";
import {ProfileService} from "../../integration/services/profile.service";
import {ProfileI} from "../../integration/models/profile.interface";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  public doctors: DoctorI[] = [];
  public hospitalId = '';
  public inputText = '';
  public searchOption = 'name';
  public createIsVisible = false;
  public addIcon = faPlus;
  public editableDoctor: DoctorI = {} as DoctorI;

  constructor(private hospitalNotifierService: HospitalNotifierService,
              private doctorService: DoctorService,
              private profileService: ProfileService) {
    this.subscription = this.hospitalNotifierService.getUpdatedData().subscribe((id: string) => {
      this.hospitalId = id;
      this.getDoctorsList(id);
    });

  }

  ngOnInit(): void {
    if (this.hospitalId === '') {
      this.hospitalId = <string>localStorage.getItem('hospitalId');
      this.getDoctorsList(this.hospitalId);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getDoctorsList(id: string): void {
    this.doctorService.getDoctors().pipe(take(1)).subscribe((doctors: DoctorI[]) => {
      this.doctors = [...doctors.filter(doctor => doctor.hospitalId === Number(id))];
      this.setProfiles(this.doctors);
    });
  }

  setProfiles(doctors: DoctorI[]): void {
    doctors.forEach(doctor => {
      if (doctor.profileId != null) {
        this.profileService.getProfileById(doctor.profileId).pipe(take(1)).subscribe((img: ProfileI) => {
          doctor.urlImage = 'data:image/png;base64,' + img.image;
        });
      }
    });
  }

  deleteDoctor(doctor: DoctorI) {
    this.doctorService.deleteDoctor(Number(doctor.doctorId)).pipe(take(1)).subscribe(res => {
      this.getDoctorsList(this.hospitalId);
    });
  }

  editDoctor(event: any, doctor: DoctorI) {
    if (event) {
      this.editableDoctor = {...doctor};
      this.createIsVisible = true;
    }
  }

  createDoctor() {
    this.editableDoctor = {} as DoctorI;
    this.createIsVisible = true;
  }

}
