import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appEnableDisable]'
})
export class EnableDisableDirective {

  @Input() state!: number;

  

  constructor() { }

}
