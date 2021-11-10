import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HospitalI} from "../../integration/models/hospital.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HospitalService} from "../../integration/services/hospital.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-hospital-edit-form',
  templateUrl: './hospital-edit-form.component.html',
  styleUrls: ['./hospital-edit-form.component.scss']
})
export class HospitalEditFormComponent implements OnInit {
  @Input() hospital: HospitalI = {} as HospitalI;
  @Output() editHospital: EventEmitter<HospitalI>;
  @Output() cancel: EventEmitter<boolean>;
  public hospitalForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private hospitalService: HospitalService) {
    this.editHospital = new EventEmitter<HospitalI>();
    this.cancel = new EventEmitter<boolean>();
    this.hospitalForm = this.formBuilder.group({
        name: ['', Validators.required],
        address: ['', Validators.required]
      }
    );
  }

  ngOnInit(): void {
    this.hospitalForm = this.formBuilder.group({
        name: [this.hospital.name, Validators.required],
        address: [this.hospital.address, Validators.required]
      }
    );
  }

  edit(): void {
    const hospital: HospitalI = {
      id: this.hospital.id,
      address: this.hospitalForm.value.address,
      name: this.hospitalForm.value.name,
    };
    this.hospitalService.updateHospital(hospital.id, hospital).pipe(take(1)).subscribe(res => {
      if (res) {
        this.editHospital.emit(res);
        this.hospitalForm.value.name = '';
        this.hospitalForm.value.address = '';
      }
    });
  }

}
