import {Component, Input} from '@angular/core';

@Component({
	selector: 'base-panel',
	template: '<div class="panel" [style.background-color]="color" (click)="onClick($event)">{{content}}</div>',
	styles: [`
	.panel{
    padding: 50px;
  }
  `]
})
export class BasePanelComponent { 

  @Input() content: string;
  
  color: string = "red";
  
  constructor() {}

  onClick(event){
    console.log("Click color: " + this.color);
  }
}