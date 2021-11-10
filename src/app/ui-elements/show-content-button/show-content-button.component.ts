import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faChevronDown, faChevronUp, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-show-content-button',
  templateUrl: './show-content-button.component.html',
  styleUrls: ['./show-content-button.component.scss']
})
export class ShowContentButtonComponent implements OnInit {
  @Input() isVisible = false;
  @Output() setVisibility: EventEmitter<boolean>;
  @Output() deleteUser: EventEmitter<boolean>;
  public isVisibleIcon = faChevronDown;
  public isNotVisibleIcon = faChevronUp;
  public deleteIcon = faTrashAlt;

  constructor() {
    this.setVisibility = new EventEmitter<boolean>();
    this.deleteUser = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

}
