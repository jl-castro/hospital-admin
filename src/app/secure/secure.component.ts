import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {faDiagnoses, faUserInjured, faUserMd} from "@fortawesome/free-solid-svg-icons";
import {HospitalNotifierService} from "../integration/services/hospital-notifier.service";

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public doctorIcon = faUserMd;
  public patientIcon = faUserInjured;
  public specialityIcon = faDiagnoses;
  public id: any;

  constructor(private _activatedRoute: ActivatedRoute, private hospitalNotifierService: HospitalNotifierService) {
    this.subscription = this._activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.sendHospitalId(this.id);
      localStorage.setItem('hospitalId', this.id);
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  sendHospitalId(id: string): void {
    setTimeout(() => {
      this.hospitalNotifierService.setUpdatedData(id);
    }, 100);
  }

}
