import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-preview-dialog',
  templateUrl: './image-preview-dialog.component.html',
  styleUrls: ['./image-preview-dialog.component.scss']
})
export class ImagePreviewDialogComponent implements OnInit {

  @Input() image;

  constructor() { }

  ngOnInit(): void {
  }

}
