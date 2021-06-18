import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-players-on-top',
  templateUrl: './players-on-top.component.html',
  styleUrls: ['./players-on-top.component.scss']
})
export class PlayersOnTopComponent implements OnInit {
  @Input() img!: string;
  @Input() name!: string;
  @Input() playerActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
