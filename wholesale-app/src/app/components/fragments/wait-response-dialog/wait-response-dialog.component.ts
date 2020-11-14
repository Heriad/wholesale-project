import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wait-response-dialog',
  templateUrl: './wait-response-dialog.component.html',
  styleUrls: ['./wait-response-dialog.component.scss']
})
export class WaitResponseDialogComponent implements OnInit {

  @Input() headerText: string;
  @Input() contentText: string;

  constructor() { }

  ngOnInit(): void {
  }

}
