import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tag-user-data',
  templateUrl: './tag-user-data.component.html',
  styleUrls: ['./tag-user-data.component.scss']
})
export class TagUserDataComponent implements OnInit {
  @Input() userTitleData = '';
  @Input() userData: any = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
