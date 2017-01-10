import {Component, Input} from '@angular/core';
import {BasePanelComponent} from '../other-module/base-panel.component'

@Component({
	selector: 'my-panel',
	template: '<div class="panel" [style.background-color]="color" (click)="onClick($event)">{{content}}</div>',
	styles: [`
	.panel{
    padding: 50px;
  }
  `]
})
export class MyPanelComponent extends BasePanelComponent{

  @Input() content: string;

  constructor(	){
	super();
    this.color = "blue";
  }
}