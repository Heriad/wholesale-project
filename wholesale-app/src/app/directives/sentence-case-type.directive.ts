import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSentenceCaseType]'
})
export class SentenceCaseTypeDirective {

  constructor(private elRef: ElementRef) { }

  // Dyrektywa zmieniająca string na typ Sentence Case
  @HostListener('input', ['$event'])
  OnInputChange(event) {
    this.elRef.nativeElement.value = this.elRef.nativeElement.value.charAt(0).toUpperCase() +
      this.elRef.nativeElement.value.substr(1).toLowerCase();
    event.stopPropagation();
  }
}
