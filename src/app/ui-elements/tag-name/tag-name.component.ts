import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tag-name',
  templateUrl: './tag-name.component.html',
  styleUrls: ['./tag-name.component.scss']
})
export class TagNameComponent implements OnInit {
  @Input() name: string = '';
  @Input() lastName: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

}
