import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';

@Directive({
  selector: '[appRedblackDirective]'
})
export class RedblackDirectiveDirective {


  constructor(private el:ElementRef) {
  	el.nativeElement.innerText += "Hello vicky";
  }

  ngOnInit(){

  }

}
