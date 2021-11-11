import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DoctorI, SpecialityI} from "../../integration/models/doctor.interface";
import {DoctorService} from "../../integration/services/doctor.service";
import {SpecialityService} from "../../integration/services/speciality.service";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";
import {ProfileService} from "../../integration/services/profile.service";

@Component({
  selector: 'app-doctor-create-form',
  templateUrl: './doctor-create-form.component.html',
  styleUrls: ['./doctor-create-form.component.scss']
})
export class DoctorCreateFormComponent implements OnInit, OnDestroy {
  @Output() createDoctor: EventEmitter<DoctorI>;
  @Output() cancel: EventEmitter<boolean>;
  @Input() editUser: DoctorI = {} as DoctorI;
  private hospitalId = localStorage.getItem('hospitalId');
  private subscription: Subscription = new Subscription();
  public specialities: SpecialityI[] = [];
  public doctorForm: FormGroup;
  public file: File = {} as File;
  public specialityList: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private doctorService: DoctorService,
              private specialitiesService: SpecialityService,
              private profileService: ProfileService) {
    this.createDoctor = new EventEmitter<DoctorI>();
    this.cancel = new EventEmitter<boolean>();
    this.doctorForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(15)]],
        lastname: ['', [Validators.required, Validators.maxLength(15)]],
        birthday: ['', Validators.required],
        address: ['', [Validators.required, Validators.maxLength(50)]],
      }
    );
    this.getSpecialities();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addSpeciality(speciality: SpecialityI): void {
    speciality.isVisible = !speciality.isVisible;
    if (speciality.isVisible) {
      this.specialityList.push(speciality.specialityId.toString());
    }
  }

  getSpecialities(): void {
    this.specialitiesService.getSpecialities().subscribe(specialities => {
        this.specialities = [...specialities.filter(spec => spec.hospitalId === Number(this.hospitalId))]
        this.fillInputs();
      }
    );
  }

  send(): void {
    const doctor: any = {
      name: this.doctorForm.value.name,
      lastName: this.doctorForm.value.lastname,
      birthday: new Date(this.doctorForm.value.birthday),
      address: this.doctorForm.value.address,
      specialityIds: this.specialityList
    };
    this.profileService.postProfile(this.file).subscribe((res: any) => {
      if (res.body) {
        const profile = res.body;
        doctor.profileId = profile.profileId;
        this.generateDoctor(doctor);
      }
    });
  }

  edit() {
    const doctor: any = {
      name: this.doctorForm.value.name,
      lastName: this.doctorForm.value.lastname,
      birthday: new Date(this.doctorForm.value.birthday),
      address: this.doctorForm.value.address,
      specialityIds: this.specialityList
    };
    this.profileService.putProfile(this.editUser.profileId, this.file).subscribe((res: any) => {
      if (res.body) {
        const profile = res.body;
        doctor.profileId = profile.profileId;
        this.updateDoctor(doctor);
      }
    });
  }

  generateDoctor(doctor: any): void {
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

  updateDoctor(doctor: any): void {
    this.doctorService.updateDoctor(this.editUser.doctorId, doctor, this.hospitalId).pipe(take(1)).subscribe(res => {
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
    let eventObj: MSInputMethodContext = <MSInputMethodContext>data;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList | null = target.files;
    // @ts-ignore
    this.file = files[0];
  }

  fillInputs(): void {
    if (this.editUser.doctorId) {
      const specialityIds = [...this.editUser.specialities.map(res => res.specialityId)];
      this.specialities.forEach(speciality => {
        for (let id of specialityIds) {
          if (speciality.specialityId === id) {
            speciality.isVisible = true;
          }
        }
      });
      this.doctorForm = this.formBuilder.group({
          name: [this.editUser.name, [Validators.required, Validators.maxLength(15)]],
          lastname: [this.editUser.lastName, [Validators.required, Validators.maxLength(15)]],
          birthday: [this.editUser.birthday, Validators.required],
          address: [this.editUser.address, [Validators.required, Validators.maxLength(50)]],
        }
      );
    }
  }

}
