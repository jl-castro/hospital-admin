import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DoctorI, SpecialityI} from "../../integration/models/doctor.interface";
import {DoctorService} from "../../integration/services/doctor.service";
import {SpecialityService} from "../../integration/services/speciality.service";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-doctor-create-form',
  templateUrl: './doctor-create-form.component.html',
  styleUrls: ['./doctor-create-form.component.scss']
})
export class DoctorCreateFormComponent implements OnInit, OnDestroy {
  @Output() createDoctor: EventEmitter<DoctorI>;
  @Output() cancel: EventEmitter<boolean>;
  private hospitalId = localStorage.getItem('hospitalId');
  private subscription: Subscription = new Subscription();
  public specialities: SpecialityI[] = [];
  public doctorForm: FormGroup;
  public file: FileList = {} as FileList;
  public specialityList: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private doctorService: DoctorService,
              private specialitiesService: SpecialityService) {
    this.createDoctor = new EventEmitter<DoctorI>();
    this.cancel = new EventEmitter<boolean>();
    this.doctorForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(15)]],
        lastname: ['', [Validators.required, Validators.maxLength(15)]],
        birthday: ['', Validators.required],
        address: ['', [Validators.required, Validators.maxLength(50)]],
        file: ['', Validators.required],
      }
    );

    this.subscription = this.specialitiesService.getSpecialities().subscribe(specialities =>
      this.specialities = [...specialities.filter(spec => spec.hospitalId === Number(this.hospitalId))]
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    /*TODO search how to upload a file*/
    // this.profileService.postProfile({multipartFile: this.file}).subscribe(res => {
    //   console.log(res);
    // });

    this.doctorService.postDoctor(doctor, this.hospitalId).pipe(take(1)).subscribe(res => {
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
