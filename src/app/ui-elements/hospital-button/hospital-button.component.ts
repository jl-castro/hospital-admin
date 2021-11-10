import {Component, Input, OnInit} from '@angular/core';
import {faUserInjured} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-hospital-button',
  templateUrl: './hospital-button.component.html',
  styleUrls: ['./hospital-button.component.scss']
})
export class HospitalButtonComponent implements OnInit {
  @Input() icon: IconProp = faUserInjured;
  @Input() style = '';

  constructor() {

  }

  ngOnInit(): void {
  }

}
