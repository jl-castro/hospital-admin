import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../integration/services/patient.service";
import {PatientI} from "../../integration/models/patient.interface";

@Component({
  selector: 'app-patient-create-form',
  templateUrl: './patient-create-form.component.html',
  styleUrls: ['./patient-create-form.component.scss']
})
export class PatientCreateFormComponent implements OnInit {

  @Output() createPatient: EventEmitter<PatientI>;
  @Output() cancel: EventEmitter<boolean>;
  public patientForm: FormGroup;
  public hospitalId = localStorage.getItem('hospitalId');

  constructor(private formBuilder: FormBuilder, private patientService: PatientService) {
    this.createPatient = new EventEmitter<PatientI>();
    this.cancel = new EventEmitter<boolean>();
    this.patientForm = this.formBuilder.group({
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        birthday: ['', Validators.required],
        address: ['', Validators.required],
      }
    );
  }

  ngOnInit(): void {
  }

  send(): void {
    const patient: any = {
      name: this.patientForm.value.name,
      lastName: this.patientForm.value.lastname,
      birthday: new Date(this.patientForm.value.birthday),
      address: this.patientForm.value.address,
    };


    this.patientService.postPatient(patient, this.hospitalId).subscribe(res => {
      if (res) {
        this.cancel.emit(false);
        this.createPatient.emit(res);
        this.patientForm.value.name = '';
        this.patientForm.value.lastname = '';
        this.patientForm.value.birthday = '';
        this.patientForm.value.address = '';
      }
    });
  }

}
