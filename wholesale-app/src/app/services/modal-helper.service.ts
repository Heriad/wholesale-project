import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalHelperService {

  constructor(private modalService: NgbModal) { }
}
