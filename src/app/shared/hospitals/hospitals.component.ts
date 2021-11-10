import {Component, OnDestroy, OnInit} from '@angular/core';
import {HospitalService} from "../../integration/services/hospital.service";
import {HospitalI} from "../../integration/models/hospital.interface";
import {faEdit, faEye, faPlus, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public hospitalList: HospitalI[] = [];
  public createIsVisible = false;
  public inputText = '';
  public deleteIcon = faTrashAlt;
  public viewIcon = faEye;
  public editIcon = faEdit;
  public addIcon = faPlus;

  constructor(private hospitalService: HospitalService) {
    this.subscription = this.loadHospitals();
  }

  loadHospitals(): Subscription {
    this.createIsVisible = false;
    return this.hospitalService.getHospitals().subscribe(hospitals => {
      this.hospitalList = [...hospitals];
    });
  }

  deleteHospital(hospitalId: number | undefined): void {
    if (hospitalId) {
      this.hospitalService.deleteHospital(hospitalId).pipe(take(1)).subscribe(hospital => {
        this.subscription = this.loadHospitals();
      });
    }
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
