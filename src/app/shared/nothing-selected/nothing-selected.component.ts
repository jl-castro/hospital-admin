import {Component, OnInit} from '@angular/core';
import {faAmbulance, faHospital} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-nothing-selected',
  templateUrl: './nothing-selected.component.html',
  styleUrls: ['./nothing-selected.component.scss']
})
export class NothingSelectedComponent implements OnInit {
  public hospitalIcon = faHospital;
  public ambulanceIcon = faAmbulance;

  constructor() {
  }

  ngOnInit(): void {
  }

}
