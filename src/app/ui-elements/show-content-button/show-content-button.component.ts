import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faChevronDown, faChevronUp, faEye, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {ModalInteractionService} from "../../integration/services/modal-interaction.service";

@Component({
  selector: 'app-show-content-button',
  templateUrl: './show-content-button.component.html',
  styleUrls: ['./show-content-button.component.scss']
})
export class ShowContentButtonComponent implements OnInit {
  @Input() isVisible = false;
  @Output() setVisibility: EventEmitter<boolean>;
  @Output() deleteUser: EventEmitter<boolean>;
  @Input() user: any;
  @Input() userType: string = '';

  public isVisibleIcon = faChevronDown;
  public isNotVisibleIcon = faChevronUp;
  public deleteIcon = faTrashAlt;
  public viewIcon = faEye;

  constructor(private modalInteraction: ModalInteractionService) {
    this.setVisibility = new EventEmitter<boolean>();
    this.deleteUser = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  showDialog() {
    this.user.userType = this.userType === 'Doctor' ? 'doctor' : 'patient';
    this.modalInteraction.setUpdatedData(this.user);
    let modal_t: any = document.getElementById('modal_1');
    modal_t.classList.remove('hidden');
    modal_t.classList.add('show');

  }

  closeDialog() {
    let modal_t: any = document.getElementById('modal_1');
    modal_t.classList.remove('show');
    modal_t.classList.add('hidden');
  }

}
