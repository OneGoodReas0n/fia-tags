import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.el.nativeElement.setFocus();
    this.el.nativeElement.getInputElement().then(() => {
      setTimeout(this.el.nativeElement.dispatchEvent(new CustomEvent('touchstart')), 1);
      setTimeout(this.el.nativeElement.dispatchEvent(new CustomEvent('touchend')), 10);
    },150);
  }

}
