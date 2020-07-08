import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPriceOnly]'
})
export class PriceOnlyDirective {
  // TODO
  constructor(private elRef: ElementRef) { }
  // private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  // Dyrektywa pozwalająca na wpisywanie jedynie liczby z dwoma miejscami po kropce
  @HostListener('input', ['$event'])
  onInputChange(event) {
    // const startVal = this.elRef.nativeElement.value;
    // this.elRef.nativeElement.value = startVal.replace(/^[0-9]*\.[0-9]{2}$/g, '');
    // if (startVal !== this.elRef.nativeElement.value) {
    //   event.stopPropagation();
    // }

  //   console.log(this.elRef.nativeElement.value);
  //   const current = this.elRef.nativeElement.value;
  //   this.elRef.nativeElement.value = current.replace(/[^0-9]*|\./g, '');
  //   const position = this.elRef.nativeElement.selectionStart;
  //   const next = [current.slice(0, position), event.key === 'Decimal' ? '.' : event.key, current.slice(position)].join('');
  //   if (next && !String(next).match(this.regex)) {
  //     event.preventDefault();
  //   }
  }

}
