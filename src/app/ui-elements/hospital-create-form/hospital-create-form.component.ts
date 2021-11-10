import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HospitalService} from "../../integration/services/hospital.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HospitalI} from "../../integration/models/hospital.interface";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-hospital-create-form',
  templateUrl: './hospital-create-form.component.html',
  styleUrls: ['./hospital-create-form.component.scss']
})
export class HospitalCreateFormComponent implements OnInit {
  @Output() createHospital: EventEmitter<HospitalI>;
  @Output() cancel: EventEmitter<boolean>;
  public hospitalForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private hospitalService: HospitalService) {
    this.createHospital = new EventEmitter<HospitalI>();
    this.cancel = new EventEmitter<boolean>();
    this.hospitalForm = this.formBuilder.group({
        name: ['', Validators.required],
        address: ['', Validators.required]
      }
    );
  }

  ngOnInit(): void {
  }

  send(): void {
    const hospital: HospitalI = {
      name: this.hospitalForm.value.name,
      address: this.hospitalForm.value.address
    };
    this.hospitalService.postHospital(hospital).pipe(take(1)).subscribe(res => {
      if (res) {
        this.createHospital.emit(res);
        this.hospitalForm.value.name = '';
        this.hospitalForm.value.address = '';
      }
    });
  }

}
