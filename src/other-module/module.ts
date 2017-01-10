import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BasePanelComponent } from './base-panel.component';

@NgModule({
	imports: [
		BrowserModule,
	],
	exports: [
		BasePanelComponent,
	],
	declarations: [
		BasePanelComponent,
	],
})
export class OtherModule { }

