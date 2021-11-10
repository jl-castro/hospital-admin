import {Component, OnDestroy, OnInit} from '@angular/core';
import {SpecialityI} from "../../integration/models/doctor.interface";
import {SpecialityService} from "../../integration/services/speciality.service";
import {Subscription} from "rxjs";
import {HospitalNotifierService} from "../../integration/services/hospital-notifier.service";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.scss']
})
export class SpecialitiesComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  private hospitalId = '';
  public specialities: SpecialityI[] = [];
  public deleteIcon = faTrashAlt;

  constructor(private hospitalNotifierService: HospitalNotifierService,
              private specialityService: SpecialityService) {
    this.subscription = this.hospitalNotifierService.getUpdatedData().subscribe((id: string) => {
      this.hospitalId = id;
      this.getSpecialities(id);
    });
  }

  ngOnInit(): void {
    if (this.hospitalId === '') {
      this.hospitalId = <string>localStorage.getItem('hospitalId');
      this.getSpecialities(this.hospitalId);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getSpecialities(hospitalId: string): void {
    this.specialityService.getSpecialities().pipe(take(1)).subscribe(specialities => {
      this.specialities = [...specialities.filter(speciality => speciality.hospitalId === Number(hospitalId))]
    });
  }

  deleteSpeciality(speciality: SpecialityI) {
    this.specialityService.deleteSpeciality(Number(speciality.specialityId)).pipe(take(1)).subscribe(res => {
      this.getSpecialities(this.hospitalId);
    });
  }
}
