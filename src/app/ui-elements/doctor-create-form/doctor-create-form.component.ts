import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DoctorI, SpecialityI} from "../../integration/models/doctor.interface";
import {DoctorService} from "../../integration/services/doctor.service";
import {SpecialityService} from "../../integration/services/speciality.service";

@Component({
  selector: 'app-doctor-create-form',
  templateUrl: './doctor-create-form.component.html',
  styleUrls: ['./doctor-create-form.component.scss']
})
export class DoctorCreateFormComponent implements OnInit {
  @Output() createDoctor: EventEmitter<DoctorI>;
  @Output() cancel: EventEmitter<boolean>;
  public doctorForm: FormGroup;
  public specialities: SpecialityI[] = [];
  public specialityList: string[] = [];
  public hospitalId = localStorage.getItem('hospitalId');
  public file: FileList = {} as FileList;

  constructor(private formBuilder: FormBuilder,
              private doctorService: DoctorService,
              private specialitiesService: SpecialityService) {
    this.createDoctor = new EventEmitter<DoctorI>();
    this.cancel = new EventEmitter<boolean>();
    this.doctorForm = this.formBuilder.group({
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        birthday: ['', Validators.required],
        address: ['', Validators.required],
        file: ['', Validators.required],
      }
    );

    this.specialitiesService.getSpecialities().subscribe(specialities => this.specialities = [...specialities.filter(spec => spec.hospitalId === Number(this.hospitalId))]);
  }

  ngOnInit(): void {
  }

  addSpeciality(speciality: SpecialityI): void {
    speciality.isVisible = true;
    this.specialityList.push(speciality.specialityId.toString());
  }

  send(): void {
    const doctor: any = {
      name: this.doctorForm.value.name,
      lastName: this.doctorForm.value.lastname,
      birthday: new Date(this.doctorForm.value.birthday),
      address: this.doctorForm.value.address,
      specialityIds: this.specialityList
    };

    // this.profileService.postProfile({multipartFile: this.file}).subscribe(res => {
    //   console.log(res);
    // });

    this.doctorService.postDoctor(doctor, this.hospitalId).subscribe(res => {
      if (res) {
        this.cancel.emit(false);
        this.createDoctor.emit(res);
        this.doctorForm.value.name = '';
        this.doctorForm.value.lastname = '';
        this.doctorForm.value.birthday = '';
        this.doctorForm.value.address = '';
      }
    });
  }

  getFile(data: any): void {
    this.file = data;
  }
}
