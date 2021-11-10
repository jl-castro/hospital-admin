import {Component, OnInit} from '@angular/core';
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  public backIcon = faChevronLeft;

  constructor() {
  }

  ngOnInit(): void {
  }

}
