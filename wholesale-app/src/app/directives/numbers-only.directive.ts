import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  constructor(private elRef: ElementRef) { }

  // Dyrektywa sprawiająca, że do pola tekstowego można wpisywać jedynie wartości numeryczne
  @HostListener('input', ['$event'])
  onInputChange(event) {
    const startVal = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = startVal.replace(/[^0-9]*/g, '');
    if (startVal !== this.elRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
