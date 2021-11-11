import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PatientService} from "../../integration/services/patient.service";
import {PatientI} from "../../integration/models/patient.interface";
import {take} from "rxjs/operators";
import {ProfileService} from "../../integration/services/profile.service";

@Component({
  selector: 'app-patient-create-form',
  templateUrl: './patient-create-form.component.html',
  styleUrls: ['./patient-create-form.component.scss']
})
export class PatientCreateFormComponent implements OnInit {

  @Output() createPatient: EventEmitter<PatientI>;
  @Output() cancel: EventEmitter<boolean>;
  @Input() editUser: PatientI = {} as PatientI;
  public patientForm: FormGroup;
  public hospitalId = localStorage.getItem('hospitalId');
  public file: File = {} as File;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private profileService: ProfileService) {
    this.createPatient = new EventEmitter<PatientI>();
    this.cancel = new EventEmitter<boolean>();
    this.patientForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(20)]],
        lastname: ['', [Validators.required, Validators.maxLength(20)]],
        birthday: ['', Validators.required],
        address: ['', [Validators.required, Validators.maxLength(50)]],
      }
    );
  }

  ngOnInit(): void {
    this.fillInputs();
  }

  send(): void {
    const patient: any = {
      name: this.patientForm.value.name,
      lastName: this.patientForm.value.lastname,
      birthday: new Date(this.patientForm.value.birthday),
      address: this.patientForm.value.address,
    };
    this.profileService.postProfile(this.file).subscribe((res: any) => {
      if (res.body) {
        const profile = res.body;
        patient.profileId = profile.profileId;
        this.generatePatient(patient);
      }
    });
  }

  edit(): void {
    const patient: any = {
      name: this.patientForm.value.name,
      lastName: this.patientForm.value.lastname,
      birthday: new Date(this.patientForm.value.birthday),
      address: this.patientForm.value.address,
    };
    this.profileService.putProfile(this.editUser.profileId, this.file).subscribe((res: any) => {
      if (res.body) {
        const profile = res.body;
        patient.profileId = profile.profileId;
        this.updatePatient(patient);
      }
    });
  }


  generatePatient(patient: any): void {
    this.patientService.postPatient(patient, this.hospitalId).pipe(take(1)).subscribe(patient => {
      if (patient) {
        this.cancel.emit(false);
        this.createPatient.emit(patient);
        this.patientForm.value.name = '';
        this.patientForm.value.lastname = '';
        this.patientForm.value.birthday = '';
        this.patientForm.value.address = '';
      }
    });
  }

  updatePatient(patient: any): void {
    this.patientService.updatePatient(this.editUser.patientId, patient, this.hospitalId).pipe(take(1)).subscribe(patient => {
      if (patient) {
        this.cancel.emit(false);
        this.createPatient.emit(patient);
        this.patientForm.value.name = '';
        this.patientForm.value.lastname = '';
        this.patientForm.value.birthday = '';
        this.patientForm.value.address = '';
      }
    });
  }

  getFile(data: any): void {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>data;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList | null = target.files;
    // @ts-ignore
    this.file = files[0];
  }

  fillInputs(): void {
    if (this.editUser.patientId) {
      this.patientForm = this.formBuilder.group({
          name: [this.editUser.name, [Validators.required, Validators.maxLength(15)]],
          lastname: [this.editUser.lastName, [Validators.required, Validators.maxLength(15)]],
          birthday: [this.editUser.birthday, Validators.required],
          address: [this.editUser.address, [Validators.required, Validators.maxLength(50)]],
        }
      );
    }
  }

}
