import {Component, Input, OnInit} from '@angular/core';
import {SpecialityI} from "../../integration/models/doctor.interface";

@Component({
  selector: 'app-speciality-info',
  templateUrl: './speciality-info.component.html',
  styleUrls: ['./speciality-info.component.scss']
})
export class SpecialityInfoComponent implements OnInit {
  @Input() specialities: SpecialityI[] = [];

  constructor() {

  }

  ngOnInit(): void {
  }

}
